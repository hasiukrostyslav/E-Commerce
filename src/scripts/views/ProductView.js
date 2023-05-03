import View from './View';
import icons from '../../assets/svg/sprite.svg';
import { MAXSCORE, NUMBER_OF_ITEMS } from '../config';

class ProductView extends View {
  _tabs = document.querySelector('.product__tabs');
  _pages = document.querySelectorAll('.product__descript');
  _subPages = document.querySelectorAll('.product__data');
  _currentPage = document.querySelector('.product__info');
  _currentSubPage = document.querySelector('.details');
  _accordionContainer = document.querySelector('.product__accordion');
  _detailsPage = document.querySelector('.product__details');
  _btnNext = this._productPageEl.querySelector('.product__slider-btn--right');
  _btnPrev = this._productPageEl.querySelector('.product__slider-btn--left');
  _slideContainer = this._productPageEl.querySelector('.product__img-list');
  _curSlide = 0;
  _currentTab;
  _modalReview = document.querySelector('.modal--review');
  _formReview = this._modalReview.querySelector('.review__form');
  _inputName = document.getElementById('name-review');
  _inputEmail = document.getElementById('email-review');
  _ratingSelect = document.getElementById('rating');
  _textarea = document.getElementById('review-textarea');
  _btnSubmit = this._modalReview.querySelector('[data-submit]');
  _article = this._productPageEl.querySelector('.product__article-num');
  _formColor = this._productPageEl.querySelector('.product__color');
  _formSize = this._productPageEl.querySelector('#size');
  _priceInfo = this._productPageEl.querySelector('.product__flex-container');

  constructor() {
    super();
    this._addHandlerChangeTabs();
    this._addHandlerAccordion();
    this._setObserver(this._renderBreadcrumb.bind(this));
    this._addHandlerSwitchColor(this._switchColor.bind(this));
    this._addHandlerChangePaginationPage(this._changePaginationPage.bind(this));
    this._addHandlerChangeSlide();
  }

  renderProductPage(data, reviews, markup) {
    this._resetProductPage();
    this._productPageEl.querySelector('.heading-secondary').textContent =
      data.description;
    this._productPageEl.querySelector('.heading-secondary').dataset.title =
      data.description;
    this._productPageEl.querySelector('.product__article-num').textContent =
      data.article;
    this._productPageEl.querySelector('.product__card').dataset.article =
      data.article;

    this._renderCard(markup);
    this._renderProductGallery(data);
    this._renderProductOptions(data);
    this._renderProductDetails(data);
    this._renderProductReview(data, reviews);
  }

  updateProductRating(data, reviews) {
    this._renderProductReview(data, reviews);
    this._renderProductOptions(data);
  }

  _resetProductPage() {
    this._tabs
      .querySelectorAll('.checkbox__btn')
      .forEach((el, i) => (el.checked = i === 0 ? true : false));
    this._combineTabsWithPages(this._tabs.querySelector('.checkbox__btn'));

    this._productPageEl.querySelector('.input--number-sm').value = 1;
    this._productPageEl
      .querySelectorAll('.accordion__text-container')
      .forEach((el) => el.classList.remove('hidden'));
    this._priceInfo.innerHTML = '';
    this._formColor.innerHTML = '';
    this._formSize.innerHTML = '';
    this._curSlide = 0;
  }

  // Render PRODUCT CARD

  _renderCard(markup) {
    if (this._detailsPage.querySelector('.card'))
      this._detailsPage.querySelector('.card').remove();

    this._detailsPage.insertAdjacentHTML('beforeend', markup);

    const card = this._detailsPage.querySelector('.card');
    card.querySelector('.card__slider-buttons').classList.remove('hidden');
    card.querySelector('.card__form').classList.remove('hidden');
  }

  // RENDER PRODUCT GALLERY

  _renderProductGallery(data) {
    const sliderLarge = this._productPageEl.querySelector(
      '.product__img-slider'
    );
    const sliderSmall = this._productPageEl.querySelector('.product__img-list');

    sliderLarge.innerHTML = '';
    sliderSmall.innerHTML = '';

    sliderLarge.insertAdjacentHTML(
      'afterbegin',
      this._generateGallerySliderLarge(data)
    );
    sliderSmall.insertAdjacentHTML(
      'afterbegin',
      this._generateGalleryListSmall(data)
    );

    this._activateSlideTab();
  }

