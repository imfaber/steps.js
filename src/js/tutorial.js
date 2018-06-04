import toBoolean from "./utils/toBoolean";
import Step from "./step";
import Router from "./router";
import {TUTORIAL_DEFAULT_OPTIONS, DOM_SELECTORS, root} from "./config";

export default class Tutorial {

  constructor(options) {

    options = Object.assign(TUTORIAL_DEFAULT_OPTIONS, options);

    // Set tutorial properies.
    this.title = options.title;
    this.selected = parseInt(options.selected);
    this.duration = parseInt(options.duration);
    this.toolbar = toBoolean(options.toolbar);
    this.arrows = toBoolean(options.arrows);

    // Cache tutorial DOM elements.
    root.dom = {};
    root.dom.tutorial = document.querySelector(DOM_SELECTORS.tutorialWrapper);
    root.dom.stepsWrapper = root.dom.tutorial.querySelector(DOM_SELECTORS.stepsWrapper);
    if (root.dom.stepsWrapper) {
      root.dom.steps = root.dom.stepsWrapper.querySelectorAll(DOM_SELECTORS.steps);
    }

    // Do not continue if there are no steps.
    if (!this.hasSteps()) return;

    // Create steps.
    this.steps = [];
    for (let i = 0; i < root.dom.steps.length; ++i) {
      root.dom.steps[i].dataset.id = `tutorial-js-step-${i}`;
      this.steps.push(new Step(root.dom.steps[i].dataset));
    }

    // Init router.
    root.router = new Router(this.steps);
    root.router.go(this.selected);
  }

  /**
   * Find and return the given step.
   *
   * @param stepNumber
   * @returns {*}
   */
  getStep(stepNumber) {
    return this.steps.find(s => {
      return (s.step === stepNumber);
    });
  }

  /**
   * Return the selected step.
   * @returns {*}
   */
  getSelectedStep() {
    return this.getStep(this.selected)
  }

  /**
   * Check whether the tutorial has steps.
   *
   * @returns {boolean}
   */
  hasSteps() {
    return typeof root.dom.steps !== 'undefined';
  }

}
