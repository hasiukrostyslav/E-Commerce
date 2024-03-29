import View from './View';
import icons from '../../assets/svg/sprite.svg';
import { ACCOUNT_TEXT, NUMBER_OF_ITEMS, NUMBER_OF_ORDERS } from '../config';

class AccountView extends View {
  _tabs = document.querySelector('.account__list');
  _currentTab = document.querySelector('.account__item--current');
  _pages = document.querySelectorAll('.account__block');
  _currentPage = document.querySelector('.account__wishlist');
  _accordionContainer = document.querySelector('.order__accordion');
  _wishlistEl = document.querySelector('.account__wishlist');
  _wishlistBoxEl = document.querySelector('.account__wishlist-container');
  _wishlistBadge = document.querySelector('.account__wishlist-badge');
  _wishlistTopBadge = document.querySelector('.navigation__like-count');
  _profilePageEl = document.querySelector('section[data-account="profile"]');
  _ordersPageEl = document.querySelector('section[data-account="orders"]');
  _viewedPageEl = document.querySelector('section[data-account="view"]');
  _reviewPageEl = document.querySelector('section[data-account="review"]');
  _viewedListEl = document.querySelector('.account__viewed');
  _reviewsListEl = document.querySelector('.comment');
  _userProfileIcon = document.querySelector('.user-profile');
  _btnsDeleteAll = [...this._accountPageEl.querySelectorAll('.btn--delete')];
  _selectFormsEl = [...this._accountPageEl.querySelectorAll('.sort__form')];
  _btnDeleteAccount = this._profilePageEl.querySelector('.btn--delete');
  _profileInputsForm = document.querySelector('.account__form');
  _profileInputs = this._profileInputsForm.querySelectorAll('.input');
  _btnSaveProfile = this._profileInputsForm.querySelector('.btn');
  _inputFirstName = document.getElementById('first-name');
  _inputLastName = document.getElementById('last-name');
  _inputEmail = document.getElementById('profile-email');
  _inputPhone = document.getElementById('phone-profile');
  _inputAddress = document.getElementById('address');
  _inputCode = document.getElementById('code');
  _selectCountry = document.getElementById('country');
  _selectCity = document.getElementById('city');
  _inputNewPass = document.getElementById('profile-new-pass');
  _inputPassConfirm = document.getElementById('profile-confirm-pass');
  _iconAdd = `<use xlink:href="${icons}#heart-filled"></use>`;
  _iconRemove = `<use xlink:href="${icons}#heart-outline"></use>`;

  constructor() {
    super();
    this._addHandlerAccordion();
    this._addHandlerLoadSpinner();
    this._addHandlerOpenTrackPage();
    this._setObserver(this._renderBreadcrumb.bind(this));
  }

  renderAccountData(user, reviews, cities) {
    this._renderProfileData(user, cities);
    this.renderOrders(user);
    this.renderWishlist(user);
    this.renderViewedList(user);
    this.renderReviews(reviews);
  }

  // PROFILE
  _renderProfileData(data, cities) {
    document.querySelector(
      '.account__user-name'
    ).textContent = `${data.firstName} ${data.lastName}`;

    document.querySelector('.account__user-email').textContent = data.email;
    this._fillInputs(data, cities);
    this._addHandlerActivateSaveButton();
    this._addHandlerChangeTabs(data, cities);
    this._addHandlerOpenAccountPages(data, cities);
  }

  _fillInputs(data, cities) {
    this._inputFirstName.value = data.firstName;
    this._inputLastName.value = data.lastName;
    this._inputEmail.value = data.email;
    this._inputPhone.value = data.phone || '';
    this._inputAddress.value = data.address || '';
    this._inputCode.value = data.zipCode || '';
    this._selectCountry.value = data.country || '';

    if (data.country)
      this._renderSelectCity(
        this._selectCity,
        this._selectCountry.value,
        cities
      );

    this._selectCity.value = data.city || '';
  }

  _clearProfilePage() {
    this._clearInputs(this._profileInputsForm);
    document.querySelector('.account__user-name').textContent = 'User name';
    document.querySelector('.account__user-email').textContent = 'User email';
  }