  _generateGallerySliderLarge(data) {
    return data.images
      .map(
        (img, i) => `
      <img class="product__img product__img--lg" data-slide="${i + 1}"
        src="${img}"
        alt="${data.title}"
    >`
      )
      .join('');
  }

  _generateGalleryListSmall(data) {
    return data.images
      .map(
        (img, i, arr) => `
      <li class="product__img-item ${
        i === arr.length - 1 ? 'product__img-video' : ''
      }"
      data-slide="${i}">
        <img
          class="product__img product__img--sm"
          src="${img}"
          alt="${data.title}"
        >
        ${
          i === arr.length - 1
            ? `<span class="product__play-btn">
                <svg class="play-icon">
                  <use xlink:href="${icons}#play"></use>
                </svg>
              </span>`
            : ''
        }
      </li>`
      )
      .join(' ');
  }

  _activateSlideTab(slide = 0) {
    this._slides = this._productPageEl.querySelectorAll('.product__img--lg');
    this._maxSlide = this._slides.length;

    this._productPageEl
      .querySelectorAll('.product__img--sm')
      .forEach((img) => img.classList.remove('product__img--current'));

    this._slideContainer
      .querySelector(`.product__img-item[data-slide="${slide}"]`)
      .firstElementChild.classList.add('product__img--current');
  }

  _addHandlerChangeSlide() {
    this._btnNext.addEventListener('click', this._nextSlide.bind(this));
    this._btnPrev.addEventListener('click', this._prevSlide.bind(this));
    this._slideContainer.addEventListener(
      'click',
      this._clickTabs.bind(this, '.product__img-item')
    );
  }

  // Render PRODUCT OPTIONS

  _renderProductOptions(data) {
    this._priceInfo.innerHTML = '';
    this._formColor.innerHTML = '';
    this._formSize.innerHTML = '';
    const warning = this._productPageEl.querySelector('.select__warning');
    if (warning) warning.remove();

    this._priceInfo.insertAdjacentHTML(
      'afterbegin',
      this._generatePriceDetails(data)
    );
    this._formColor.insertAdjacentHTML(
      'afterbegin',
      this._generateColorMenu(data)
    );
    this._formSize.insertAdjacentHTML(
      'afterbegin',
      this._generateSizeMenu(data)
    );
  }

  _generatePriceDetails(data) {
    return `
    <div class="product__price">
        <p class="card__price card__price--large ${
          data.discountPercentage === 0 ? '' : 'card__price--new'
        }">${
      data.discountPercentage === 0
        ? this._priceFormatter(data.price)
        : this._priceFormatter(
            data.price - (data.price * data.discountPercentage) / 100
          )
    }
        ${data.discountPercentage !== 0 ? this._generateOldPrice(data) : ''}
        </p>
        ${
          (data.discountPercentage !== 0 && this._generateSaleLabel(data)) || ''
        }
      </div>

      ${data.rating ? this._generateRatingContainer(data) : ''}
    </div>
    `;
  }

  _generateOldPrice(data) {
    return `<span class="card__price card__price--old">${this._priceFormatter(
      data.price
    )}</span>`;
  }

  _generateSaleLabel(data) {
    return `<p class="sale__badge">-${data.discountPercentage}%</p>`;
  }

  _generateRatingContainer(data) {
    return `
    <div class="product__rating">
    ${this._generateRating(data.rating)}
    <span class="product__rating-amount">${data.reviews.length} review${
      data.reviews.length > 1 ? 's' : ''
    }</span>
    </div>`;
  }

  _generateColorMenu(data) {
    return `
        <p class="product__heading">Color</p>
        <ul class="product__color-switcher">
          ${data.color
            .map((el, i) => this._generateColorButton(data, el, i))
            .join('')}
          <li class="product__radio-item">
            <span class="product__color-type">${
              data.color[0][0].toUpperCase() +
              data.color[0].split('-').join(' ').slice(1)
            }</span>
          </li>
        </ul>
    `;
  }

  _generateColorButton(data, color, i) {
    return `
          <li class="product__radio-item">
            <input
              class="color__radio"
              type="radio"
              name="color"
              id="${color}--${data.article}"
            ${i === 0 ? 'checked' : ''}  
            >
            <label class="color__label color__label--sm" for="${color}--${
      data.article
    }">&nbsp;
              <span class="color__type color__type--sm color__type--${color}"
              >&nbsp;</span>
            </label>
          </li>
    `;
  }

