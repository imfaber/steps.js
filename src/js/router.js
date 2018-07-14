import {DOM, ClassName, Selector} from "./global";
import Util from "./util";
import Template from "./template";

export default class Router {

  constructor(steps) {

    this._steps = steps;

    // Add path to routes.
    this._routes = steps.steps.map(r => {
      r.path = `step-${r.index}`;
      return r;
    });

    this._setupDOM();
    this._addEventListeners();
    this._goTo(this.getStepFromFragment(), true);
  }

  // Public

  get routes() {
    return this._routes;
  }

  // Private

  /**
   * Return the step number from the location hash
   * @returns {int}
   */
  getStepFromFragment() {

    let step = this._steps.getConfig('selected');

    if (!location.hash) {
      return step;
    }

    const stepFromFragment = parseInt(location.hash.split('#')[1].replace('step-', ''));
    if (Number.isInteger(stepFromFragment)) {
      return stepFromFragment;
    }

    return step;
  }


  // Private

  /**
   * Find route by step ID.
   * @param index
   * @returns {*}
   */
  _find(index) {
    return this._findBy({
      name:  'index',
      value: index,
    });
  }

  /**
   * Find route by parameter.
   * @param name
   * @param value
   * @returns {*|T}
   */
  _findBy({name, value}) {
    return this._routes.find(r => {
      return (r[name] === value);
    });
  }

  /**
   * Change the current route with the given one.
   * @param route route|string|number
   * @param skipFragmentUpdate Whether update or not the location hash
   */
  _goTo(route, skipFragmentUpdate) {

    if (typeof route === 'string' || typeof route === 'number') {
      route = this._find(route);
    }

    // If the path is old update it and exit as this function will run again.
    if (location.hash.split('#')[1] !== route.path && !skipFragmentUpdate) {
      location.hash = route.path;
      return;
    }

    // Set the current steps step.
    this._steps.setActiveStep(route.index);

    // Update nav items class names.
    DOM.navItems.forEach((elem) => {
      elem.classList.remove(ClassName.NAV_ITEM_SELECTED);

      // Completed.
      if (elem.dataset.id < route.index) {
        elem.classList.add(ClassName.NAV_ITEM_COMPLETED);
      }

      // Selected.
      else if (parseInt(elem.dataset.id) === route.index) {
        elem.classList.add(ClassName.NAV_ITEM_SELECTED);
        elem.classList.remove(ClassName.NAV_ITEM_COMPLETED);
      }

      // Others.
      else {
        elem.classList.remove(ClassName.NAV_ITEM_COMPLETED);
      }
    });

    // Update button states.
    if (DOM.buttonPrev) {
      DOM.buttonPrev.disabled = (route.index === 1);
    }
    if (DOM.buttonNext) {
      DOM.buttonNext.disabled = (route.index === this._routes.length);
    }
  }

  _addEventListeners() {

    // Listen for hash changes.
    window.addEventListener("hashchange", () => {
      const route = this._findBy({
        name:  'path',
        value: location.hash.split('#')[1],
      });

      this._goTo(route);
    });

  }

  /**
   * Create required DOM.
   * @private
   */
  _setupDOM() {
    // Create nav.
    this._attachNav();

    // Create pagination.
    if (this._steps.getConfig('pagination')) {
      this._attachPagination();
    }
  }

  /**
   * Attach nav to DOM.
   */
  _attachNav() {
    const navTemplate = Template.nav(this._routes),
      nav = Util.createElement(navTemplate);
    DOM.stepsjs.insertBefore(nav, DOM.stepsWrapper);
    DOM.nav = DOM.stepsjs.querySelector(Selector.NAV);
    DOM.navItems = DOM.nav.querySelectorAll('li');
  }

  /**
   * Attach pagination to DOM.
   */
  _attachPagination() {
    // Footer template.
    const prevTemplate = Template.paginationButtonPrev(this._steps.getConfig('prevText')),
     nextTemplate = Template.paginationButtonNext(this._steps.getConfig('nextText')),
     prev = Util.createElement(prevTemplate),
     next = Util.createElement(nextTemplate);

    // Append footer and cache button elements.
    DOM.stepsWrapper.appendChild(prev);
    DOM.stepsWrapper.appendChild(next);
    DOM.buttonPrev = DOM.stepsjs.querySelector(`.${ClassName.BUTTON}--prev`);
    DOM.buttonNext = DOM.stepsjs.querySelector(`.${ClassName.BUTTON}--next`);

    // Listen for clicks and updateCurrentRoute to step.
    DOM.buttonPrev.addEventListener("click", () => {
      const activeStepId = this.getStepFromFragment();
      if (activeStepId > 1) {
        this._goTo(activeStepId - 1);
      }
    });

    DOM.buttonNext.addEventListener("click", () => {
      const activeStepId = this.getStepFromFragment();
      if (activeStepId < this.routes.length) {
        this._goTo(activeStepId + 1);
      }
    });
  }

}



