import icons from '../../assets/svg/sprite.svg';
// prettier-ignore
import { DAYS, HOURS, MINUTES, SECONDS, MILISECONDS, DISCOUNT, MAXSCORE, ERROR, } from '../config';

export default class View {
  _parentElement = document.querySelector('body');
  _navigationEl = document.querySelector('.navbar');
  _headerEl = document.getElementById('header');
  _mainEl = document.querySelector('.main');
  _homePageEl = document.getElementById('main__home');
  _accountPageEl = document.getElementById('main__account');
  _contactsEl = document.getElementById('main__contacts');
  _blogPageEl = document.getElementById('main__blog');
  _postPageEl = document.getElementById('main__post');
  _catalogPageEl = document.getElementById('main__catalog');
  _productPageEl = document.getElementById('main__product');
  _checkoutPageEl = document.querySelector('.checkout');
  _cartIconEl = this._parentElement.querySelector('.navigation__cart-link');
  _footerEl = document.querySelector('.footer');
  _subscribePageEl = document.querySelector('.subscribe');
  _breadcrumbEl = document.querySelector('.breadcrumb');
  _breadcrumbList = this._breadcrumbEl.querySelector('.breadcrumb__list');
  _toolbarContainer = document.querySelector('.navigation__toolbar');
  _overlay = document.querySelector('.overlay');
  _shippingPriceEl = document.querySelector('[data-price="shipping"]');
  _discounPricetEl = document.querySelector('[data-price="discount"]');
  _totalPriceEl = document.querySelector('[data-price="total"]');
  _subtotalPriceEl = [...document.querySelectorAll('[data-price="subtotal"]')];

  init(data) {
    this._getCurrentDay();
    this._startCountDownTimer();
    this._setObserver(this._setBreadcrumbLinks.bind(this));

    this._addHandlerInitLinks();
    this._addHandlerScrollToTop();
    this._addHandlerTogglePassword();
    this._addHandlerInputNumber();
    this._renderBlogCards(data.posts);
  }

