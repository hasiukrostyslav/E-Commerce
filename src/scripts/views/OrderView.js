import View from './View';
import icons from '../../assets/svg/sprite.svg';

class OrderView extends View {
  _parentElement = document.querySelector('.order__accordion');
  _iconPlus = `
  <svg class="icon__accordion icon__accordion--lg icon__accordion--plus">
    <use
      xlink:href="${icons}#plus">
    </use>
  </svg>`;

  _iconMinus = `
  <svg class="icon__accordion icon__accordion--lg icon__accordion--minus">
    <use
      xlink:href="${icons}#minus">
    </use>
  </svg>`;

  _toggleOrders(e) {
    const btn = e.target.closest('.btn__accordion');
    if (!btn) return;

    const orderId = btn
      .closest('.order__panel-list')
      .querySelector('.order__id');
    const orderCart = btn.closest('.order__panel-list').nextElementSibling;

    if (
      btn
        .querySelector('.icon__accordion')
        .classList.contains('icon__accordion--minus')
    ) {
      btn.innerHTML = this._iconPlus;
      orderCart.classList.add('hidden');
      orderId.classList.remove('order__id--open');
    } else {
      btn.innerHTML = this._iconMinus;
      orderCart.classList.remove('hidden');
      orderId.classList.add('order__id--open');
    }
  }

  addHandlerToggleOrders() {
    if (!this._parentElement) return;

    this._parentElement.addEventListener(
      'click',
      this._toggleOrders.bind(this)
    );
  }
}

export default new OrderView();
