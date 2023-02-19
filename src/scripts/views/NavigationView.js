import View from './View';

class NavigationView extends View {
  _parentElement = document.querySelector('.navbar');
  _navigation = document.querySelector('.navigation__list');
  _nav = document.querySelector('.navbar__cover--light');
  _menu = document.querySelector('.menu');
  _slides = document.querySelectorAll('.offers__slide');
  _btnLeft = document.querySelector('.offers__btn--left');
  _btnRight = document.querySelector('.offers__btn--right');
  _maxSlide = this._slides.length;
  _curSlide = 0;

  constructor() {
    super();
    this._addHandlerChangeSlide();
    this._addHandlerShowMenu();
    this._addHandlerHideMenu();
  }

  // Show menu
  _hoverLink(e) {
    const target = e.target.closest('.navigation__item');
    if (!target) return;
    this._parentElement.style.zIndex = 200;
    this._menu.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  _outLink(e) {
    if (
      (e.target === this._navigation && e.relatedTarget !== this._menu) ||
      (e.target === this._menu && e.relatedTarget !== this._navigation)
    ) {
      this._parentElement.style.zIndex = '';
      this._menu.classList.add('hidden');
      this._overlay.classList.add('hidden');
    }
  }

  _addHandlerShowMenu() {
    this._navigation.addEventListener('mouseover', this._hoverLink.bind(this));
  }

  _addHandlerHideMenu() {
    this._navigation.addEventListener('mouseleave', this._outLink.bind(this));
    this._menu.addEventListener('mouseleave', this._outLink.bind(this));
  }

  // Slider on navigation
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

  _addHandlerChangeSlide() {
    this._btnLeft.addEventListener('click', this._prevSlide.bind(this));
    this._btnRight.addEventListener('click', this._nextSlide.bind(this));
  }
}

export default new NavigationView();
