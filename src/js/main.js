import Tutorial from "./tutorial";
import {DOM_SELECTORS} from "./config";

// Init tutorial when DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  new Tutorial(document.querySelector(DOM_SELECTORS.tutorialWrapper).dataset);
});


