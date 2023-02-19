import View from './View';
import icons from '../../assets/svg/sprite.svg';

class ContactView extends View {
  _contactsEl = document.getElementById('main__contacts');
  _tabs = document.querySelector('.contacts__navbar');
  _currentTab = document.querySelector('.contacts__link--current');
  _pages = document.querySelectorAll('.contacts__page');
  _currentPage = document.querySelector('.contacts__form');
  _accordionBox = document.querySelector('.faq');

  _textElement = `
    <p class="faq__text">
      Adipiscing nunc arcu enim elit mattis eu placerat proin. Imperdiet
      elementum faucibus dignissim purus. Fusce parturient diam magna
      ullamcorper morbi semper massa ac facilisis.
    </p>`;

  _iconPlus = `
    <svg class="icon__accordion icon__accordion--lg icon__accordion--plus">
      <use xlink:href="${icons}#plus"></use>
    </svg>`;

  _iconMinus = `
    <svg class="icon__accordion icon__accordion--lg icon__accordion--minus">
      <use xlink:href="${icons}#minus"></use>
    </svg>`;

  constructor() {
    super();
    this._addHandlerChangeTabs();
    this._addHandlerAccordion();
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

  _toggleAccordion(e) {
    const btn = e.target.closest('.btn__accordion');
    if (!btn) return;

    if (btn.firstElementChild.classList.contains('icon__accordion--plus')) {
      btn.insertAdjacentHTML('beforebegin', this._textElement);
      btn.innerHTML = this._iconMinus;
    } else {
      const pEl = btn.previousElementSibling;
      pEl.remove();
      btn.innerHTML = this._iconPlus;
    }
  }
}

export default new ContactView();
