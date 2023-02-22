import View from './View';

class ContactView extends View {
  _tabs = document.querySelector('.contacts__navbar');
  _links = document.querySelectorAll('.contacts__link');
  _pages = document.querySelectorAll('.contacts__page');
  _accordionContainer = document.querySelector('.faq');

  constructor() {
    super();
    this._addHandlerChangeTabs();
    this._addHandlerAccordion();
    this._setObserver(this._resetAccordion.bind(this));
  }

  _changeTabs(e) {
    e.preventDefault();

    const btn = e.target.closest('.contacts__link');
    if (!btn) return;

    this._links.forEach((a) => a.classList.remove('contacts__link--current'));
    this._pages.forEach((page) => page.classList.add('hidden'));

    btn.classList.add('contacts__link--current');

    const currentPage = [...this._pages].find(
      (page) => page.dataset.contact === btn.dataset.contact
    );
    currentPage.classList.remove('hidden');
  }

  _toggleAccordion(e) {
    const btn = e.target.closest('.btn__accordion');
    if (!btn) return;

    if (btn.firstElementChild.classList.contains('icon__accordion--plus')) {
      btn.insertAdjacentHTML('beforebegin', this._generateTextEl());
      btn.innerHTML = this._generateAccordionBtnIcon('lg', 'minus');
    } else {
      btn.previousElementSibling.remove();
      btn.innerHTML = this._generateAccordionBtnIcon('lg', 'plus');
    }
  }

  _resetAccordion() {
    if (this._accordionContainer.classList.contains('hidden')) {
      this._accordionContainer
        .querySelectorAll('.faq__text')
        .forEach((el) => el.remove());

      this._accordionContainer
        .querySelectorAll('.btn__accordion')
        .forEach(
          (btn) =>
            (btn.innerHTML = this._generateAccordionBtnIcon('lg', 'plus'))
        );
    }
  }

  _generateTextEl() {
    this._textElement = `
    <p class="faq__text">
      Adipiscing nunc arcu enim elit mattis eu placerat proin. Imperdiet
      elementum faucibus dignissim purus. Fusce parturient diam magna
      ullamcorper morbi semper massa ac facilisis.
    </p>`;
    return this._textElement;
  }
}

export default new ContactView();
