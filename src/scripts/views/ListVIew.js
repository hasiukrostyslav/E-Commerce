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
    <svg class="icon__accordion icon__accordion--lg icon__accordion--plus">
      <use xlink:href="${icons}#plus"></use>
    </svg>`;

  _iconMinus = `
    <svg class="icon__accordion icon__accordion--lg icon__accordion--minus">
      <use xlink:href="${icons}#minus"></use>
    </svg>`;

  _toggleQuestion(e) {
    const btn = e.target.closest('.faq__btn');
    if (!btn) return;
    if (btn.firstElementChild.classList.contains('icon__accordion--plus')) {
      btn.insertAdjacentHTML('beforebegin', this._textElement);
      btn.innerHTML = this._iconMinus;
    } else {
      const pEl = btn.previousElementSibling;
      pEl.remove();
      btn.innerHTML = this._iconPlus;
    }
  }

  addHandlertoggleQuestion() {
    if (!this._parentElement) return;

    this._parentElement.addEventListener(
      'click',
      this._toggleQuestion.bind(this)
    );
  }
}

export default new ListView();
