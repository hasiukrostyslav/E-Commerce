import View from './View';
import icons from '../../assets/svg/sprite.svg';
import { MAXSCORE } from '../config';

class ProductView extends View {
  _tabs = document.querySelector('.product__tabs');
  _pages = document.querySelectorAll('.product__descript');
  _subPages = document.querySelectorAll('.product__data');
  _currentPage = document.querySelector('.product__info');
  _currentSubPage = document.querySelector('.details');
  _accordionContainer = document.querySelector('.product__accordion');
  _detailsPage = document.querySelector('.product__details');
  _currentTab;

  constructor() {
    super();
    this._addHandlerChangeTabs();
    this._addHandlerAccordion();
    this._setObserver(this._renderBreadcrumb.bind(this));
    this._addHandlerSwitchColor(this._switchColor.bind(this));
  }

  renderProductPage(data, markup) {
    this._productPageEl.querySelector('h2').textContent = data.description;
    this._productPageEl.querySelector('h2').dataset.title = data.description;
    this._productPageEl.querySelector('.product__article-num').textContent =
      data.article;

    this._renderCard(markup);
    this._renderProductGallery(data);
    this._renderProductOptions(data);
    this._renderProductDetails(data);
    this._renderProductReview(data);
  }

  _renderCard(markup) {
    if (this._detailsPage.querySelector('.card'))
      this._detailsPage.querySelector('.card').remove();

    this._detailsPage.insertAdjacentHTML('beforeend', markup);

    const card = this._detailsPage.querySelector('.card');
    card.querySelector('.card__slider-buttons').classList.remove('hidden');
    card.querySelector('.card__form').classList.remove('hidden');
  }

  _renderProductGallery(data) {
    const gallery = this._productPageEl.querySelector('.product__img-list');
    const img = this._productPageEl.querySelector('img');

    img.src = data.images.at(0);
    img.alt = data.title;
    gallery.innerHTML = '';

    gallery.insertAdjacentHTML('afterbegin', this._generateGalleryList(data));
  }

  _renderProductOptions(data) {
    const priceInfo = this._productPageEl.querySelector(
      '.product__flex-container'
    );
    const formColor = this._productPageEl.querySelector('.product__color');
    const formSize = this._productPageEl.querySelector('#size');

    this._productPageEl.querySelector('.input--number-sm').value = 1;
    priceInfo.innerHTML = '';
    formColor.innerHTML = '';
    formSize.innerHTML = '';

    priceInfo.insertAdjacentHTML(
      'afterbegin',
      this._generatePriceDetails(data)
    );
    formColor.insertAdjacentHTML('afterbegin', this._generateColorMenu(data));
    formSize.insertAdjacentHTML('afterbegin', this._generateSizeMenu(data));
  }

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

  _renderProductReview(data) {
    const reviewsInfo = this._productPageEl.querySelector('.reviews__wrapper');

    this._productPageEl.querySelector('.checkbox__radio>sup').textContent =
      data.reviews.length;

    reviewsInfo.innerHTML = '';

    reviewsInfo.insertAdjacentHTML(
      'afterbegin',
      this._generateReviewsInfo(data)
    );

    this._calculateReviewsBarWidth(reviewsInfo, data);
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

  _generateGalleryList(data) {
    return data.images
      .map(
        (img, i, arr) => `
      <li class="product__img-item ${
        i === arr.length - 1 ? 'product__img-video' : ''
      }">
        <img
          class="product__img product__img--sm ${
            i === 0 ? 'product__img--current' : ''
          }"
          src="${img}"
          alt="${data.title}"
          data-gallary-slide="${i + 1}"
        />
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

  _generatePriceDetails(data) {
    return `
    <div class="product__price">
        <p class="card__price card__price--large ${
          data.discountPercentage === 0 ? '' : 'card__price--new'
        }">&dollar;${
      data.discountPercentage === 0
        ? data.price.toFixed(2)
        : (data.price - (data.price * data.discountPercentage) / 100).toFixed(2)
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

  _generateSizeMenu(data) {
    return `
            <option value="" class="placeholder" disabled selected>
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
              `<option value="${sz}">${
                Number.isFinite(sz) ? sz : sz.toUpperCase()
              }</option>`
          )
          .join('')
      : '';
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

  _switchColor(e) {
    const btn = e.target.closest('.color__radio');
    if (!btn) return;

    const color = btn.id.split('-').slice(1).join(' ');

    this._currentPage.querySelector('.product__color-type').textContent =
      color[0].toUpperCase() + color.slice(1);
  }

  _addHandlerSwitchColor(handler) {
    this._currentPage.addEventListener('click', handler);
  }

  _generateColorButton(data, color, i) {
    return `
          <li class="product__radio-item">
            <input
              class="color__radio"
              type="radio"
              name="color"
              id="${data.article}-${color}"
            ${i === 0 ? 'checked' : ''}  
            />
            <label class="color__label color__label--sm" for="${
              data.article
            }-${color}">&nbsp;
              <span class="color__type color__type--sm color__type--${color}"
              >&nbsp;</span>
            </label>
          </li>
    `;
  }

  _generateSaleLabel(data) {
    return `<p class="sale__badge">-${data.discountPercentage}%</p>`;
  }

  _generateOldPrice(data) {
    return `<span class="card__price--old">&dollar;${data.price.toFixed(
      2
    )}</span>`;
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

  _generateRating(data = 0, maxScore = MAXSCORE) {
    return `
      <div class="rating">
      ${new Array(data)
        .fill(1)
        .map(() => this._generateRatingStar(true))
        .join('')}
        ${new Array(maxScore - data)
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
            this._productPageEl.querySelector('h2').textContent
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

  _changeTabs(e) {
    const btn = e.target.closest('.checkbox__btn');
    if (!btn) return;

    this._currentTab = btn;
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
}

export default new ProductView();
