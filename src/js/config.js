/**
 * A root global object to share data across componenst
 *
 * @type {*}
 */
export let root = window.tutorialJS || {};

/**
 * Tutorial default options.
 *
 * @type {*}
 */
export const TUTORIAL_DEFAULT_OPTIONS = {

  // The title of the tutorial.
  title: '',

  // The seleceted step.
  selected: 1,

  // The duration of the tutorial in minutes.
  duration: 0,

  // Whether to display the toolbar.
  toolbar: true,

  // Whether to display the arrows.
  arrows: true,

  // Last time the tutorial was updated
  lastUpdate: null,
};

/**
 * Tutorial selections
 * @type {*}
 */
export const DOM_SELECTORS = {
  tutorialWrapper: '.tutorial-js',
  nav:             '.tutorial-js__nav',
  stepsWrapper:    '.tutorial-js__steps',
  steps:           '.tutorial-js__steps section',
};

/**
 * Active classes.
 * @type {*}
 */
export const ACTIVE_CLASSES = {
  stepSelected: 'tutorial-js__step--selected',
  navItemSelected: 'tutorial-js-nav__item--selected',
  navItemCompleted: 'tutorial-js-nav__item--completed',
};
