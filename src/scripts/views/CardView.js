import View from './View';
import icons from '../../assets/svg/sprite.svg';

class CardView extends View {
  _iconAdd = `<use xlink:href="${icons}#heart-filled"></use>`;
  _iconRemove = `<use xlink:href="${icons}#heart-outline"></use>`;
  _curSlide = 0;

  constructor() {
    super();

    this.addHandlerAddToWishlist();
    this._addHandlerShowCardBottom(this._toggleCardBottom.bind(this));
    this._addHandlerHideCardBottom(this._toggleCardBottom.bind(this));
    this._addHandlerChangeSlide();
  }

  renderProfileCards(data) {
    const wishlistEl = document.querySelector('.account__wishlist-container');
    const viewedListEl = document.querySelector('.account__viewed');
    wishlistEl.innerHTML = '';
    viewedListEl.innerHTML = '';
    const wishlisMarkup = data.wishlist
      .map((item) => this.generateCardMarkup(item))
      .join('');
    wishlistEl.insertAdjacentHTML('afterbegin', wishlisMarkup);
    const viewedMarkup = data.view
      .map((item) => this.generateCardMarkup(item))
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

  _addToWishlist(e) {
    const btn = e.target.closest('.btn-wishlist-add');
    if (!btn) return;
    const icon = btn.querySelector('.wishlist__icon');

    if (icon.classList.contains('wishlist__icon--filled')) {
      icon.classList.remove('wishlist__icon--filled');
      icon.innerHTML = this._iconRemove;
    } else {
      icon.classList.add('wishlist__icon--filled');
      icon.innerHTML = this._iconAdd;
    }
  }

  addHandlerAddToWishlist() {
    this._parentElement.addEventListener(
      'click',
      this._addToWishlist.bind(this)
    );
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
}
export default new CardView();
