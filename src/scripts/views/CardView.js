import View from './View';
import icons from '../../assets/svg/sprite.svg';

class CardView extends View {
  _curSlide = 0;
  _catalogEl = this._catalogPageEl.querySelector('.catalog__product');
  _btnFilter = document.querySelector('.catalog__btn').lastChild;
  _catalogContainer = document.querySelector('.catalog');
  _accordionContainer = document.querySelector('.catalog__filter');
  _catalogFilters = document.querySelector('.catalog__filter');
  _breadcrumbFilters = document.querySelector('.breadcrumb__catalog-list');

  constructor() {
    super();
    this._addHandlerShowCardBottom(this._toggleCardBottom.bind(this));
    this._addHandlerHideCardBottom(this._toggleCardBottom.bind(this));
    this._addHandlerChangeSlide();
  }

  renderProfileCards(data) {
    const wishlistEl = document.querySelector('.account__wishlist-container');
    const viewedListEl = document.querySelector('.account__viewed');
    wishlistEl.innerHTML = '';
    viewedListEl.innerHTML = '';
    const wishlistMarkup = data.wishlist
      .map((item) => this.generateCardMarkup(item, 'acc-wishlist'))
      .join('');
    wishlistEl.insertAdjacentHTML('afterbegin', wishlistMarkup);

    const viewedMarkup = data.view
      .map((item) => this.generateCardMarkup(item, 'acc-view'))
      .join('');
    viewedListEl.insertAdjacentHTML('afterbegin', viewedMarkup);
  }

  clickOnCardLink(e) {
    const link = e.target.closest('a[data-link="product"]');
    if (!link) return;

    this._parentElement.querySelector('.modal--cart').classList.add('hidden');
    this._overlay.classList.add('hidden');

    return +link.closest('[data-article]').dataset.article;
  }