  getUserId() {
    return +this._userProfileIcon.dataset.id;
  }

  _activateSaveButton() {
    this._btnSaveProfile.classList.remove('btn--idle');
  }

  _disableSaveButton() {
    this._btnSaveProfile.classList.add('btn--idle');
  }

  _addHandlerActivateSaveButton() {
    this._profileInputs.forEach((input) =>
      input.addEventListener('change', this._activateSaveButton.bind(this))
    );
  }

  updateProfileData(user, e) {
    e.preventDefault();
    if (this._btnSaveProfile.classList.contains('btn--idle')) return;
    this._removeInputWarnings(this._profileInputsForm);
    const updateData = this._validationProfileData(user);
    if (!updateData) return;
    this._showModalPopup('saveChanges');
    this._disableSaveButton();
    this._inputNewPass.value = '';
    this._inputPassConfirm.value = '';
    return updateData;
  }

  _validationProfileData(user) {
    const firstName = this._namesValidation(
      this._inputFirstName,
      this._profileInputsForm
    );
    if (!firstName) return;

    const lastName = this._namesValidation(
      this._inputLastName,
      this._profileInputsForm
    );
    if (!lastName) return;

    const email = this._globalEmailValidation(
      this._inputEmail,
      this._profileInputsForm,
      this._inputEmail
    );
    if (!email) return;

    let phone = this._phoneValidation(
      this._inputPhone,
      this._profileInputsForm
    );
    if (!phone && this._inputPhone.value) return;
    if (!phone && !this._inputPhone.value) phone = '';

    let password = this._passValidation(user);
    if (!password && this._inputNewPass.value) return;
    if (!password && !this._inputNewPass.value) password = '';

    const confirmPass = this._passConfirmValidation(
      this._inputPassConfirm,
      password,
      this._profileInputsForm
    );
    if (
      (!confirmPass &&
        this._inputPassConfirm.value &&
        this._inputNewPass.value) ||
      (!confirmPass &&
        this._inputPassConfirm.value &&
        !this._inputNewPass.value) ||
      password !== confirmPass
    )
      return;

    const country = this._selectCountry.value;
    const city = this._selectCity.value;
    let address = this._addressValidation(
      this._inputAddress,
      this._profileInputsForm
    );
    if (!address && this._inputAddress.value) return;
    if (!address && !this._inputAddress.value) address = '';

    let zipCode = this._zipCodeValidation(
      this._inputCode,
      this._profileInputsForm
    );
    if (!zipCode && this._inputCode.value) return;
    if (!zipCode && !this._inputCode.value) zipCode = '';

    const validData = {
      firstName,
      lastName,
      email,
      phone,
      password: password || user.password,
      country,
      city,
      address,
      zipCode: +zipCode,
    };
    return validData;
  }

  _passValidation(user) {
    if (
      (this._inputNewPass.value.length < 6 &&
        this._inputNewPass.value.length > 0) ||
      this._inputNewPass.value === user.password
    ) {
      this._renderWarning(this._inputNewPass, this._inputNewPass.dataset.input);
      this._showWarning(this._profileInputsForm, this._inputNewPass);
    } else {
      this._inputNewPass.classList.remove('input--invalid');
      return this._inputNewPass.value.trim();
    }
  }

  addHandlerUpdateProfileData(handler) {
    this._profileInputsForm.addEventListener('submit', handler);
  }

  // ORDERS
  renderOrders(dataOrders, type = 'orders') {
    this._clearOrderPage();
    this._activateSelect(type);
    this._removeSpinner(this._ordersPageEl);

    const markup = dataOrders.orders
      .map((order, i, arr) => this._generateOrderMarkup(order, i, arr))
      .reverse()
      .join('');
    this._accordionContainer.insertAdjacentHTML('afterbegin', markup);
    this._addHandlerSortOrders(this._sortOrders.bind(this));

    if (dataOrders.orders.length === 0) {
      this._accordionContainer.append(this._createHeading(type));
      this._disableSelect(type);
    }

    this._addOrdersHiddenClass();
  }

