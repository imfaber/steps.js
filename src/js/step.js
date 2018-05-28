import {DOM_SELECTORS, root} from "./config";

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
}


