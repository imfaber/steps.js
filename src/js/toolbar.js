import {DOM_SELECTORS, CSS_CLASSES, root} from "./config";
import htmlElement from "./utils/createElementFromHTML";


export default class Toolbar {

  constructor() {
    Toolbar.attachToolbar();
  }

  static updateRemainingMinutes() {
    if (root.dom.minRemaining) {
      root.dom.minRemaining.innerHTML = `${root.tutorial.getRemainingMinutes()} min remaining`;
    }
  }

  static attachToolbar() {
    const header = htmlElement(`
      <header class="${CSS_CLASSES.header}">
        <button type="button">
          <svg class="icon icon-enlarge" viewBox="0 0 32 32">
            <path d="M32 0h-13l5 5-6 6 3 3 6-6 5 5z"></path>
            <path d="M32 32v-13l-5 5-6-6-3 3 6 6-5 5z"></path>
            <path d="M0 32h13l-5-5 6-6-3-3-6 6-5-5z"></path>
            <path d="M0 0v13l5-5 6 6 3-3-6-6 5-5z"></path>
          </svg>
          
          <svg class="icon icon-arrow-left" viewBox="0 0 32 32">
            <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
          </svg>
        </button>
        <h1>${root.tutorial.title}</h1>
        <div class="${CSS_CLASSES.timeRemaining}"><span></span></div>
      </header>  
    `);

    root.dom.tutorial.insertBefore(header, root.dom.nav);
    root.dom.minRemaining = root.dom.tutorial.querySelector(DOM_SELECTORS.timeRemaining);
    Toolbar.updateRemainingMinutes();

    // Listen for clicks and overlay button and toggle overlay.
    root.dom.overlayButton = root.dom.tutorial.querySelector(DOM_SELECTORS.overlayButton);
    root.dom.overlayButton.addEventListener("click", () => {
      root.tutorial.toggleOverlay();
    });

  }
}

