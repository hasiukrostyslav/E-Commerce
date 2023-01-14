export default class View {
  _data;

  _render() {
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _renderOverlay() {
    const markup = `
    <div class="overlay hidden"></div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _addModal() {
    this._modal.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }
  _removeModal() {
    this._modal.classList.add('hidden');
    this._overlay.classList.add('hidden');
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
