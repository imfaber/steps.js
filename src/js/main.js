import Tutorial from "./tutorial";
import {DOM_SELECTORS} from "./config";
import "../sass/main.scss";

// Init tutorial when DOM is ready.
document.addEventListener("DOMContentLoaded", (event) => {
  new Tutorial(document.querySelector(DOM_SELECTORS.tutorialWrapper).dataset);
});

