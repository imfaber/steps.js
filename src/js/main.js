import Tutorial from "./tutorial";
import {Selector} from './global';

// Init tutorial when DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  const tutorial = new Tutorial(document.querySelector(Selector.TUTORIAL));
});



