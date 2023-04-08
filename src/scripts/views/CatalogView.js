import View from './View';
import { MIN_PRICE, MAX_PRICE } from '../config';

class CatalogView extends View {
  _accordionContainer = document.querySelector('.catalog__filter');
  _catalogContainer = document.querySelector('.catalog');
  _btnFilter = document.querySelector('.catalog__btn');
  _filterItemEl = document.querySelectorAll('.catalog__filter-item');
  _filterColorList = document.querySelector('.catalog__color-list');
  _catalog = document.querySelector('.catalog__product');
  _btnClearList = document.querySelectorAll('.clear-one');
  _breadcrumbFilters = this._breadcrumbEl.querySelector(
    '.breadcrumb__catalog-list'
  );

  constructor() {
    super();
    this._addHandlerAccordion();
    this._addHandlerToggleFilterContainer();
    this._addHandlerRemoveFilter();
    this._setObserver(this._renderBreadcrumb.bind(this));
  }

  // Render filters
  init(e, data) {
    if (!e.target.closest('a[data-link="catalog"]')) return;

    this._setFiltersDataAttribute();
    this._renderFiltersCheckList(data);
    this._renderFiltersColor(data);
    // this._addHandlerSearchBlog(this._searchFilter.bind(this, data));
  }

  _setFiltersDataAttribute() {
    this._filterItemEl.forEach(
      (item) =>
        (item.dataset.filter = item
          .querySelector('p')
          .textContent.toLowerCase())
    );
  }

  _renderFiltersColor(data) {
    const colors = [...new Set(data.map((item) => item.color).flat())].sort();
    const markup = colors
      .map((color) => this._generateFilterColor(color))
      .join('');

    this._filterColorList.innerHTML = '';
    this._filterColorList.insertAdjacentHTML('afterbegin', markup);
  }

  _generateFilterColor(data) {
    return `
          <li class="catalog__color-item">
            <input
              class="color__radio"
              type="checkbox"
              name="color"
              id="${data}"
              checked
            />
            <label class="color__label color__label--lg" for="${data}"
            >&nbsp;
              <span
                class="color__type color__type--lg color__type--${data}"
              >&nbsp;</span>
              <span class="color__name">${
                data[0].toUpperCase() + data.slice(1).replace('-', ' ')
              }</span>
            </label>
          </li>
    `;
  }

  _renderFiltersCheckList(data) {
    const filters = [
      ...this._catalogContainer.querySelectorAll('.catalog__check-list'),
    ].map((el) => el.closest('.catalog__filter-item'));

    filters.forEach((filter) => {
      const list = filter.querySelector('.catalog__check-list');
      list.innerHTML = '';
      list.insertAdjacentHTML(
        'beforeend',
        this._getFiltersMarkup(data, filter.dataset.filter)
      );
    });
  }

  _getFiltersMarkup(data, type) {
    const filters = data.map((item) => item[type]).flat();
    const unique = [...new Set(filters)];

    if (type !== 'size') unique.sort();

    const markup = unique
      .map((checkItem) =>
        this._generateFilterCheckList(
          checkItem,
          type,
          filters.filter((el) => el === checkItem).length
        )
      )
      .join('');

    return markup;
  }

  _generateFilterCheckList(data, type, quantity) {
    return `
          <li class="catalog__check-item">
            <input
              class="checkbox__input"
              type="checkbox"
              name="${type}"
              id="${data}"
              checked
            />
            <label
              class="checkbox__label checkbox__label--small"
              for="${data}">
              <span class="checkbox__mark">&nbsp;
              </span>${
                type === 'size'
                  ? String(data).toUpperCase()
                  : data[0].toUpperCase() + data.slice(1)
              }
              <span class="catalog__amount">(${quantity})</span>
            </label>
          </li>
    `;
  }

  // Search
  _searchFilter(data, e) {
    e.preventDefault();
  }

  _addHandlerSearchBlog(handler) {
    this._accordionContainer.addEventListener('click', handler);
  }

  addHandlerInitPage(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  // Remove breadcrumb filters
  _removeFilter(e) {
    const btn = e.target.closest('.breadcrumb__catalog-btn');
    if (!btn) return;

    if (btn.classList.contains('clear-all'))
      [...this._btnClearList]
        .filter((el) => el.classList.contains('clear-one'))
        .forEach((el) => el.closest('li').remove());

    if (btn.classList.contains('clear-one')) btn.closest('li').remove();
  }

  _addHandlerRemoveFilter() {
    if (!this._breadcrumbFilters) return;
    this._breadcrumbFilters.addEventListener(
      'click',
      this._removeFilter.bind(this)
    );
  }

  _renderBreadcrumb() {
    if (!this._catalogPageEl.classList.contains('hidden')) {
      const link = this._breadcrumbEl.querySelector('.breadcrumb__link--page');
      link.textContent = 'Women';
      link.dataset.link = this._catalogPageEl.id.split('__').at(-1);

      if (this._breadcrumbList.querySelector('.breadcrumb__link--subpage')) {
        this._breadcrumbList.querySelector(
          '.breadcrumb__link--subpage'
        ).textContent = 'Clothes';
        this._breadcrumbList.querySelector(
          '.breadcrumb__link--subpage'
        ).dataset.link = 'catalog';
      } else {
        this._breadcrumbList.insertAdjacentHTML(
          'beforeend',
          this._renderBreadcrumbLink(
            this._catalogPageEl.id.split('__').at(-1),
            'Clothes'
          )
        );
      }

      this._breadcrumbFilters.classList.remove('hidden');
    }

    if (this._catalogPageEl.classList.contains('hidden')) {
      this._breadcrumbFilters.classList.add('hidden');
    }

    if (
      this._catalogPageEl.classList.contains('hidden') &&
      this._breadcrumbList.querySelector('.breadcrumb__link--subpage') &&
      this._breadcrumbList.querySelector('.breadcrumb__link--subpage').dataset
        .link === this._catalogPageEl.id.split('__').at(-1)
    ) {
      this._breadcrumbList
        .querySelector('.breadcrumb__link--subpage')
        .closest('li')
        .remove();
    }
  }

  _toggleAccordion(e) {
    const btn = e.target.closest('.btn__accordion');
    if (!btn) return;

    if (btn.querySelector('svg').classList.contains('icon__accordion--minus')) {
      btn.nextElementSibling.classList.add('hidden');
      btn.innerHTML = this._generateAccordionBtnIcon('sm', 'plus');
    } else {
      btn.nextElementSibling.classList.remove('hidden');
      btn.innerHTML = this._generateAccordionBtnIcon('sm', 'minus');
    }
  }

  _toggleFilterContainer() {
    this._accordionContainer.classList.toggle('hidden');
    const btnText = this._btnFilter.lastChild;

    if (this._accordionContainer.classList.contains('hidden')) {
      this._showFilterContainer(btnText);
    }

    if (!this._accordionContainer.classList.contains('hidden')) {
      this._hideFilterContainer(btnText);
    }
  }

  _showFilterContainer(btnText) {
    btnText.textContent = 'Show filters';
    this._catalogContainer.classList.remove('grid');
    this._catalogContainer.classList.add('block');
  }

  _hideFilterContainer(btnText) {
    btnText.textContent = 'Hide filters';
    this._catalogContainer.classList.remove('block');
    this._catalogContainer.classList.add('grid');
  }

  _addHandlerToggleFilterContainer() {
    this._btnFilter.addEventListener(
      'click',
      this._toggleFilterContainer.bind(this)
    );
  }
}

export default new CatalogView();
