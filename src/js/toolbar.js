import Util from "./util";
import {DOM, Selector} from "./global";
import Template from "./template";

export default class Toolbar {

  constructor(steps) {
    this._steps = steps;
    this._minRemaining = steps.duration;
    this._setupDOM();
    this._addEventListeners();
  }

  // Public.

  updateRemainingMinutes() {
    this._minRemaining = this._steps.duration;
    Util.forEach(this._steps.steps, (i, step) => {
      if (step.index < this._steps.currentStepIndex) {
        this._minRemaining -= parseInt(step.duration);
      }
    });

    if (DOM.minRemaining) {
      DOM.minRemaining.innerHTML = this._steps.getConfig('timeRemainingText')
        .replace('MINUTES', this._minRemaining);
    }
  }

  // Private.

  _setupDOM() {
    const stepsTitle = this._steps.getConfig('title');
    const header = Util.createElement(Template.toolbar(stepsTitle));

    DOM.stepsjs.insertBefore(header, DOM.nav);
    DOM.minRemaining = DOM.stepsjs.querySelector(Selector.TIME_REMAINING);
    this.updateRemainingMinutes();

    DOM.overlayButton = DOM.stepsjs.querySelector(Selector.OVERLAY_BUTTON);
  }

  _addEventListeners() {

  }
}

