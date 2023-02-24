import View from './View';

class AccountView extends View {
  _accountPageEl = document.getElementById('main__account');
  _tabs = document.querySelector('.account__list');
  _currentTab = document.querySelector('.account__item--current');
  _pages = document.querySelectorAll('.account__block');
  _currentPage = document.querySelector('.account__wishlist');
  _accordionContainer = document.querySelector('.order__accordion');

  constructor() {
    super();
    this._addHandlerChangeTabs();
    this._addHandlerAccordion();
    this._setObserver(this._renderBreadcrumb.bind(this));
  }

  _renderBreadcrumb() {
    if (!this._accountPageEl.classList.contains('hidden')) {
      const link = this._accountPageEl
        .querySelector('.account__item--current')
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
}

export default new AccountView();