  _addOrdersHiddenClass(status = 'all') {
    const orders = [
      ...this._accordionContainer.querySelectorAll('.order__panel'),
    ].filter((el) =>
      status === 'all' ? el : el.dataset.orderStatus === status
    );

    orders.forEach((el, i) => {
      if (i >= NUMBER_OF_ORDERS) el.classList.add('hidden');
    });

    if (orders.filter((el) => el.classList.contains('hidden')).length > 0)
      this._accordionContainer.insertAdjacentHTML(
        'afterend',
        this._generateSpinner()
      );
  }

  _generateOrderMarkup(order, i, arr) {
    return `
    <li class="order__panel ${
      i === arr.length - 1 ? 'u-padding-top' : ''
    }" data-order-status="${order.status}" data-order-id="${order.id}">
    <ul class="order__panel-list">
      <li class="order__item">
        <p class="order__id"># ${order.id}</p>
      </li>
      <li class="order__item order__item--date">
        <svg class="order__icon-clock">
          <use xlink:href="${icons}#clock"></use>
        </svg>
        <p class="order__date">${this._dateFormatter(order.date)}</p>
      </li>
      <li class="order__item">
        <p class="order__status order__status--${order.status}">
         ${
           order.status === 'progress'
             ? `In ${order.status}`
             : order.status[0].toUpperCase() + order.status.slice(1)
         } 
        </p>
      </li>
      <li class="order__item">
        <p class="order__price">${this._priceFormatter(
          this._getTotalPrice(order)
        )}</p>
      </li>
      <li class="order__item">
        <button class="btn__accordion btn__accordion--lg">
          <svg class="icon__accordion icon__accordion--lg icon__accordion--plus">
            <use xlink:href="${icons}#plus"></use>
          </svg>
        </button>
      </li>
    </ul>
    <div class="order__container hidden">
      <ul class="order__accordion order__accordion--inner">
      ${order.items.map((item) => this._generateOrderItemMarkup(item)).join('')}
        <li class="order__inner-items">
          <ul class="order__details order__details--bottom">
            <li class="order__inner-item order__inner-item--flex-row">
              <p class="order__value-name order__stotal">Subtotal:</p>
              <p class="order__value order__stotal-value">
                ${this._priceFormatter(this._getSubtotal(order))}
              </p>
            </li>
            <li class="order__inner-item order__inner-item--flex-row">
              <p class="order__value-name order__shipping">
                Shipping:
              </p>
              <p class="order__value order__shipping-value">
                ${this._priceFormatter(order.shippingPrice)}
              </p>
            </li>
            <li class="order__inner-item order__inner-item--flex-row">
              <p class="order__value-name order__tax">Discount:</p>
              <p class="order__value order__discount-value">
                ${this._priceFormatter(
                  (this._getSubtotal(order) * order.discountPrice) / 100
                )}
              </p>
            </li>
            <li class="order__inner-item order__inner-item--flex-row">
              <p class="order__value-name order__total">Total:</p>
              <p class="order__value order__total-value">
                ${this._priceFormatter(this._getTotalPrice(order))}
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <div class="order__track-box">
        <p class="order__track-cta">You can track your order here</p>
        <a href="#" class="order__track-link btn btn--small btn--outline" data-link="track">Order tracking</a>
      </div>
    </div>
  </li>
    `;
  }

  _generateOrderItemMarkup(item) {
    return `
        <li class="order__inner-items" data-article="${item.article}">
          <ul class="order__details order__details--top order__details--item">
            <li class="order__inner-item">
              <img class="order__img" src="${item.images}" alt="${item.title}">
            </li>
            <li class="order__inner-item order__inner-item--flex">
              <a href="#" class="order__name" data-link="product">
              ${item.description}
              </a>
              <p class="order__color">
                Color:
                <span class="order__color-value">${item.color
                  .split('-')
                  .join(' ')}</span>
              </p>
              <p class="order__size">
                Size:
                <span class="order__size-value">${
                  String(item.size).toUpperCase() || ''
                }</span>
              </p>
            </li>
            <li class="order__inner-item order__inner-item--flex">
              <p class="order__price-head">Price:</p>
              <p class="order__price-value">${this._priceFormatter(
                item.price
              )}</p>
            </li>
            <li class="order__inner-item order__inner-item--flex">
              <p class="order__quantity-head">Quantity:</p>
              <p class="order__quantity-value">${item.quantity}</p>
            </li>
            <li class="order__inner-item order__inner-item--flex">
              <p class="order__subtotal-head">Subtotal:</p>
              <p class="order__subtotal-value">${this._priceFormatter(
                item.price * item.quantity
              )}</p>
            </li>
          </ul>
        </li>
    `;
  }

