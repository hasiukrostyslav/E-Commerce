import View from './View';
import { ERROR } from '../config';

class ModalView extends View {
  _modalSignIn = document.querySelector('.modal--sign-in');
  _btnLogIn = document.querySelector('.btn[data-submit="sign-in"]');
  _btnRegister = document.querySelector('.btn[data-submit="sign-up"]');

  constructor() {
    super();
    this._getModalWindows();
    this._getOpenModalButtons();
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

  // Open / close modals
  _removeHiddenClass(modal) {
    modal.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  _addHiddenClass(modal) {
    modal.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  _clearInputs(modal) {
    [...modal.querySelectorAll('input')]
      .filter((input) => input.dataset.input)
      .forEach((input) => (input.value = ''));
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
      this._clearInputs(modal);
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

  // validationData(e) {
  //   this._modal = e.target.closest('section[data-modal]');
  //   this._modal
  //     .querySelectorAll('.input__warning')
  //     .forEach((el) => el.remove());

  //   const inputs = [...this._modal.querySelectorAll('input')].filter(
  //     (input) => input.dataset.input
  //   );

  //   if (inputs.find((el) => el.dataset.input === 'email')) {
  //     this._inputEmail = inputs.find((el) => el.dataset.input === 'email');
  //     if (
  //       !this._inputEmail.value.includes('@') ||
  //       !this._inputEmail.value.includes('.') ||
  //       this._inputEmail.value.includes('@.') ||
  //       this._inputEmail.value.at(-1) === '.'
  //     ) {
  //       this._renderWarning(this._inputEmail, this._inputEmail.dataset.input);
  //       this._showWarning(this._inputEmail);
  //       return;
  //     }

  //     this._email = this._inputEmail.value;
  //     this._inputEmail.classList.remove('input--invalid');
  //   }

  //   if (inputs.find((el) => el.dataset.input === 'pass')) {
  //     this._inputPass = inputs.find((el) => el.dataset.input === 'pass');
  //     if (this._inputPass.value.length < 6) {
  //       this._renderWarning(this._inputPass, this._inputPass.dataset.input);
  //       this._showWarning(this._inputPass);
  //       return;
  //     }
  //     this._pass = this._inputPass.value;
  //     this._inputPass.classList.remove('input--invalid');
  //   }
  //   console.log('Correct');
  // }

  // Validation / submit data
  validationLogIn(data) {
    const inputs = [...this._modalSignIn.querySelectorAll('input')].filter(
      (input) => input.dataset.input
    );
    this._inputEmail = inputs.find((el) => el.dataset.input === 'email');
    this._inputPass = inputs.find((el) => el.dataset.input === 'pass');
    let email;
    let pass;

    this._modalSignIn
      .querySelectorAll('.input__warning')
      .forEach((el) => el.remove());

    const user = data.find((el) => el.email === this._inputEmail.value);

    if (!user) {
      this._renderWarning(this._inputEmail, this._inputEmail.dataset.input);
      this._showWarning(this._modalSignIn, this._inputEmail);
      return;
    }
    if (user) {
      email = this._inputEmail.value;
      this._inputEmail.classList.remove('input--invalid');
    }

    if (+this._inputPass.value === user.password) {
      pass = this._inputPass.value;
      this._inputPass.classList.remove('input--invalid');
    } else {
      this._renderWarning(this._inputPass, this._inputPass.dataset.input);
      this._showWarning(this._modalSignIn, this._inputPass);
    }

    if (email && pass) {
      this._clearInputs(this._modalSignIn);
      this._addHiddenClass(this._modalSignIn);
      return user;
    }
  }

  _renderWarning(input, data) {
    input.insertAdjacentHTML(
      'afterend',
      `<span class="input__warning" data-warning="${data}"></span>`
    );
  }

  _showWarning(modal, inputEl) {
    const warning = modal.querySelector('.input__warning');
    inputEl.classList.add('input--invalid');

    if (
      (inputEl.type === 'email' && !inputEl.id === 'email-sign-in') ||
      (inputEl.type === 'email' && !inputEl.value)
    ) {
      warning.textContent = ERROR.email;
    }

    if (inputEl.id === 'email-sign-in' && inputEl.value) {
      warning.textContent = ERROR.emailWrong;
    }

    if (inputEl.type === 'password' && inputEl.value.length < 6) {
      warning.textContent = ERROR.passLength;
    }

    if (inputEl.id === 'password-sign-in' && inputEl.value.length >= 6) {
      warning.textContent = ERROR.passWrong;
    }
  }

  addHandlerLogIn(handler) {
    this._btnLogIn.addEventListener('click', handler);
  }
}
export default new ModalView();
