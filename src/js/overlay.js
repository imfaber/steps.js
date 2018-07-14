import {DOM, ClassName, Selector} from "./global";
import Util from "./util";

export default class Overlay {

  constructor(tutorial) {
    this._tutorial = tutorial;
    this._isOpen = tutorial.getConfig('overlayOpen');




  }

  // Public

  toggle() {
    return this._isOpen ? this.close() : this.open();
  }

  open() {
    if (this._isTransitioning || this._isOpen) {
      return
    }
    
    const size = this._tutorial.geSize();
    DOM.tutorial.style.width = `${size.width}px`;
    DOM.tutorial.style.height = `${size.height}px`;

    const body = document.body;
    body.classList.add(CSS_CLASSES.noScroll);
    body.classList.add(`${CSS_CLASSES.overlay}-open`);
    this.overlayOpen = true;
  }

  // Private

  close() {
    const body = document.body;
    body.classList.remove(CSS_CLASSES.noScroll);
    body.classList.remove(`${CSS_CLASSES.overlay}-open`);
    this.overlayOpen = true;
  }

  _setupDOM () {
    DOM.overlayBackdrop = Util.appendHTML(document.body, `<div class="${ClassName.OVERLAY_BACKDROP}" />`);

  }

}

