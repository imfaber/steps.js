import {DOM_SELECTORS, CSS_CLASSES, root} from "./config";
import htmlElement from "./utils/createElementFromHTML";

export default class Router {

  constructor() {

    // Add path to routes.
    this.routes = root.tutorial.steps.map(r => {
      r.path = `step-${r.step}`;
      return r;
    });

    // Create nav.
    this.attachNav();

    // Create pagination.
    if (root.tutorial.pagination) {
      this.attachPagination();
    }

    // Listen for hash changes.
    window.addEventListener("hashchange", () => {
      const route = this.findBy({
        name:  'path',
        value: location.hash.split('#')[1],
      });

      this.goTo(route);
    });

    // Init route
    const currentStep = Router.getStepFromHash();

    if (currentStep && this.find(currentStep)) {
      this.goTo(currentStep);
    }
    else {
      this.goTo(root.tutorial.selected);
    }
  }

  /**
   * Return the step number from the location hash
   * @returns {int|null}
   */
  static getStepFromHash() {

    if (!location.hash) {
      return null;
    }

    const step = parseInt(location.hash.split('#')[1].replace('step-', ''));
    if (Number.isInteger(step)) {
      return step;
    }
    return null;
  }

  /**
   * Find route by step ID.
   * @param id
   * @returns {*}
   */
  find(id) {
    return this.findBy({
      name:  'step',
      value: id,
    });
  }

  /**
   * Find route by parameter.
   * @param name
   * @param value
   * @returns {*|T}
   */
  findBy({name, value}) {
    return this.routes.find(r => {
      return (r[name] === value);
    });
  }

  /**
   * Deternmine whether the given route is valid.
   *
   * @param route
   * @returns boolean
   */
  static isValid(route){
    return (
      route
      && typeof route === 'object'
      && route.hasOwnProperty('path')
      && route.hasOwnProperty('step')
    );
  }

  /**
   * Change the current route with the given one.
   * @param route route|string|number
   */
  goTo(route) {

    if (typeof route === 'string' || typeof route === 'number') {
      route = this.find(route);
    }

    if (Router.isValid(route)) {

      // If the path is old update it and exit as this function will run again.
      if (location.hash.split('#')[1] !== route.path) {
        location.hash = route.path;
        return;
      }

      // Set the current tutorial step.
      root.tutorial.setActiveStep(route.step);

      // Update nav items.
      // First we remove the active class from the old item.
      const activeNavItem = root.dom.nav.querySelector(`.${CSS_CLASSES.navItemSelected}`);
      if (activeNavItem) {
        activeNavItem
          .classList.remove(CSS_CLASSES.navItemSelected);
      }

      // Then we loop all the items to add or remove the 'completed' class on each one.
      root.dom.navItems.forEach((elem) => {
        if (elem.dataset.id < route.step) {
          elem.classList.add(CSS_CLASSES.navItemCompleted);
        }
        else {
          elem.classList.remove(CSS_CLASSES.navItemCompleted);
        }
      });

      // Update button states.
      if (root.dom.buttonPrev) {
        root.dom.buttonPrev.disabled = (route.step === 1);
      }
      if (root.dom.buttonNext) {
        root.dom.buttonNext.disabled = (route.step === this.routes.length);
      }
    }
  }



  /**
   * Attach nav to DOM.
   */
  attachNav() {
    const aside = htmlElement(`
       <aside class="${DOM_SELECTORS.nav.replace('.', '')}">
          <nav>
             <ul>
                ${this.routes.map(route => `
                   <li class="tutorial-js-nav__item" data-id="${route.step}">
                      <a href="#${route.path}">
                          <i>${route.step}</i>
                          <span>${route.label}</span>
                      </a>
                   </li>
                `).join('')}
             </ul>
          </nav>
       </aside>
    `);

    root.dom.tutorial.insertBefore(aside, root.dom.stepsWrapper);
    root.dom.nav = root.dom.tutorial.querySelector(DOM_SELECTORS.nav);
    root.dom.navItems = root.dom.nav.querySelectorAll('li');
  }

  /**
   * Attach pagination to DOM.
   */
  attachPagination() {
    // Footer template.
    const prev = htmlElement(`
        <button class="${CSS_CLASSES.button} ${CSS_CLASSES.button}--prev">
            <span>${root.tutorial.prevText}</span>
        </button>
    `);
    const next = htmlElement(`
        <button class="${CSS_CLASSES.button} ${CSS_CLASSES.button}--next">
            <span>${root.tutorial.nextText}</span>
        </button>
    `);

    // Append footer and cache button elements.
    root.dom.stepsWrapper.appendChild(prev);
    root.dom.stepsWrapper.appendChild(next);
    root.dom.buttonPrev = root.dom.tutorial.querySelector(`.${CSS_CLASSES.button}--prev`);
    root.dom.buttonNext = root.dom.tutorial.querySelector(`.${CSS_CLASSES.button}--next`);

    // Listen for clicks and updateCurrentRoute to step.
    root.dom.buttonPrev.addEventListener("click", () => {
      const activeStepId = Router.getStepFromHash();
      if (activeStepId > 1) {
        this.goTo(activeStepId - 1);
      }
    });

    root.dom.buttonNext.addEventListener("click", () => {
      const activeStepId = Router.getStepFromHash();
      if (activeStepId < this.routes.length) {
        this.goTo(activeStepId + 1);
      }
    });
  }

}