  asyncInit(countries, cities) {
    this._renderSelectCountry(countries);
    this._addHandlerChangeCountry(cities);
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _setObserver(callback) {
    const observer = new MutationObserver(callback);

    observer.observe(this._mainEl, {
      subtree: true,
      attributes: true,
      attributeOldValue: true,
    });
  }

  _setBreadcrumbLinks() {
    const link = this._breadcrumbEl.querySelector('.breadcrumb__link--page');
    const pages = [...this._mainEl.querySelectorAll('section[data-title]')];

    if (
      pages.every((el) => el.classList.contains('hidden')) &&
      !this._homePageEl.classList.contains('hidden')
    ) {
      link.textContent = '';
      link.dataset.link = '';
    }

    const page = pages.find((el) => !el.classList.contains('hidden'));

    if (!page) return;
    link.textContent = page.dataset.title;
    link.dataset.link = page.id.split('__').at(-1);
  }

  _renderBreadcrumbLink(title, link) {
    return `
      <li class="breadcrumb__item">
        <a href="#" class="breadcrumb__link breadcrumb__link--subpage" data-link="${title}">${link}</a>
      </li>
    `;
  }

  // Change page components
  _initLinks(e) {
    const link = e.target.closest('a');

    if (!link || !link.dataset.link) return;

    const pages = [...this._mainEl.children];

    pages.forEach((page) => page.classList.add('hidden'));

    const curPage = pages.find(
      (page) => page.id === `main__${link.dataset.link}`
    );
    curPage.classList.remove('hidden');

    this._parentElement.scrollIntoView();

    if (curPage.classList.contains('sb-hide'))
      this._subscribePageEl.classList.add('hidden');
    else this._subscribePageEl.classList.remove('hidden');

    if (this._homePageEl.classList.contains('hidden')) {
      this._headerEl.classList.add('hidden');
      this._breadcrumbEl.classList.remove('hidden');
    }

    if (!this._homePageEl.classList.contains('hidden')) {
      this._headerEl.classList.remove('hidden');
      this._breadcrumbEl.classList.add('hidden');
    }

    this._initContactLinks(link);
  }

  _initContactLinks(link) {
    this._contactsEl
      .querySelectorAll('.contacts__link')
      .forEach((a) => a.classList.remove('contacts__link--current'));

    const pages = document.querySelectorAll('.contacts__page');
    pages.forEach((page) => page.classList.add('hidden'));

    if (link.dataset.contacts) {
      this._contactsEl
        .querySelector('a[data-contact="faq"]')
        .classList.add('contacts__link--current');
      [...pages]
        .find((page) => page.dataset.contact === 'faq')
        .classList.remove('hidden');
    } else {
      this._contactsEl
        .querySelector('a[data-contact="form"]')
        .classList.add('contacts__link--current');
      [...pages]
        .find((page) => page.dataset.contact === 'form')
        .classList.remove('hidden');
    }
  }

  _addHandlerInitLinks() {
    this._parentElement.addEventListener('click', this._initLinks.bind(this));
  }

  // Change tabs in Account/Contact/Product pages
  _addHandlerChangeTabs() {
    this._tabs.addEventListener('click', this._changeTabs.bind(this));
  }

  // Accordion functionality
  _generateAccordionBtnIcon(size, type) {
    return `
    <svg class="icon__accordion icon__accordion--${size} icon__accordion--${type}">
      <use
        xlink:href="${icons}#${type}">
      </use>
    </svg>
    `;
  }

  _addHandlerAccordion() {
    this._accordionContainer.addEventListener(
      'click',
      this._toggleAccordion.bind(this)
    );
  }

  // Scroll to top
  _scrollToTop(e) {
    e.preventDefault();
    const btn = e.target.closest('.footer__btn-up');
    if (!btn) return;

    this._parentElement.scrollIntoView({ behavior: 'smooth' });
  }

  _addHandlerScrollToTop() {
    this._footerEl.addEventListener('click', this._scrollToTop.bind(this));
  }

  // Slider functionality
  _goToSlide(slide = 0) {
    this._slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  _nextSlide() {
    this._curSlide =
      this._curSlide === this._maxSlide - 1 ? 0 : this._curSlide + 1;
    this._goToSlide(this._curSlide);
    this._activateSlideTab(this._curSlide);
  }

  _prevSlide() {
    this._curSlide =
      this._curSlide === 0 ? this._maxSlide - 1 : this._curSlide - 1;
    this._goToSlide(this._curSlide);
    this._activateSlideTab(this._curSlide);
  }

  _minusOrder(s, arr) {
    s.style.order = s.style.order <= 1 ? arr.length : (s.style.order -= 1);
  }

  _plusOrder(s, arr) {
    s.style.order =
      +s.style.order === arr.length ? 1 : (s.style.order = +s.style.order + 1);
  }

  _clickTabs(cssClass, e) {
    const tab = e.target.closest(cssClass);
    if (!tab) return;

    const { slide } = tab.dataset;
    this._goToSlide(slide);
    this._activateSlideTab(slide);
  }

  // Show / hide password
  _togglePassword(e) {
    const btn = e.target.closest('.pass-show');
    if (!btn) return;

    const input = btn.closest('div').querySelector('.input');

    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    btn.querySelector('svg').innerHTML = `<use xlink:href="${icons}#${
      type === 'text' ? 'closed-eye' : 'eye'
    }"></use>`;
  }

  _addHandlerTogglePassword() {
    this._parentElement.addEventListener(
      'click',
      this._togglePassword.bind(this)
    );
  }

  // TIMER
  _getCurrentDay() {
    this._currentDay = new Date().getTime();
  }

  _countDown(timer, countDownDate) {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const day = String(
      Math.trunc(distance / (MILISECONDS * SECONDS * MINUTES * HOURS))
    ).padStart(2, 0);

    const hour = String(
      Math.trunc(
        Math.trunc(distance % (MILISECONDS * SECONDS * MINUTES * HOURS)) /
          (MILISECONDS * SECONDS * MINUTES)
      )
    ).padStart(2, 0);

    const minute = String(
      Math.trunc(
        (distance % (MILISECONDS * SECONDS * MINUTES)) / (MILISECONDS * SECONDS)
      )
    ).padStart(2, 0);

    const second = String(
      Math.trunc((distance % (MILISECONDS * SECONDS)) / MILISECONDS)
    ).padStart(2, 0);

    document.querySelector('.digit--days').textContent = day;
    document.querySelector('.digit--hours').textContent = hour;
    document.querySelector('.digit--mins').textContent = minute;
    document.querySelector('.digit--sec').textContent = second;

    if (distance === 0) clearInterval(timer);
  }

  _startCountDownTimer() {
    const countDownDate =
      this._currentDay + DAYS * HOURS * MINUTES * SECONDS * MILISECONDS;

    const timer = setInterval(
      () => this._countDown(timer, countDownDate),
      1000
    );
  }

  // Number input
  _stepUp(input) {
    input.value =
      +input.value < +input.max ? +input.value + +input.step : input.max;
  }

  _stepDown(input) {
    input.value =
      +input.value > +input.min ? input.value - input.step : input.min;
  }

  _changeInputNumber(e) {
    const btn = e.target.closest('.number__btn');
    if (!btn) return;

    if (e.target.closest('.caret-up')) {
      const input = btn.closest('.number__box').querySelector('input');

      if (input.closest('.catalog')) {
        input
          .closest('.catalog')
          .querySelectorAll('.input--number')
          .forEach((num) => this._stepUp(num));
        this._showNumbresOfCards();
      } else {
        this._stepUp(input);
        this._calculateTotalPrice();
      }
    }

    if (e.target.closest('.caret-down')) {
      const input = btn.closest('.number__box').querySelector('input');

      if (input.closest('.catalog')) {
        input
          .closest('.catalog')
          .querySelectorAll('.input--number')
          .forEach((num) => this._stepDown(num));
        this._showNumbresOfCards();
      } else {
        this._stepDown(input);
        this._calculateTotalPrice();
      }
    }
  }

  _showNumbresOfCards() {
    const amount = +this._catalogPageEl.querySelector('.input--number').value;
    const cards = [...this._catalogPageEl.querySelectorAll('.card')];
    cards.forEach((el) => el.classList.add('hidden'));
    const cardsShow = cards.filter((_, i) => i + 1 <= amount);
    cardsShow.forEach((el) => el.classList.remove('hidden'));
  }

  _addHandlerInputNumber() {
    this._parentElement.addEventListener(
      'click',
      this._changeInputNumber.bind(this)
    );
  }

  _calculateTotalPrice() {
    const discount = Number.parseInt(
      this._discounPricetEl.textContent.slice(1),
      10
    )
      ? +this._discounPricetEl.textContent.slice(1)
      : 0;

    this._totalPriceEl.textContent = this._priceFormatter(
      +this._subtotalPriceEl.at(1).textContent.slice(1).split(',').join('') +
        +this._shippingPriceEl.textContent.slice(1) -
        discount
    );
    if (discount) this._calculateDiscount();
  }

  _calculateDiscount() {
    this._discounPricetEl.textContent = this._priceFormatter(
      +this._subtotalPriceEl.at(1).textContent.slice(1).split(',').join('') *
        DISCOUNT.discount
    );
  }

  _renderBlogCards(data) {
    const newest = data.slice(-2).reverse();
    const markup = newest.map((post) => this._generateBlogCards(post)).join('');

    this._mainEl
      .querySelector('.blog-home')
      .insertAdjacentHTML('beforeend', markup);
  }

  _generateBlogCards(data) {
    return `
          <figure class="blog__card">
            <img class="blog__img" src="${data.images.at(0)}" alt="${
      data.title
    }">
            <figcaption class="blog__description">
              <a
                href="#"
                class="heading-quaternary--heading-link u-margin-bottom-small-1" data-link="post"
                >${data.title}</a
              >
              <ul class="blog__list u-margin-bottom-small-2">
                <li class="blog__item">
                  <p class="heading-quaternary--description">${
                    data.categories
                  }</p>
                </li>
                <li class="blog__item">
                  <p class="heading-quaternary--description">${this._dateFormatter(
                    data.date
                  )}</p>
                </li>
                <li class="blog__item">
                  <svg class="blog__icon">
                    <use xlink:href="${icons}#chat"></use>
                  </svg>
                  <p class="heading-quaternary--description">${
                    data.comments.length > 0 ? data.comments.length : 'No'
                  } comment${data.comments.length === 1 ? '' : 's'}</p>
                </li>
              </ul>
              <p class="blog__text">
                ${data.text.slice(0, 140)}...
              </p>
            </figcaption>
          </figure>
    `;
  }

  // FORMATTERS

  _priceFormatter(data) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return formatter.format(data);
  }

  _dateFormatter(data) {
    const today = new Date();
    const date = new Date(data);
    const difference = Math.trunc(
      (today - date) / MILISECONDS / SECONDS / MINUTES / HOURS
    );

    if (difference > 3) {
      const formatDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      return formatDate.format(date);
    }

    if (difference <= 3) {
      const formatRelativeDate = new Intl.RelativeTimeFormat('en-US', {
        style: 'long',
        numeric: 'auto',
      });

      return formatRelativeDate.format(-difference, 'day');
    }
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

  // Reviews
  _generateReviewsComment(reviews, size = 'lg') {
    return `
          <li class="comment__block--${size} grid grid--col-3-fix grid--row-3" data-timestamp="${Date.parse(
      reviews.date
    )}">
    ${
      size === 'sm'
        ? `
        <p class="comment__for-product" data-article="${reviews.article}">
          For:
          <a href="#" class="comment__link" data-link="product">${reviews.product}</a>
        </p>`
        : ''
    }
            <div class="comment__info">
              <p class="comment__user">${reviews.user}</p>
              <p class="comment__day">${this._dateFormatter(reviews.date)}</p>
                ${this._generateRating(reviews.rating)}
            </div>
            <p class="comment__text">
            ${
              reviews.tag
                ? `<span class="comment__text--tag">${reviews.tag}</span>`
                : ''
            }
              ${reviews.text}
            </p>
            ${
              size === 'lg'
                ? `
            <button type="button" class="comment__reply-btn">
              <svg class="comment__reply-icon">
                <use xlink:href="${icons}#share-arrow"></use>
              </svg>
              Reply
            </button>
            `
                : ''
            }
            <div class="comment__vote">
              <button class="comment__vote-btn" type="button">
                <svg class="comment__vote-icon comment__vote-icon--like">
                  <use xlink:href="${icons}#like"></use>
                </svg>
                  ${reviews.likes}
              </button>
              <button class="comment__vote-btn" type="button">
                <svg class="comment__vote-icon comment__vote-icon--dislike">
                  <use xlink:href="${icons}#dislike"></use>
                </svg>
                ${reviews.dislikes}
              </button>
            </div>
          </li>
    `;
  }

  _generateRating(data = 0, maxScore = MAXSCORE) {
    return `
      <div class="rating">
      ${new Array(data)
        .fill(1)
        .map(() => this._generateRatingStar(true))
        .join('')}
        ${new Array(maxScore - data)
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

  // RENDER SELECT COUNTRY AND CITY
  _renderSelectCountry(countries) {
    const selectCountryEl = this._parentElement.querySelectorAll(
      '[data-select="country"]'
    );
    countries.forEach((country) =>
      selectCountryEl.forEach((select) =>
        select.insertAdjacentHTML(
          'beforeend',
          this._generateSelectOption('country', country)
        )
      )
    );
  }

  _renderSelectCity(select, country, cities) {
    select.innerHTML = '';
    select.insertAdjacentHTML(
      'afterbegin',
      this._generateSelectOption('city', 'city', true)
    );
    const citiesArray = cities.find((el) => el[country]);
    Object.values(citiesArray)[0].forEach((city) =>
      select.insertAdjacentHTML(
        'beforeend',
        this._generateSelectOption('city', city)
      )
    );
  }

  _generateSelectOption(type, data, disable = false) {
    return `<option ${
      disable === false
        ? `value="${data}"`
        : 'value="" disabled selected hidden'
    }>${disable === false ? data : `Choose your ${type}`}</option>`;
  }

  _changeCountry(cities, e) {
    const selectCountry = e.target.closest('select[name="country"]');
    if (!selectCountry) return;

    const selectCity = selectCountry
      .closest('form')
      .querySelector('select[name="city"]');

    this._renderSelectCity(selectCity, selectCountry.value, cities);
  }

  _addHandlerChangeCountry(cities) {
    this._parentElement.addEventListener(
      'change',
      this._changeCountry.bind(this, cities)
    );
  }

  // INPUT VALIDATION

  _renderWarning(input, data) {
    input.insertAdjacentHTML(
      'afterend',
      `<span class="input__warning" data-warning="${data}"></span>`
    );
  }

  _showWarning(form, inputEl) {
    const warning = form.querySelector('.input__warning');
    inputEl.classList.add('input--invalid');

    if (inputEl.type === 'email') this._showEmailWarning(inputEl, warning);
    if (inputEl.dataset.input === 'full-name')
      this._showFullNameWarning(inputEl, warning);

    if (inputEl.dataset.input.startsWith('pass'))
      this._showPasswordWarning(inputEl, warning);
  }

  _showFullNameWarning(inputEl, warning) {
    if (
      inputEl.value
        .split(' ')
        .join('')
        .split('')
        .every((el) => el.match(/[a-z]/i)) === false
    )
      warning.textContent = ERROR.fullNameChar;

    if (inputEl.value.split(' ').length <= 1)
      warning.textContent = ERROR.fullName;
  }

  _textValidation(text, warning, error) {
    if (
      !text
        .split(' ')
        .join('')
        .split('')
        .every((el) => el.match(/[a-z]/i))
    )
      warning.textContent = error;
  }

  _showEmailWarning(inputEl, warning) {
    if (inputEl.id === 'email-sign-in' && inputEl.value)
      warning.textContent = ERROR.emailNew;

    if (!inputEl.value.includes('.')) warning.textContent = ERROR.emailDot;
    if (inputEl.value.endsWith('.')) warning.textContent = ERROR.emailDotLast;
    if (inputEl.value.startsWith('.'))
      warning.textContent = ERROR.emailDotFirst;
    if (!inputEl.value.includes('@')) warning.textContent = ERROR.emailSign;
    if (inputEl.value.endsWith('@')) warning.textContent = ERROR.emailSignLast;
    if (inputEl.value.startsWith('@'))
      warning.textContent = ERROR.emailSignFirst;
    if (!inputEl.value) warning.textContent = ERROR.emailEmpty;
  }

  _showPasswordWarning(inputEl, warning) {
    if (inputEl.dataset.input === 'pass-confirm') {
      warning.textContent = ERROR.passConfirm;
    }

    if (inputEl.value.length === 0) {
      warning.textContent = ERROR.passEmpty;
    }

    if (inputEl.value.length > 0 && inputEl.value.length < 6) {
      warning.textContent = ERROR.passLength;
    }

    if (inputEl.id === 'password-sign-in' && inputEl.value.length >= 6) {
      warning.textContent = ERROR.passWrong;
    }

    if (inputEl.id === 'profile-new-pass') {
    }
  }
}
