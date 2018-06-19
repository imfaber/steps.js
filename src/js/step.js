import {DOM_SELECTORS, CSS_CLASSES, root} from "./config";

export default class Step {

  constructor(options) {

    // Merge with default values.
    options = Object.assign({
      label:    '',
      step:     0,
      duration: 0,
    }, options);

    this.label = options.label;
    this.step = parseInt(options.step);
    this.duration = parseInt(options.duration);

    // Cache DOM element
    this.domElement = document.querySelector(`${DOM_SELECTORS.steps}[data-step="${this.step}"]`);

  }


  /**
   * Enable the step by setting the active classes.
   */
  enable() {
    this.domElement.classList.add(CSS_CLASSES.stepSelected);
    root.dom.nav
      .querySelector(`li[data-id="${this.step}"]`)
      .classList.add(CSS_CLASSES.navItemSelected);
  }

}


