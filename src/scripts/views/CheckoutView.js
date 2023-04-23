import View from './View';
import icons from '../../assets/svg/sprite.svg';
import {
  SHIPPING,
  DISCOUNT,
  HOURS,
  MINUTES,
  SECONDS,
  MILISECONDS,
} from '../config';

class CheckoutView extends View {
  _modalEl = this._parentElement.querySelector('.modal--cart');
  _signInEl = this._checkoutPageEl.querySelector('.checkout__sign-in');
  _listEl = this._checkoutPageEl.querySelector('.details__list');
  _itemslistEl = this._listEl.querySelector('[data-checkout="items"]');
  _addressEl = this._listEl.querySelector('[data-checkout="address"]');
  _shippingListEl = this._listEl.querySelector('[data-checkout="shipping"]');
  _paymentEl = this._listEl.querySelector('[data-checkout="payment"]');
  _inputCodeEl = this._checkoutPageEl.querySelector('.promocode__input');
  _btnApplyCodeEl = this._checkoutPageEl.querySelector('.promocode__btn');
  _summaryEl = this._checkoutPageEl.querySelector('.checkout__summary');
  _summaryCostsEl = this._checkoutPageEl.querySelector('.summary__costs');
  _shippingPriceEl = this._summaryEl.querySelector('[data-price="shipping"]');
  _discounPricetEl = this._summaryEl.querySelector('[data-price="discount"]');
  _totalPriceEl = this._summaryEl.querySelector('[data-price="total"]');
  _btnOrder = this._summaryEl.querySelector('.btn');

  constructor() {
    super();
    this._addHandlerDeleteItem(this._deleteItem.bind(this));
    this._addHandlerSelectShipping(this._selectShipping.bind(this));
    this._addHandlerApplyDiscount(this._applyDiscount.bind(this));
  }

  renderCheckoutPage() {
    this._modalEl.classList.add('hidden');
    this._overlay.classList.add('hidden');
    this._inputCodeEl.value = '';
    this._discounPricetEl.textContent = '';
    this._renderShippingMethod();
    this._renderItemsFromCart();
  }

  addHandlerRenderCheckoutPage(handler) {
    document
      .querySelector('[data-link="checkout"]')
      .addEventListener('click', handler);
  }

  // 1. Item Review
  _renderItemsFromCart() {
    const orderItems = [...this._modalEl.querySelectorAll('.cart__item')];
    if (this._itemslistEl.querySelector('[data-article]'))
      this._itemslistEl
        .querySelectorAll('[data-article]')
        .forEach((item) => item.remove());

    const markup = orderItems
      .map((item) => this._generateItemMarkup(item))
      .join('');
    this._itemslistEl.insertAdjacentHTML('afterbegin', markup);

    this._itemslistEl
      .querySelectorAll('.card__price')
      .forEach((price) => price.classList.add('details__price'));
    this._calculateSubtotalPrice();
    this._calculateTotalPrice();
  }

  _changeAmount(e) {
    if (!e.target.closest('.number__btn--top')) return;
    this._calculateSubtotalPrice();
    this._calculateTotalPrice();
  }

  _addHandlerChangeAmount(handler) {
    this._itemslistEl.addEventListener('click', handler);
  }

  _calculateSubtotalPrice() {
    this._subtotalPriceEl.forEach(
      (total) =>
        (total.textContent = this._priceFormatter(
          [...this._itemslistEl.querySelectorAll('.card__price')]
            .map((price) => price.firstChild.textContent.slice(1))
            .reduce((acc, value) => acc + +value.split(',').join(''), 0)
        ))
    );
  }

  _deleteItem(e) {
    const btn = e.target.closest('.btn--delete-lg');
    if (!btn) return;

    const item = e.target.closest('li');
    item.remove();
    [...this._modalEl.querySelectorAll('.cart__item')]
      .find((el) => el.dataset.article === item.dataset.article)
      .remove();
    this._createCartBadge(this._modalEl.querySelectorAll('.cart__item').length);
    this._modalEl.querySelector('.cart__heading-amount').textContent =
      this._modalEl.querySelectorAll('.cart__item').length;
    this._calculateSubtotalPrice();
    this._calculateTotalPrice();
    if (Number.parseInt(this._discounPricetEl.textContent.slice(1), 10))
      this._calculateDiscount();

    if (!this._itemslistEl.querySelector('[data-article]'))
      this._totalPriceEl.textContent = this._priceFormatter(0);
  }

  _addHandlerDeleteItem(handler) {
    this._itemslistEl.addEventListener('click', handler);
  }

