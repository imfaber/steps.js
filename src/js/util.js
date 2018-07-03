export default {
  toBoolean(input) {
    if (typeof input === 'boolean') {
      return input;
    }

    if (typeof input !== 'string') {
      return void 0;
    }

    return (input.toLowerCase() === 'true');
  },

  typeCheckConfig(componentName, config, configTypes) {
    for (const property in configTypes) {
      if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
        const expectedTypes = configTypes[property]
        const value = config[property]
        const valueType = value && Util.isElement(value)
          ? 'element' : toType(value)

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new Error(
            `${componentName.toUpperCase()}: ` +
            `Option "${property}" provided type "${valueType}" ` +
            `but expected type "${expectedTypes}".`)
        }
      }
    }
  },

  /**
   * For each function suitable for querySelectorAll
   * @param array
   * @param callback
   * @param scope
   */
  forEach(array, callback, scope) {
    for (let i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]); // passes back stuff we need
    }
  },

  /**
   * Create an HTML element from an HTML string.
   *
   * @param html
   * @returns {*}
   */
  createElement(html) {
    let div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild;
  },

  /**
   * Wrap the given element with the given HTML wrapper.
   *
   * @param {element} element - The DOM element.
   * @param {string} HTMLWrap - The HTML wrapper (<div class="wrapper">)
   * @returns {*}
   */
  wrapElement(element, HTMLWrap) {
    let wrap = this.createElement(HTMLWrap);
    element.parentNode.insertBefore(wrap, element);
    wrap.appendChild(element);
    return wrap;
  },

  /**
   * Dispatch custom events.
   *
   * @param  {element} target - The target element
   * @param  {string} type - Custom event name
   * @param  {object} detail - Custom detail information
   */
  dispatchEvent (target, type, detail) {
    let event = new CustomEvent(type, {
      bubbles:    true,
      cancelable: true,
      detail:     detail
    });

    target.dispatchEvent(event);
  },

}
