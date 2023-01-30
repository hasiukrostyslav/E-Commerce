import View from './View';
import icons from '../../assets/svg/sprite.svg';

class OffersView extends View {
  _parentElement = document.querySelector('.navbar');

  _curSlide = 0;

  _interval;

  constructor() {
    super();
    this._render();
    this._slides = document.querySelectorAll('.offers__slide');
    this._btnLeft = document.querySelector('.offers__btn--left');
    this._btnRight = document.querySelector('.offers__btn--right');
    this._pageContainer = document.querySelector('.offers__slider');
    this._maxSlide = this._slides.length;
  }

  _prevSlide() {
    this._curSlide =
      this._curSlide === 0 ? this._maxSlide - 1 : this._curSlide - 1;
    this._goToSlide(this._curSlide);
  }

  _nextSlide() {
    this._curSlide =
      this._curSlide === this._maxSlide - 1 ? 0 : this._curSlide + 1;
    this._goToSlide(this._curSlide);
  }

  addHandlerChangeSlide() {
    this._btnLeft.addEventListener('click', this._prevSlide.bind(this));
    this._btnRight.addEventListener('click', this._nextSlide.bind(this));
  }

  _render() {
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterend', markup);
  }

  _generateMarkup() {
    return `
    <section class="offers">
      <button class="offers__btn offers__btn--left" data-slide="0">
          <svg class="offers__icon">
              <use
                  xlink:href="${icons}#left-chevron"
              ></use>
          </svg>
      </button>
      <div class="offers__slider">
        <div class="offers__slide offers__slide--1">
          <p class="offers__heading">Up to 70% Off.</p>
          <a href="catalog.html" class="offers__link">Shop our latest sale styles</a>
        </div>
        <div class="offers__slide offers__slide--2">
          <p class="offers__heading">Up to 30% Off.</p>
          <a href="catalog.html" class="offers__link">Shop our latest sale styles</a>
        </div>
        <div class="offers__slide offers__slide--3">
          <p class="offers__heading">Up to 30% Off.</p>
          <a href="catalog.html" class="offers__link">Shop our latest sale styles</a>
        </div>
      </div>
      <button class="offers__btn offers__btn--right" data-slide="1">
          <svg class="offers__icon">
              <use
                  xlink:href="${icons}#right-chevron"
              ></use>
          </svg>
      </button>
</section>
    `;
  }
}

export default new OffersView();
