import Util from "./util";
import {DOM, ClassName, Selector, Direction, EventName} from "./global";
import Toolbar from "./toolbar";
import Router from "./router";
import Step from "./step";
import Overlay from "./overlay";

/**
 * Tutorial default options.
 *
 * @type {*}
 */
const Default = {

  // The title of the tutorial.
  title: '',

  // The selected step.
  selected: 1,

  // Whether to display the toolbar.
  toolbar: true,

  // Whether to display the arrows.
  pagination: true,

  // Whether allow overlay toggling.
  overlayToggle: false,

  // Whether the overlay is open by default
  overlayOpen: false,

  // Pagination text.
  prevText: 'Previous',
  nextText: 'Next',

  // Time remaining text
  timeRemainingText: 'MINUTES min remaining', // MINUTES gets replaced with actual minutes

  timeRemaining: true,

  // Last time the tutorial was updated
  lastUpdate: null,

  // The animation speed (steps transition, overlay etc..)
  animationSpeed: 600 // In milliseconds.

};

export default class Tutorial {

  constructor(element) {

    if (!element) {
      return;
    }

    Util.dispatchEvent(element, EventName.INITIALIZE, null);

    const options = Object.assign(Default, element.dataset);

    // Create tutorial config object.
    this._config = {
      title:             options.title,
      selected:          parseInt(options.selected),
      toolbar:           Util.toBoolean(options.toolbar),
      pagination:        Util.toBoolean(options.pagination),
      overlayToggle:     Util.toBoolean(options.overlayToggle),
      overlayOpen:       Util.toBoolean(options.overlayOpen),
      overlayAnimation:  Util.toBoolean(options.overlayAnimation),
      prevText:          options.prevText,
      nextText:          options.nextText,
      timeRemainingText: options.timeRemainingText,
      timeRemaining:     Util.toBoolean(options.timeRemaining),
      animationSpeed:    parseInt(options.animationSpeed),
    };

    this._duration = 0;
    this._currentStepIndex = 0;
    this._minRemaining = 0;

    // Cache tutorial DOM elements.
    DOM.tutorial = element;
    DOM.stepsWrapper = DOM.tutorial.querySelector(Selector.STEPS_WRAPPER);
    DOM.steps = DOM.tutorial.querySelectorAll(Selector.STEPS);

    // Do not continue if there are no steps.
    if (!DOM.steps.length) return;

    // Create steps.
    this._steps = [];
    Util.forEach(DOM.steps, (i, el) => {
      this._steps.push(new Step(this, el, (i + 1)));
      this._duration += parseInt(el.dataset.duration);
    });

    // Init router.
    this._router = new Router(this);

    // Init toolbar.
    if (this._config.toolbar) {
      this._toolbar = new Toolbar(this);
    }

    // Init overlay if toggling is enabled.
    if (this._config.overlayToggle) {
      this._overlay = new Overlay(this);
    }

  }

  // Public

  get steps() {
    return this._steps;
  }

  get duration() {
    return this._duration;
  }

  get router() {
    return this._router;
  }

  get currentStepIndex() {
    return this._currentStepIndex || null;
  }

  getConfig(name) {
    return this._config[name];
  }

  /**
   * Make the given step active.
   * @param index
   */
  setActiveStep(index) {
    const nextStep = this._getStep(index);

    // Remove deselected class from all steps.
    Util.forEach(document.querySelectorAll(Selector.DESELECTED_STEP), (i, elem) => {
      elem.classList.remove(ClassName.DESELECTED_STEP);
    });

    let direction;

    // Hide active/old step if there is one and show the new one.
    if (this.currentStepIndex) {
      direction = (this._currentStepIndex > nextStep.index) ? Direction.BACKWARD : Direction.FORWARD;
      this._getStep(this.currentStepIndex).hide(direction);
    }
    nextStep.show(direction);
    this._currentStepIndex = index;

    if (this._toolbar) {
      this._toolbar.updateRemainingMinutes();
    }
  }

  // Private

  /**
   * Find and return the given step.
   *
   * @param index - The step number.
   * @returns {*}
   */
  _getStep(index) {
    return this._steps.find(s => {
      return (s.index === parseInt(index));
    });
  }


