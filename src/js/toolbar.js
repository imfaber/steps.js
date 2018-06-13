import {DOM_SELECTORS, root} from "./config";
import htmlElement from "./utils/createElementFromHTML";

export default class Toolbar {

  constructor() {
    // Create nav.
    this.attachToolbar();
  }

  getRemainingTime () {
    
  }

  attachToolbar () {
    const timeReamining = htmlElement(`
      <header>
        <h3>${this.title}</h3>
        <div class="tutorial-js__time-remaining"><span></span></div>
      </header>  
    `);

    root.dom.stepsWrapper.insertBefore(timeReamining, root.dom.steps[0]);
    root.dom.timeRemaining = root.dom.tutorial.querySelector(DOM_SELECTORS.timeRemaining);
  }
}


