import Util from "./util";
import {DOM, ClassName, Selector, Direction, EventName} from "./global";
import Toolbar from "./toolbar";
import Router from "./router";
import Step from "./step";

/**
 * Tutorial default options.
 *
 * @type {*}
 */
const Default = {

  // The selected step.
  selected: 1,

  // Pagination text.
  prevText: 'Previous',
  nextText: 'Next',

  // Whether to display the arrows.
  timeRemaining: true,

  // Time remaining text.
  timeRemainingText: '@MINUTES min left', // @MINUTES gets replaced with actual minutes

  // Whether to display the arrows.
  pagination: true,

};

class StepsJS {

  constructor() {
    this._element = null;
    this._duration = 0;
    this._currentStepIndex = 0;
    this._minRemaining = 0;
    this._initialized = false;
  }

  // Public

  initialize(element) {

    if (!element) {
      throw new Error('Cannot initialize StepsJS on undefined element.');
    }

    if (this._initialized) {
      return;
    }

    Util.dispatchEvent(element, EventName.INITIALIZE, null);
    this._element = element;

    const options = Object.assign(Default, element.dataset),
      titleElem = element.querySelector(`h1`),
      title = (titleElem) ? titleElem.innerHTML : '';

    // Remove title as it will be added to the toolbar.
    if (titleElem) {
      titleElem.remove();
    }

    // Create steps config object.
    this._config = {
      title:             title,
      selected:          parseInt(options.selected),
      pagination:        Util.toBoolean(options.pagination),
      prevText:          options.prevText,
      nextText:          options.nextText,
      timeRemainingText: options.timeRemainingText,
      timeRemaining:     Util.toBoolean(options.timeRemaining),
    };

    this._setupDOM();

    // Do not continue if there are no steps.
    if (!DOM.steps.length) return;

    // Create steps.
    this._steps = [];
    let step;
    Util.forEach(DOM.steps, (i, el) => {
      step = new Step(this, el, (i + 1));
      this._steps.push(step);
      this._duration += parseInt(step.duration);
    });

    // Init router.
    this._router = new Router(this);

    // Init toolbar.
    this._toolbar = new Toolbar(this);

    Util.dispatchEvent(element, EventName.INITIALIZED, null);
    this._initialized = true;
  }

  getConfig(name) {
    return this._config[name];
  }

  get steps() {
    return this._steps;
  }

  get duration() {
    return this._duration;
  }

  get minRemaining() {
    let minRemaining = this._duration;
    Util.forEach(this._steps, (i, step) => {
      if (step.index < this._currentStepIndex) {
        minRemaining -= parseInt(step.duration);
      }
    });
    return minRemaining;
  }

  get router() {
    return this._router;
  }

  get currentStepIndex() {
    return this._currentStepIndex || null;
  }

  get element () {
    return this._element;
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
    let direction;
    if (this.currentStepIndex) {
      direction = (this._currentStepIndex > nextStep.index) ? Direction.BACKWARD : Direction.FORWARD;
      DOM.stepsWrapper.classList.add(`${ClassName.STEPS_WRAPPER}--${direction}`);
      this._getStep(this.currentStepIndex).hide(direction);
    }
    nextStep.show(direction);
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
   * @private
   */
  _setupDOM() {

    // Cache element.
    DOM.stepsjs = this._element;
    DOM.stepsjs.classList.add(ClassName.STEPSJS);

    // Create a wrapper for the steps.
    DOM.stepsjs.innerHTML = `
        <div class="${ClassName.STEPS_WRAPPER}">
            ${DOM.stepsjs.innerHTML}
        </div>
    `;

    DOM.stepsWrapper = DOM.stepsjs.querySelector(Selector.STEPS_WRAPPER);
    DOM.steps = DOM.stepsjs.querySelectorAll(Selector.STEPS);
  }
}

window.StepsJS = new StepsJS();

// Init steps when DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  const elem = document.querySelector(Selector.STEPSJS);
  if (elem) {
    window.StepsJS.initialize(elem)
  }
});