  // /**
  //  * Toggle overlay.
  //  *
  //  * @todo this function is responsable of opening and closing the
  //  * overlay with a zoom effect. At the moment is a bit of a mess
  //  * and would need some refactoring.
  //  */
  // toggleOverlay() {
  //   const body = document.querySelector('body'),
  //     tutorialContainer = DOM.tutorialContainer;
  //
  //   // If overlay is true close it else open it.
  //   if (this.overlay) {
  //     tutorialContainer.classList.remove(CSS_CLASSES.overlay);
  //     body.classList.remove(CSS_CLASSES.noScroll);
  //     this.setContainerNaturalSize(() => {
  //       document.documentElement.scrollTop = body.dataset.lastScrollTop;
  //       // Restore old style after animation is completed.
  //       setTimeout(() => {
  //         document.querySelector(`.${CSS_CLASSES.container}--clone`).remove();
  //         tutorialContainer.style.transition = null;
  //         tutorialContainer.style.position = `relative`;
  //         tutorialContainer.style.top = `${tutorialContainer.dataset.top}`;
  //         tutorialContainer.style.left = `${tutorialContainer.dataset.left}`;
  //         tutorialContainer.style.width = null;
  //         tutorialContainer.style.height = null;
  //       }, this.animationSpeed);
  //     });
  //
  //   }
  //
  //   // Open overlay.
  //   else {
  //
  //     // Store current position in dataset so we can restore it when the overlay gets closed.
  //     const computedStyle = window.getComputedStyle(tutorialContainer, null);
  //     tutorialContainer.dataset.top = computedStyle.getPropertyValue("top");
  //     tutorialContainer.dataset.left = computedStyle.getPropertyValue("left");
  //
  //     // Set container natural size so we can animate the overlay
  //     this.setContainerNaturalSize(() => {
  //
  //       // Store last scroll top position.
  //       body.dataset.lastScrollTop = document.documentElement.scrollTop;
  //
  //       // Retrieve the position of the container in the viewport.
  //       const viewportOffset = tutorialContainer.getBoundingClientRect();
  //
  //       // Create a container clone to use as hidden placeholder.
  //       // This prevent the rest of the content to move when the container
  //       // changes to position fixed.
  //       const containerClone = tutorialContainer.cloneNode(true);
  //       containerClone.style.visibility = 'hidden';
  //       containerClone.classList.remove(CSS_CLASSES.container);
  //       containerClone.classList.add(`${CSS_CLASSES.container}--clone`);
  //       tutorialContainer.parentNode.insertBefore(containerClone, tutorialContainer);
  //
  //       // Set the position in the viewport so the container doesn't move when
  //       // it changes to position fixed.
  //       tutorialContainer.style.position = `fixed`;
  //       tutorialContainer.style.top = `${viewportOffset.top}px`;
  //       tutorialContainer.style.left = `${viewportOffset.left}px`;
  //
  //       // Open the overlay and disable body scroll.
  //       setTimeout(() => {
  //         tutorialContainer.style.transition = `all ${this.animationSpeed / 1000}s ease`;
  //         tutorialContainer.classList.add(CSS_CLASSES.overlay);
  //         setTimeout(() => body.classList.add(CSS_CLASSES.noScroll), this.animationSpeed);
  //       }, 100);
  //     });
  //   }
  //   this.overlay = !this.overlay;
  // }

  // /**
  //  * Toggle overlay.
  //  */
  // toggleOverlay() {
  //   const body = document.body;
  //
  //   // If overlay is true close it else open it.
  //   if (this.overlayOpen) {
  //     body.classList.remove(CSS_CLASSES.noScroll);
  //     body.classList.remove(`${CSS_CLASSES.overlay}-open`);
  //   }
  //   else {
  //     body.classList.add(CSS_CLASSES.noScroll);
  //     body.classList.add(`${CSS_CLASSES.overlay}-open`);
  //   }
  //
  //   this.overlayOpen = !this.overlayOpen;
  //
  // }


  /**
   * Get natural size of the tutorial container.
   * By natural size we mean the size in its static/relative position (not overlay).
   */
  geSize() {
    const clone = DOM.tutorial.cloneNode(true);
    clone.style.position = 'relative';
    clone.style.width = `auto`;
    clone.style.height = `auto`;
    DOM.tutorial.parentNode.insertBefore(clone, container);
    const size = {
      width: clone.offsetWidth,
      height: clone.offsetHeight,
    };
    clone.remove();
    return size;
  }

}

