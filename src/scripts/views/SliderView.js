import View from './View';

class SliderView extends View {
  _parentElement = document.querySelector('.header');
  _slides = document.querySelectorAll('.hero__slide');
  _btnLeft = this._parentElement.querySelector('.slider__btn--left');
  _btnRight = this._parentElement.querySelector('.slider__btn--right');
  _pageContainer = this._parentElement.querySelector('.slider__pages');
  _curSlide = 0;
  _maxSlide = this._slides.length;

  constructor() {
    super();
    this._createSlideTabs();
    this._goToSlide();
    this._activateSlideTab();
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
    this._parentElement
      .querySelectorAll('.slider__page-btn')
      .forEach((page) => page.classList.remove('slider__page-btn--active'));

    this._parentElement
      .querySelector(`.slider__page-btn[data-slide="${slide}"]`)
      .classList.add('slider__page-btn--active');
  }

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

  _clickTabs(e) {
    if (e.target.classList.contains('slider__page-btn')) {
      const { slide } = e.target.dataset;
      this._goToSlide(slide);
      this._activateSlideTab(slide);
    }
  }

  addHandlerChangeSlide() {
    this._btnRight.addEventListener('click', this._nextSlide.bind(this));
    this._btnLeft.addEventListener('click', this._prevSlide.bind(this));
    this._pageContainer.addEventListener('click', this._clickTabs.bind(this));
  }
}

export default new SliderView();
