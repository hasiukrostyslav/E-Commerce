import View from './View';
import icons from '../../assets/svg/sprite.svg';
// prettier-ignore
import { SHIPPING, DISCOUNT, HOURS, MINUTES, SECONDS, MILISECONDS, COLOR_SELECTED, } from '../config';

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
  _discountPriceEl = this._summaryEl.querySelector('[data-price="discount"]');
  _totalPriceEl = this._summaryEl.querySelector('[data-price="total"]');
  _subtotalPrices = this._summaryEl.querySelectorAll('[data-price="subtotal"]');
  _btnOrder = this._summaryEl.querySelector('.btn');
  _signInBlockEl = this._checkoutPageEl.querySelector('.checkout__sign-in');
  _form = this._checkoutPageEl.querySelector('.checkout__form');
  _inputFirstName = document.getElementById('first-name-delivery');
  _inputLastName = document.getElementById('last-name-delivery');
  _inputEmail = document.getElementById('email-delivery');
  _inputPhone = document.getElementById('phone-delivery');
  _selectCountry = document.getElementById('country-delivery');
  _selectCity = document.getElementById('city-delivery');
  _inputAddress = document.getElementById('address-delivery');
  _inputCode = document.getElementById('code-delivery');
  _inputCardNum = document.getElementById('card-num');
  _inputCardDate = document.getElementById('card-date');
  _inputCardCVC = document.getElementById('card-cvc');
  _paymentTypes = [...this._checkoutPageEl.querySelectorAll('.radio__mark')];
  _codeContainer = this._checkoutPageEl.querySelector('.details__card-wrapper');
  _cardNumContainer = this._checkoutPageEl.querySelector('.details__card-num');
  _otherInfo = document.getElementById('notes');
  _paymentInputsBox = this._checkoutPageEl.querySelector(
    '[data-payment="card"]'
  );

  constructor() {
    super();
    this._addHandlerDeleteItem(this._deleteItem.bind(this));
    this._addHandlerSelectShipping(this._selectShipping.bind(this));
    this._addHandlerApplyDiscount(this._applyDiscount.bind(this));
    this._addHandlerCreditCardFill();
  }

  renderCheckoutPage(users, cities) {
    this._modalEl.classList.add('hidden');
    this._overlay.classList.add('hidden');
    this._discountPriceEl.textContent = this._priceFormatter(0);
    this._clearInputs(this._form);
    this._renderShippingMethod();
    this._renderItemsFromCart();
    this._fillInputData(users, cities);
    this._addHandlerDigitValidation();
  }

  addHandlerRenderCheckoutPage(handler) {
    document
      .querySelector('[data-link="checkout"]')
      .addEventListener('click', handler);
  }

  toggleSignInBlock(users, cities, display = 'block') {
    if (display === 'hidden') this._signInBlockEl.classList.add('hidden');
    else this._signInBlockEl.classList.remove('hidden');

    if (!this._checkoutPageEl.classList.contains('hidden'))
      this._fillInputData(users, cities);
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
    if (Number.parseInt(this._discountPriceEl.textContent.slice(1), 10))
      this._calculateDiscount();

    if (!this._itemslistEl.querySelector('[data-article]'))
      this._clearCheckoutPage();
  }

  _clearCheckoutPage() {
    this._shippingPriceEl.textContent = this._priceFormatter(0);
    this._discountPriceEl.textContent = this._priceFormatter(0);
    this._totalPriceEl.textContent = this._priceFormatter(0);
    this._subtotalPrices.forEach(
      (price) => (price.textContent = this._priceFormatter(0))
    );
    this._clearInputs(this._form);
    this._deleteAllItems();
    this._hideCheckoutPage();
  }

  _deleteAllItems() {
    this._itemslistEl
      .querySelectorAll('[data-article]')
      .forEach((item) => item.remove());
  }

  _hideCheckoutPage() {
    this._headerEl.classList.remove('hidden');
    this._homePageEl.classList.remove('hidden');
    this._checkoutPageEl.classList.add('hidden');
    this._breadcrumbEl.classList.add('hidden');
  }

  _clearCart() {
    this._modalEl.querySelectorAll('.cart__item').forEach((el) => el.remove());
    this._createCartBadge(this._modalEl.querySelectorAll('.cart__item').length);

    this._modalEl.querySelector('.cart__heading-amount').textContent =
      this._modalEl.querySelectorAll('.cart__item').length;
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
                  <svg class="wishlist__icon ${
                    item.querySelector('.wishlist__icon--filled')
                      ? 'wishlist__icon--filled'
                      : ''
                  }">
                    <use xlink:href="${icons}#heart-${
      item.querySelector('.wishlist__icon--filled') ? 'filled' : 'outline'
    }"></use>
                  </svg>
                </button>
              </div>
            </li>
    `;
  }

  // 2.Shipping and Billing Address
  _fillInputData(users, cities) {
    const userEl = this._navigationEl.querySelector('.user-profile');
    if (!userEl.dataset.id) return;

    const { id } = userEl.dataset;
    const user = users.find((el) => el.id === +id);

    document.getElementById('first-name-delivery').value = user.firstName;
    document.getElementById('last-name-delivery').value = user.lastName;
    document.getElementById('email-delivery').value = user.email;
    document.getElementById('phone-delivery').value = user.phone || '';
    document.getElementById('address-delivery').value = user.address || '';
    document.getElementById('code-delivery').value = user.zipCode || '';
    document.getElementById('country-delivery').value = user.country || '';
    this._renderSelectCity(
      document.getElementById('city-delivery'),
      document.getElementById('country-delivery').value,
      cities
    );
    document.getElementById('city-delivery').value = user.city || '';
  }

  // 3.Shipping Method
  _renderShippingMethod() {
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
    this._discountPriceEl.textContent = this._priceFormatter(
      +this._subtotalPriceEl.at(1).textContent.slice(1).split(',').join('') *
        DISCOUNT.discount
    );
  }

  _addHandlerApplyDiscount(handler) {
    this._btnApplyCodeEl.addEventListener('click', handler);
  }

  createOrder(orderId, e) {
    e.preventDefault();
    this._removeInputWarnings(this._form);
    const items = this._getOrderItems();
    const order = this._dataValidation();
    if (!order) {
      this._scrolToWarning();
      return;
    }

    const cardValid = this._paymentValidation();
    if (!cardValid) {
      this._scrolToWarning();
      return;
    }

    const orderInfo = this._getOrderInfo(orderId);

    order.orders = orderInfo;
    order.orders.items = items;

    this._showModalPopup('checkout');
    this._clearCart();
    setTimeout(this._clearCheckoutPage.bind(this), 2000);

    return order;
  }

  _scrolToWarning() {
    const warning = this._checkoutPageEl.querySelector('.input__warning');
    warning.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }

  _getOrderInfo(orderId) {
    const id = orderId;
    const date = new Date().toISOString();
    const deliveryType = this._getDeliveryType();
    const shippingPrice = +this._shippingPriceEl.textContent.slice(1);
    const subTotalPrice = +this._checkoutPageEl
      .querySelector('[data-price="subtotal"]')
      .textContent.slice(1);
    const discount = +this._discountPriceEl.textContent.slice(1);
    const discountPrice =
      discount === 0 ? 0 : Math.trunc((discount * 100) / subTotalPrice);

    const order = {
      id,
      date,
      status: 'progress',
      deliveryType,
      shippingPrice,
      discountPrice,
      additionalInfo: this._otherInfo.value || '',
    };
    return order;
  }

  _getDeliveryType() {
    const type = [...this._shippingListEl.querySelectorAll('.radio__mark')]
      .find((mark) => getComputedStyle(mark).borderColor === COLOR_SELECTED)
      .closest('label')
      .lastChild.textContent.trim();
    return type;
  }

  _getOrderItems() {
    const itemsEl = this._itemslistEl.querySelectorAll('[data-article]');
    const items = [];
    itemsEl.forEach((el) => {
      const article = +el.dataset.article;
      const title = el.querySelector('img').alt.trim();
      const description = el.querySelector('.order__name').textContent.trim();
      const quantity = +el.querySelector('[name="number"]').value;
      const price = +(
        Number.parseFloat(
          el.querySelector('.card__price').firstChild.textContent.slice(1)
        ) / quantity
      ).toFixed(2);

      const size = el.querySelector('.order__size-value')
        ? el.querySelector('.order__size-value').textContent.toLowerCase()
        : '';

      const color = el
        .querySelector('.order__color-value')
        .textContent.replace(' ', '-');
      const images = `catalog${
        el.querySelector('img').src.match(/-\d{1,2}/)[0]
      }.jpg`;
      const item = {
        article,
        title,
        description,
        price,
        quantity,
        size,
        color,
        images,
      };
      items.push(item);
    });
    return items;
  }

  _dataValidation() {
    const firstName = this._namesValidation(this._inputFirstName, this._form);
    if (!firstName) return;

    const lastName = this._namesValidation(this._inputLastName, this._form);
    if (!lastName) return;

    const email = this._globalEmailValidation(
      this._inputEmail,
      this._form,
      this._inputEmail
    );
    if (!email) return;

    const phone = this._phoneValidation(this._inputPhone, this._form, true);
    if (!phone) return;
    const country = this._selectValidation(this._selectCountry, this._form);
    if (!country) return;
    const city = this._selectValidation(this._selectCity, this._form);
    if (!city) return;
    const address = this._addressValidation(
      this._inputAddress,
      this._form,
      true
    );
    if (!address) return;
    const zipCode = this._zipCodeValidation(this._inputCode, this._form);

    const validData = {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      address,
      zipCode: +zipCode || '',
    };
    return validData;
  }

  _paymentValidation() {
    const selectedType = this._paymentTypes
      .find((mark) => getComputedStyle(mark).borderColor === COLOR_SELECTED)
      .closest('li');

    if (selectedType.dataset.payment !== 'card')
      return selectedType.dataset.payment;

    const creditCardNum = this._creditCardValidation();
    if (!creditCardNum) return;
    const expiryDate = this._cardDateValidation();
    if (!expiryDate) return;
    const cvc = this._cvcValidation();
    if (!cvc) return;

    if (creditCardNum && expiryDate && cvc) return selectedType.dataset.payment;
  }

  _creditCardValidation() {
    const { value } = this._inputCardNum;
    if (!value || value.length !== 19) {
      this._renderWarning(this._inputCardNum, this._inputCardNum.dataset.input);
      this._showWarning(this._cardNumContainer, this._inputCardNum);
    } else {
      this._inputCardNum.classList.remove('input--invalid');
      return +value.replaceAll(' ', '');
    }
  }

  _addHandlerCreditCardFill() {
    this._inputCardNum.addEventListener('keyup', (e) => {
      const valuesOfInput = e.target.value;
      e.target.value = valuesOfInput.replace(
        /(\d{4})(\d{4})(\d{4})(\d{0,4})/,
        '$1 $2 $3 $4'
      );
    });

    this._inputCardDate.addEventListener('keyup', (e) => {
      const valuesOfInput = e.target.value;
      e.target.value = valuesOfInput.replace(/(\d{2})(\d{2})/, '$1/$2');
    });
  }

  _cardDateValidation() {
    const { value } = this._inputCardDate;
    if (!value || value.length !== 5) {
      this._renderWarning(
        this._inputCardDate,
        this._inputCardDate.dataset.input
      );
      this._showWarning(this._codeContainer, this._inputCardDate);
    }
    if (value.length === 5) {
      const [month, year] = value
        .split('/')
        .map((num, i) => (i === 1 ? 20 + num : num));
      const currentYear = new Date().getFullYear();
      if (
        +month < 1 ||
        +month > 12 ||
        +year < currentYear ||
        +year > currentYear + 10
      ) {
        this._renderWarning(
          this._inputCardDate,
          this._inputCardDate.dataset.input
        );
        this._showWarning(this._codeContainer, this._inputCardDate);
      } else {
        this._inputCardDate.classList.remove('input--invalid');
        return value;
      }
    }
  }

  _cvcValidation() {
    if (this._inputCardCVC.value.length !== 3) {
      this._renderWarning(this._inputCardCVC, this._inputCardCVC.dataset.input);
      this._showWarning(this._codeContainer, this._inputCardCVC);
    } else {
      this._inputCardCVC.classList.remove('input--invalid');
      return +this._inputCardCVC.value;
    }
  }

  _addHandlerDigitValidation() {
    this._paymentInputsBox
      .querySelectorAll('input[type="tel"]')
      .forEach((input) =>
        input.addEventListener('keydown', (e) => {
          if (e.key.match(/^[^0-9]$/)) return e.preventDefault();
        })
      );
  }

  addHandlerCreateOrder(handler) {
    this._form.addEventListener('submit', handler);
  }
}
export default new CheckoutView();
