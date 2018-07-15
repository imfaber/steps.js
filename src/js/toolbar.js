import Util from "./util";
import {DOM, Selector, ClassName} from "./global";
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
        .replace('@MINUTES', this._minRemaining);
    }
  }

  // Private.

  _setupDOM() {
    const header = Util.createElement(Template.header());

    // Add title.
    const stepsTitle = this._steps.getConfig('title');
    if (stepsTitle) {
      Util.appendHTML(header, `<h1 title="${stepsTitle}">${stepsTitle}</h1>`);
    }

    // Add time left.
    if (this._steps.getConfig('timeRemaining')) {
      Util.appendHTML(header, `
        <div class="${ClassName.TIME_REMAINING}">
            ${Template.SVGIcon('clock')}
            <span></span>
        </div>
      `);
    }

    DOM.stepsjs.insertBefore(header, DOM.nav);
    DOM.minRemaining = DOM.stepsjs.querySelector(`${Selector.TIME_REMAINING} span`);
    this.updateRemainingMinutes();
  }

  _addEventListeners() {

  }
}

