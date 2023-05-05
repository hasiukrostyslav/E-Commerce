import View from './View';
import { ERROR } from '../config';

class ModalView extends View {
  _modalSignIn = document.querySelector('.modal--sign-in');
  _modalRegister = document.querySelector('.modal--sign-up');
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
      const curModal = this._modals.find(
        (el) => !el.classList.contains('hidden')
      );
      this._addHiddenClass(curModal);
    }

    const modal = this._modals.find(
      (el) => el.dataset.modal === btn.dataset.modal
    );
    this._removeHiddenClass(modal);
    this._clearInputs(modal);
    modal
      .querySelectorAll('[data-input]')
      .forEach((el) => el.classList.remove('input--invalid'));
    modal.querySelectorAll('.input__warning').forEach((el) => el.remove());

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

  modalTimer() {
    setTimeout(() => {
      this._modalPopup.classList.add('hidden');
      this._modalMessage.textContent = '';
    }, 2000);
  }

  // SIGN IN
  signIn(data) {
    const inputs = [...this._modalSignIn.querySelectorAll('input')].filter(
      (input) => input.dataset.input
    );
    this._inputEmail = inputs.find((el) => el.dataset.input === 'email');
    this._inputPass = inputs.find((el) => el.dataset.input === 'pass');
    this._removeInputWarnings(this._modalSignIn);

    const user = data.find((el) => el.email === this._inputEmail.value);
    const email = this._emailValidationSignIn(user);
    if (!email) return;
    const pass = this._passValidationSignIn(user);

    if (email && pass) {
      this._clearInputs(this._modalSignIn);
      this._addHiddenClass(this._modalSignIn);
      return user;
    }
  }

  _emailValidationSignIn(user) {
    if (!user) {
      this._renderWarning(this._inputEmail, this._inputEmail.dataset.input);
      this._showWarning(this._modalSignIn, this._inputEmail);
      return;
    }
    if (user) {
      this._inputEmail.classList.remove('input--invalid');
      return this._inputEmail.value;
    }
  }

  _passValidationSignIn(user) {
    if (this._inputPass.value !== user.password) {
      this._renderWarning(this._inputPass, this._inputPass.dataset.input);
      this._showWarning(this._modalSignIn, this._inputPass);
    } else {
      this._inputPass.classList.remove('input--invalid');
      return this._inputPass.value;
    }
  }

  addHandlerSignIn(handler) {
    this._btnLogIn.addEventListener('click', handler);
  }

  // REGISTER

  registerUser(data) {
    const inputs = [...this._modalRegister.querySelectorAll('input')].filter(
      (input) => input.dataset.input
    );

    this._inputFullName = inputs.find((el) => el.dataset.input === 'full-name');
    this._inputEmail = inputs.find((el) => el.dataset.input === 'email');
    this._inputPass = inputs.find((el) => el.dataset.input === 'pass');
    this._inputPassConfirm = inputs.find(
      (el) => el.dataset.input === 'pass-confirm'
    );

    this._removeInputWarnings(this._modalRegister);

    const fullName = this._fullNameValidation(
      this._inputFullName,
      this._modalRegister
    );
    if (!fullName) return;

    const oldUser = data.find((user) => user.email === this._inputEmail.value);
    const email = this._emailValidationSignUp(oldUser);
    if (!email) return;

    const pass = this._passValidationSignUp();
    if (!pass) return;

    const passConfirm = this._passConfirmValidation(
      this._inputPassConfirm,
      pass,
      this._modalRegister
    );
    if (pass !== passConfirm) return;

    this._clearInputs(this._modalRegister);
    this._addHiddenClass(this._modalRegister);
    return [fullName, email, pass];
  }

  _emailValidationSignUp(user) {
    if (user) {
      this._renderWarning(this._inputEmail, this._inputEmail.dataset.input);
      this._modalRegister.querySelector('.input__warning').textContent =
        ERROR.emailDuplicate;
    }

    if (!user)
      return this._globalEmailValidation(
        this._inputEmail,
        this._modalRegister,
        this._inputEmail
      );
  }

  _passValidationSignUp() {
    if (this._inputPass.value.length < 6) {
      this._renderWarning(this._inputPass, this._inputPass.dataset.input);
      this._showWarning(this._modalRegister, this._inputPass);
    } else {
      this._inputPass.classList.remove('input--invalid');
      return this._inputPass.value;
    }
  }

  addHandlerRegister(handler) {
    this._btnRegister.addEventListener('click', handler);
  }
}
export default new ModalView();
