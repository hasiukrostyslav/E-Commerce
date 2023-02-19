import View from './View';
import icons from '../../assets/svg/sprite.svg';

class AccountView extends View {
  _accountPageEl = document.getElementById('main__account');
  _tabs = document.querySelector('.account__list');
  _currentTab = document.querySelector('.account__item--current');
  _pages = document.querySelectorAll('.account__block');
  _currentPage = document.querySelector('.account__wishlist');
  _accordionBox = document.querySelector('.order__accordion');
  // _currentBreadcrumb = document.querySelector('.breadcrumb__wishlist');
  // _breadcrumbItems = document.querySelectorAll('.breadcrumb__item');

  _iconPlus = `
  <svg class="icon__accordion icon__accordion--lg icon__accordion--plus">
    <use
      xlink:href="${icons}#plus">
    </use>
  </svg>`;

  _iconMinus = `
  <svg class="icon__accordion icon__accordion--lg icon__accordion--minus">
    <use
      xlink:href="${icons}#minus">
    </use>
  </svg>`;

  constructor() {
    super();
    this._addHandlerChangeTabs();
    this._addHandlerAccordion();
  }

  _changeTabs(e) {
    e.preventDefault();

    const btn = e.target.closest('.account__item');
    if (!btn) return;

    this._currentTab.classList.remove('account__item--current');
    this._currentTab = btn;
    this._currentTab.classList.add('account__item--current');

    this._currentPage.classList.add('hidden');
    this._currentPage = [...this._pages].find(
      (page) => page.dataset.account === this._currentTab.dataset.account
    );
    this._currentPage.classList.remove('hidden');

    // this._currentBreadcrumb.classList.add('hidden');
    // this._currentBreadcrumb = [...this._breadcrumbItems].find(
    //   (item) => item.dataset.account === this._currentTab.dataset.account
    // );
    // this._currentBreadcrumb.classList.remove('hidden');
  }

  _toggleAccordion(e) {
    const btn = e.target.closest('.btn__accordion');
    if (!btn) return;

    const orderId = btn
      .closest('.order__panel-list')
      .querySelector('.order__id');
    const orderCart = btn.closest('.order__panel-list').nextElementSibling;

    if (
      btn
        .querySelector('.icon__accordion')
        .classList.contains('icon__accordion--minus')
    ) {
      btn.innerHTML = this._iconPlus;
      orderCart.classList.add('hidden');
      orderId.classList.remove('order__id--open');
    } else {
      btn.innerHTML = this._iconMinus;
      orderCart.classList.remove('hidden');
      orderId.classList.add('order__id--open');
    }
  }
}

export default new AccountView();
