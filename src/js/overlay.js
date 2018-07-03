import {DOM, ClassName, Selector} from "./global";
import Util from "./util";

export default class Overlay {

  constructor(tutorial) {
    this._tutorial = tutorial;
    this._isOpen = tutorial.getConfig('overlayOpen');


    DOM.overlayBackdrop = append(document.body, `<div class="${ClassName.OVERLAY_BACKDROP}" />`);
    let overlay = DOM.tutorial.cloneNode(true);
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('tabindex', '-1');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.add(CSS_CLASSES.overlay);
    if (this.overlayAnimation) {
      overlay.classList.add(CSS_CLASSES.animation);
      DOM.overlayBackdrop.classList.add(CSS_CLASSES.animation);
    }
    DOM.overlay = document.body.appendChild(overlay);

  }

  toggle() {
    return this._isOpen ? this.close() : this.open();
  }

  open() {
    if (this._isTransitioning || this._isOpen) {
      return
    }

    const body = document.body;
    body.classList.add(CSS_CLASSES.noScroll);
    body.classList.add(`${CSS_CLASSES.overlay}-open`);
    this.overlayOpen = true;
  }


  close() {
    const body = document.body;
    body.classList.remove(CSS_CLASSES.noScroll);
    body.classList.remove(`${CSS_CLASSES.overlay}-open`);
    this.overlayOpen = true;
  }

}

