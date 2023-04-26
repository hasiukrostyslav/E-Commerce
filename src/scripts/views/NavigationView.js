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
  _userBtns = this._navigationEl.querySelector('.user-btns');
  _userProfileBadge = this._navigationEl.querySelector('.user-profile');
  _wishlistBtn = this._navigationEl.querySelector('.navigation__like-link');
  _wishlistIcon = this._wishlistBtn.querySelector('svg');
  _wishlistQuantity = this._wishlistBtn.querySelector('span');

  constructor() {
    super();
    this._addHandlerChangeSlide();
    this._addHandlerShowMenu();
    this._addHandlerHideMenu();
    this._setObserver(this._reset.bind(this));
  }

  logInAccount(user) {
    this._userBtns.style.display = 'none';
    this._userProfileBadge.style.display = 'flex';
    this._userProfileBadge.dataset.id = user.id;
    this._userProfileBadge.querySelector('a').textContent = user.firstName;
    this._wishlistBtn.classList.remove('navigation__like-link--idle');
    this._wishlistIcon.classList.remove('navigation__icon--idle');
    this._wishlistQuantity.textContent = user.wishlist.length;
  }

  logOutAccount() {
    this._userBtns.style.display = 'flex';
    this._userProfileBadge.style.display = 'none';
    this._userProfileBadge.removeAttribute('data-id');
    this._userProfileBadge.querySelector('a').textContent = '';
    this._wishlistBtn.classList.add('navigation__like-link--idle');
    this._wishlistIcon.classList.add('navigation__icon--idle');
    this._wishlistQuantity.textContent = '';
  }

  _reset(records) {
    const target = records.find(
      (record) => record.target === document.getElementById('main__catalog')
    );
    if (!target) return;
    this._menu.classList.add('hidden');
    this._overlay.classList.add('hidden');
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
