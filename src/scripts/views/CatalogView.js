import View from './View';

class CatalogView extends View {
  _catalogPageEl = document.getElementById('main__catalog');
  _accordionContainer = document.querySelector('.catalog__filter');
  _catalogContainer = document.querySelector('.catalog');
  _btnFilter = document.querySelector('.catalog__btn');
  _catalog = document.querySelector('.catalog__product');
  constructor() {
    super();
    this._addHandlerAccordion();
    this._addHandlerToggleFilterContainer();
  }

  _toggleAccordion(e) {
    const btn = e.target.closest('.btn__accordion');
    if (!btn) return;

    if (btn.querySelector('svg').classList.contains('icon__accordion--minus')) {
      btn.nextElementSibling.classList.add('hidden');
      btn.innerHTML = this._generateAccordionBtnIcon('sm', 'plus');
    } else {
      btn.nextElementSibling.classList.remove('hidden');
      btn.innerHTML = this._generateAccordionBtnIcon('sm', 'minus');
    }
  }

  _toggleFilterContainer() {
    this._accordionContainer.classList.toggle('hidden');
    const btnText = this._btnFilter.lastChild;

    if (this._accordionContainer.classList.contains('hidden')) {
      btnText.textContent = 'Show filters';
      this._catalogContainer.classList.remove('grid');
      this._catalogContainer.classList.add('block');
    }

    if (!this._accordionContainer.classList.contains('hidden')) {
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
