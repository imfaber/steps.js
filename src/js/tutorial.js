import toBoolean from "./utils/toBoolean";
import Step from "./step";
import Toolbar from "./toolbar";
import Router from "./router";
import {TUTORIAL_DEFAULT_OPTIONS, DOM_SELECTORS, CSS_CLASSES, root} from "./config";

export default class Tutorial {

  constructor(options) {

    options = Object.assign(TUTORIAL_DEFAULT_OPTIONS, options);

    // Set tutorial properies.
    this.title = options.title;
    this.selected = parseInt(options.selected);
    this.toolbar = toBoolean(options.toolbar);
    this.pagination = toBoolean(options.pagination);
    this.overlay = toBoolean(options.overlay);
    this.prevText = options.prevText;
    this.nextText = options.nextText;
    this.animationSpeed = parseInt(options.animationSpeed);
    this.duration = 0;
    this.minRemaining = 0;

    // Cache tutorial DOM elements.
    root.dom = {};
    root.dom.tutorial = document.querySelector(DOM_SELECTORS.tutorialWrapper);
    root.dom.stepsWrapper = root.dom.tutorial.querySelector(DOM_SELECTORS.stepsWrapper);
    if (root.dom.stepsWrapper) {
      root.dom.steps = root.dom.stepsWrapper.querySelectorAll(DOM_SELECTORS.steps);
    }


    // Add a wrapper useful for overlay
    root.dom.tutorialContainer = document.createElement('div');
    root.dom.tutorialContainer.classList.add(CSS_CLASSES.container);
    root.dom.tutorial.parentNode.insertBefore(root.dom.tutorialContainer, root.dom.tutorial);
    root.dom.tutorialContainer.appendChild(root.dom.tutorial);

    // Cache tutorial.
    root.tutorial = this;

    // Do not continue if there are no steps.
    if (!Tutorial.hasSteps()) return;

    // Create steps.
    this.steps = [];
    for (let i = 0; i < root.dom.steps.length; ++i) {
      root.dom.steps[i].dataset.id = `tutorial-js-step-${i}`;
      this.steps.push(new Step(root.dom.steps[i].dataset));
      this.duration += this.steps[i].duration;
    }

    // Init router.
    root.router = new Router();

    // Init toolbar
    if (this.toolbar) {
      root.toolbar = new Toolbar();
    }
  }

  /**
   * Find and return the given step.
   *
   * @param stepNumber
   * @returns {*}
   */
  getStep(stepNumber) {
    return this.steps.find(s => {
      return (s.step === parseInt(stepNumber));
    });
  }

  /**
   * Return the selected step.
   * @returns {*}
   */
  getSelectedStep() {
    return this.getStep(this.selected)
  }

  /**
   * Check whether the tutorial has steps.
   *
   * @returns {boolean}
   */
  static hasSteps() {
    return typeof root.dom.steps !== 'undefined';
  }

  /**
   * Set the given step as active.
   * @param id
   */
  setActiveStep(id) {

    const activeStep = root.dom.stepsWrapper.querySelector(`.${CSS_CLASSES.stepSelected}`);
    let from = null;

    //  Remove 'active' class from current step.
    if (activeStep) {
      from = activeStep.dataset.step;
      activeStep.classList.remove(CSS_CLASSES.stepSelected);
    }

    // Activate new step.
    this.getStep(id).enable();

    Tutorial.makeStepsTransition(from, id);
    Toolbar.updateRemainingMinutes();

  }

  /**
   * Set right transition classes to each step depending whether
   * the step is before or after the current one.
   */
  static makeStepsTransition(from, to) {
    from = parseInt(from) || null;
    to = parseInt(to)
    let toNode = null;

    // Add the transition class.
    for (let i = 0; i < root.dom.steps.length; ++i) {
      const step = root.dom.steps[i];
      step.classList.remove(
        CSS_CLASSES.stepTransitionBackward,
        CSS_CLASSES.stepTransitionForward,
        CSS_CLASSES.stepTransitionIn,
        CSS_CLASSES.stepTransitionOut
      );

      // From
      if (parseInt(step.dataset.step) === from) {
        if (from < to) {
          step.classList.add(CSS_CLASSES.stepTransitionBackward);
        }
        else {
          step.classList.add(CSS_CLASSES.stepTransitionForward);
        }
        step.classList.add(CSS_CLASSES.stepTransitionOut);
      }

      // To
      if (parseInt(step.dataset.step) === to && from) {
        toNode = step;
        if (from < to) {
          step.classList.add(CSS_CLASSES.stepTransitionBackward);
        }
        else {
          step.classList.add(CSS_CLASSES.stepTransitionForward);
        }

        setTimeout(() => step.classList.add(CSS_CLASSES.stepTransitionIn), 100);
      }
    }
  }