  _getTotalPrice(order) {
    return (
      this._getSubtotal(order) +
      order.shippingPrice -
      (this._getSubtotal(order) * order.discountPrice) / 100
    );
  }

  _getSubtotal(order) {
    return order.items
      .map((item) => item.price * item.quantity)
      .reduce((acc, price) => price + acc, 0);
  }

  _toggleAccordion(e) {
    const btn = e.target.closest('.btn__accordion');
    if (!btn) return;

    const orderId = btn
      .closest('.order__panel-list')
      .querySelector('.order__id');
    const orderCart = btn.closest('.order__panel-list').nextElementSibling;

    if (btn.querySelector('svg').classList.contains('icon__accordion--minus')) {
      orderCart.classList.add('hidden');
      orderId.classList.remove('order__id--open');
      btn.innerHTML = this._generateAccordionBtnIcon('lg', 'plus');
    } else {
      orderCart.classList.remove('hidden');
      orderId.classList.add('order__id--open');
      btn.innerHTML = this._generateAccordionBtnIcon('lg', 'minus');
    }
  }

  _resetAccordions() {
    this._accordionContainer.querySelectorAll('.order__panel').forEach((li) => {
      li.querySelector('.order__container').classList.add('hidden');
      const icon = li.querySelector('.icon__accordion');
      icon.classList.remove('icon__accordion--minus');
      icon.classList.add('icon__accordion--plus');
      icon.innerHTML = `<use xlink:href="${icons}#plus"></use>`;
    });
  }

  _resetOrderPage() {
    const options = [
      ...document.getElementById('orders').querySelectorAll('option'),
    ];
    const optionAll = options.find((el) => el.value === 'all');
    if (optionAll.selected !== true) {
      options.forEach((el) => (el.selected = false));
      optionAll.selected = true;

      this._accordionContainer
        .querySelectorAll('.order__panel')
        .forEach((el) => el.classList.remove('hidden'));
    }

    this._removeSpinner(this._ordersPageEl);
    this._resetAccordions();
    this._addOrdersHiddenClass();
  }

  _clearOrderPage() {
    this._accordionContainer.innerHTML = '';
  }

  _sortOrders(e) {
    const { value } = e.target;
    const orderList = [
      ...this._accordionContainer.querySelectorAll('.order__panel'),
    ];
    orderList.forEach((el) => el.classList.add('hidden'));
    this._resetAccordions();
    orderList
      .filter((el) => el.dataset.orderStatus === value)
      .forEach((el) => el.classList.remove('hidden'));

    if (value === 'all') {
      orderList.forEach((el) => el.classList.remove('hidden'));
      this._removeSpinner(this._ordersPageEl);
      this._addOrdersHiddenClass();
    }

    if (value === 'canceled') {
      this._removeSpinner(this._ordersPageEl);
      this._addOrdersHiddenClass(value);
    }

    if (value === 'delivered') {
      this._removeSpinner(this._ordersPageEl);
      this._addOrdersHiddenClass(value);
    }

    if (value === 'progress') {
      this._removeSpinner(this._ordersPageEl);
      this._addOrdersHiddenClass(value);
    }
  }

  _addHandlerSortOrders(handler) {
    document.getElementById('orders').addEventListener('change', handler);
  }

  _showOrders() {
    const selectValue = [
      ...document.getElementById('orders').querySelectorAll('option'),
    ].find((el) => el.selected === true).value;

    const orders = [...this._ordersPageEl.querySelectorAll('.order__panel')];

    const filterOrders = orders.filter((el) =>
      selectValue === 'all' ? el : el.dataset.orderStatus === selectValue
    );

    filterOrders
      .filter((el) => el.classList.contains('hidden'))
      .forEach((el, i) => {
        if (i < NUMBER_OF_ORDERS) el.classList.remove('hidden');
      });

    if (
      filterOrders.filter((el) => el.classList.contains('hidden')).length === 0
    )
      this._ordersPageEl.querySelector('.btn-load').remove();
  }

