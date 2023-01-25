import View from './View';

class ContactView extends View {
  _parentElement = document.querySelector('.main__contacts');
  _tabs = document.querySelector('.contacts__navbar');
  _currentLink = document.querySelector('.contacts__link--current');
  _contactPages = document.querySelectorAll('.contacts__page');
  _currentPage = document.querySelector('.contacts__form');

  _changeTabs(e) {
    e.preventDefault();

    const btn = e.target.closest('.contacts__link');
    if (!btn) return;
    this._currentLink.classList.remove('contacts__link--current');
    this._currentLink = btn;
    this._currentLink.classList.add('contacts__link--current');

    this._currentPage.classList.add('hidden');
    this._currentPage = [...this._contactPages].find(
      (page) => page.dataset.contact === this._currentLink.dataset.contact
    );
    this._currentPage.classList.remove('hidden');
  }
}

export default new ContactView();
