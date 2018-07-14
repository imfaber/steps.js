import {ClassName} from './global'

export default {

  nav(routes) {
    return `
       <aside class="${ClassName.NAV}">
          <nav>
             <ul>
                ${routes.map(route => `
                   <li class="steps-js-nav__item" data-id="${route.index}">
                      <a href="#${route.path}">
                          <i>${route.index}</i>
                          <span>${route.label}</span>
                      </a>
                   </li>
                `).join('')}
             </ul>
          </nav>
       </aside>
    `;
  },

  toolbar(stepsTitle) {
    return `
      <header class="${ClassName.HEADER}">
        <button type="button" title="Overlay mode">
          <svg class="icon icon-enlarge" viewBox="0 0 32 32">
            <path d="M32 0h-13l5 5-6 6 3 3 6-6 5 5z"></path>
            <path d="M32 32v-13l-5 5-6-6-3 3 6 6-5 5z"></path>
            <path d="M0 32h13l-5-5 6-6-3-3-6 6-5-5z"></path>
            <path d="M0 0v13l5-5 6 6 3-3-6-6 5-5z"></path>
          </svg>

          <svg class="icon icon-arrow-left" viewBox="0 0 32 32">
            <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
          </svg>
        </button>
        <h1 title="${stepsTitle}">${stepsTitle}</h1>
        <div class="${ClassName.TIME_REMAINING}"><span></span></div>
      </header>
    `;
  },

  /**
   *
   * @param text
   * @returns {string}
   */
  paginationButton(text, classNameModifier) {
    return `
        <button class="${ClassName.BUTTON} ${ClassName.BUTTON}--${classNameModifier}">
            <span>${text}</span>
        </button>
    `;
  },

  /**
   *
   * @param text
   * @returns {*|string}
   */
  paginationButtonPrev(text) {
    return this.paginationButton(text, 'prev');
  },

  /**
   *
   * @param text
   * @returns {*|string}
   */
  paginationButtonNext(text) {
    return this.paginationButton(text, 'next');
  },


}