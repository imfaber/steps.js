export const NAME = 'tutorialjs';

/**
 * Global object to cache DOM elements.
 * @type {*}
 */
export let DOM = {};

/**
 * CSS class names.
 * @type {*}
 */
export const ClassName = {
  CONTAINER:              `${NAME}-container`,
  HEADER:                 `${NAME}__header`,
  NAV:                    `${NAME}__nav`,
  STEP_SELECTED:          `${NAME}__step--selected`,
  STEP_DESELECTEDP:        `${NAME}__step--deselected`,
  stepTransitionBackward: `${NAME}__step-transition--backward`,
  stepTransitionForward:  `${NAME}__step-transition--forward`,
  NAV_ITEM_SELECTED:      `${NAME}-nav__item--selected`,
  NAV_ITEM_COMPLETED:     `${NAME}-nav__item--completed`,
  BUTTON:                 `${NAME}__button`,
  TIME_REMAINING:         `${NAME}__time-remaining`,
  OVERLAY:                `${NAME}-overlay`,
  OVERLAY_BACKDROP:       `${NAME}-overlay-backdrop`,
  NO_SCROLL:              `${NAME}-no-scroll`,
};

/**
 * Selectors
 * @type {*}
 */
export const Selector = {
  TUTORIAL:        `.${NAME}`,
  NAV:             `.${ClassName.NAV}`,
  STEPS_WRAPPER:   `.${NAME}__steps`,
  STEPS:           `.${NAME}__steps > article`,
  STEP_SELECTED:   `.${NAME}__steps > article.${ClassName.STEP_SELECTED}`,
  STEP_DESELECTEDP: `.${NAME}__steps > article.${ClassName.STEP_DESELECTEDP}`,
  TIME_REMAINING:  `.${ClassName.TIME_REMAINING}`,
  OVERLAY_BUTTON:  `.${ClassName.HEADER} button`,
};

/**
 * Direction
 * @type {*}
 */
export const Direction = {
  BACKWARD: 'backward',
  FORWARD:  'forward',
};

/**
 * Evemts
 * @type {*}
 */
export const EventName = {
  INITIALIZE:  `initialize.${NAME}`,
  INITIALIZED: `initialized.${NAME}`,
  CHANGE:      `change.${NAME}`,
  CHANGED:     `changed.${NAME}`,
  HIDE:        `hide.${NAME}`,
  HIDDEN:      `hidden.${NAME}`,
  SHOW:        `show.${NAME}`,
  SHOWN:       `shown.${NAME}`,
};