  /**
   * Toggle overlay.
   *
   * @todo this function is responsable of opening and closing the
   * overlay with a zoom effect. At the moment is a bit of a mess
   * and would need some refactoring.
   */
  toggleOverlay() {
    const body = document.querySelector('body'),
      tutorialContainer = root.dom.tutorialContainer;

    // If overlay is true close it else open it.
    if (this.overlay) {
      tutorialContainer.classList.remove(CSS_CLASSES.overlay);
      body.classList.remove(CSS_CLASSES.noScroll);
      this.setContainerNaturalSize(() => {
        document.documentElement.scrollTop = body.dataset.lastScrollTop;
        // Restore old style after animation is completed.
        setTimeout(() => {
          document.querySelector(`.${CSS_CLASSES.container}--clone`).remove();
          tutorialContainer.style.transition = null;
          tutorialContainer.style.position = `relative`;
          tutorialContainer.style.top = `${tutorialContainer.dataset.top}`;
          tutorialContainer.style.left = `${tutorialContainer.dataset.left}`;
          tutorialContainer.style.width = null;
          tutorialContainer.style.height = null;
        }, this.animationSpeed);
      });

    }

    // Open overlay.
    else {

      // Store current position in dataset so we can restore it when the overlay gets closed.
      const computedStyle = window.getComputedStyle(tutorialContainer, null);
      tutorialContainer.dataset.top = computedStyle.getPropertyValue("top");
      tutorialContainer.dataset.left = computedStyle.getPropertyValue("left");

      // Set container natural size so we can animate the overlay
      this.setContainerNaturalSize(() => {

        // Store last scroll top position.
        body.dataset.lastScrollTop = document.documentElement.scrollTop;

        // Retrieve the position of the container in the viewport.
        const viewportOffset = tutorialContainer.getBoundingClientRect();

        // Create a container clone to use as hidden placeholder.
        // This prevent the rest of the content to move when the container
        // changes to position fixed.
        const containerClone = tutorialContainer.cloneNode(true);
        containerClone.style.visibility = 'hidden';
        containerClone.classList.remove(CSS_CLASSES.container);
        containerClone.classList.add(`${CSS_CLASSES.container}--clone`);
        tutorialContainer.parentNode.insertBefore(containerClone, tutorialContainer);

        // Set the position in the viewport so the container doesn't move when
        // it changes to position fixed.
        tutorialContainer.style.position = `fixed`;
        tutorialContainer.style.top = `${viewportOffset.top}px`;
        tutorialContainer.style.left = `${viewportOffset.left}px`;

        // Open the overlay and disable body scroll.
        setTimeout(() => {
          tutorialContainer.style.transition = `all ${this.animationSpeed / 1000}s ease`;
          tutorialContainer.classList.add(CSS_CLASSES.overlay);
          setTimeout(() => body.classList.add(CSS_CLASSES.noScroll), this.animationSpeed);
        }, 100);
      });
    }
    this.overlay = !this.overlay;
  }

  /**
   * Return the remaining minutes to complete the tutorial.
   * @returns {number|*}
   */
  getRemainingMinutes() {
    let minRemaining = this.duration,
      stepElem = null;

    for (let i = 0; i < root.dom.steps.length; i++) {
      stepElem = root.dom.steps[i];
      if (stepElem.dataset.step < Router.getStepFromHash()) {
        minRemaining -= parseInt(stepElem.dataset.duration);
      }
    }
    return minRemaining;
  }

  /**
   * Set natural size of the container.
   * By natural size we mean the size in its static/relative position.
   * @param callback
   */
  setContainerNaturalSize(callback) {
    const container = root.dom.tutorialContainer;
    let w, h;

    // If overlay is on lets create a clone to get the size from.
    if (this.overlay) {
      const clone = container.cloneNode(true);
      clone.style.position = 'relative';
      clone.style.width = `auto`;
      clone.style.height = `auto`;
      container.parentNode.insertBefore(clone, container);
      w = clone.offsetWidth;
      h = clone.offsetHeight;
      clone.remove();
    }
    else {
      container.style.width = `auto`;
      container.style.height = `auto`;
      setTimeout(() => {
        w = container.offsetWidth;
        h = container.offsetHeight;
      }, 1);
    }

    // Set the container size.
    setTimeout(() => {
      container.style.width = `${w}px`;
      container.style.height = `${h}px`;
      if (callback) {
        setTimeout(() => callback(), 1);
      }
    }, 2);
  }
};
