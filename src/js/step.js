import {DOM, ClassName, EventName} from "./global";
import Util from "./util";

/**
 * Step default options.
 * @type {*}
 */
const Default = {
  label:    '',
  duration: 0,
};

export default class Step {

  constructor(steps, element, index) {

    if (!element) {
      return;
    }

    // Merge with default values.
    const options = Object.assign(Default, element.dataset);

    this._steps = steps;
    this._index = parseInt(index);
    this._dom = element;
    this._label = options.label;
    this._duration = parseInt(options.duration);

    this._setHiddenAttribute(true);
  }

  // Public

  get index() {
    return this._index;
  }

  get duration() {
    return this._duration;
  }

  get label() {
    return this._label;
  }


  /**
   * Enable the step by setting the active classes.
   */
  show(direction) {
    const eventDetail = {
      step: this._dom,
      direction: direction
    };
    this._setHiddenAttribute(false);

    Util.dispatchEvent(DOM.stepsjs, `${EventName.SHOW}.step`, eventDetail);
    setTimeout(() => {
    }, (this._steps.getConfig('overlay')) ? this._steps.getConfig('animationSpeed') : 0);

    this._dom.classList.add(ClassName.STEP_SELECTED);
    this._dom.classList.remove(ClassName.STEP_DESELECTED);

    DOM.nav
      .querySelector(`li[data-id="${this.index}"]`)
      .classList.add(ClassName.NAV_ITEM_SELECTED);

    setTimeout(() => {
      Util.dispatchEvent(DOM.stepsjs, `${EventName.SHOWN}.step`, eventDetail);
    }, (this._steps.getConfig('overlay')) ? this._steps.getConfig('animationSpeed') : 0);
  }

  /**
   * Hide the step.
   */
  hide(direction) {

    const eventDetail = {
      step: this._dom,
      direction: direction
    };

    Util.dispatchEvent(DOM.stepsjs, `${EventName.HIDE}.step`, eventDetail);
    this._dom.classList.add(ClassName.STEP_DESELECTED);
    this._dom.classList.remove(ClassName.STEP_SELECTED);

    setTimeout(() => {
      this._setHiddenAttribute(true);
      Util.dispatchEvent(DOM.stepsjs, `${EventName.HIDDEN}.step`, eventDetail);
    }, (this._steps.getConfig('overlay')) ? this._steps.getConfig('animationSpeed') : 0);
  }

  /**
   * Set the hidden attribute to the step.
   * @param value
   */
  _setHiddenAttribute(value) {
    this._dom.hidden = value;
    this._dom.setAttribute('aria-hidden', value);
  }

  // removeTransitionClasses () {
  //   this._dom.classList.remove(
  //     ClassName.stepTransitionBackward,
  //     ClassName.stepTransitionForward,
  //     ClassName.stepTransitionIn,
  //     ClassName.stepTransitionOut
  //   );
  // }
}


