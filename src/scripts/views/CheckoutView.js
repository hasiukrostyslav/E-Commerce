import View from './View';
import icons from '../../assets/svg/sprite.svg';

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
  _shippingPriceEl = this._summaryEl.querySelector('[data-price="shipping"]');
  _discounPricetEl = this._summaryEl.querySelector('[data-price="discount"]');
  _totalPriceEl = this._summaryEl.querySelector('[data-price="total"]');
  _btnOrder = this._summaryEl.querySelector('.btn');

  constructor() {
    super();
    this._addHandlerDeleteItem(this._deleteItem.bind(this));
  }

  renderCheckoutPage(data) {
    this._modalEl.classList.add('hidden');
    this._overlay.classList.add('hidden');
    this._renderItemsFromCart();
  }

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
    this._calculateTotalPrice();
  }

  _changeAmount(e) {
    if (!e.target.closest('.number__btn--top')) return;
    this._calculateTotalPrice();
  }

  _addHandlerChangeAmount(handler) {
    this._itemslistEl.addEventListener('click', handler);
  }

  _calculateTotalPrice() {
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
    this._calculateTotalPrice();
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

  addHandlerRenderCheckoutPage(handler) {
    document
      .querySelector('[data-link="checkout"]')
      .addEventListener('click', handler);
  }
}
export default new CheckoutView();
