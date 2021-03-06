export default {

  /**
   * Turn input into a boolean value.
   * @param input
   * @returns {*}
   */
  toBoolean(input) {
    if (typeof input === 'boolean') {
      return input;
    }

    if (typeof input !== 'string') {
      return void 0;
    }

    return (input.toLowerCase() === 'true');
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
   * Append HTML to given element.
   *
   * @param {element} element - The element the HTML is appednded to.
   * @param {string} html - The html to append
   * @returns {*}
   */
  appendHTML(element, html) {
    const newElem = this.createElement(html);
    element.appendChild(newElem);
    return newElem;
  },


  /**
   * Dispatch custom events.
   *
   * @param  {element} target - The target element
   * @param  {string} type - Custom event name
   * @param  {object} detail - Custom detail information
   */
  dispatchEvent(target, type, detail) {
    try {
      let event = new CustomEvent(type, {
        bubbles:    true,
        cancelable: true,
        detail:     detail
      });
      target.dispatchEvent(event);
    } catch (e) {
      // console.log(e, {
      //   target: target,
      //   type: type
      // });
    }
  },

}
