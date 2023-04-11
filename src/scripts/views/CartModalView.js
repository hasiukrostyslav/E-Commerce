import View from './View';
import icons from '../../assets/svg/sprite.svg';
import { COLOR_SELECTED } from '../config';

class CartMovalView extends View {
  _modalEl = this._parentElement.querySelector('.modal--cart');
  _itemsAmountEl = this._modalEl.querySelector('.cart__heading-amount');
  _cartListEl = this._modalEl.querySelector('.cart__list');
  _totalPriceEl = this._modalEl.querySelector('.cart__total');
  _priceSelectEl = document.getElementById('size');
  _cartIconEl = this._parentElement.querySelector('.navigation__cart-link');

  constructor() {
    super();

    this._addHandlerOpenCart(this._openCart.bind(this));
  }

  _openCart(e) {
    const btnCart = e.target.closest('.navigation__cart-link');
    if (!btnCart) return;

    this._modalEl.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  _addHandlerOpenCart(handler) {
    this._navigationEl.addEventListener('click', handler);
  }

  addToCart(data, e) {
    const btn = e.target.closest('button[data-modal="cart"]');
    if (!btn) return;

    const card = e.target.closest('[data-article]');
    const { article } = card.dataset;
    const product = data.find((item) => item.article === +article);

    this._cartListEl.insertAdjacentHTML(
      'afterbegin',
      this._generateItemMarkup(
        product,
        card,
        this._getColor(card),
        this._getSize(card)
      )
    );

    this._addHandlerDeleteItem(this._deleteItem.bind(this));

    const itemsAmount = this._cartListEl.querySelectorAll('.cart__item').length;

    this._itemsAmountEl.textContent = itemsAmount;
    this._createCartBadge(itemsAmount);

    this._calculateTotalPrice();
  }

  _generateItemMarkup(data, card, color, size) {
    return `
          <li class="cart__item" data-article="${data.article}">
            <button class="btn--delete btn--delete-cart" type="button">
                <svg class="btn-delete__icon--sm">
                    <use
                        xlink:href="${icons}#delete"
                    ></use>
                </svg>
            </button>
            <div class="cart__item-container">
                <img
                    class="cart__img"
                    src="${data.images.at(0)}"
                    alt="sweatshirt"
                />
                <div class="cart__info">
                    <a
                        href="#"
                        class="order__name"
                        data-link="product"
                    >
                        ${data.description}
                    </a>
                    <p class="order__color">
                        Color:
                        <span class="order__color-value"
                            >${color}</span
                        >
                    </p>
                    <p class="order__size">
                      ${
                        size
                          ? `Size:
                      <span class="order__size-value"
                            >${size || '-'}</span
                        >
                      `
                          : ''
                      }  
                        
                    </p>
                    <div class="cart__price">
                        <div class="number__box">
                          <input
                              class="input input--small input--number-sm"
                              type="number"
                              name="number"
                              id="num-${data.article}${size}"
                              value="${this._getQuantity(card)}"
                              min="1"
                              max="10"
                              step="1"
                          />
                          <button
                            type="button"
                            class="number__btn number__btn--top number__btn--sm"
                          >
                            <svg class="input__icon input__icon--little caret-up">
                              <use
                                xlink:href="${icons}#select-up"
                              ></use>
                            </svg>
                            <svg class="input__icon input__icon--little caret-down">
                              <use
                                xlink:href="${icons}#select-down"
                              ></use>
                            </svg>
                          </button>
                        </div>
                        <p
                                class="card__price card__price--sm ${
                                  data.discountPercentage === 0
                                    ? ''
                                    : 'card__price--new'
                                }"
                            >${
                              data.discountPercentage === 0
                                ? this._priceFormatter(
                                    data.price * this._getQuantity(card)
                                  )
                                : this._priceFormatter(
                                    (data.price -
                                      (data.price * data.discountPercentage) /
                                        100) *
                                      this._getQuantity(card)
                                  )
                            }${
      data.discountPercentage !== 0 ? this._generateOldPrice(data, card) : ''
    }
                            </p>
                    </div>
                    <button type="button" class="btn cart__wishlist btn-wishlist-add">
                        Move to 
                        <svg class="wishlist__icon">
                            <use
                                xlink:href="${icons}#heart-outline"
                            ></use>
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    `;
  }

  _getQuantity(data) {
    return data.querySelector('.input--number-sm')
      ? data.querySelector('.input--number-sm').value
      : 1;
  }

  _getColor(data) {
    const colors = [...data.querySelectorAll('.color__label')];

    return colors
      .find((el) => getComputedStyle(el).borderColor === COLOR_SELECTED)
      .getAttribute('for')
      .split('--')
      .at(0)
      .split('-')
      .join(' ');
  }

  _getSize(data) {
    let size;
    if (data.querySelector('.select')) size = this._getSizeSelect();
    else size = this._getSizeCheckBox(data);

    if (!size) return;
    return size;
  }

  _getSizeCheckBox(data) {
    const sizes = [...data.querySelectorAll('.size__label')];
    if (sizes.length === 0) return;

    return sizes
      .find((el) => getComputedStyle(el).borderColor === COLOR_SELECTED)
      .getAttribute('for')
      .split('--')
      .map((size) => size.toUpperCase())
      .at(0);
  }

  // RENDER ERROR
  _getSizeSelect() {
    try {
      const sizes = [...this._priceSelectEl.querySelectorAll('option[value]')];
      if (sizes.length === 0) return;
      const size = sizes.find((el) => el.selected === true);
      if (!size) throw new Error('Pease select a size!');
      return size.value.toUpperCase();
    } catch (err) {
      console.error(err);
    }
  }

  _generateOldPrice(data, card) {
    return `<span class="card__price--old cart__price--old--sm">${this._priceFormatter(
      data.price * this._getQuantity(card)
    )}</span>`;
  }

  changeAmount(data, e) {
    if (!e.target.closest('.number__btn--top')) return;

    const item = data.find(
      (el) =>
        el.article === +e.target.closest('li[data-article]').dataset.article
    );

    const price =
      item.discountPercentage === 0
        ? item.price
        : item.price - (item.price * item.discountPercentage) / 100;

    const priceBox = e.target.closest('.cart__price');
    const priceEl = priceBox.querySelector('.card__price').firstChild;
    const priceOldEl = priceBox.querySelector('.card__price--old');

    if (e.target.closest('.caret-up')) {
      priceEl.textContent = this._priceFormatter(
        +priceEl.textContent.slice(1).split(',').join('') === price * 10
          ? price * 10
          : +priceEl.textContent.slice(1).split(',').join('') + price
      );
      if (priceOldEl)
        priceOldEl.textContent = this._priceFormatter(
          +priceOldEl.textContent.slice(1).split(',').join('') ===
            item.price * 10
            ? item.price * 10
            : +priceOldEl.textContent.slice(1).split(',').join('') + item.price
        );
    }
    if (e.target.closest('.caret-down')) {
      priceEl.textContent = this._priceFormatter(
        +priceEl.textContent.slice(1) === price
          ? price
          : +priceEl.textContent.slice(1).split(',').join('') - price
      );
      if (priceOldEl)
        priceOldEl.textContent = this._priceFormatter(
          +priceOldEl.textContent.slice(1) === item.price
            ? item.price
            : +priceOldEl.textContent.slice(1).split(',').join('') - item.price
        );
    }

    this._calculateTotalPrice();
  }

  _calculateTotalPrice() {
    this._totalPriceEl.textContent = this._priceFormatter(
      [...this._cartListEl.querySelectorAll('.card__price')]
        .map((price) => price.firstChild.textContent.slice(1))
        .reduce((acc, value) => acc + +value.split(',').join(''), 0)
    );
  }

  _deleteItem(e) {
    const btn = e.target.closest('.btn--delete');
    if (!btn) return;

    const item = e.target.closest('li');
    item.remove();

    this._itemsAmountEl.textContent =
      this._cartListEl.querySelectorAll('.cart__item').length;
    this._calculateTotalPrice();
  }

  _createCartBadge(cartItems) {
    const badgeEl = document.createElement('span');
    badgeEl.classList.add('navigation__cart-count');
    badgeEl.textContent = cartItems;
    // <span class="navigation__cart-count">4</span>
    this._cartIconEl.append(badgeEl);
  }

  _addHandlerDeleteItem(handler) {
    this._modalEl.addEventListener('click', handler);
  }

  addhandlerChangeAmount(handler) {
    this._modalEl.addEventListener('click', handler);
  }

  addHandlerAddToCart(handler) {
    this._parentElement.addEventListener('click', handler);
  }
}

export default new CartMovalView();
