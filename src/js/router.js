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

    // Listen for hash changes.
    window.addEventListener("hashchange", () => {
      const route = this.findBy({
        name:  'path',
        value: location.hash.split('#')[1],
      });
      this.go(route.step);
    });

    // Init route
    const currentStep = this.getStepFromHash();

    if (currentStep && this.find(currentStep)) {
      this.go(currentStep);
    }
    else {
      this.go(root.tutorial.selected);
    }
  }

  /**
   * Return the step number from the location hash
   * @returns {int|null}
   */
  getStepFromHash() {

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
   * Go to given route.
   * @param id
   */
  go(id) {
    // Remove active class from step.
    const activeStep = root.dom.stepsWrapper.querySelector(`.${CSS_CLASSES.stepSelected}`);
    if (activeStep) {
      activeStep.classList.remove(CSS_CLASSES.stepSelected);
    }

    // Remove active class from nav item.
    const activeNavItem = root.dom.nav.querySelector(`.${CSS_CLASSES.navItemSelected}`);
    if (activeNavItem) {
      activeNavItem
        .classList.remove(CSS_CLASSES.navItemSelected);
    }

    // Activate new route.
    this.activateRoute(id);
  }

  /**
   * Activate given route
   * @param id
   */
  activateRoute(id) {

    if (!id) {
      return;
    }

    let route = this.find(id);
    route.domElement.classList.add(CSS_CLASSES.stepSelected);
    root.dom.nav
      .querySelector(`li[data-id="${id}"]`)
      .classList.add(CSS_CLASSES.navItemSelected);
    location.hash = route.path;

    root.tutorial.minRemaining = parseInt(root.tutorial.duration);
    root.dom.navItems.forEach((elem) => {
      if (elem.dataset.id < id) {
        elem.classList.add(CSS_CLASSES.navItemCompleted);
        root.tutorial.minRemaining -= parseInt(root.tutorial.getStep(elem.dataset.id).duration);
      }
      else {
        elem.classList.remove(CSS_CLASSES.navItemCompleted);
      }
    });

    // Update remaining time in toolbar.
    if (root.toolbar) {
      root.toolbar.updateRemainingMinutes();
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

}



