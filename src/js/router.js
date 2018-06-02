import {DOM_SELECTORS, ACTIVE_CLASSES, root} from "./config";

export default class Router {

  constructor(routes) {

    // Add path to routes.
    this.routes = routes.map(r => {
      r.path = `path-${r.step}`;
      return r;
    });

    // Create nav.
    this.attachNav();

    // Listen for hash changes.
    window.addEventListener("hashchange", (e) => {
      const route = this.findBy({
        name: 'path',
        value: location.hash.split('#')[1],
      });
      this.go(route.step);
    });
  }

  /**
   * Find route by step ID.
   * @param id
   * @returns {*}
   */
  find(id){
    return this.findBy({
      name: 'step',
      value: id,
    });
  }

  /**
   * Find route by parameter.
   * @param name
   * @param value
   * @returns {*|T}
   */
  findBy({name, value}){
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
    const activeStep = root.dom.stepsWrapper.querySelector(`.${ACTIVE_CLASSES.stepSelected}`);
    if (activeStep) {
      activeStep.classList.remove(ACTIVE_CLASSES.stepSelected);
    }

    // Remove active class from nav item.
    const activeNavItem = root.dom.nav.querySelector(`.${ACTIVE_CLASSES.navItemSelected}`);
    if (activeNavItem) {
      activeNavItem
        .classList.remove(ACTIVE_CLASSES.navItemSelected);
    }

    // Activate new route.
    this.activateRoute(id);
  }

  /**
   * Activate given route
   * @param id
   */
  activateRoute(id) {
    let route = this.find(id);
    route.domElement.classList.add(ACTIVE_CLASSES.stepSelected);
    root.dom.nav
      .querySelector(`li[data-id="${id}"]`)
      .classList.add(ACTIVE_CLASSES.navItemSelected);
    location.hash = route.path;

    root.dom.navItems.forEach((elem, i) => {
      if (elem.dataset.id < id) {
        elem.classList.add(ACTIVE_CLASSES.navItemCompleted);
      }
    });
  }


  /**
   * Attach nav to DOM.
   */
  attachNav() {
    let aside = document.createElement('aside');
    aside.className = 'tutorial-js__nav';
    root.dom.tutorial.insertBefore(aside, root.dom.stepsWrapper);
    root.dom.nav = root.dom.tutorial.querySelector(DOM_SELECTORS.nav);

    root.dom.nav.innerHTML = `
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
    `;

    root.dom.navItems = root.dom.nav.querySelectorAll('li');
  }

}



