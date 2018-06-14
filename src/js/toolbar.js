import {DOM_SELECTORS, CSS_CLASSES, root} from "./config";
import htmlElement from "./utils/createElementFromHTML";

export default class Toolbar {

  constructor() {
    // Create nav.
    this.attachToolbar();

  }

  updateRemainingMinutes () {
    root.dom.minRemaining.innerHTML = `${root.tutorial.minRemaining} min remaining`;
  }

  attachToolbar () {
    const timeRemaining = htmlElement(`
      <header>
        <h3>${root.tutorial.title}</h3>
        <div class="${CSS_CLASSES.timeRemaining}"><span></span></div>
      </header>  
    `);

    root.dom.stepsWrapper.insertBefore(timeRemaining, root.dom.steps[0]);
    root.dom.minRemaining = root.dom.tutorial.querySelector(DOM_SELECTORS.timeRemaining);
    this.updateRemainingMinutes();
  }
}