  _openTrackPage(e) {
    const btn = e.target.closest('[data-link="track"]');
    if (!btn) return;

    const { orderId } = btn.closest('[data-order-id]').dataset;
    const orderInput = document.getElementById('order-num');
    orderInput.value = orderId;
  }

  _addHandlerOpenTrackPage() {
    this._ordersPageEl.addEventListener(
      'click',
      this._openTrackPage.bind(this)
    );
  }

  // RENDER WISHLIST
  renderWishlist(dataWishlist, type = 'wishlist') {
    this._removeEmptyHeading(this._wishlistEl);
    this._renderWishlistBadges();
    this._activateDeleteButton(type);
    this._renderWishIcons(dataWishlist);

    if (dataWishlist.wishlist.length === 0)
      this._addEmptyHeading(this._wishlistEl, type);

    this._wishlistTopBadge.textContent =
      this._wishlistBoxEl.querySelectorAll('.card').length;
  }

  _deleteWishItem(card) {
    card.remove();
    const accountCards = this._wishlistBoxEl.querySelectorAll('.card');
    this._renderWishlistBadges();
    this._wishlistTopBadge.textContent = accountCards.length;

    if (accountCards.length === 0) {
      this._addEmptyHeading(this._wishlistEl, this._wishlistEl.dataset.account);
    }
  }

  _renderWishlistBadges() {
    this._removeWishlistBadges();

    if (this._wishlistBoxEl.querySelectorAll('.card').length > 0) {
      this._wishlistBadge.classList.add('account__wishlist-badge--fill');
      this._wishlistBadge.textContent =
        this._wishlistBoxEl.querySelectorAll('.card').length;
    }
  }

  _removeWishlistBadges() {
    this._wishlistBadge.classList.remove('account__wishlist-badge--fill');
    this._wishlistBadge.textContent = '';
  }

  _clearWhishlistPage() {
    this._wishlistBoxEl.innerHTML = '';
    this._removeWishlistBadges();
    this._removeEmptyHeading(this._wishlistEl);
  }

  addToWishlist(e) {
    const btn = e.target.closest('.btn-wishlist-add');
    const checkbox = e.target.closest('.checkbox__btn-add');
    if (!btn && !checkbox) return;

    const userEl = this._navigationEl.querySelector('.user-profile');
    if (!userEl.dataset.id) {
      this._showModalPopup('signIn');
      return;
    }
    let card;

    if (userEl.dataset.id && btn) {
      card = btn.closest('[data-article]');
      const icon = btn.querySelector('.wishlist__icon');

      if (icon.classList.contains('wishlist__icon--filled'))
        this._removeWishIcon(card, btn);
      else this._addWishIcon(btn, icon);
    }

    if (userEl.dataset.id && checkbox) {
      card = checkbox.closest('[data-article]');
      if (checkbox.classList.contains('checkbox__btn--fill'))
        this._showModalPopup('addToWishlist');
      else this._removeWishIcon(card);
    }
    return [+userEl.dataset.id, +card.dataset.article];
  }

  _addWishIcon(btn, icon) {
    this._addFilledIconClass(icon);
    this._showModalPopup('addToWishlist');
    if (btn.closest('.product')) this._addFillledClassBtn();
  }

  _removeWishIcon(card, btn) {
    const cards = [...document.querySelectorAll('[data-article]')].filter(
      (el) => el.dataset.article === card.dataset.article
    );
    cards.forEach((el) => {
      const wishIcon = el.querySelector('.wishlist__icon');
      if (!wishIcon) return;
      this._removeFilldeIconClass(wishIcon);
    });

    if (card.closest('[data-account="wishlist"]')) this._deleteWishItem(card);
    if (btn && btn.closest('.product')) this._removeFillledClassBtn();
  }

  _addFilledIconClass(icon) {
    if (icon.closest('label')) return;
    icon.classList.add('wishlist__icon--filled');
    icon.innerHTML = this._iconAdd;
  }

