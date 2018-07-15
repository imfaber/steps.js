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

  header() {
    return `<header class="${ClassName.HEADER}"></header>`;
  },

  // header(stepsTitle) {
  //   return `
  //     <header class="${ClassName.HEADER}">
  //       <h1 title="${stepsTitle}">${stepsTitle}</h1>
  //       <div class="${ClassName.TIME_REMAINING}">
  //           ${this.SVGIcon('clock')}
  //           <span></span>
  //       </div>
  //     </header>
  //   `;
  // },

  SVGIcon(icon) {
    let SVGContent = '';

    switch (icon) {
      case 'clock':
        SVGContent = `<path d="M20.586 23.414l-6.586-6.586v-8.828h4v7.172l5.414 5.414zM16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z"></path>`;
    }

    return `<svg class="stepsjs-icon stepsjs-icon--${icon}">${SVGContent}</svg>`;
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