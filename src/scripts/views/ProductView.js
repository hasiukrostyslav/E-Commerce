import View from './View';

class ProductView extends View {
  _parentElement = document.querySelector('.product__card');
  _tabs = document.querySelector('.product__tabs');
  _productPages = document.querySelectorAll('.product__descript');
  _currentPage = document.querySelector('.product__info');
  _currentTab;

  changeProductInfo() {
    if (!this._parentElement) return;

    this._tabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tag__checkbox-btn');

      if (!btn) return;

      this._currentTab = btn;
      this._currentPage.classList.add('hidden');
      this._currentPage = [...this._productPages].find(
        (page) => page.dataset.product === this._currentTab.dataset.product
      );
      this._currentPage.classList.remove('hidden');
    });
  }
}

export default new ProductView();
