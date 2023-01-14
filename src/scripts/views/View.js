export default class View {
  _data;

  render() {
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderOverlay() {
    const markup = `
    <div class="overlay hidden"></div>
    `;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  openModal() {
    this._btnOpen.addEventListener('click', function () {
      this._modal.classList.remove('hidden');
      this._overlay.classList.remove('hidden');
    });
  }
}
