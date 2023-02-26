import View from './View';
import { ERROR } from '../config';

class ModalView extends View {
  constructor() {
    super();
    this._getOpenModalButtons();
    this._getModalWindows();
    this._getSubmitButtons();
    this._addHandlerOpenModal();
    this._addHandlerCloseModal();
  }

  // Init modals
  _getModalWindows() {
    this._modals = Array.from(
      this._parentElement.querySelectorAll('section[data-modal]')
    );
  }

  _getOpenModalButtons() {
    const btns = this._parentElement.querySelectorAll('button[data-modal]');
    const input = this._parentElement.querySelectorAll('input[data-modal]');
    const links = this._parentElement.querySelectorAll('a[data-modal]');

    this._btnsOpenModal = [...btns, ...input, ...links];
  }

  _getSubmitButtons() {
    this._btnsSubmit = [
      ...document.querySelectorAll('button[type="submit"]'),
    ].filter((btn) => btn.dataset.submit);
  }

  // Open / close modals
  _removeHiddenClass(modal) {
    modal.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  _addHiddenClass(modal) {
    modal.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  _openModal(e) {
    const btn = e.target.closest('.modal-open');

    if (!btn) return;

    if (btn.tagName === 'a'.toUpperCase()) {
      const modal = this._modals.find((el) => !el.classList.contains('hidden'));
      this._addHiddenClass(modal);
    }

    const modal = this._modals.find(
      (el) => el.dataset.modal === btn.dataset.modal
    );
    this._removeHiddenClass(modal);

    if (
      modal.querySelector('input[type="text"]') ||
      modal.querySelector('input[type="email"]')
    )
      modal.querySelector('input').focus();
  }

  _closeModal(e) {
    const modal = this._modals.find((el) => !el.classList.contains('hidden'));
    if (!modal) return;

    if (
      e.target.closest('.btn--close') ||
      e.target.closest('.overlay') ||
      e.code === 'Escape'
    ) {
      // this._clearInputs(modal);
      this._addHiddenClass(modal);
    }
  }

  _addHandlerOpenModal() {
    this._parentElement.addEventListener('click', this._openModal.bind(this));
  }

  _addHandlerCloseModal() {
    this._parentElement.addEventListener('click', this._closeModal.bind(this));
    this._parentElement.addEventListener(
      'keydown',
      this._closeModal.bind(this)
    );
  }

  // Validation / submit data
  _generateWarningMarkup(data) {
    return `<span class="input__warning" data-warning="${data}"></span>`;
  }

  _renderWarning(input, data) {
    input.insertAdjacentHTML('afterend', this._generateWarningMarkup(data));
  }

  _showWarning(inputEl) {
    const warning = this._modal.querySelector('.input__warning');
    inputEl.classList.add('input--invalid');

    if (inputEl.type === 'email') {
      warning.textContent = ERROR.email;
    }

    if (inputEl.type === 'password') {
      warning.textContent = ERROR.passLenght;
    }
  }

  _validationData(e) {
    e.preventDefault();

    const btn = e.target;
    this._modal = btn.closest('section[data-modal]');
    this._modal
      .querySelectorAll('.input__warning')
      .forEach((el) => el.remove());

    const inputs = [...this._modal.querySelectorAll('input')].filter(
      (input) => input.dataset.input
    );

    if (inputs.find((el) => el.dataset.input === 'email')) {
      this._inputEmail = inputs.find((el) => el.dataset.input === 'email');

      if (
        !this._inputEmail.value.includes('@') ||
        !this._inputEmail.value.includes('.') ||
        this._inputEmail.value.includes('@.') ||
        this._inputEmail.value.at(-1) === '.'
      ) {
        this._renderWarning(this._inputEmail, this._inputEmail.dataset.input);
        this._showWarning(this._inputEmail);
        return;
      }

      this._email = this._inputEmail.value;
      this._inputEmail.classList.remove('input--invalid');
    }

    if (inputs.find((el) => el.dataset.input === 'pass')) {
      this._inputPass = inputs.find((el) => el.dataset.input === 'pass');
      if (this._inputPass.value.length < 6) {
        this._renderWarning(this._inputPass, this._inputPass.dataset.input);
        this._showWarning(this._inputPass);
        return;
      }
      this._pass = this._inputPass.value;
      this._inputPass.classList.remove('input--invalid');
    }
    console.log('Correct');
  }

  _submitLogIn(e) {
    if (
      e.target !==
      this._btnsSubmit.find((btn) => btn.closest('.modal--sign-in'))
    )
      return;

    this._validationData(e);
  }

  addHandlerLogIn() {
    this._parentElement.addEventListener('click', this._submitLogIn.bind(this));
  }
}
export default new ModalView();
