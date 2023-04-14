import View from './View';
import icons from '../../assets/svg/sprite.svg';
import { COLOR_SELECTED, ERROR } from '../config';

class CartMovalView extends View {
  _modalEl = this._parentElement.querySelector('.modal--cart');
  _headingContainerEl = this._modalEl.querySelector('.cart__heading');
  _cartInfoEl = this._modalEl.querySelector('.cart__info');
  _bottomEl = this._modalEl.querySelector('.cart__checkout');
  _itemsAmountEl = this._modalEl.querySelector('.cart__heading-amount');
  _cartListEl = this._modalEl.querySelector('.cart__list');
  _totalPriceEl = this._modalEl.querySelector('.cart__total');
  _priceSelectEl = document.getElementById('size');
  _cartIconEl = this._parentElement.querySelector('.navigation__cart-link');

  constructor() {
    super();

    this._addHandlerOpenCart(this._openCart.bind(this));
    this._addHandlerHoverCartLink(this._hoverCartLink.bind(this));
    this._addHandlerLeaveCartLink(this._leaveCartLink.bind(this));
    this._addHandlerDeleteItem(this._deleteItem.bind(this));
  }

  _openCart(e) {
    const btnCart = e.target.closest('[data-modal="cart"]');
    if (!btnCart) return;

    this._modalEl.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
    this._addScrollBar();
  }

  _addHandlerOpenCart(handler) {
    this._navigationEl.addEventListener('click', handler);
  }

  _hoverCartLink(e) {
    const cart = e.target;

    const badge = cart.querySelector('span');
    if (badge) return;

    this._cartIconEl.dataset.modal = '';
    this._cartIconEl.style.cursor = 'default';
    const text = document.createElement('div');
    text.textContent = ERROR.emptyCart;
    text.classList.add('cart__empty');
    cart.append(text);
  }

  _leaveCartLink() {
    if (this._cartIconEl.querySelector('.cart__empty'))
      this._cartIconEl.querySelector('.cart__empty').remove();
    this._cartIconEl.style.cursor = '';
    this._cartIconEl.dataset.modal = 'cart';
  }

  _addHandlerHoverCartLink(handler) {
    this._cartIconEl.addEventListener('mouseenter', handler);
  }

  _addHandlerLeaveCartLink(handler) {
    this._cartIconEl.addEventListener('mouseleave', handler);
  }

  addToCart(data, e) {
    try {
      const btn = e.target.closest('button[data-cart="add"]');
      if (!btn) return;

      const card = e.target.closest('[data-article]');
      const { article } = card.dataset;
      const product = data.find((item) => item.article === +article);

      if (this._productPageEl.querySelector('.select__warning'))
        this._productPageEl.querySelector('.select__warning').remove();

      this._cartListEl.insertAdjacentHTML(
        'afterbegin',
        this._generateItemMarkup(
          product,
          card,
          this._getColor(card),
          this._getSize(card)
        )
      );

      this._countItems();
      this._calculateTotalPrice();
    } catch (err) {
      const errorEl = document.createElement('span');
      errorEl.classList.add('select__warning');
      errorEl.dataset.warning = 'size';
      errorEl.textContent = new Error(ERROR.size).message;
      this._productPageEl.querySelector('.size__select').append(errorEl);
    }
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

  _addScrollBar() {
    const modalHeight = Number.parseInt(
      window.getComputedStyle(this._modalEl).height,
      10
    );
    const topHeight = Number.parseInt(
      window.getComputedStyle(this._headingContainerEl).height,
      10
    );
    const bottomHeight = Number.parseInt(
      window.getComputedStyle(this._bottomEl).height,
      10
    );

    this._cartListEl.style.height = `${
      modalHeight - topHeight - bottomHeight
    }px`;

    const cartItemsHeight = [...this._modalEl.querySelectorAll('.cart__item')]
      .map((el) => Number.parseInt(window.getComputedStyle(el).height, 10))
      .reduce((acc, height) => acc + +height, 0);

    if (
      cartItemsHeight >
      Number.parseInt(window.getComputedStyle(this._cartListEl).height, 10)
    )
      this._cartListEl.style.overflowY = 'scroll';
    else this._cartListEl.style.overflowY = '';
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
    try {
      let size;
      if (data.querySelector('.select')) size = this._getSizeSelect();
      else size = this._getSizeCheckBox(data);

      return size;
    } catch (err) {
      this._modalEl.classList.add('hidden');
      this._overlay.classList.add('hidden');
      throw err;
    }
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

  _getSizeSelect() {
    try {
      const sizes = [...this._priceSelectEl.querySelectorAll('option[value]')];
      if (sizes.length === 0) return;
      const size = sizes.find((el) => el.selected === true);
      return size.value.toUpperCase();
    } catch (err) {
      throw new Error(ERROR.size);
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
      // NEED TO BE FIXED
      this._countItems();
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
      // NEED TO BE FIXED
      this._countItems();
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

    const { length } = this._cartListEl.querySelectorAll('.cart__item');

    this._itemsAmountEl.textContent = length;
    this._calculateTotalPrice();
    this._createCartBadge(length);
    this._addScrollBar();
    // this._countItems();
  }

  _createCartBadge(itemsAmount) {
    const badge = this._cartIconEl.querySelector('.navigation__cart-count');
    if (badge && itemsAmount !== 0) badge.textContent = itemsAmount;

    if (!badge) {
      const badgeEl = document.createElement('span');
      badgeEl.classList.add('navigation__cart-count');
      badgeEl.textContent = itemsAmount;
      this._cartIconEl.append(badgeEl);
    }

    if (badge && itemsAmount === 0) badge.remove();
  }

  _countItems() {
    const itemsAmount = [
      ...this._cartListEl.querySelectorAll('.input--number-sm'),
    ]
      .map((num) => num.value)
      .reduce((acc, amount) => acc + +amount, 0);

    this._itemsAmountEl.textContent = itemsAmount;
    this._createCartBadge(itemsAmount);
  }

  _addHandlerDeleteItem(handler) {
    this._modalEl.addEventListener('click', handler);
  }

  addHandlerChangeAmount(handler) {
    this._modalEl.addEventListener('click', handler);
  }

  addHandlerAddToCart(handler) {
    this._parentElement.addEventListener('click', handler);
  }
}

export default new CartMovalView();
