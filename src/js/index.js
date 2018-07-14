import Util from "./util";
import {NAME, DOM, ClassName, Selector, Direction, EventName} from "./global";
import Toolbar from "./toolbar";
import Router from "./router";
import Step from "./step";

/**
 * Tutorial default options.
 *
 * @type {*}
 */
const Default = {

  // The title of the steps.
  title: '',

  // The selected step.
  selected: 1,

  // Whether to display the toolbar.
  toolbar: true,

  // Whether to display the arrows.
  pagination: true,

  // Pagination text.
  prevText: 'Previous',
  nextText: 'Next',

  // Time remaining text
  timeRemainingText: 'MINUTES min remaining', // MINUTES gets replaced with actual minutes

  timeRemaining: true,
};

class StepsJS {

  constructor(element) {

    if (!element) {
      return;
    }

    Util.dispatchEvent(element, EventName.INITIALIZE, null);

    const options = Object.assign(Default, element.dataset);

    // Create steps config object.
    this._config = {
      title:             options.title,
      selected:          parseInt(options.selected),
      toolbar:           Util.toBoolean(options.toolbar),
      pagination:        Util.toBoolean(options.pagination),
      prevText:          options.prevText,
      nextText:          options.nextText,
      timeRemainingText: options.timeRemainingText,
      timeRemaining:     Util.toBoolean(options.timeRemaining),
    };

    this._duration = 0;
    this._currentStepIndex = 0;
    this._minRemaining = 0;

    this._setupDOM(element);

    // Do not continue if there are no steps.
    if (!DOM.steps.length) return;

    // Create steps.
    this._steps = [];
    Util.forEach(DOM.steps, (i, el) => {
      this._steps.push(new Step(this, el, (i + 1)));
      this._duration += parseInt(el.dataset.duration);
    });

    // Init router.
    this._router = new Router(this);

    // Init toolbar.
    if (this._config.toolbar) {
      this._toolbar = new Toolbar(this);
    }
  }

  // Public

  get steps() {
    return this._steps;
  }

  get duration() {
    return this._duration;
  }

  get router() {
    return this._router;
  }

  get currentStepIndex() {
    return this._currentStepIndex || null;
  }

  getConfig(name) {
    return this._config[name];
  }

  /**
   * Make the given step active.
   * @param index
   */
  setActiveStep(index) {
    const nextStep = this._getStep(index);

    // Remove deselected class from all steps.
    Util.forEach(document.querySelectorAll(Selector.STEP_DESELECTED), (i, elem) => {
      elem.classList.remove(ClassName.STEP_DESELECTED);
    });

    DOM.stepsWrapper.classList.remove(
      `${ClassName.STEPS_WRAPPER}--${Direction.BACKWARD}`,
      `${ClassName.STEPS_WRAPPER}--${Direction.FORWARD}`
    );

    // Hide active/old step if there is one and show the new one.
    if (this.currentStepIndex) {
      const direction = (this._currentStepIndex > nextStep.index) ? Direction.BACKWARD : Direction.FORWARD;
      DOM.stepsWrapper.classList.add(`${ClassName.STEPS_WRAPPER}--${direction}`);
      this._getStep(this.currentStepIndex).hide();
    }
    nextStep.show();
    this._currentStepIndex = index;

    if (this._toolbar) {
      this._toolbar.updateRemainingMinutes();
    }
  }

  // Private

  /**
   * Find and return the given step.
   *
   * @param index - The step number.
   * @returns {*}
   */
  _getStep(index) {
    return this._steps.find(s => {
      return (s.index === parseInt(index));
    });
  }

  /**
   * Setup and cache StepsJS DOM elements
   * @param element {element} - The StepJS element
   * @private
   */
  _setupDOM(element ) {
    DOM.stepsjs = element;

    // Create a wrapper for the steps.
    DOM.stepsjs.innerHTML = `
        <section class="${ClassName.STEPS_WRAPPER}">
            ${DOM.stepsjs.innerHTML}
        </section>
    `;

    DOM.stepsWrapper = DOM.stepsjs.querySelector(Selector.STEPS_WRAPPER);
    DOM.steps = DOM.stepsjs.querySelectorAll(Selector.STEPS);
  }
}

// Init steps when DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  new StepsJS(document.querySelector(Selector.STEPSJS));
});



