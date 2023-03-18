import View from './View';

class ProductView extends View {
  _tabs = document.querySelector('.product__tabs');
  _pages = document.querySelectorAll('.product__descript');
  _subPages = document.querySelectorAll('.product__data');
  _currentPage = document.querySelector('.product__info');
  _currentSubPage = document.querySelector('.details');
  _accordionContainer = document.querySelector('.product__accordion');
  _currentTab;

  constructor() {
    super();
    this._addHandlerChangeTabs();
    this._addHandlerAccordion();
    this._setObserver(this._renderBreadcrumb.bind(this));
  }

  _renderBreadcrumb() {
    if (!this._productPageEl.classList.contains('hidden')) {
      const link = this._breadcrumbEl.querySelector('.breadcrumb__link--page');
      link.textContent = 'Women';
      link.dataset.link = this._catalogPageEl.id.split('__').at(-1);

      if (
        [...this._breadcrumbList.querySelectorAll('.breadcrumb__link--subpage')]
          .length <= 1
      ) {
        this._breadcrumbList.insertAdjacentHTML(
          'beforeend',
          this._renderBreadcrumbLink('', 'Clothes')
        );

        this._breadcrumbList.insertAdjacentHTML(
          'beforeend',
          this._renderBreadcrumbLink(
            this._productPageEl.id.split('__').at(-1),
            this._productPageEl.querySelector('h2').textContent
          )
        );
      }
    }

    const [subLinkOne, subLinkTwo] = [
      ...this._breadcrumbList.querySelectorAll('.breadcrumb__link--subpage'),
    ];
    if (!subLinkOne?.dataset?.link === '' || !subLinkTwo) return;

    if (
      this._productPageEl.classList.contains('hidden') &&
      subLinkTwo.dataset.link === this._productPageEl.id.split('__').at(-1)
    ) {
      subLinkTwo.closest('li').remove();

      if (subLinkOne.dataset.link === '') subLinkOne.closest('li').remove();
    }
  }

  _changeTabs(e) {
    const btn = e.target.closest('.checkbox__btn');
    if (!btn) return;

    this._currentTab = btn;
    this._currentPage.classList.add('hidden');
    this._currentPage = [...this._pages].find(
      (page) => page.dataset.product === this._currentTab.dataset.product
    );
    this._currentPage.classList.remove('hidden');

    if (this._currentTab.dataset.product === 'other-info') {
      this._currentSubPage.classList.add('hidden');
      this._currentSubPage = [...this._subPages].find(
        (sub) => sub.dataset.info === this._currentTab.dataset.info
      );
      this._currentSubPage.classList.remove('hidden');
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
}

export default new ProductView();
