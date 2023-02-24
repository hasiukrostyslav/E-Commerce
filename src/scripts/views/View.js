import icons from '../../assets/svg/sprite.svg';

export default class View {
  _parentElement = document.querySelector('body');
  _headerEl = document.getElementById('header');
  _homePageEl = document.getElementById('main__home');
  _mainEl = document.querySelector('.main');
  _contactsEl = document.getElementById('main__contacts');
  _postPageEl = document.getElementById('main__post');
  _catalogPageEl = document.getElementById('main__catalog');
  _productPageEl = document.getElementById('main__product');
  _footerEl = document.querySelector('.footer');
  _subscribePageEl = document.querySelector('.subscribe');
  _breadcrumbEl = document.querySelector('.breadcrumb');
  _breadcrumbList = this._breadcrumbEl.querySelector('.breadcrumb__list');
  _overlay = document.querySelector('.overlay');

  init() {
    this._addHandlerInitLinks();
    this._addHandlerScrollToTop();
    this._setObserver(this._setBreadcrumbLinks.bind(this));
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
}
