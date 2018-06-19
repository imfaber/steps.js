import toBoolean from "./utils/toBoolean";
import Step from "./step";
import Toolbar from "./toolbar";
import Router from "./router";
import {TUTORIAL_DEFAULT_OPTIONS, DOM_SELECTORS, CSS_CLASSES, root} from "./config";

export default class Tutorial {

  constructor(options) {

    options = Object.assign(TUTORIAL_DEFAULT_OPTIONS, options);

    // Set tutorial properies.
    this.title = options.title;
    this.selected = parseInt(options.selected);
    this.toolbar = toBoolean(options.toolbar);
    this.pagination = toBoolean(options.pagination);
    this.prevText = options.prevText;
    this.nextText = options.nextText;
    this.duration = 0;
    this.minRemaining = 0;

    // Cache tutorial DOM elements.
    root.dom = {};
    root.dom.tutorial = document.querySelector(DOM_SELECTORS.tutorialWrapper);
    root.dom.stepsWrapper = root.dom.tutorial.querySelector(DOM_SELECTORS.stepsWrapper);
    if (root.dom.stepsWrapper) {
      root.dom.steps = root.dom.stepsWrapper.querySelectorAll(DOM_SELECTORS.steps);
    }

    // Cache tutorial.
    root.tutorial = this;

    // Do not continue if there are no steps.
    if (!Tutorial.hasSteps()) return;

    // Create steps.
    this.steps = [];
    for (let i = 0; i < root.dom.steps.length; ++i) {
      root.dom.steps[i].dataset.id = `tutorial-js-step-${i}`;
      this.steps.push(new Step(root.dom.steps[i].dataset));
      this.duration += this.steps[i].duration;
    }

    // Init router.
    root.router = new Router();

    // Init toolbar
    if (this.toolbar) {
      root.toolbar = new Toolbar();
    }
  }

  /**
   * Find and return the given step.
   *
   * @param stepNumber
   * @returns {*}
   */
  getStep(stepNumber) {
    return this.steps.find(s => {
      return (s.step === parseInt(stepNumber));
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
  static hasSteps() {
    return typeof root.dom.steps !== 'undefined';
  }

  /**
   * Set the given step as active.
   * @param id
   */
  setActiveStep(id) {

    // Cache useful DOM nodes.
    const activeStep = root.dom.stepsWrapper.querySelector(`.${CSS_CLASSES.stepSelected}`),
      prevStep = root.dom.stepsWrapper.querySelector(`.${CSS_CLASSES.stepOut}`);

    // Remove the 'out' class from prev step.
    if (prevStep) {
      prevStep.classList.remove(CSS_CLASSES.stepOut);
    }

    // Add 'out' class and remove 'active' class from current step.
    if (activeStep) {
      activeStep.classList.add(CSS_CLASSES.stepOut);
      activeStep.classList.remove(CSS_CLASSES.stepSelected);
    }

    // Activate new step.
    this.getStep(id).enable();

    // Update remaining time in toolbar.
    Toolbar.updateRemainingMinutes();
  }

  /**
   * Return the remaining minutes to complete the tutorial.
   * @returns {number|*}
   */
  getRemainingMinutes() {
    let minRemaining = this.duration,
      stepElem = null;

    for (let i = 0; i < root.dom.steps.length; i++) {
      stepElem = root.dom.steps[i];
      if (stepElem.dataset.step < Router.getStepFromHash()) {
        minRemaining -= parseInt(stepElem.dataset.duration);
      }
    }
    return minRemaining;
  }
}
