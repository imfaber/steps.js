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
  pagination: true, toolbar: true,

  // Whether to show the tutorial as overlay.
  overlay: false,

  // Pagination text.
  prevText: 'Previous',
  nextText: 'Next',

  // Last time the tutorial was updated
  lastUpdate: null,

  // The animation speed (steps transition, overlay etc..)
  animationSpeed: 600 // In milliseconds.

};

/**
 * CSS classes.
 * @type {*}
 */
export const CSS_CLASSES = {
  container:              'tutorial-js-container',
  overlay:                'tutorial-js-container--overlay',
  header:                 'tutorial-js__header',
  stepSelected:           'tutorial-js__step--selected',
  stepTransitionIn:       'tutorial-js__step-transition--in',
  stepTransitionOut:      'tutorial-js__step-transition--out',
  stepTransitionBackward: 'tutorial-js__step-transition--backward',
  stepTransitionForward:  'tutorial-js__step-transition--forward',
  navItemSelected:        'tutorial-js-nav__item--selected',
  navItemCompleted:       'tutorial-js-nav__item--completed',
  button:                 'tutorial-js__button',
  timeRemaining:          'tutorial-js__time-remaining',
  noScroll:               'tutorial-js-no-scroll'
};

/**
 * Tutorial selections
 * @type {*}
 */
export const DOM_SELECTORS = {
  tutorialWrapper: '.tutorial-js',
  nav:             '.tutorial-js__nav',
  stepsWrapper:    '.tutorial-js__steps',
  steps:           '.tutorial-js__steps > article',
  timeRemaining:   `.${CSS_CLASSES.timeRemaining}`,
  overlayButton:   `.${CSS_CLASSES.header} button`,
};

