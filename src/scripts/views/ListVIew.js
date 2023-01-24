import View from './View';
import icons from '../../assets/svg/sprite.svg';

class ListView extends View {
  _parentElement = document.querySelector('.main__contacts');
  _btnOpen = document.querySelectorAll('.faq__btn');
  _textElement = `
    <p class="faq__text">
      Adipiscing nunc arcu enim elit mattis eu placerat proin. Imperdiet
      elementum faucibus dignissim purus. Fusce parturient diam magna
      ullamcorper morbi semper massa ac facilisis.
    </p>`;
  _iconPlus = `
    <svg class="order__btn-plus">
      <use xlink:href="${icons}#plus"></use>
    </svg>`;
  _iconMinus = `
    <svg class="order__btn-minus">
      <use xlink:href="${icons}#minus"></use>
    </svg>`;

  toggleQuestion() {
    if (!this._parentElement) return;

    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq__btn');
      if (!btn) return;
      if (btn.firstElementChild.classList.contains('order__btn-plus')) {
        btn.insertAdjacentHTML('beforebegin', this._textElement);
        btn.innerHTML = this._iconMinus;
      } else {
        const pEl = btn.previousElementSibling;
        pEl.textContent = '';
        btn.innerHTML = this._iconPlus;
      }
    });
  }
}

export default new ListView();
