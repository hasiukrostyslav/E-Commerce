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
  _ordersPageEl = document.querySelector('section[data-account="orders"]');
  _viewedPageEl = document.querySelector('section[data-account="view"]');
  _reviewPageEl = document.querySelector('section[data-account="review"]');
  _viewedListEl = document.querySelector('.account__viewed');
  _reviewsListEl = document.querySelector('.comment');
  _btnsDeleteAll = [...this._accountPageEl.querySelectorAll('.btn--delete')];
  _selectFormsEl = [...this._accountPageEl.querySelectorAll('.sort__form')];

  constructor() {
    super();
    this._addHandlerChangeTabs();
    this._addHandlerAccordion();
    this._addHandlerDeleteItemList();
    this._addHandlerOpenAccountPages();
    this._setObserver(this._renderBreadcrumb.bind(this));
  }

  renderAccountData(data, reviews, cities) {
    this._renderProfileData(data, cities);
    this._renderOrders(data);
    this._renderWishlist(data);
    this._renderViewedList(data);
    this._renderReviews(reviews);
  }

  // PROFILE
  _renderProfileData(data, cities) {
    document.querySelector(
      '.account__user-name'
    ).textContent = `${data.firstName} ${data.lastName}`;

    document.querySelector('.account__user-email').textContent = data.email;
    document.getElementById('first-name').value = data.firstName;
    document.getElementById('last-name').value = data.lastName;
    document.getElementById('profile-email').value = data.email;
    document.getElementById('phone-profile').value = data.phone || '';
    document.getElementById('address').value = data.address || '';
    document.getElementById('code').value = data.zipCode || '';
    document.getElementById('country').value = data.country || '';

    this._renderSelectCity(
      document.getElementById('city'),
      document.getElementById('country').value,
      cities
    );

    document.getElementById('city').value = data.city || '';
  }

  _clearProfilePage() {
    document.querySelector('.account__user-name').textContent = 'User name';
    document.querySelector('.account__user-email').textContent = 'User email';
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('profile-email').value = '';
    document.getElementById('phone-profile').value = '';
    document.getElementById('address').value = '';
    document.getElementById('code').value = '';
    document.getElementById('country').value = '';
    document.getElementById('city').value = '';
  }

  _saveChanges() {}
  _deleteAccount() {}

  // ORDERS
  _renderOrders(data, type = 'orders') {
    this._clearOrderPage();
    this._activateSelect(type);
    const markup = data.orders
      .map((order, i, arr) => this._generateOrderMarkup(order, i, arr))
      .reverse()
      .join('');
    this._accordionContainer.insertAdjacentHTML('afterbegin', markup);
    this._addHandlerSortOrders(this._sortOrders.bind(this));

    if (data.orders.length === 0) {
      this._accordionContainer.append(this._createHeading(type));
      this._disableSelect(type);
    }

    if (data.orders.length > NUMBER_OF_ORDERS)
      this._accordionContainer.insertAdjacentHTML(
        'afterend',
        this._generateLoadSpinnerMarkup()
      );
  }

  _generateOrderMarkup(order, i, arr) {
    return `
    <li class="order__panel ${i === arr.length - 1 ? 'u-padding-top' : ''}">
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
    options.forEach((el) => (el.selected = false));
    options.find((el) => el.value === 'All').selected = true;
    this._resetAccordions();

    this._accordionContainer
      .querySelectorAll('.order__panel')
      .forEach((el) => el.classList.remove('hidden'));
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
      .filter(
        (el) => el.querySelector('.order__status').textContent.trim() === value
      )
      .forEach((el) => el.classList.remove('hidden'));

    if (value === 'All')
      orderList.forEach((el) => el.classList.remove('hidden'));

    if (
      orderList.filter((el) => !el.classList.contains('hidden')).length <=
        NUMBER_OF_ORDERS &&
      this._ordersPageEl.querySelector('.btn-load')
    )
      this._ordersPageEl.querySelector('.btn-load').remove();
    if (
      orderList.filter((el) => !el.classList.contains('hidden')).length >
        NUMBER_OF_ORDERS &&
      !this._ordersPageEl.querySelector('.btn-load')
    )
      this._accordionContainer.insertAdjacentHTML(
        'afterend',
        this._generateLoadSpinnerMarkup()
      );
  }

  _addHandlerSortOrders(handler) {
    document.getElementById('orders').addEventListener('change', handler);
  }

  // RENDER WISHLIST
  _renderWishlist(data, type = 'wishlist') {
    this._removeEmptyHeading(this._wishlistEl);
    this._renderWishlistBadges();
    this._activateDeleteButton(type);

    if (data.wishlist.length === 0)
      this._addEmptyHeading(this._wishlistEl, type);
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

  // VIEWED
  _renderViewedList(data, type = 'view') {
    this._activateDeleteButton(type);
    this._removeEmptyHeading(this._viewedPageEl);

    if (data.view.length === 0) this._addEmptyHeading(this._viewedPageEl, type);
  }

  _clearViewedPage() {
    this._viewedListEl.innerHTML = '';
  }

  // REVIEWS
  _renderReviews(reviews, type = 'review') {
    this._insertReviewMarkup(reviews);
    this._addHandlerSortReviews(this._sortReviews.bind(this, reviews));
    this._activateSelect(type);
    this._removeEmptyHeading(this._reviewPageEl);

    if (reviews.length === 0) {
      this._reviewPageEl.append(this._createHeading(type));
      this._disableSelect(type);
    }

    if (reviews.length > NUMBER_OF_ITEMS)
      this._reviewsListEl.insertAdjacentHTML(
        'afterend',
        this._generateLoadSpinnerMarkup()
      );
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

    if (value === 'newest') this._insertReviewMarkup(reviews);

    if (value === 'oldest') this._insertReviewMarkup(reviews, 'oldest');
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
    const markup = [...this._reviewsListEl.querySelectorAll('li')]
      .sort((a, b) => b.dataset.timestamp - a.dataset.timestamp)
      .map((el) => el.outerHTML)
      .join('');

    this._reviewsListEl.innerHTML = '';
    this._reviewsListEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clearReviewPage() {
    this._reviewsListEl.innerHTML = '';
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

  _deleteItemList(e) {
    const btn = e.target.closest('.btn--delete');
    if (!btn) return;
    const section = btn.closest('section');

    section.querySelectorAll('.card').forEach((card) => card.remove());
    this._addEmptyHeading(section, section.dataset.account);

    if (section.dataset.account === 'wishlist') {
      this._removeWishlistBadges();
      this._navigationEl.querySelector(
        '.navigation__like-count'
      ).textContent = 0;
    }
  }

  _addHandlerDeleteItemList() {
    this._accountPageEl.addEventListener(
      'click',
      this._deleteItemList.bind(this)
    );
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

  _generateLoadSpinnerMarkup() {
    return `
        <button type="button" class="btn-load">
          <svg class="btn-load__icon">
            <use xlink:href="${icons}#convert"></use>
          </svg>
          Load more
        </button>
    `;
  }

  _changeTabs(e) {
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
  }

  _openAccountPages(page) {
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
  }

  _resetAccountPages(e) {
    const link = e.target.closest('[data-link="account"]');
    if (!link) return;
    this._resetOrderPage();
    this._resetReviewPage();
  }

  _addHandlerOpenAccountPages() {
    this._navigationEl
      .querySelector('a.btn-user')
      .addEventListener('click', this._openAccountPages.bind(this, 'profile'));
    this._navigationEl
      .querySelector('.navigation__like-link')
      .addEventListener('click', this._openAccountPages.bind(this, 'wishlist'));
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
}

export default new AccountView();