  _generateItemMarkup(item) {
    return `
            <li class="details__subitem" data-article="${item.dataset.article}">
              <img class="cart__img details__img" src="${
                item.querySelector('img').src
              }" alt="${item.querySelector('img').alt}">

              <div>
                <a href="#" class="order__name details__name" data-link="product">
                ${item.querySelector('a').textContent}
                </a>
                <p class="order__color">
                  Color:
                  <span class="order__color-value">${
                    item.querySelector('.order__color-value').textContent
                  }</span>
                </p>
                <p class="order__size">
                ${
                  item.querySelector('.order__size-value')
                    ? `Size:
                  <span class="order__size-value">${
                    item.querySelector('.order__size-value').textContent
                  }</span>`
                    : ''
                }
                </p>
              </div>

              <div class="number__box details__num">
                <input class="input input--small input--number-sm" type="number" name="number" value="${
                  item.querySelector('input').value
                }" min="1"
                max="10" step="1">
                <button type="button" class="number__btn number__btn--top number__btn--sm">
                  <svg class="input__icon input__icon--little caret-up">
                    <use xlink:href="${icons}#select-up"></use>
                  </svg>
                  <svg class="input__icon input__icon--little caret-down">
                    <use xlink:href="${icons}#select-down"></use>
                  </svg>
                </button>
              </div>

              ${item.querySelector('.card__price').outerHTML}
              
              <div class="details__btns">
                <button type="button" class="btn btn--outline btn--small btn--delete-lg">
                  Delete
                </button>
                <button type="button" class="btn cart__wishlist btn-wishlist-add">
                  Move to
                  <svg class="wishlist__icon">
                    <use xlink:href="${icons}#heart-outline"></use>
                  </svg>
                </button>
              </div>
            </li>
    `;
  }

  // 2.Shipping  and Billing Address

  _renderShippingMethod() {
    // 3.Shipping Method
    this._shippingListEl.innerHTML = '';
    const markup = SHIPPING.map((type, i) =>
      this._generateShippingMarkup(type, i)
    ).join('');
    this._shippingListEl.insertAdjacentHTML('afterbegin', markup);
    this._shippingPriceEl.textContent = this._getShippingPrice();
  }

  _getShippingPrice() {
    const input = [...this._shippingListEl.querySelectorAll('input')].find(
      (el) => el.checked === true
    );

    return input.closest('li').querySelector('.details__delivery-price')
      .textContent;
  }

  _getEstimatedDay(day) {
    const today = Date.now();
    const days = day * HOURS * MINUTES * SECONDS * MILISECONDS;
    const estimatedDay = new Date(today + days);

    const formatDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
    });

    return formatDate.format(estimatedDay);
  }

  _generateShippingMarkup(data, i) {
    return `
            <li class="details__method">
              <div>
                <div class="details__radio">
                  <input class="radio__input" type="radio" name="delivery" id="shipping-${
                    i + 1
                  }" ${i === 0 ? 'checked' : ''}>

                  <label for="shipping-${
                    i + 1
                  }" class="radio__label"><span class="radio__mark">&nbsp;</span>
                    ${data.type}
                  </label>
                </div>
                <p class="details__date">${data.text} ${
      data.day ? this._getEstimatedDay(data.day) : ''
    } ${data?.time || ''}</p>
              </div>
              <span class="details__delivery-price">${
                data.price === 0 ? 'Free' : this._priceFormatter(data.price)
              }</span>
            </li>
    `;
  }

  _selectShipping(e) {
    const label = e.target.closest('label');
    if (!label) return;

    const price = label
      .closest('li')
      .querySelector('.details__delivery-price').textContent;

    this._shippingPriceEl.textContent =
      price === 'Free' ? this._priceFormatter(0) : price;

    this._calculateTotalPrice();
  }

  _addHandlerSelectShipping(handler) {
    this._shippingListEl.addEventListener('click', handler);
  }

  _applyDiscount(e) {
    e.preventDefault();
    if (this._inputCodeEl.value !== DISCOUNT.promoCode) return;

    this._calculateDiscount();
    this._calculateTotalPrice();
    this._inputCodeEl.value = '';
  }

  _calculateDiscount() {
    this._discounPricetEl.textContent = this._priceFormatter(
      +this._subtotalPriceEl.at(1).textContent.slice(1).split(',').join('') *
        DISCOUNT.discount
    );
  }

  _addHandlerApplyDiscount(handler) {
    this._btnApplyCodeEl.addEventListener('click', handler);
  }
}
export default new CheckoutView();
