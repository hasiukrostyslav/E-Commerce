import View from './View';

class ContactView extends View {
  _contactsPageEl = document.getElementById('main__contacts');
  _tabs = document.querySelector('.contacts__navbar');
  _currentTab = document.querySelector('.contacts__link--current');
  _pages = document.querySelectorAll('.contacts__page');
  _currentPage = document.querySelector('.contacts__form');

  constructor() {
    super();
    this._addHandlerChangeTabs();
    // this._renderBreadcrumbItems();
  }

  _changeTabs(e) {
    e.preventDefault();

    const btn = e.target.closest('.contacts__link');
    if (!btn) return;

    this._currentTab.classList.remove('contacts__link--current');
    this._currentTab = btn;
    this._currentTab.classList.add('contacts__link--current');

    this._currentPage.classList.add('hidden');
    this._currentPage = [...this._pages].find(
      (page) => page.dataset.contact === this._currentTab.dataset.contact
    );
    this._currentPage.classList.remove('hidden');
  }
}

export default new ContactView();
