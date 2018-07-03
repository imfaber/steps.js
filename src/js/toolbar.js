import Util from "./util";
import {DOM, Selector} from "./global";
import Template from "./template";

export default class Toolbar {

  constructor(tutorial) {
    this._tutorial = tutorial;
    this._minRemaining = tutorial.duration;
    this._setupDOM();
    this._addEventListeners();
  }

  // Public.

  updateRemainingMinutes() {
    this._minRemaining = this._tutorial.duration;
    Util.forEach(this._tutorial.steps, (i, step) => {
      if (step.index < this._tutorial.currentStepIndex) {
        this._minRemaining -= parseInt(step.duration);
      }
    });

    if (DOM.minRemaining) {
      DOM.minRemaining.innerHTML = this._tutorial.getConfig('timeRemainingText')
        .replace('MINUTES', this._minRemaining);
    }
  }

  // Private.

  _setupDOM() {
    const tutorialTitle = this._tutorial.getConfig('title');
    const header = Util.createElement(Template.toolbar(tutorialTitle));

    DOM.tutorial.insertBefore(header, DOM.nav);
    DOM.minRemaining = DOM.tutorial.querySelector(Selector.TIME_REMAINING);
    this.updateRemainingMinutes();

    DOM.overlayButton = DOM.tutorial.querySelector(Selector.OVERLAY_BUTTON);
  }

  _addEventListeners() {
    if (DOM.overlayButton) {
      DOM.overlayButton.addEventListener("click", () => {
        root.tutorial.toggleOverlay();
      });
    }
  }
}

