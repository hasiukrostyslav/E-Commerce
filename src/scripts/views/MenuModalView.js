import View from './View';
import icons from '../../assets/svg/sprite.svg';
import image from '../../assets/images/schoolboy.jpg';

class MenuModalView extends View {
  _parentElement = document.querySelector('.navbar');
  _navigation = document.querySelector('.navigation__list');
  _nav = document.querySelector('.navbar__cover--light');
  _markup;

  constructor() {
    super();
    this._render();
    if (!document.querySelector('.overlay')) this._renderOverlay();
    this._menu = document.querySelector('.menu');
    this._overlay = document.querySelector('.overlay');
  }

  _hoverLink(e) {
    const target = e.target.closest('.navigation__item');
    if (!target) return;
    this._parentElement.style.zIndex = 200;
    this._menu.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  _outLink(e) {
    if (
      (e.target === this._navigation && e.relatedTarget !== this._menu) ||
      (e.target === this._menu && e.relatedTarget !== this._navigation)
    ) {
      this._parentElement.style.zIndex = '';
      this._menu.classList.add('hidden');
      this._overlay.classList.add('hidden');
    }
  }

  showMenu() {
    this._navigation.addEventListener('mouseover', this._hoverLink.bind(this));
  }

  hideMenu() {
    this._navigation.addEventListener('mouseleave', this._outLink.bind(this));
    this._menu.addEventListener('mouseleave', this._outLink.bind(this));
  }

  _generateMarkup() {
    this._markup = `
              <nav class="menu hidden">
                <div class="menu__flex">
                    <div class="menu__navigation">
                        <ul class="menu__list u-width">
                            <li class="menu__item">
                                <a href="catalog.html" class="menu__link">New collection</a>
                            </li>
                            <li class="menu__item">
                                <a href="catalog.html" class="menu__link">Best Sellers</a>
                            </li>
                            <li class="menu__item">
                                <a href="catalog.html" class="menu__link">Plus Size</a>
                            </li>
                            <li class="menu__item">
                                <a href="catalog.html" class="menu__link menu__link--sale">Sale up to 70%</a>
                            </li>
                        </ul>
                        <div class="menu__block u-width">
                            <p class="menu__heading">Clothes</p>
                            <ul class="menu__list">
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link">Coats</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link">Jackets</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link">Suits</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Dresses</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Cardigans & sweaters</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Sweatshirts & hoodies</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">T-shirt & tops</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Pants</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Jeans</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Shorts</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Skirts</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Lingerie & nightwear</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Sportswear</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Swimwear</a>
                                </li>
                            </ul>
                        </div>
                        <div class="menu__block u-width">
                            <p class="menu__heading">Shoes</p>
                            <ul class="menu__list">
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link">Boots</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link">Flat shoes</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link">Heels</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Sandals</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Mules</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Sliders</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Slippers</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Sneakers</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Leather</a>
                                </li>
                            </ul>
                        </div>
                        <div class="menu__block u-width">
                            <p class="menu__heading">Accessories</p>
                            <ul class="menu__list">
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link">Bags & bagpacks</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link">Hats & scarves</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link">Hair accessories</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Belts</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Jewellery</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Watches</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Sunglasses</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Purses</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Gloves</a>
                                </li>
                                <li class="menu__item">
                                    <a href="catalog.html" class="menu__link menu__link">Socks & tights</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="menu__offers">
                        <img class="menu__img" src="${image}" alt="schoolboy">
                        <p class="menu__text">Back to school. Sale up to 50%</p>
                        <a href="catalog.html" class="menu__btn-link btn btn--outline btn--small">See offers
                            <svg class="menu__btn-icon">
                                <use
                                    xlink:href="${icons}#right"
                                ></use>
                            </svg>
                        </a>
                    </div>
                </div>
              </nav>
`;
    return this._markup;
  }
}

export default new MenuModalView();
