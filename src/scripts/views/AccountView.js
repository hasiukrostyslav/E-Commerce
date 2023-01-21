import View from './View';

class AccountView extends View {
  _parentElement = document.querySelector('.account');
  _sidebar = document.querySelector('.account__aside');
  _currentLink = document.querySelector('.account__item--current');
  _accountPages = document.querySelectorAll('.account__main');
  _currentPage = document.querySelector('.account__wishlist');
  _currentBreadcrumb = document.querySelector('.breadcrumb__wishlist');
  _breadcrumbItems = document.querySelectorAll('.breadcrumb__item');

  changeAccountTabs() {
    if (!this._parentElement) return;

    this._sidebar.addEventListener('click', (e) => {
      e.preventDefault();

      const btn = e.target.closest('.account__item');
      if (!btn) return;
      this._currentLink.classList.remove('account__item--current');
      this._currentLink = btn;
      this._currentLink.classList.add('account__item--current');

      this._currentPage.classList.add('hidden');
      this._currentPage = [...this._accountPages].find(
        (page) => page.dataset.account === this._currentLink.dataset.account
      );
      this._currentPage.classList.remove('hidden');

      this._currentBreadcrumb.classList.add('hidden');
      this._currentBreadcrumb = [...this._breadcrumbItems].find(
        (item) => item.dataset.account === this._currentLink.dataset.account
      );
      this._currentBreadcrumb.classList.remove('hidden');
    });
  }
}

export default new AccountView();
