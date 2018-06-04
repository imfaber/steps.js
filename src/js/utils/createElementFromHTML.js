/**
 * Create an HTML element from an HTML string.
 *
 * @param html
 * @returns {*}
 */
export default function createElementFromHTML(html) {
  let div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstChild;
}


