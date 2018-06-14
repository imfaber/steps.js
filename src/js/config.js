/**
 * A root global object to share data across modules.
 *
 * @type {*}
 */
export let root = {};

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
  pagination: true,

  // Pagination text.
  prevText: 'Previous',
  nextText: 'Next',

  // Last time the tutorial was updated
  lastUpdate: null,


};

/**
 * CSS classes.
 * @type {*}
 */
export const CSS_CLASSES = {
  stepSelected:     'tutorial-js__step--selected',
  navItemSelected:  'tutorial-js-nav__item--selected',
  navItemCompleted: 'tutorial-js-nav__item--completed',
  button:           'tutorial-js__button',
  timeRemaining:    'tutorial-js__time-remaining'
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
  timeRemaining:   `.${CSS_CLASSES.timeRemaining}`,
};

