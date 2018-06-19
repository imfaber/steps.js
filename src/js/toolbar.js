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
    const header = htmlElement(`
      <header class="${CSS_CLASSES.header}">
        <h1>${root.tutorial.title}</h1>
        <div class="${CSS_CLASSES.timeRemaining}"><span></span></div>
      </header>  
    `);

    root.dom.tutorial.insertBefore(header, root.dom.nav);
    root.dom.minRemaining = root.dom.tutorial.querySelector(DOM_SELECTORS.timeRemaining);
    this.updateRemainingMinutes();
  }
}


