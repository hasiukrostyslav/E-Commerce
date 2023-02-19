export default class View {
  _parentElement = document.querySelector('body');
  _navigationEl = document.querySelector('.navbar');
  _headerEl = document.getElementById('header');
  _footerEl = document.querySelector('.footer');
  _mainEl = document.querySelector('.main');
  _homePageEl = document.getElementById('main__home');

  _checkoutPageEl = document.getElementById('main__checkout');
  _trackPageEl = document.getElementById('main__track');
  _blogsPageEl = document.getElementById('main__blogs');
  _blogPageEl = document.getElementById('main__blog');
  _subscribePageEl = document.querySelector('.subscribe');
  _breadcrumbEl = document.querySelector('.breadcrumb');

  _overlay = document.querySelector('.overlay');

  constructor() {
    this._addHandlerInit();
    this._addHandlerScrollToTop();
  }

  // Change page components
  _init(e) {
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

    if (this._homePageEl.classList.contains('hidden'))
      this._headerEl.classList.add('hidden');
    else this._headerEl.classList.remove('hidden');

    if (curPage !== this._homePageEl) {
      this._breadcrumbEl.classList.remove('hidden');
    } else this._breadcrumbEl.classList.add('hidden');
  }

  _addHandlerInit() {
    this._parentElement.addEventListener('click', this._init.bind(this));
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

  // Change tabs in Account/Contact/Product pages
  _addHandlerChangeTabs() {
    this._tabs.addEventListener('click', this._changeTabs.bind(this));
  }

  // Slider functionality
  _goToSlide(slide = 0) {
    this._slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  // Accordion functionality
  _addHandlerAccordion() {
    this._accordionBox.addEventListener(
      'click',
      this._toggleAccordion.bind(this)
    );
  }
}
