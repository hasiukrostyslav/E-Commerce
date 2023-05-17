import View from './View';
import { ACCOUNT_TEXT } from '../config';

class TrackView extends View {
  _trackPageEl = document.getElementById('main__track');
  _inputNumEl = document.getElementById('order-num');
  _formSearchEl = this._trackPageEl.querySelector('.track__form');
  _btnSearchEl = this._trackPageEl.querySelector('.btn--large');
  _infoContainer = document.querySelector('.track__info-list');
  _orderIdEl = this._trackPageEl.querySelector('[data-track="id"]');
  _orderMethodEl = this._trackPageEl.querySelector('[data-track="method"]');
  _orderDateEl = this._trackPageEl.querySelector('[data-track="order-date"]');
  _orderStatusEl = this._trackPageEl.querySelector('[data-track="status"]');
  _deliveryDateEl = document.querySelector('[data-track="delivery-date"]');
  _orderDestinationEl = document.querySelector('[data-track="destination"]');
  _tableEL = this._trackPageEl.querySelector('.track__table');
  _shippedDate = this._tableEL.querySelectorAll('[data-date="shipped"]');
  _shippedTime = this._tableEL.querySelectorAll('[data-time="shipped"]');
  _destinationData = this._tableEL.querySelectorAll('[data-destination]');
  _deliveryDate = this._tableEL.querySelectorAll('[data-date="delivery"]');
  _deliveryTime = this._tableEL.querySelectorAll('[data-time="delivery"]');

  constructor() {
    super();
    this._addHandlerOpenTrackPage();
  }

  trackOrder(orders, e) {
    try {
      e.preventDefault();
      this._removeInputWarnings(this._formSearchEl);
      this._removeErrorHeading();

      const orderNumber = this._inputNumEl.value;
      const currentOrder = orders.find((order) => order.id === orderNumber);

      this._fillOrderData(currentOrder);
      this._showTable(currentOrder);

      this._infoContainer.classList.remove('hidden');
      this._clearInputs(this._formSearchEl);
    } catch (err) {
      this._infoContainer.classList.add('hidden');
      this._trackPageEl.classList.remove('track--full');
      if (!this._inputNumEl.value) {
        this._removeErrorHeading();
        this._renderWarning(this._inputNumEl, this._inputNumEl.dataset.input);
        this._showWarning(this._formSearchEl, this._inputNumEl);
        this._tableEL.classList.add('hidden');
      } else {
        this._appendErrorHeading();
      }
    }
  }

  _showTable(order) {
    this._fillTable(order);
    this._trackPageEl.classList.add('track--full');
    this._tableEL.classList.remove('hidden');
  }

  _fillTable(order) {
    this._shippedTime.forEach((el, i) => {
      el.textContent = this._timeFormatter(order.shippedDate, i);
    });

    this._destinationData.forEach(
      (el) =>
        (el.textContent = `${order.deliveryCity}, ${order.deliveryCountry}`)
    );

    this._deliveryTime.forEach((el, i) => {
      el.textContent = this._timeFormatter(order.deliveryDate, i);
    });

    this._shippedDate.forEach((el) => {
      if (!el.nextElementSibling.textContent) {
        el.textContent = '';
        this._addEmptyClass(el);
      } else {
        el.textContent = this._dateFormatter(order.shippedDate, false);
        this._removeEmptyClass(el);
      }
    });

    this._deliveryDate.forEach((el) => {
      if (!el.nextElementSibling.textContent) {
        el.textContent = '';
        this._addEmptyClass(el);
      } else {
        el.textContent = this._dateFormatter(order.deliveryDate, false);
        this._removeEmptyClass(el);
      }
    });
  }

  _addEmptyClass(el) {
    el.closest('.table__row')
      .querySelectorAll('td')
      .forEach((td) => td.classList.add('table__data--empty'));

    const dot = el.closest('.table__row').querySelector('.table__circle');
    dot.classList.add('table__circle--n');
    dot.classList.remove('table__circle--y');

    const line = el.closest('.table__row').querySelector('.table__line');
    if (!line) return;
    line.classList.add('table__line--n');
    line.classList.remove('table__line--y');
  }

  _removeEmptyClass(el) {
    el.closest('.table__row')
      .querySelectorAll('td')
      .forEach((td) => td.classList.remove('table__data--empty'));

    const dot = el.closest('.table__row').querySelector('.table__circle');
    dot.classList.remove('table__circle--n');
    dot.classList.add('table__circle--y');

    const line = el.closest('.table__row').querySelector('.table__line');
    if (!line) return;

    line.classList.remove('table__line--n');
    line.classList.add('table__line--y');
  }

  _timeFormatter(date, i) {
    const formatDate = new Date(date);
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    if (Date.now() < +new Date(date) + i * 3600 * 1000) return;
    return formatter.format(new Date(+formatDate + i * 3600 * 1000));
  }

  _appendErrorHeading() {
    this._tableEL.classList.add('hidden');

    const heading = document.createElement('h3');
    heading.classList.add('track__error');
    heading.textContent = ACCOUNT_TEXT.trackOrder;
    this._trackPageEl.append(heading);
  }

  _removeErrorHeading() {
    const heading = this._trackPageEl.querySelector('.track__error');
    if (heading) heading.remove();
  }

  _fillOrderData(order) {
    this._orderIdEl.textContent = order.id;
    this._orderMethodEl.textContent = order.deliveryType;
    this._orderDateEl.textContent = this._dateFormatter(
      order.shippedDate,
      false
    );
    this._orderDestinationEl.textContent = `${order.deliveryCity}, ${order.deliveryCountry}`;
    this._deliveryDateEl.textContent = this._dateFormatter(
      order.deliveryDate,
      false
    );
    this._orderStatusEl.textContent =
      order.status === 'progress'
        ? `In ${order.status.replace(
            order.status[0],
            order.status[0].toUpperCase()
          )}`
        : order.status.replace(order.status[0], order.status[0].toUpperCase());
  }

  addHandlerTrackOrder(handler) {
    this._formSearchEl.addEventListener('submit', handler);
  }

  _openTrackPage(e) {
    const link = e.target.closest('[data-link="track"]');
    if (!link) return;

    this._removeInputWarnings(this._formSearchEl);
    this._removeErrorHeading();
    this._trackPageEl.classList.remove('track--full');
    this._tableEL.classList.add('hidden');
    this._infoContainer.classList.add('hidden');
  }

  _addHandlerOpenTrackPage() {
    this._parentElement.addEventListener(
      'click',
      this._openTrackPage.bind(this)
    );
  }
}
export default new TrackView();
