import View from './View';
import icons from '../../assets/svg/sprite.svg';

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
    this._productPageEl.querySelector('.product__article-num').textContent =
      data.article;
    this._renderCard(markup);
    this._renderProductInfo(data);
  }

  _renderCard(markup) {
    if (this._detailsPage.querySelector('.card'))
      this._detailsPage.querySelector('.card').remove();

    this._detailsPage.insertAdjacentHTML('beforeend', markup);

    const card = this._detailsPage.querySelector('.card');
    card.querySelector('.card__slider-buttons').classList.remove('hidden');
    card.querySelector('.card__form').classList.remove('hidden');
  }

  _renderProductInfo(data) {
    const gallery = this._currentPage.querySelector('.product__img-list');
    const priceInfo = this._currentPage.querySelector(
      '.product__flex-container'
    );
    const formColor = this._currentPage.querySelector('.product__color');
    const formSize = this._currentPage.querySelector('#size');
    const img = this._currentPage.querySelector('img');
    const brand = this._currentSubPage.querySelector('.details__text--brand');
    const colors = this._currentSubPage.querySelector('.details__text--color');

    brand.textContent = data.brand;
    colors.textContent = data.color
      .map((el) => el.split('-').join(' '))
      .join(' / ');
    img.src = data.images.at(0);
    img.alt = data.title;
    gallery.innerHTML = ''; // Some bug, need to be fixed
    priceInfo.innerHTML = '';
    formColor.innerHTML = '';
    formSize.innerHTML = '';

    gallery.insertAdjacentHTML('afterbegin', this._generateGalleryList(data));
    priceInfo.insertAdjacentHTML(
      'afterbegin',
      this._generatePriceDetails(data)
    );
    formColor.insertAdjacentHTML('afterbegin', this._generateColorMenu(data));
    formSize.insertAdjacentHTML('afterbegin', this._generateSizeMenu(data));
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

      ${data.rating ? this._generateRating(data) : ''}
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

  _generateRating(data, maxScore = 5) {
    return `
    <div class="product__rating">
      <div class="rating">
      ${new Array(data.rating)
        .fill(1)
        .map(() => this._generateRatingStar(true))
        .join('')}
        ${new Array(maxScore - data.rating)
          .fill(1)
          .map(() => this._generateRatingStar())
          .join('')}
      </div>
      <span class="product__rating-amount">12 reviews</span>
    </div>`;
  }

  _generateRatingStar(pos = false) {
    return `
      <svg class="rating__icon ${pos ? '' : 'rating__icon--outline'}">
        <use xlink:href="${icons}#star-${pos ? 'filled' : 'outline'}"></use>
      </svg>  
    `;
  }

  _renderBreadcrumb() {
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
