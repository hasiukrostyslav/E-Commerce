import View from './View';
import icons from '../../assets/svg/sprite.svg';

class CatalogView extends View {
  _parentElement = document.querySelector('.catalog');
  _btnFilter = document.querySelector('.catalog__btn');
  _filters = document.querySelector('.catalog__filter');
  _catalog = document.querySelector('.catalog__product');
  _btnDeleteContainer = document.querySelector('.breadcrumb__catalog-list');
  _btnClearList = document.querySelectorAll('.clear-one');
  _iconPlus = `
  <svg class="catalog__filter-btn-plus">
    <use
      xlink:href="${icons}#plus">
    </use>
  </svg>`;
  _iconMinus = `
  <svg class="catalog__filter-btn-minus">
    <use
      xlink:href="${icons}#minus">
    </use>
  </svg>`;

  _deleteFilter(e) {
    const btn = e.target.closest('.breadcrumb__icon');
    if (!btn) return;

    if (btn.classList.contains('clear-all'))
      this._btnClearList.forEach((el) =>
        el.closest('.breadcrumb__catalog-item').remove()
      );

    if (btn.classList.contains('clear-one'))
      btn.closest('.breadcrumb__catalog-item').remove();
  }

  _toggleFilter(e) {
    const btn = e.target.closest('.catalog__filter-btn');
    if (!btn) return;
    if (btn.firstElementChild.classList.contains('catalog__filter-btn-minus')) {
      btn.nextElementSibling.classList.add('hidden');
      btn.innerHTML = this._iconPlus;
    } else {
      btn.nextElementSibling.classList.remove('hidden');
      btn.innerHTML = this._iconMinus;
    }
  }

  _toggleFilterContainer() {
    this._filters.classList.toggle('hidden');
    const btnText = this._btnFilter.lastChild;

    if (this._filters.classList.contains('hidden')) {
      btnText.textContent = 'Show filters';
      this._parentElement.classList.remove('grid');
      this._parentElement.classList.add('block');
    }

    if (!this._filters.classList.contains('hidden')) {
      btnText.textContent = 'Hide filters';
      this._parentElement.classList.remove('block');
      this._parentElement.classList.add('grid');
    }
  }

  addHandlerDeleteFilter() {
    if (!this._btnDeleteContainer) return;
    this._btnDeleteContainer.addEventListener(
      'click',
      this._deleteFilter.bind(this)
    );
  }

  addHandlerToggleFilter() {
    if (!this._filters) return;
    this._filters.addEventListener('click', this._toggleFilter.bind(this));
  }

  addHandlerToggleFilterContainer() {
    if (!this._btnFilter) return;
    this._btnFilter.addEventListener(
      'click',
      this._toggleFilterContainer.bind(this)
    );
  }
}

export default new CatalogView();
