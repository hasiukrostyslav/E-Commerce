import View from './View';
import icons from '../../assets/svg/sprite.svg';
import img1 from '../../assets/images/order-item-1.png';
import img2 from '../../assets/images/order-item-2.png';
import img3 from '../../assets/images/order-item-3.png';
import img4 from '../../assets/images/order-item-4.png';

class CartModalView extends View {
  _parentElement = document.body;
  _btnOpen = document.querySelector('.btn__cart');
  _markup;

  constructor() {
    super();
    this._render();
    if (!document.querySelector('.overlay')) this._renderOverlay();
    this._modal = document.querySelector('.modal--cart');
    this._overlay = document.querySelector('.overlay');
    this._btnClose = this._modal.querySelector('.btn--close');
  }

  _generateMarkup() {
    this._markup = `
    <section class="modal--cart hidden">
          <div>
            <button class="btn--close" type="button">
                <svg class="close__icon">
                    <use
                        xlink:href="${icons}#cross"
                    ></use>
                </svg>
            </button>
            <h3 class="cart__heading">Your cart (4)</h3>
           <ul class="cart__list">
            <li class="cart__item">
                <button class="btn--delete btn--delete-cart" type="button">
                    <svg class="btn-delete__icon--sm">
                        <use
                            xlink:href="${icons}#delete"
                        ></use>
                    </svg>
                </button>
                <div class="cart__item-container">
                    <img
                        class="cart__img"
                        src="${img1}"
                        alt="sweatshirt"
                    />
                    <div class="cart__info">
                        <a
                            href="product.html"
                            class="order__name"
                        >
                            Basic hooded sweatshirt in pink
                        </a>
                        <p class="order__color">
                            Color:
                            <span class="order__color-value"
                                >pink</span
                            >
                        </p>
                        <p class="order__size">
                            Size:
                            <span class="order__size-value"
                                >S</span
                            >
                        </p>
                        <div class="cart__price">
                            <div class="number__box">
                                <input
                                    class="input input--small input--number-sm"
                                    type="number"
                                    name="number"
                                    id="number-1"
                                    value="1"
                                    min="1"
                                />
                                <button
                                    type="button"
                                    class="number__btn number__btn--top number__btn--sm"
                                >
                                    <svg
                                        class="input__icon input__icon--medium"
                                    >
                                        <use
                                            xlink:href="${icons}#up-down-select"
                                        ></use>
                                    </svg>
                                </button>
                            </div>
                            <p
                                    class="card__price card__price--regular card__price--new card__price--sm"
                                >
                                    &dollar;15.50<span class="card__price--old cart__price--old--sm"
                                        >&dollar;31.00</span
                                    >
                                </p>
                        </div>
                        <button type="button" class="btn cart__wishlist btn-wishlist-add">
                            Move to 
                            <svg class="wishlist__icon">
                                <use
                                    xlink:href="${icons}#heart-outline"
                                ></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
            <li class="cart__item">
                <button class="btn--delete btn--delete-cart" type="button">
                    <svg class="btn-delete__icon--sm">
                        <use
                            xlink:href="${icons}#delete"
                        ></use>
                    </svg>
                </button>
                <div class="cart__item-container">
                    <img
                        class="cart__img"
                        src="${img2}"
                        alt="sweatshirt"
                    />
                    <div class="cart__info">
                        <a
                            href="product.html"
                            class="order__name"
                        >
                        Black and white sport cap
                        </a>
                        <div class="cart__price">
                            <div class="number__box">
                                <input
                                    class="input input--small input--number-sm"
                                    type="number"
                                    name="number"
                                    id="number-1"
                                    value="1"
                                    min="1"
                                />
                                <button
                                    type="button"
                                    class="number__btn number__btn--top number__btn--sm"
                                >
                                    <svg
                                        class="input__icon input__icon--medium"
                                    >
                                        <use
                                            xlink:href="${icons}#up-down-select"
                                        ></use>
                                    </svg>
                                </button>
                            </div>
                            <p
                                    class="card__price card__price--regular card__price--sm"
                                >
                                    &dollar;18.15
                                </p>
                        </div>
                        <button type="button" class="btn cart__wishlist btn-wishlist-add">
                            Move to 
                            <svg class="wishlist__icon">
                                <use
                                    xlink:href="${icons}#heart-outline"
                                ></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
            <li class="cart__item">
                <button class="btn--delete btn--delete-cart" type="button">
                    <svg class="btn-delete__icon--sm">
                        <use
                            xlink:href="${icons}#delete"
                        ></use>
                    </svg>
                </button>
                <div class="cart__item-container">
                    <img
                        class="cart__img"
                        src="${img3}"
                        alt="sweatshirt"
                    />
                    <div class="cart__info">
                        <a
                            href="product.html"
                            class="order__name"
                        >
                        Mid-rise slim cropped fit jeans
                        </a>
                        <p class="order__size">
                            Size:
                            <span class="order__size-value"
                                >M</span
                            >
                        </p>
                        <div class="cart__price">
                            <div class="number__box">
                                <input
                                    class="input input--small input--number-sm"
                                    type="number"
                                    name="number"
                                    id="number-1"
                                    value="2"
                                    min="1"
                                />
                                <button
                                    type="button"
                                    class="number__btn number__btn--top number__btn--sm"
                                >
                                    <svg
                                        class="input__icon input__icon--medium"
                                    >
                                        <use
                                            xlink:href="${icons}#up-down-select"
                                        ></use>
                                    </svg>
                                </button>
                            </div>
                            <p
                                    class="card__price card__price--regular card__price--sm"
                                >
                                    &dollar;80.00
                                </p>
                        </div>
                        <button type="button" class="btn cart__wishlist btn-wishlist-add">
                            Move to 
                            <svg class="wishlist__icon">
                                <use
                                    xlink:href="${icons}#heart-outline"
                                ></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
            <li class="cart__item">
                <button class="btn--delete btn--delete-cart" type="button">
                    <svg class="btn-delete__icon--sm">
                        <use
                            xlink:href="${icons}#delete"
                        ></use>
                    </svg>
                </button>
                <div class="cart__item-container">
                    <img
                        class="cart__img"
                        src="${img4}"
                        alt="sweatshirt"
                    />
                    <div class="cart__info">
                        <a
                            href="product.html"
                            class="order__name"
                        >
                        Men fashion gray shoes
                        </a>
                        <p class="order__color">
                            Color:
                            <span class="order__color-value"
                                >gray</span
                            >
                        </p>
                        <p class="order__size">
                            Size:
                            <span class="order__size-value"
                                >44</span
                            >
                        </p>
                        <div class="cart__price">
                            <div class="number__box">
                                <input
                                    class="input input--small input--number-sm"
                                    type="number"
                                    name="number"
                                    id="number-1"
                                    value="1"
                                    min="1"
                                />
                                <button
                                    type="button"
                                    class="number__btn number__btn--top number__btn--sm"
                                >
                                    <svg
                                        class="input__icon input__icon--medium"
                                    >
                                        <use
                                            xlink:href="${icons}#up-down-select"
                                        ></use>
                                    </svg>
                                </button>
                            </div>
                            <p
                                    class="card__price card__price--regular card__price--sm"
                                >
                                    &dollar;15.50
                                </p>
                        </div>
                        <button type="button" class="btn cart__wishlist btn-wishlist-add">
                            Move to 
                            <svg class="wishlist__icon">
                                <use
                                    xlink:href="${icons}#heart-outline"
                                ></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
           </ul>
           </div>
           <div class="cart__checkout">
            <div class="cart__wrapper">
                <p class="cart__subtotal">Subtotal:</p>
                <p class="cart__total">&dollar;198.65</p>
            </div>
            <a href="checkout.html" class="btn btn--solid btn__purchase cart__btn">
                <svg class="cart__icon">
                    <use
                        xlink:href="${icons}#card"
                    ></use>
                </svg>
                Checkout
            </a>
           </div>
        </section> 
    `;
    return this._markup;
  }
}

export default new CartModalView();