  _switchColor(e) {
    const btn = e.target.closest('.color__radio');
    if (!btn) return;

    const color = btn.id.split('--').slice(0, 1).join(' ').split('-').join(' ');

    this._currentPage.querySelector('.product__color-type').textContent =
      color[0].toUpperCase() + color.slice(1);
  }

  _addHandlerSwitchColor(handler) {
    this._currentPage.addEventListener('click', handler);
  }

  _generateSizeMenu(data) {
    return `
            <option class="placeholder" disabled selected>
              Please select
            </option>
            ${this._generateSizeOption(data)} 
                  
    `;
  }

  _generateSizeOption(data) {
    return data.size.length > 0
      ? data.size
          .map(
            (sz) =>
              `<option class="size__option" value="${sz}">${
                Number.isFinite(sz) ? sz : sz.toUpperCase()
              }</option>`
          )
          .join('')
      : '';
  }

  // Render PRODUCT DETAILS

  _renderProductDetails(data) {
    const brandName = this._productPageEl.querySelector(
      '.details__text--brand'
    );
    const colorsName = this._productPageEl.querySelector(
      '.details__text--color'
    );

    brandName.textContent = data.brand;
    colorsName.textContent = data.color
      .map((el) => el.split('-').join(' '))
      .join(' / ');
  }

  // Render PRODUCT REVIEWS

  _renderProductReview(data, reviews) {
    const reviewsInfo = this._productPageEl.querySelector('.reviews__wrapper');
    const reviewList = this._productPageEl.querySelector('.comment');
    const pagination = this._productPageEl.querySelector('.pagination');

    this._productPageEl.querySelector('.checkbox__radio>sup').textContent =
      data.reviews.length;

    reviewsInfo.innerHTML = '';
    reviewList.innerHTML = '';
    pagination.innerHTML = '';

    reviewsInfo.insertAdjacentHTML(
      'afterbegin',
      this._generateReviewsInfo(data)
    );

    this._calculateReviewsBarWidth(reviewsInfo, data);

    this._renderReviewsList(data, reviewList, reviews);

    this._productPageEl.querySelector('.sort__select').value = 'newest';

    pagination.insertAdjacentHTML(
      'afterbegin',
      this._renderPagination(data, reviews) || ''
    );

    this._showPaginationPage();

    this._addHandlerSortReviews(
      this._sortReviews.bind(this, data, reviewList, reviews)
    );
  }

  _renderReviewsList(data, list, reviews, sort = 'new') {
    list.innerHTML = '';
    const filteredList = reviews.filter((el) => el.article === data.article);
    const sortedList =
      sort === 'old'
        ? filteredList.sort((a, b) => new Date(a.date) - new Date(b.date))
        : filteredList.sort((a, b) => new Date(b.date) - new Date(a.date));

    list.insertAdjacentHTML(
      'afterbegin',
      sortedList.map((review) => this._generateReviewsComment(review)).join('')
    );

    this._setDataAttribute(list);
  }

  _addHandlerSortReviews(handler) {
    this._productPageEl
      .querySelector('.sort__select')
      .addEventListener('change', handler);
  }

  _sortReviews(data, reviewList, reviews, e) {
    if (e.target.value === 'newest') {
      this._renderReviewsList(data, reviewList, reviews);
      this._showPaginationPage();
    }

    if (e.target.value === 'oldest') {
      this._renderReviewsList(data, reviewList, reviews, 'old');
      this._showPaginationPage();
    }
  }

  _generateReviewsInfo(data) {
    return `
          <div class="reviews__info">
            <h2 class="reviews__heading">${data.reviews.length} review${
      data.reviews.length === 1 ? '' : 's'
    }</h2>
            ${
              data.rating
                ? this._generateRating(data.rating)
                : this._generateRating()
            }
            ${
              data.rating
                ? this._generateReviewStat(data)
                : `<p class="reviews__text">There aren't any reviews <br> for this product yet!</p>`
            }

          </div>

