import Util from "./util";
import {DOM, Selector, ClassName, EventName} from "./global";
import Template from "./template";

export default class Toolbar {

  constructor(stepsjs) {
    this._stepsjs = stepsjs;
    this._setupDOM();
    this._addEventListeners();
  }

  // Public.

  updateRemainingMinutes() {
    const minRemaining = this._stepsjs.minRemaining;

    if (DOM.minRemaining) {
      DOM.minRemaining.innerHTML = this._stepsjs.getConfig('timeRemainingText')
        .replace('@MINUTES',  minRemaining);
    }

    Util.dispatchEvent(DOM.stepsjs, `${EventName.CHANGED}.minRemaining`, {minRemaining: minRemaining});
  }

  // Private.

  _setupDOM() {
    const header = Util.createElement(Template.header());

    // Add title.
    const stepsTitle = this._stepsjs.getConfig('title');
    Util.appendHTML(header, `<h1 title="${stepsTitle}">${stepsTitle}</h1>`);

    // Add time left.
    if (this._stepsjs.getConfig('timeRemaining')) {
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

