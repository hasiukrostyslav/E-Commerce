import View from './View';

class CatalogView extends View {
  _accordionContainer = document.querySelector('.catalog__filter');
  _catalogContainer = document.querySelector('.catalog');
  _btnFilter = document.querySelector('.catalog__btn');
  _catalog = document.querySelector('.catalog__product');
  _btnClearList = document.querySelectorAll('.clear-one');
  _breadcrumbFilters = this._breadcrumbEl.querySelector(
    '.breadcrumb__catalog-list'
  );

  constructor() {
    super();
    this._addHandlerAccordion();
    this._addHandlerToggleFilterContainer();
    this._addHandlerRemoveFilter();
    this._setObserver(this._renderBreadcrumb.bind(this));
  }

  // Remove breadcrumb filters
  _removeFilter(e) {
    const btn = e.target.closest('.breadcrumb__catalog-btn');
    if (!btn) return;

    if (btn.classList.contains('clear-all'))
      [...this._btnClearList]
        .filter((el) => el.classList.contains('clear-one'))
        .forEach((el) => el.closest('li').remove());

    if (btn.classList.contains('clear-one')) btn.closest('li').remove();
  }

  _addHandlerRemoveFilter() {
    if (!this._breadcrumbFilters) return;
    this._breadcrumbFilters.addEventListener(
      'click',
      this._removeFilter.bind(this)
    );
  }

  _renderBreadcrumb() {
    if (!this._catalogPageEl.classList.contains('hidden')) {
      const link = this._breadcrumbEl.querySelector('.breadcrumb__link--page');
      link.textContent = 'Women';
      link.dataset.link = this._catalogPageEl.id.split('__').at(-1);

      if (this._breadcrumbList.querySelector('.breadcrumb__link--subpage')) {
        this._breadcrumbList.querySelector(
          '.breadcrumb__link--subpage'
        ).textContent = 'Clothes';
        this._breadcrumbList.querySelector(
          '.breadcrumb__link--subpage'
        ).dataset.link = 'catalog';
      } else {
        this._breadcrumbList.insertAdjacentHTML(
          'beforeend',
          this._renderBreadcrumbLink(
            this._catalogPageEl.id.split('__').at(-1),
            'Clothes'
          )
        );
      }

      this._breadcrumbFilters.classList.remove('hidden');
    }

    if (this._catalogPageEl.classList.contains('hidden')) {
      this._breadcrumbFilters.classList.add('hidden');
    }

    if (
      this._catalogPageEl.classList.contains('hidden') &&
      this._breadcrumbList.querySelector('.breadcrumb__link--subpage') &&
      this._breadcrumbList.querySelector('.breadcrumb__link--subpage').dataset
        .link === this._catalogPageEl.id.split('__').at(-1)
    ) {
      this._breadcrumbList
        .querySelector('.breadcrumb__link--subpage')
        .closest('li')
        .remove();
    }
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
