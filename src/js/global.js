export const NAME = 'stepsjs';

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
  STEPSJS:            NAME,
  HEADER:             `${NAME}__header`,
  NAV:                `${NAME}__nav`,
  STEPS_WRAPPER:      `${NAME}__steps`,
  STEP_SELECTED:      `${NAME}__step--selected`,
  STEP_DESELECTED:    `${NAME}__step--deselected`,
  NAV_ITEM_SELECTED:  `${NAME}-nav__item--selected`,
  NAV_ITEM_COMPLETED: `${NAME}-nav__item--completed`,
  BUTTON:             `${NAME}__button`,
  TIME_REMAINING:     `${NAME}__time-remaining`,
};

/**
 * Selectors
 * @type {*}
 */
export const Selector = {
  STEPSJS:         `.${NAME}`,
  NAV:             `.${ClassName.NAV}`,
  STEPS_WRAPPER:   `.${ClassName.STEPS_WRAPPER}`,
  STEPS:           `.${NAME} article`,
  STEP_SELECTED:   `.${NAME} article.${ClassName.STEP_SELECTED}`,
  STEP_DESELECTED: `.${NAME} article.${ClassName.STEP_DESELECTED}`,
  TIME_REMAINING:  `.${ClassName.TIME_REMAINING}`,
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




