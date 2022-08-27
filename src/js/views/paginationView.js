import View from './View.js'
import icons from '../../img/icons.svg'
// import * as model from '../model'

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination')

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline')
      if (!btn) return

      const goToPage = +btn.dataset.goto
      // console.log(goToPage)

      handler(goToPage)
    })
  }

  _generateMarkup() {
    const curPage = this._data.page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    )

    // pg1 and other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next')
    }
    // pgLast
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev')
    }
    // pgOther
    if (curPage < numPages) {
      return this._generateMarkupButton()
    }
    // pg2 and no other pages
    return ''
  }

  _generateMarkupButton(dir) {
    const curPage = this._data.page
    if (dir === 'next') {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>`
    } else if (dir === 'prev') {
      return `<button  data-goto="${
        curPage - 1
      }"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
              <span>Page ${curPage - 1}</span>
            </button>`
    } else {
      return `<button data-goto="${
        curPage + 1
      }"class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
            <button data-goto="${
              curPage - 1
            }"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
              <span>Page ${curPage - 1}</span>
            </button>`
    }
  }
}

export default new PaginationView()
