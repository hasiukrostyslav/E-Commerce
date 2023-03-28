import View from './View';

class HeaderView extends View {
  _slides = document.querySelectorAll('.hero__slide');
  _btnLeft = document.querySelector('.slider__btn--left');
  _btnRight = document.querySelector('.slider__btn--right');
  _pageContainer = document.querySelector('.slider__pages');
  _curSlide = 0;
  _maxSlide = this._slides.length;
  _interval;

  constructor() {
    super();

    this._createSlideTabs();
    this._activateSlideTab();
    this._setSlideInterval();
    this._addHandlerChangeSlide();
  }

  _createSlideTabs() {
    this._slides.forEach((_, i) =>
      this._pageContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="slider__page-btn" data-slide="${i}">0${i + 1}</button>`
      )
    );
  }

  _activateSlideTab(slide = 0) {
    this._headerEl
      .querySelectorAll('.slider__page-btn')
      .forEach((page) => page.classList.remove('slider__page-btn--active'));

    this._headerEl
      .querySelector(`.slider__page-btn[data-slide="${slide}"]`)
      .classList.add('slider__page-btn--active');
  }

  _setSlideInterval() {
    this._interval = setInterval(() => {
      this._nextSlide();
    }, 4000);
  }

  _changeSlideInterval() {
    clearInterval(this._interval);
    this._setSlideInterval();
  }

  _addHandlerChangeSlide() {
    this._headerEl.addEventListener(
      'click',
      this._changeSlideInterval.bind(this)
    );
    this._btnRight.addEventListener('click', this._nextSlide.bind(this));
    this._btnLeft.addEventListener('click', this._prevSlide.bind(this));
    this._pageContainer.addEventListener(
      'click',
      this._clickTabs.bind(this, '.slider__page-btn')
    );
  }
}

export default new HeaderView();
