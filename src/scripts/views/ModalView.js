import View from './View';

class ModalView extends View {
  // _modalLogIn = document.querySelector('.modal--sign-in');
  // _modalRegister = document.querySelector('.modal--sign-up');
  // _modalReview = document.querySelector('.modal--review');
  // _modalCart = document.querySelector('.modal--cart');
  // _modalSize = document.querySelector('.modal--size');

  constructor() {
    super();
    this._getOpenModalButtons();
    this._getModalWindows();
    this.addHandlerOpenModal();
    this.addHandlerCloseModal();
  }

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
  }

  _closeModal(e) {
    const modal = this._modals.find((el) => !el.classList.contains('hidden'));
    if (!modal) return;

    if (
      e.target.closest('.btn--close') ||
      e.target.closest('.overlay') ||
      e.code === 'Escape'
    ) {
      this._addHiddenClass(modal);
    }
  }

  addHandlerOpenModal() {
    this._parentElement.addEventListener('click', this._openModal.bind(this));
  }

  addHandlerCloseModal() {
    this._parentElement.addEventListener('click', this._closeModal.bind(this));
    this._parentElement.addEventListener(
      'keydown',
      this._closeModal.bind(this)
    );
  }
}
export default new ModalView();
