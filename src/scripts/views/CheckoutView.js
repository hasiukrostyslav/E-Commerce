import View from './View';

class CheckoutView extends View {
  _modalEl = this._parentElement.querySelector('.modal--cart');

  renderCheckoutPage(data) {
    this._modalEl.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  addHandlerRenderCheckoutPage(handler) {
    document
      .querySelector('[data-link="checkout"]')
      .addEventListener('click', handler);
  }
}
export default new CheckoutView();
