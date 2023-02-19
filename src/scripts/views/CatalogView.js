import View from './View';
import icons from '../../assets/svg/sprite.svg';

class CatalogView extends View {
  _catalogPageEl = document.getElementById('main__catalog');
  _catalogContainer = document.querySelector('.catalog');
  _btnFilter = document.querySelector('.catalog__btn');
  _accordionBox = document.querySelector('.catalog__filter');
  _catalog = document.querySelector('.catalog__product');

  _iconPlus = `
  <svg class="icon__accordion icon__accordion--sm icon__accordion--plus">
    <use
      xlink:href="${icons}#plus">
    </use>
  </svg>`;

  _iconMinus = `
  <svg class="icon__accordion icon__accordion--sm icon__accordion--minus">
    <use
      xlink:href="${icons}#minus">
    </use>
  </svg>`;

  constructor() {
    super();
    this._addHandlerAccordion();
    this._addHandlerToggleFilterContainer();
  }

  _toggleAccordion(e) {
    const btn = e.target.closest('.catalog__filter-btn');
    if (!btn) return;

    if (btn.firstElementChild.classList.contains('icon__accordion--minus')) {
      btn.nextElementSibling.classList.add('hidden');
      btn.innerHTML = this._iconPlus;
    } else {
      btn.nextElementSibling.classList.remove('hidden');
      btn.innerHTML = this._iconMinus;
    }
  }

  _toggleFilterContainer() {
    this._accordionBox.classList.toggle('hidden');
    const btnText = this._btnFilter.lastChild;

    if (this._accordionBox.classList.contains('hidden')) {
      btnText.textContent = 'Show filters';
      this._catalogContainer.classList.remove('grid');
      this._catalogContainer.classList.add('block');
    }

    if (!this._accordionBox.classList.contains('hidden')) {
      btnText.textContent = 'Hide filters';
      this._catalogContainer.classList.remove('block');
      this._catalogContainer.classList.add('grid');
    }
  }

  _addHandlerToggleFilterContainer() {
    this._btnFilter.addEventListener(
      'click',
      this._toggleFilterContainer.bind(this)
    );
  }
}

export default new CatalogView();
