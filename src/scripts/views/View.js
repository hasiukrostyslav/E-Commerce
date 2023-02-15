export default class View {
  _data;

  _render() {
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _renderOverlay() {
    const markup = `
    <div class="overlay hidden"></div>
    `;
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _removeHiddenClass() {
    this._modal.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  _addHiddenClass() {
    this._modal.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  _deleteWarningLabel() {
    const warningElement = this._modal.querySelector('.input__warning');
    if (warningElement) warningElement.remove();
  }

  _clearInputs() {
    if (!this._inputElements) return;
    this._inputElements.forEach((input) => {
      input.value = '';
      input.classList.remove('input--invalid');
    });
  }

  _openModal(e) {
    if (!this._btnOpen) return;
    const btn = e.target.closest(
      `.${this._btnOpen.className.split(' ').at(-1)}`
    );

    if (!btn) return;
    this._removeHiddenClass();

    if (!this._inputElements) return;
    [...this._inputElements][0].focus();
  }

  _closeModal(e) {
    if (
      e.target.closest('.btn--close') ||
      e.target.closest('.overlay') ||
      e.code === 'Escape'
    ) {
      this._deleteWarningLabel();
      this._addHiddenClass();
      this._clearInputs();
    }
  }

  _goToSlide(slide = 0) {
    this._slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  _generateWarningMarkup(el) {
    this._warning = `<span class="input__warning hidden" data-name="${el.name}"></span>`;

    return this._warning;
  }

  _renderInputWarning(input) {
    input.insertAdjacentHTML('afterend', this._generateWarningMarkup(input));
  }

  _showInputWarning(inputEl) {
    const inputWarnings = Array.from(
      this._modal.querySelectorAll('.input__warning')
    );

    const warning = inputWarnings.find(
      (el) => el.dataset.name === inputEl.name
    );
    warning.classList.remove('hidden');
    inputEl.classList.add('input--invalid');

    if (inputEl.type === 'email') {
      warning.textContent = 'Please provide a valid email.';
    }

    if (inputEl.type === 'password') {
      warning.textContent = 'Password should contain at least 6 character.';
    }

    if (inputEl.name === 'password-sign-up-confirm') {
      warning.textContent = 'Password and confirm password should be equal.';
    }

    if (inputEl.type === 'text') {
      warning.textContent = 'Please provide a valid full name.';
    }
  }

  _validationData(e) {
    e.preventDefault();

    document.querySelectorAll('.input__warning').forEach((el) => el.remove());

    if (this._inputFullName) {
      if (this._inputFullName.value.split(' ').length < 2) {
        this._renderInputWarning(this._inputFullName);
        this._showInputWarning(this._inputFullName);
        return;
      }
      this._fullName = this._inputFullName.value;
      this._inputFullName.classList.remove('input--invalid');
    }

    if (
      !this._inputEmail.value.includes('@') ||
      !this._inputEmail.value.includes('.') ||
      this._inputEmail.value.includes('@.') ||
      this._inputEmail.value.at(-1) === '.'
    ) {
      this._renderInputWarning(this._inputEmail);
      this._showInputWarning(this._inputEmail);
      return;
    }
    this._email = this._inputEmail.value;
    this._inputEmail.classList.remove('input--invalid');

    if (this._inputPassword.value.length < 6) {
      this._renderInputWarning(this._inputPassword);
      this._showInputWarning(this._inputPassword);
      return;
    }
    this._pass = this._inputPassword.value;
    this._inputPassword.classList.remove('input--invalid');

    if (this._inputPasswordConfirm) {
      if (this._inputPasswordConfirm.value !== this._pass) {
        this._renderInputWarning(this._inputPasswordConfirm);
        this._showInputWarning(this._inputPasswordConfirm);
        return;
      }
      this._passConf = this._inputPasswordConfirm.value;
      this._inputPasswordConfirm.classList.remove('input--invalid');
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

  addHandlerSubmitInput() {
    this._btnSubmit.addEventListener('click', this._validationData.bind(this));
  }

  addHandlerChangeTabs() {
    if (!this._parentElement) return;

    this._tabs.addEventListener('click', this._changeTabs.bind(this));
  }
}
