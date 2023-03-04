import View from './View';
import icons from '../../assets/svg/sprite.svg';
import data from '../data';

const img = data.catalog.at(13);
console.log(img);

class CardView extends View {
  _iconAdd = `<use xlink:href="${icons}#heart-filled"></use>`;
  _iconRemove = `<use xlink:href="${icons}#heart-outline"></use>`;
  constructor() {
    super();

    this.addHandlerMoveToWishlist();
    // this._render();
  }

  _moveToWishlist(e) {
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

  addHandlerMoveToWishlist() {
    this._parentElement.addEventListener(
      'click',
      this._moveToWishlist.bind(this)
    );
  }

  _render() {
    const div = document
      .querySelector('.sale')
      .querySelector('.carousel__cards');
    div.innerHTML = '';
    div.insertAdjacentHTML('afterbegin', this._generateCardMarkup());
    div.insertAdjacentHTML('afterbegin', this._generateCardMarkup());
  }

  _generateCardMarkup() {
    return `
      <div class="card">
        <img src="${img.images}" alt="Photo of ${
      img.title
    }" class="card__img card__img--large">
      
        <div class="card__details card__details--current">
          <a href="#" class="card__heading" data-link="product">${
            img.description
          }</a>
          <p class="card__price card__price--large">&dollar;120.60</p>
          <p class="card__price card__price--regular card__price--new">&dollar;${
            img.price - Math.round(img.price / img.discountPercentage[0])
          }<span class="card__price--old card__price--old-lg">&dollar;${
      img.price
    }</span></p>
        
          <form action="#" class="card__form">
            <ul class="card__radio-list">
              <li class="card__radio-item">
                <input class="size__radio" type="radio" name="size" id="36">
                <label class="size__label" for="36">36</label>
              </li>
              <li class="card__radio-item">
                <input class="size__radio" type="radio" name="size" id="37" checked>
                  <label class="size__label" for="37">37</label>
              </li>
              <li class="card__radio-item">
                <input class="size__radio" type="radio" name="size" id="38">
                  <label class="size__label" for="38">38</label>
              </li>
              <li class="card__radio-item"> 
                <input class="size__radio" type="radio" name="size" id="39">
                <label class="size__label" for="39">39</label>
              </li>
              <li class="card__radio-item">
                <input class="size__radio" type="radio" name="size" id="40">
                <label class="size__label" for="40">40</label>
              </li>
            </ul>

            <ul class="card__radio-list">
              <li class="card__radio-item">
                <input class="color__radio" type="radio" name="color" id="black-1" checked>
                <label class="color__label color__label--sm" for="black-1">&nbsp;
                  <span class="color__type color__type--sm color__type--black">&nbsp;</span>
                </label>
              </li>
              <li class="card__radio-item">
                <input class="color__radio" type="radio" name="color" id="brown-2">
                <label class="color__label color__label--sm" for="brown-2">&nbsp;
                  <span class="color__type color__type--sm color__type--brown">&nbsp;</span>
                </label>
              </li>
              <li class="card__radio-item">
                <input class="color__radio" type="radio" name="color" id="blue-gray-2">
                <label class="color__label color__label--sm" for="blue-gray-2">&nbsp;
                  <span class="color__type color__type--sm color__type--blue-gray">&nbsp;</span>
                </label>
              </li>
            </ul>
          </form>
        
          <button type="button" class="btn btn--solid btn--medium btn--sale btn__cart modal-open" data-modal="cart">
            <svg class="sale__icon-cart">
              <use xlink:href="${icons}#cart"></use>
            </svg>
            Add to cart
          </button>
        </div>
        
        <div class="card__btns-container">
          <p class="sale__percent">-20%</p>
        
          <div class="rating rating--card">
            <svg class="rating__icon">
              <use xlink:href="${icons}#star-filled">
              </use>
            </svg>
            <svg class="rating__icon">
              <use xlink:href="${icons}#star-filled">
              </use>
            </svg>
            <svg class="rating__icon">
              <use xlink:href="${icons}#star-filled">
              </use>
            </svg>
            <svg class="rating__icon">
              <use xlink:href="${icons}#star-filled">
              </use>
            </svg>
            <svg class="rating__icon">
              <use xlink:href="${icons}#star-filled">
              </use>
            </svg>              
          </div>
        
          <button class="card__btn-wishlist card__btn-wishlist--large btn-wishlist-add">
            <svg class="wishlist__icon">
              <use xlink:href="${icons}#heart-outline">
              </use>
            </svg>
          </button>
        
          <button type="button" class="card__btn card__btn--prev card__btn--large">
            <svg class="card__icon-arr card__icon--prev">
              <use xlink:href="${icons}#left-chevron">
              </use>
            </svg>
          </button>

          <button type="button" class="card__btn card__btn--next card__btn--large">
            <svg class="card__icon-arr card__icon--next">
              <use xlink:href="${icons}#right-chevron">
              </use>
            </svg>
          </button> 
        </div>   
      </div>
    `;
  }
}
export default new CardView();