  addHandlerRenderProductPage(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  addHandlerAddToWishlist(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  _toggleCardBottom(e) {
    const card = e.target.closest('.card');
    if (!card || card.closest('.product__details')) return;

    const form = card.querySelector('.card__form');
    const btns = card.querySelector('.card__slider-buttons');
    const computedStyle = getComputedStyle(card.closest('section'));

    form.style.backgroundColor = computedStyle.backgroundColor;

    if (e.type === 'mouseover') {
      form.classList.remove('hidden');
      btns.classList.remove('hidden');
    }
    if (e.type === 'mouseout') {
      form.classList.add('hidden');
      btns.classList.add('hidden');
    }
  }

  _prevSlide(e) {
    const btnPrev = e.target.closest('.card__btn--prev');
    if (!btnPrev) return;

    this._slides = btnPrev.closest('.card').querySelectorAll('.card__img');
    const maxSlide = this._slides.length;

    this._curSlide = this._curSlide === 0 ? maxSlide - 1 : this._curSlide - 1;
    this._goToSlide(this._curSlide);
  }

  _nextSlide(e) {
    const btnNext = e.target.closest('.card__btn--next');
    if (!btnNext) return;

    this._slides = btnNext.closest('.card').querySelectorAll('.card__img');
    const maxSlide = this._slides.length;

    this._curSlide = this._curSlide === maxSlide - 1 ? 0 : this._curSlide + 1;
    this._goToSlide(this._curSlide);
  }

  _addHandlerChangeSlide() {
    this._mainEl.addEventListener('click', this._prevSlide.bind(this));
    this._mainEl.addEventListener('click', this._nextSlide.bind(this));
  }

  _addHandlerShowCardBottom(handler) {
    this._parentElement.addEventListener('mouseover', handler);
  }

  _addHandlerHideCardBottom(handler) {
    this._parentElement.addEventListener('mouseout', handler);
  }

  render(data) {
    const containers = [...document.querySelectorAll('[data-cards]')];
    containers.forEach((el) => {
      el.innerHTML = '';
      const arr = data.filter((item) =>
        item.category.find((type) => type === el.dataset.cards)
      );
      arr.forEach((prod) =>
        el.insertAdjacentHTML(
          'beforeend',
          this.generateCardMarkup(prod, el.dataset.cards, el.dataset.cardsSize)
        )
      );

      if (el.dataset.cards === 'all') this._showNumbresOfCards();
    });
  }

  updateItemRating(item) {
    const cards = [...this._parentElement.querySelectorAll('.card')].filter(
      (card) => +card.dataset.article === item.article
    );

    cards.forEach((card) => {
      const labelContainer = card.querySelector('.card__labels');
      const ratingContainer = card.querySelector('.rating--card');
      if (ratingContainer) ratingContainer.remove();
      labelContainer.insertAdjacentHTML(
        'afterbegin',
        this._generateRating(item)
      );
    });
  }

  generateCardMarkup(data, category = 'item', size = 'large') {
    return `
      <div class="card" data-article="${data.article}">
        <div class="card__gallery card__gallery--${size}">
        ${this._generateImages(data, size)}
        </div>
       

        <div class="card__labels">
          ${
            (data.discountPercentage !== 0 && this._generateSaleLabel(data)) ||
            ''
          }

          ${data.rating ? this._generateRating(data) : ''}
        
          <button class="card__btn-wishlist card__btn-wishlist--${size} btn-wishlist-add">
            <svg class="wishlist__icon">
              <use xlink:href="${icons}#heart-outline">
              </use>
            </svg>
          </button>

          <div class="card__slider-buttons hidden">
            <button type="button" class="card__btn card__btn--prev card__btn--${size}">
              <svg class="card__icon-arr card__icon--prev">
                <use xlink:href="${icons}#left-chevron">
                </use>
              </svg>
            </button>

            <button type="button" class="card__btn card__btn--next card__btn--${size}">
              <svg class="card__icon-arr card__icon--next">
                <use xlink:href="${icons}#right-chevron">
                </use>
              </svg>
            </button> 
          </div>
          
        </div>

        <div class="card__details">
          <a href="#" class="card__heading" data-link="product">${
            data.description
          }</a>
          <p class="card__price card__price--${size} ${
      data.discountPercentage === 0 ? '' : 'card__price--new'
    }">${
      data.discountPercentage === 0
        ? this._priceFormatter(data.price)
        : this._priceFormatter(
            data.price - (data.price * data.discountPercentage) / 100
          )
    }
        ${
          data.discountPercentage !== 0
            ? this._generateOldPrice(data, size)
            : ''
        }
          </p>
          <form action="#" class="card__form hidden">
            <div class="card__form-wrapper">
              <ul class="card__radio-list">
                  ${data.size
                    .map((el) => this._generateSizeButton(data, el, category))
                    .join('')}
              </ul>
              <ul class="card__radio-list">
                  ${data.color
                    .map((el) => this._generateColorButton(data, el, category))
                    .join('')}
              </ul>
            </div>
                        
            <button type="button" class="btn btn--solid btn--medium btn--sale btn__cart" data-cart="add">
              <svg class="sale__icon-cart">
                <use xlink:href="${icons}#cart"></use>
              </svg>
                Add to cart
            </button>
          </form>
        </div>
      </div>
    `;
  }

  _generateSaleLabel(data) {
    return `<p class="sale__badge sale__badge--card">-${data.discountPercentage}%</p>`;
  }

  _generateImages(data, size) {
    return data.images
      .map(
        (img, i) =>
          `<img src="${img}" alt="Photo of ${
            data.title
          }" class="card__img card__img--${size} card__img--${i + 1}"></img>`
      )
      .join(' ');
  }

  _generateOldPrice(data, size) {
    return `<span class="card__price card__price--old card__price--old-${size}">${this._priceFormatter(
      data.price
    )}</span>`;
  }

  _generateRating(data, maxScore = 5) {
    return `
    <div class="rating rating--card">
    ${new Array(data.rating)
      .fill(1)
      .map(() => this._generateRatingStar(true))
      .join('')}
      ${new Array(maxScore - data.rating)
        .fill(1)
        .map(() => this._generateRatingStar())
        .join('')}
    </div>`;
  }

  _generateRatingStar(pos = false) {
    return `
      <svg class="rating__icon ${pos ? '' : 'rating__icon--outline'}">
        <use xlink:href="${icons}#star-${pos ? 'filled' : 'outline'}"></use>
      </svg>  
    `;
  }

  _generateSizeButton(data, size, category) {
    return `
      <li class="card__radio-item">
        <input class="size__radio" type="radio" value="${size}" name="size" id="${size}--${
      data.article
    }${category}" ${size === data.size.at(0) ? 'checked' : ''}>
        <label class="size__label" for="${size}--${data.article}${category}">${
      typeof size === 'string' ? size.toUpperCase() : size
    }</label>
      </li>
    `;
  }

  _generateColorButton(data, color, category) {
    return `
      <li class="card__radio-item">
        <input class="color__radio" type="radio" name="color" id="${color}--${
      data.article
    }${category}" ${color === data.color.at(0) ? 'checked' : ''}>
        <label class="color__label color__label--sm" for="${color}--${
      data.article
    }${category}">
          <span class="color__type color__type--sm color__type--${color}"></span>
        </label> 
      </li>
    `;
  }

  // CATALOG FILTERS
  catalogInit(e, func) {
    if (!e.target.closest('a[data-link="catalog"]')) return;
    this._resetCatalog(func);
    this._addHandlerSortCatalog(this._sortCatalog.bind(this, func));
    this._addHandlerFilterItems(this._showFilteredItems.bind(this, func));
    this._addHandlerChangePage(this._changePage.bind(this));
    this._addHandlerSearchFilters(this._searchFilters.bind(this));
    this._setPaginationAttribute();
    this._showFilterContainer();
  }

  _sortCatalog(func, e) {
    const form = e.target.closest('.sort__form');
    if (!form) return;

    const selectedValue = [...e.target.querySelectorAll('option')].find(
      (el) => el.selected
    ).value;

    this._catalogPageEl.querySelectorAll('.sort__select').forEach((select) => {
      select.querySelectorAll('option').forEach((option) => {
        option.selected = false;
        if (option.value === selectedValue) option.selected = true;
      });
    });
    this._initFilters(func, selectedValue);
  }

  _renderCatalogItems(item) {
    this._catalogEl.insertAdjacentHTML(
      'beforeend',
      this.generateCardMarkup(
        item,
        this._catalogEl.dataset.cards,
        this._catalogEl.dataset.cardsSize
      )
    );
  }

  _addHandlerSortCatalog(handler) {
    this._catalogPageEl.addEventListener('change', handler);
  }

  _changePage(e) {
    const btn = e.target.closest('.pagination__btn');
    if (!btn || btn.classList.contains('pagination__btn--current')) return;
    const currentPage = this._changeCurrentBtn(e, btn);
    this._showCurrentPage(currentPage);
  }

  _showCurrentPage(page) {
    const items = [...this._catalogPageEl.querySelectorAll('.card')];
    items.forEach((card) => {
      card.classList.add('hidden');
    });
    const currentItems = items.filter((el) => el.dataset.pagination === page);
    currentItems.forEach((el) => el.classList.remove('hidden'));
  }

  _changeCurrentBtn(e, btn) {
    e.stopImmediatePropagation();
    const btns = [
      ...e.target.closest('.pagination').querySelectorAll('.pagination__btn'),
    ];
    const currentBtnIndex = btns.findIndex((el) =>
      el.classList.contains('pagination__btn--current')
    );

    btns.forEach((el, i, arr) => {
      el.classList.remove('pagination__btn--current');
      if (!btn.querySelector('svg')) {
        btn.classList.add('pagination__btn--current');
      }

      if (btn.querySelector('svg')) {
        if (i === currentBtnIndex + 1) {
          el.classList.add('pagination__btn--current');
        }

        if (currentBtnIndex === arr.length - 2) {
          const lasteEl = arr[arr.length - 2];
          lasteEl.classList.add('pagination__btn--current');
        }
      }

      const curIndex = btns.findIndex((elem) =>
        elem.classList.contains('pagination__btn--current')
      );

      this._catalogPageEl.querySelectorAll('.pagination').forEach((pagin) => {
        pagin.querySelectorAll('.pagination__btn').forEach((page, index) => {
          page.classList.remove('pagination__btn--current');
          if (index === curIndex)
            page.classList.add('pagination__btn--current');
        });
      });
    });
    return this._catalogPageEl.querySelector('.pagination__btn--current')
      .dataset.pagination;
  }

  _addHandlerChangePage(handler) {
    this._catalogPageEl.addEventListener('click', handler);
  }

  addHandlerCatalogFilters(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  _resetCatalog(func) {
    this._catalogPageEl.querySelectorAll('.sort__select').forEach((select) => {
      select.querySelectorAll('option').forEach((option) => {
        option.selected = false;
        if (option.value === 'newest') option.selected = true;
      });
    });

    this._catalogPageEl
      .querySelectorAll('.input--number')
      .forEach((input) => (input.value = 12));

    this._initFilters(func, 'newest');
  }

  _initFilters(func, value) {
    this._catalogEl.innerHTML = '';
    const sortedData = func(value);
    sortedData.forEach((item) => this._renderCatalogItems(item));
    this._showNumbresOfCards();
    this._renderCatalogPagination();
    this._updateWishIcons();
    this._setPaginationAttribute();
    this._resetSearchInput();
  }

  _showFilterContainer() {
    this._btnFilter.textContent = 'Hide filters';
    this._catalogContainer.classList.remove('block');
    this._catalogContainer.classList.add('grid');
    this._accordionContainer.classList.remove('hidden');
  }

  _resetSearchInput() {
    this._catalogPageEl
      .querySelectorAll('.search__input')
      .forEach((input) => (input.value = ''));
  }

  _searchFilters(e) {
    const input = e.target.closest('.search__input');
    if (!input) return;

    const options = [...input.closest('div').querySelectorAll('[data-type]')];
    options.forEach((el) => {
      el.classList.add('hidden');
    });

    const searchedOptions = options.filter((el) =>
      el.dataset.type.toLowerCase().includes(input.value.toLowerCase())
    );

    searchedOptions.forEach((el) => el.classList.remove('hidden'));
  }

  _addHandlerSearchFilters(handler) {
    this._catalogPageEl.addEventListener('input', handler);
  }

  _showFilteredItems(func, e) {
    e.preventDefault();
    const checkBox = e.target.closest('.checked__label');
    if (!checkBox) return;

    this._toggleBreadcrumbFilter(checkBox);
    this._addHandlerRemoveFilter(func);

    if (!checkBox.classList.contains('color__label'))
      checkBox
        .querySelector('.checkbox__mark')
        .classList.toggle('checkbox__mark--checked');

    if (checkBox.classList.contains('color__label'))
      checkBox.classList.toggle('color__label--checked');

    const checkedFilters = this._getFilteredOptions();

    const items = func(this._getSelectedValue());

    const filteredItems = this._getFilteredItems(items, checkedFilters);

    this._catalogEl.innerHTML = '';
    filteredItems.forEach((item) => this._renderCatalogItems(item));
  }

  _getFilteredOptions() {
    return [
      ...this._catalogFilters.querySelectorAll('.checkbox__mark--checked'),
      ...this._catalogFilters.querySelectorAll('.color__label--checked'),
    ]
      .map((el) => el.closest('.checked__label'))
      .map((el) => ({
        category: el.closest('[data-filter]').dataset.filter,
        value: +el.previousElementSibling.id || el.previousElementSibling.id,
      }));
  }

  _getFilteredItems(items, filters) {
    return items.filter((el) =>
      filters.every((filter) =>
        filter.category === 'clothes' || filter.category === 'brand'
          ? el[filter.category] === filter.value
          : el[filter.category].find((option) => option === filter.value)
      )
    );
  }

  _getSelectedValue() {
    return [
      ...this._catalogPageEl
        .querySelector('.sort__select')
        .querySelectorAll('option'),
    ].find((option) => option.selected === true).value;
  }

  // BREADCRUMB
  _removeFilter(func, e) {
    const btn = e.target.closest('.breadcrumb__catalog-btn');
    if (!btn) return;
    const items = func(this._getSelectedValue());

    if (btn.classList.contains('clear-all')) {
      this._removeAllFilters();

      this._catalogEl.innerHTML = '';
      items.forEach((item) => this._renderCatalogItems(item));
    }

    if (btn.classList.contains('clear-one')) {
      this._removeOneFilter(btn);

      const checkedFilters = this._getFilteredOptions();
      const filteredItems = this._getFilteredItems(items, checkedFilters);
      this._catalogEl.innerHTML = '';
      filteredItems.forEach((item) => this._renderCatalogItems(item));
    }
  }

  _addHandlerRemoveFilter(func) {
    this._breadcrumbFilters.addEventListener(
      'click',
      this._removeFilter.bind(this, func)
    );
  }

  _removeOneFilter(btn) {
    const { type } = btn.closest('li').dataset;
    btn.closest('li').remove();
    const checkBox = [
      ...this._catalogFilters.querySelectorAll('[data-type]'),
    ].find((el) => el.dataset.type.toLowerCase() === type);

    if (checkBox.querySelector('.checkbox__mark')) {
      checkBox
        .querySelector('.checkbox__mark')
        .classList.remove('checkbox__mark--checked');
    }

    if (checkBox.querySelector('.color__label')) {
      checkBox
        .querySelector('.color__label')
        .classList.remove('color__label--checked');
    }
  }

  _removeAllFilters() {
    [...this._breadcrumbFilters.querySelectorAll('button')]
      .filter((el) => el.classList.contains('clear-one'))
      .forEach((el) => el.closest('li').remove());

    const checkMark = this._catalogFilters.querySelectorAll(
      '.checkbox__mark--checked'
    );
    if (checkMark.length > 0)
      checkMark.forEach((mark) =>
        mark.classList.remove('checkbox__mark--checked')
      );
    const colors = this._catalogFilters.querySelectorAll(
      '.color__label--checked'
    );
    if (colors.length > 0)
      colors.forEach((color) =>
        color.classList.remove('color__label--checked')
      );
  }

  _toggleBreadcrumbFilter(checkBox) {
    if (
      !checkBox.querySelector('.checkbox__mark--checked') &&
      !checkBox.classList.contains('color__label--checked')
    ) {
      this._renderBreadcrumbFilter(checkBox);
    }
    if (
      checkBox.querySelector('.checkbox__mark--checked') ||
      checkBox.classList.contains('color__label--checked')
    ) {
      const element = [
        ...this._breadcrumbFilters.querySelectorAll('.breadcrumb__filter'),
      ].find(
        (el) =>
          el.dataset.type === checkBox.closest('li').dataset.type.toLowerCase()
      );
      element.remove();
    }
  }

  _renderBreadcrumbFilter(filter) {
    const filterTitle = filter.previousElementSibling.id
      .split(' ')
      .map((word) =>
        word.length === 2
          ? word.toUpperCase()
          : word[0].toUpperCase() + word.slice(1)
      )
      .join(' ');

    this._breadcrumbFilters.insertAdjacentHTML(
      'afterbegin',
      this._generateFilterMarkup(filterTitle)
    );
  }

  _generateFilterMarkup(filter) {
    return `
          <li class="breadcrumb__catalog-item breadcrumb__filter" data-type="${filter.toLowerCase()}">
            <button class="breadcrumb__catalog-btn clear-one">
              <svg class="breadcrumb__icon breadcrumb__icon--light">
                <use xlink:href="${icons}#cross"></use>
              </svg>
            </button>
            <a href="#" class="breadcrumb__link breadcrumb__link--current">${filter}</a>
          </li>
    `;
  }

  _addHandlerFilterItems(handler) {
    this._catalogFilters.addEventListener('click', handler);
  }
}

export default new CardView();