  _removeFilldeIconClass(icon) {
    icon.classList.remove('wishlist__icon--filled');
    icon.innerHTML = this._iconRemove;
  }

  _renderWishIcons(data) {
    const cards = [...document.querySelectorAll('[data-article]')];

    cards.forEach((card) => {
      const wish = data.wishlist.find(
        (el) => el.article === +card.dataset.article
      );
      const icon = card.querySelector('.wishlist__icon');
      if (!icon) return;
      if (wish) this._addFilledIconClass(icon);
    });
  }

  _resetWishIcons() {
    this._parentElement.querySelectorAll('[data-article]').forEach((card) => {
      const icon = card.querySelector('.wishlist__icon');
      if (!icon) return;
      this._removeFilldeIconClass(icon);
    });
  }

  addHandlerAddToWishlist(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  // VIEWED
  renderViewedList(dataview, type = 'view') {
    this._activateDeleteButton(type);
    this._removeEmptyHeading(this._viewedPageEl);

    if (dataview.view.length === 0)
      this._addEmptyHeading(this._viewedPageEl, type);
  }

  _clearViewedPage() {
    this._viewedListEl.innerHTML = '';
  }

  // REVIEWS
  renderReviews(reviews, type = 'review') {
    this._insertReviewMarkup(reviews);
    this._addHandlerSortReviews(this._sortReviews.bind(this, reviews));
    this._activateSelect(type);
    this._removeEmptyHeading(this._reviewPageEl);
    this._removeSpinner(this._reviewPageEl);

    if (reviews.length === 0) {
      this._reviewPageEl.append(this._createHeading(type));
      this._disableSelect(type);
    }

    if (reviews.length > NUMBER_OF_ITEMS) this._addReviewsHiddenClass();
  }

  _addReviewsHiddenClass() {
    this._reviewsListEl
      .querySelectorAll('.comment__block--sm')
      .forEach((el, i) => {
        if (i >= NUMBER_OF_ITEMS) el.classList.add('hidden');
      });
    this._reviewsListEl.insertAdjacentHTML('afterend', this._generateSpinner());
  }

  _insertReviewMarkup(reviews, sort = 'newest') {
    this._reviewsListEl.innerHTML = '';
    const markup = reviews
      .sort((a, b) =>
        sort === 'newest'
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      )
      .map((el) => this._generateReviewsComment(el, 'sm'))
      .join('');

    this._reviewsListEl.insertAdjacentHTML('afterbegin', markup);
  }

  _sortReviews(reviews, e) {
    const { value } = e.target;
    const btn = this._reviewPageEl.querySelector('.btn-load');
    if (btn) btn.remove();

    if (value === 'newest') {
      this._insertReviewMarkup(reviews);
      if (reviews.length > NUMBER_OF_ITEMS) this._addReviewsHiddenClass();
    }

    if (value === 'oldest') {
      this._insertReviewMarkup(reviews, 'oldest');
      if (reviews.length > NUMBER_OF_ITEMS) this._addReviewsHiddenClass();
    }
  }

  _addHandlerSortReviews(handler) {
    document.getElementById('reviews').addEventListener('change', handler);
  }

  _resetReviewPage() {
    const options = [
      ...document.getElementById('reviews').querySelectorAll('option'),
    ];
    const selectedEl = options.find((el) => el.value === 'newest');
    if (selectedEl.selected === true) return;

    options.forEach((el) => (el.selected = false));
    selectedEl.selected = true;
    const reviews = [...this._reviewsListEl.querySelectorAll('li')];
    reviews.forEach((el) => el.classList.remove('hidden'));
    const markup = reviews
      .sort((a, b) => b.dataset.timestamp - a.dataset.timestamp)
      .map((el) => el.outerHTML)
      .join('');

    this._reviewsListEl.innerHTML = '';
    this._reviewsListEl.insertAdjacentHTML('afterbegin', markup);
    this._removeSpinner(this._reviewPageEl);
    this._addReviewsHiddenClass();
  }

  _clearReviewPage() {
    this._reviewsListEl.innerHTML = '';
  }

  _showReviews() {
    const reviews = [
      ...this._reviewsListEl.querySelectorAll('.comment__block--sm'),
    ];

    reviews
      .filter((el) => el.classList.contains('hidden'))
      .forEach((el, i) => {
        if (i < NUMBER_OF_ITEMS) el.classList.remove('hidden');
      });

    if (reviews.filter((el) => el.classList.contains('hidden')).length === 0)
      this._reviewPageEl.querySelector('.btn-load').remove();
  }

  // FUNCTIONS
  _disableDeleteButton(type) {
    const btn = this._btnsDeleteAll.find((el) =>
      el.closest(`[data-account=${type}]`)
    );
    btn.classList.add('btn--disable');
  }

  _activateDeleteButton(type) {
    const btn = this._btnsDeleteAll.find((el) =>
      el.closest(`[data-account=${type}]`)
    );
    btn.classList.remove('btn--disable');
  }

  deleteWishlistItems(e) {
    const btn = e.target.closest('.btn--delete');
    if (!btn) return;
    const section = btn.closest('section');
    if (section.dataset.account !== 'wishlist') return;

    section.querySelectorAll('.card').forEach((card) => card.remove());
    this._addEmptyHeading(section, section.dataset.account);
    this._removeWishlistBadges();
    this._wishlistTopBadge.textContent = 0;
    this._resetWishIcons();

    return this._userProfileIcon.dataset.id;
  }

  deleteViewlistItems(e) {
    const btn = e.target.closest('.btn--delete');
    if (!btn) return;
    const section = btn.closest('section');
    if (section.dataset.account !== 'view') return;

    section.querySelectorAll('.card').forEach((card) => card.remove());
    this._addEmptyHeading(section, section.dataset.account);

    return this._userProfileIcon.dataset.id;
  }

  addHandlerDeleteWishlistItems(handler) {
    this._wishlistEl.addEventListener('click', handler);
  }

  addHandlerDeleteViewlistItems(handler) {
    this._viewedPageEl.addEventListener('click', handler);
  }

  _disableSelect(type) {
    const form = this._selectFormsEl.find((el) =>
      el.closest(`[data-account=${type}]`)
    );
    form.querySelector('label').classList.add('sort__label--disable');
    form.querySelector('select').classList.add('sort__select--disable');
    form.querySelector('select').disabled = true;
  }

  _activateSelect(type) {
    const form = this._selectFormsEl.find((el) =>
      el.closest(`[data-account=${type}]`)
    );
    form.querySelector('label').classList.remove('sort__label--disable');
    form.querySelector('select').classList.remove('sort__select--disable');
    form.querySelector('select').disabled = false;
  }

  _createHeading(type) {
    const heading = document.createElement('h3');
    heading.classList.add('account__heading-empty');
    heading.textContent = ACCOUNT_TEXT[type];
    return heading;
  }

  _addEmptyHeading(container, type) {
    container.append(this._createHeading(type));
    this._disableDeleteButton(type);
  }

  _removeEmptyHeading(container) {
    const heading = container.querySelector('.account__heading-empty');
    if (heading) heading.remove();
  }

  // SPINNER
  _generateSpinner() {
    return `
        <button type="button" class="btn-load">
          <svg class="spinner">
            <use xlink:href="${icons}#convert"></use>
          </svg>
          Load more
        </button>
    `;
  }

  _removeSpinner(page) {
    const spinner = page.querySelector('.btn-load');
    if (spinner) spinner.remove();
  }

  async _loadSpinner(e) {
    const btn = e.target.closest('.btn-load');
    if (!btn) return;
    const spinner = btn.querySelector('.spinner');
    spinner.classList.add('spinner--rotate');

    await this._delay(1000);
    spinner.classList.remove('spinner--rotate');

    if (btn.closest('section[data-account="orders"]')) this._showOrders();
    if (btn.closest('section[data-account="review"]')) this._showReviews();
  }

  _delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  _addHandlerLoadSpinner() {
    this._accountPageEl.addEventListener('click', this._loadSpinner.bind(this));
  }

  // TABS
  _changeTabs(userData, cities, e) {
    e.preventDefault();

    const btn = e.target.closest('.account__item');
    if (!btn) return;

    if (!btn.classList.contains('account__item--current')) {
      this._resetOrderPage();
      this._resetReviewPage();
    }

    this._currentTab.classList.remove('account__item--current');
    this._currentTab = btn;
    this._currentTab.classList.add('account__item--current');

    this._currentPage.classList.add('hidden');
    this._currentPage = [...this._pages].find(
      (page) => page.dataset.account === this._currentTab.dataset.account
    );
    this._currentPage.classList.remove('hidden');
    this._fillInputs(userData, cities);
    this._removeInputWarnings(this._profileInputsForm);
    this._inputNewPass.value = '';
    this._inputPassConfirm.value = '';
  }

  _addHandlerChangeTabs(userData, cities) {
    this._tabs.addEventListener(
      'click',
      this._changeTabs.bind(this, userData, cities)
    );
  }

  _openAccountPages(page, userData, cities) {
    this._currentTab.classList.remove('account__item--current');
    this._currentTab = this._accountPageEl.querySelector(
      `li[data-account="${page}"]`
    );
    this._currentTab.classList.add('account__item--current');

    this._currentPage.classList.add('hidden');
    this._currentPage = [...this._pages].find(
      (tab) => tab.dataset.account === this._currentTab.dataset.account
    );
    this._currentPage.classList.remove('hidden');
    this._fillInputs(userData, cities);
    this._removeInputWarnings(this._profileInputsForm);
    this._inputNewPass.value = '';
    this._inputPassConfirm.value = '';
  }

  _resetAccountPages(e) {
    const link = e.target.closest('[data-link="account"]');
    if (!link) return;
    this._resetOrderPage();
    this._resetReviewPage();
    this._removeInputWarnings(this._profileInputsForm);
  }

  _addHandlerOpenAccountPages(data, cities) {
    this._navigationEl
      .querySelector('a.btn-user')
      .addEventListener(
        'click',
        this._openAccountPages.bind(this, 'profile', data, cities)
      );
    this._navigationEl
      .querySelector('.navigation__like-link')
      .addEventListener(
        'click',
        this._openAccountPages.bind(this, 'wishlist', data, cities)
      );
    this._navigationEl.addEventListener(
      'click',
      this._resetAccountPages.bind(this)
    );
  }

  _renderBreadcrumb() {
    if (!this._accountPageEl.classList.contains('hidden')) {
      const link = this._accountPageEl
        .querySelector('.account__item--current')
        .querySelector('a')
        .textContent.trim();

      if (this._breadcrumbList.querySelector('.breadcrumb__link--subpage')) {
        this._breadcrumbList.querySelector(
          '.breadcrumb__link--subpage'
        ).textContent = link;
        this._breadcrumbList.querySelector(
          '.breadcrumb__link--subpage'
        ).dataset.link = 'account';
      } else {
        this._breadcrumbList.insertAdjacentHTML(
          'beforeend',
          this._renderBreadcrumbLink(
            this._accountPageEl.id.split('__').at(-1),
            link
          )
        );
      }
    }

    if (
      this._accountPageEl.classList.contains('hidden') &&
      this._breadcrumbList.querySelector('.breadcrumb__link--subpage') &&
      this._breadcrumbList.querySelector('.breadcrumb__link--subpage').dataset
        .link === this._accountPageEl.id.split('__').at(-1)
    ) {
      this._breadcrumbList
        .querySelector('.breadcrumb__link--subpage')
        .closest('li')
        .remove();
    }
  }

  signOut() {
    this._clearProfilePage();
    this._clearOrderPage();
    this._clearWhishlistPage();
    this._clearViewedPage();
    this._clearReviewPage();
    this._resetWishIcons();
    this._removeFillledClassBtn();

    if (this._accountPageEl.classList.contains('hidden')) return;
    this._headerEl.classList.remove('hidden');
    this._homePageEl.classList.remove('hidden');
    this._accountPageEl.classList.add('hidden');
    this._breadcrumbEl.classList.add('hidden');
  }

  addHandlerSignOut(handler) {
    this._parentElement
      .querySelectorAll('.btn__sign-out')
      .forEach((btn) => btn.addEventListener('click', handler));
  }

  addHandlerDeleteAccount(handler) {
    this._btnDeleteAccount.addEventListener('click', handler);
  }
}

export default new AccountView();
