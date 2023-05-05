import View from './View';

class ContactView extends View {
  _tabs = document.querySelector('.contacts__navbar');
  _links = document.querySelectorAll('.contacts__link');
  _pages = document.querySelectorAll('.contacts__page');
  _accordionContainer = document.querySelector('.faq');
  _form = this._contactsEl.querySelector('.contacts__form');
  _inputFullName = document.getElementById('contact-full-name');
  _inputEmail = document.getElementById('email');
  _inputPhone = document.getElementById('phone');
  _inputSubject = document.getElementById('subject');
  _inputMessage = document.getElementById('textarea-message');

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

    if (btn.dataset.contact === 'form') this._clearInputs(this._form);
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

  sendMessage(e) {
    e.preventDefault();
    this._removeInputWarnings(this._form);

    const fullName = this._fullNameValidation(this._inputFullName, this._form);
    if (!fullName) return;

    const email = this._globalEmailValidation(
      this._inputEmail,
      this._form,
      this._inputEmail
    );
    if (!email) return;

    let phone = this._phoneValidation(this._inputPhone, this._form);
    if (!phone && this._inputPhone.value) return;
    if (!phone && !this._inputPhone.value) phone = '';

    const subject = this._inputSubject.value;
    const message = this._textareaValidation(this._inputMessage, this._form);
    if (!message) return;
    this._showModalPopup('contact');
    this._form.querySelectorAll('.input').forEach((el) => (el.value = ''));

    return {
      fullName,
      email,
      phone,
      subject,
      message,
    };
  }

  addHandlerSendMessage(handler) {
    this._form.addEventListener('submit', handler);
  }
}

export default new ContactView();
