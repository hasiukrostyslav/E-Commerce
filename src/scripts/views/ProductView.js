import View from './View';
import icons from '../../assets/svg/sprite.svg';

class ProductView extends View {
  _tabs = document.querySelector('.product__tabs');
  _pages = document.querySelectorAll('.product__descript');
  _subPages = document.querySelectorAll('.product__data');
  _currentPage = document.querySelector('.product__info');
  _currentSubPage = document.querySelector('.details');
  _accordionContainer = document.querySelector('.product__accordion');
  _detailsPage = document.querySelector('.product__details');
  _currentTab;

  constructor() {
    super();
    this._addHandlerChangeTabs();
    this._addHandlerAccordion();
    this._setObserver(this._renderBreadcrumb.bind(this));
  }

  renderProductPage(data, markup) {
    this._productPageEl.querySelector('h2').textContent = data.description;
    this._productPageEl.querySelector('.product__article-num').textContent =
      data.article;
    this._renderCard(markup);
    this._renderProductInfo(data);
  }

  _renderCard(markup) {
    if (this._detailsPage.querySelector('.card'))
      this._detailsPage.querySelector('.card').remove();

    this._detailsPage.insertAdjacentHTML('beforeend', markup);

    const card = this._detailsPage.querySelector('.card');
    card.querySelector('.card__slider-buttons').classList.remove('hidden');
    card.querySelector('.card__form').classList.remove('hidden');
  }

  _renderProductInfo(data) {
    const img = this._currentPage.querySelector('img');
    img.src = data.images.at(0);
    img.alt = data.title;
    this._currentPage
      .querySelector('.product__img-list')
      .insertAdjacentHTML('afterbegin', this._generateGalleryList(data));
  }

  _generateGalleryList(data) {
    return data.images
      .map(
        (img, i, arr) => `
      <li class="product__img-item ${
        i === arr.length - 1 ? 'product__img-video' : ''
      }">
        <img
          class="product__img product__img--sm ${
            i === 0 ? 'product__img--current' : ''
          }"
          src="${img}"
          alt="${data.title}"
          data-gallary-slide="${i + 1}"
        />
        ${
          i === arr.length - 1
            ? `<span class="product__play-btn">
                <svg class="play-icon">
                  <use xlink:href="${icons}#play"></use>
                </svg>
              </span>`
            : ''
        }
      </li>`
      )
      .join(' ');
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
