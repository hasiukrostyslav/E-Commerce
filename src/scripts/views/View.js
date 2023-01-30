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

  _openModal(e) {
    if (!this._btnOpen) return;
    const btn = e.target.closest(
      `.${this._btnOpen.className.split(' ').at(-1)}`
    );

    if (!btn) return;
    this._removeHiddenClass();
  }

  _closeModal(e) {
    if (
      e.target.closest('.btn--close') ||
      e.target.closest('.overlay') ||
      e.code === 'Escape'
    ) {
      this._addHiddenClass();
    }
  }

  _goToSlide(slide = 0) {
    this._slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
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

  addHandlerChangeTabs() {
    if (!this._parentElement) return;

    this._tabs.addEventListener('click', this._changeTabs.bind(this));
  }
}