          <ul class="reviews__breakdown">
            ${new Array(MAXSCORE)
              .fill(1)
              .map((_, i) => this._generateReviewBreakdown(data, i))
              .join('')}
          </ul>  
    `;
  }

  _generateReviewStat(data) {
    return `
          <p class="reviews__text">
            ${data.reviews.filter((el) => el > 3).length} out of ${
      data.reviews.length
    } (${Math.trunc(
      (data.reviews.filter((el) => el > 3).length * 100) / data.reviews.length
    )}%) <br />
            Customers recommended this product
          </p>
    `;
  }

  _generateReviewBreakdown(data, i) {
    return `
            <li class="reviews__progress">
              <span class="reviews__score">${MAXSCORE - i}
                <svg class="rating__icon rating__icon--outline">
                  <use xlink:href="${icons}#star-outline"
                  ></use>
                </svg>
              </span>
              <div class="reviews__progres-bg">
                <span class="reviews__progres-bar reviews__progres-bar--${
                  MAXSCORE - i
                }"
                >&nbsp;</span>
              </div>
              <span class="reviews__count">${
                data.reviews.filter((score) => score === MAXSCORE - i).length
              }</span>
            </li>
    `;
  }

  _calculateReviewsBarWidth(parentEl, data) {
    const bar = parentEl.querySelector('.reviews__progres-bg');
    const barProgres = [...parentEl.querySelectorAll('.reviews__progres-bar')];
    const barWidth = Number.parseInt(getComputedStyle(bar).width, 10);

    const percentage = Array.from({ length: MAXSCORE }, (_, i) => {
      if (data.reviews.length === 0) return 0;
      return (
        (data.reviews.filter((score) => score === i + 1).length * 100) /
        data.reviews.length
      );
    }).reverse();

    barProgres.forEach(
      (el, i) => (el.style.width = `${(percentage[i] * barWidth) / 100}px`)
    );
  }

  _renderPagination(data, reviews) {
    const list = reviews.filter((el) => el.article === data.article);
    if (list.length === 0) return;

    const numOfPages = Math.ceil(list.length / NUMBER_OF_ITEMS);

    const itemArr = Array.from(
      { length: numOfPages },
      (_, i) => ` <li class="pagination__item" data-pagination="${i + 1}">
                    <button class="btn pagination__btn ${
                      i === 0 ? 'pagination__btn--current' : ''
                    }">
                      ${i + 1}
                    </button>
                  </li>`
    );

    const btnNext = `
                <li class="pagination__item">
                  <button class="btn pagination__btn">
                    <svg class="pagination__icon">
                      <use xlink:href="${icons}#right"></use>
                    </svg>
                  </button>
                </li>
    `;

    if (itemArr.length > 1) itemArr.push(btnNext);
    return itemArr.join('');
  }

  _setDataAttribute(container) {
    [...container.children].forEach(
      (li, i) =>
        (li.dataset.pagination =
          i < NUMBER_OF_ITEMS ? 1 : Math.trunc(i / NUMBER_OF_ITEMS + 1))
    );
  }

  _showPaginationPage() {
    const reviews = this._productPageEl.querySelectorAll('.comment>li');
    reviews.forEach((review) => review.classList.remove('hidden'));

    if (reviews.length === 0) return;
    const pages = [
      ...this._productPageEl.querySelectorAll('.pagination>[data-pagination]'),
    ];

    const currentPage = pages.find((page) =>
      page.firstElementChild.classList.contains('pagination__btn--current')
    ).dataset.pagination;

    reviews.forEach(
      (review) =>
        review.dataset.pagination !== currentPage &&
        review.classList.add('hidden')
    );
  }

  _changePaginationPage(e) {
    const btn = e.target.closest('.pagination__btn');
    if (!btn) return;

    const list = [...e.target.closest('ul').querySelectorAll('li')];
    const currentPage = list.find((li) =>
      li.firstElementChild.classList.contains('pagination__btn--current')
    );

    if (btn.closest('li').dataset.pagination) {
      list.forEach((li) =>
        li.firstElementChild.classList.remove('pagination__btn--current')
      );
      btn.classList.add('pagination__btn--current');
      this._showPaginationPage();
    }

    if (!btn.closest('li').dataset.pagination) {
      const nextPage = list.find(
        (li) => +li.dataset.pagination === +currentPage.dataset.pagination + 1
      );
      if (!nextPage) return;

      list.forEach((li) =>
        li.firstElementChild.classList.remove('pagination__btn--current')
      );

      nextPage.firstElementChild.classList.add('pagination__btn--current');
      this._showPaginationPage();
    }
  }

  _addHandlerChangePaginationPage(handler) {
    this._productPageEl
      .querySelector('.pagination')
      .addEventListener('click', handler);
  }

  addReview(e) {
    e.preventDefault();
    const warning = this._formReview.querySelector('.input__warning');
    if (warning) warning.remove();

    const fullName = this._fullNameValidation(
      this._inputName,
      this._formReview
    );
    if (!fullName) return;

    const email = this._globalEmailValidation(
      this._inputEmail,
      this._formReview,
      this._inputEmail
    );
    if (!email) return;

    const rating = this._ratingValidation(this._ratingSelect, this._formReview);
    if (!rating) return;

    const text = this._textareaValidation(this._textarea, this._formReview);
    if (!text) return;

    this._showModalPopup('comment');
    this._formReview
      .querySelectorAll('.input')
      .forEach((el) => (el.value = ''));
    const date = new Date().toISOString();

    this._modalReview.classList.add('hidden');
    this._overlay.classList.add('hidden');

    return { fullName, email, rating, text, date };
  }

  getArticle() {
    return +this._article.textContent;
  }

  addHandlerAddReview(handler) {
    this._formReview.addEventListener('submit', handler);
  }

  // Render BREADCRUMB

  _renderBreadcrumb(entries) {
    if (!this._productPageEl.classList.contains('hidden')) {
      const link = this._breadcrumbEl.querySelector('.breadcrumb__link--page');
      link.textContent = 'Women';
      link.dataset.link = this._catalogPageEl.id.split('__').at(-1);

      if (
        [...this._breadcrumbList.querySelectorAll('.breadcrumb__link--subpage')]
          .length <= 1
      ) {
        this._breadcrumbList.insertAdjacentHTML(
          'beforeend',
          this._renderBreadcrumbLink('', 'Clothes')
        );

        this._breadcrumbList.insertAdjacentHTML(
          'beforeend',
          this._renderBreadcrumbLink(
            this._productPageEl.id.split('__').at(-1),
            this._productPageEl.querySelector('.heading-secondary').textContent
          )
        );
      }

      const h2 = entries.find((el) => el.target.nodeName === 'H2');
      if (!h2) return;
      [
        ...this._breadcrumbList.querySelectorAll('.breadcrumb__link--subpage'),
      ].at(-1).textContent = h2.target.innerText;
    }

    const [subLinkOne, subLinkTwo] = [
      ...this._breadcrumbList.querySelectorAll('.breadcrumb__link--subpage'),
    ];
    if (!subLinkOne?.dataset?.link === '' || !subLinkTwo) return;

    if (
      this._productPageEl.classList.contains('hidden') &&
      subLinkTwo.dataset.link === this._productPageEl.id.split('__').at(-1)
    ) {
      subLinkTwo.closest('li').remove();

      if (subLinkOne.dataset.link === '') subLinkOne.closest('li').remove();
    }
  }

  // Others

  _changeTabs(e) {
    const btn = e.target.closest('.checkbox__btn');
    if (!btn) return;
    this._combineTabsWithPages(btn);
  }

  _combineTabsWithPages(tab) {
    this._currentTab = tab;
    this._currentPage.classList.add('hidden');
    this._currentPage = [...this._pages].find(
      (page) => page.dataset.product === this._currentTab.dataset.product
    );
    this._currentPage.classList.remove('hidden');

    if (this._currentTab.dataset.product === 'other-info') {
      this._currentSubPage.classList.add('hidden');
      this._currentSubPage = [...this._subPages].find(
        (sub) => sub.dataset.info === this._currentTab.dataset.info
      );
      this._currentSubPage.classList.remove('hidden');
    }
  }

  _openAccordion(el) {
    el.nextElementSibling.classList.remove('hidden');
    el.innerHTML = this._generateAccordionBtnIcon('sm', 'minus');
  }

  _closeAccordion(el) {
    el.nextElementSibling.classList.add('hidden');
    el.innerHTML = this._generateAccordionBtnIcon('sm', 'plus');
  }

  _toggleAccordion(e) {
    const btn = e.target.closest('.btn__accordion');
    if (!btn) return;

    if (btn.querySelector('svg').classList.contains('icon__accordion--minus'))
      this._closeAccordion(btn);
    else this._openAccordion(btn);
  }
}

export default new ProductView();
