import View from './View';
import icons from '../../assets/svg/sprite.svg';

class CardView extends View {
  _iconAdd = `<use xlink:href="${icons}#heart-filled"></use>`;
  _iconRemove = `<use xlink:href="${icons}#heart-outline"></use>`;
  constructor() {
    super();

    this.addHandlerAddToWishlist();
    this.addHandlerShowCardBottom(this._toggleCardBottom.bind(this));
    this.addHandlerHideCardBottom(this._toggleCardBottom.bind(this));
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
    if (!card) return;

    const info = card.querySelector('.card__details');
    if (info.style.backgroundColor === 'white') info.style.backgroundColor = '';
    else info.style.backgroundColor = 'white';
    info.classList.toggle('card__details--shadow');
    card.querySelector('.card__hover-box').classList.toggle('hidden');
  }

  addHandlerShowCardBottom(handler) {
    this._parentElement.addEventListener('mouseover', handler);
  }

  addHandlerHideCardBottom(handler) {
    this._parentElement.addEventListener('mouseout', handler);
  }

  render(data) {
    const containers = document.querySelectorAll('[data-cards]');
    containers.forEach((el) => {
      el.innerHTML = '';
      const arr = data.filter((item) =>
        item.category.find((type) => type === el.dataset.cards)
      );
      arr.forEach((prod) =>
        el.insertAdjacentHTML(
          'beforeend',
          this._generateCardMarkup(prod, el.dataset.cards, el.dataset.cardsSize)
        )
      );
    });
  }

  _generateCardMarkup(data, category, size = 'small') {
    return `
      <div class="card">
        <img src="${data.images}" alt="Photo of ${
      data.title
    }" class="card__img card__img--${size}">
      
        <div class="card__details">
          <a href="#" class="card__heading" data-link="product">${
            data.description
          }</a>
          <p class="card__price card__price--${size} ${
      data.discountPercentage === 0 ? '' : 'card__price--new'
    }">&dollar;${
      data.discountPercentage === 0
        ? data.price.toFixed(2)
        : (data.price - (data.price * data.discountPercentage) / 100).toFixed(2)
    }
        ${
          data.discountPercentage !== 0
            ? this._generateOldPrice(data, size)
            : ''
        }
          </p>

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

          <div class="card__hover-box hidden">

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

            <form action="#" class="card__form">
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
                        
              <button type="button" class="btn btn--solid btn--medium btn--sale btn__cart modal-open" data-modal="cart">
                <svg class="sale__icon-cart">
                  <use xlink:href="${icons}#cart"></use>
                </svg>
                Add to cart
              </button>
            </form>
          </div>  
        </div>
        
         
      </div>
    `;
  }

  _generateSaleLabel(data) {
    return `<p class="sale__percent">-${data.discountPercentage}%</p>`;
  }

  _generateOldPrice(data, size) {
    return `<span class="card__price--old card__price--old-${size}">&dollar;${data.price.toFixed(
      2
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
        <input class="size__radio" type="radio" value="${size}" name="size" id="${category}00${
      data.id
    }${size}" ${size === data.size.at(0) ? 'checked' : ''}>
        <label class="size__label" for="${category}00${data.id}${size}">${
      typeof size === 'string' ? size.toUpperCase() : size
    }</label>
      </li>
    `;
  }

  _generateColorButton(data, color, category) {
    return `
      <li class="card__radio-item">
        <input class="color__radio" type="radio" name="color" id="${category}00${
      data.id
    }${color}" ${color === data.color.at(0) ? 'checked' : ''}>
        <label class="color__label color__label--sm" for="${category}00${
      data.id
    }${color}">
          <span class="color__type color__type--sm color__type--${color}"></span>
        </label> 
      </li>
    `;
  }
}
export default new CardView();
