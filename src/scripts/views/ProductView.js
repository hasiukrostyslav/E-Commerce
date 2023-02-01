import View from './View';
import icons from '../../assets/svg/sprite.svg';

class ProductView extends View {
  _parentElement = document.querySelector('.product__card');
  _tabs = document.querySelector('.product__tabs');
  _productPages = document.querySelectorAll('.product__descript');
  _subPages = document.querySelectorAll('.product__data');
  _currentPage = document.querySelector('.product__info');
  _currentSubPage = document.querySelector('.details');
  _accordion = document.querySelector('.product__accordion');
  _currentTab;
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

  _changeTabs(e) {
    const btn = e.target.closest('.tag__checkbox-btn');

    if (!btn) return;

    this._currentTab = btn;
    this._currentPage.classList.add('hidden');
    this._currentPage = [...this._productPages].find(
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

  _toggleProductInfo(e) {
    const btn = e.target.closest('.accordion__btn');
    if (!btn) return;

    if (btn.firstElementChild.classList.contains('icon__accordion--minus')) {
      btn.nextElementSibling.classList.add('hidden');
      btn.innerHTML = this._iconPlus;
    } else {
      btn.nextElementSibling.classList.remove('hidden');
      btn.innerHTML = this._iconMinus;
    }
  }

  addHandlerToggleProductInfo() {
    if (!this._accordion) return;

    this._accordion.addEventListener(
      'click',
      this._toggleProductInfo.bind(this)
    );
  }
}

export default new ProductView();
