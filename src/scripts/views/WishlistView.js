import View from './View';
import icons from '../../assets/svg/sprite.svg';

class WishlistView extends View {
  _parentElement = document.querySelector('body');
  _iconAdd = `<use xlink:href="${icons}#heart-filled"></use>`;
  _iconRemove = `<use xlink:href="${icons}#heart-outline"></use>`;

  _moveToWishlist(e) {
    const btn = e.target.closest('.btn-wishlist-add');
    if (!btn) return;
    const icon = btn.querySelector('.wishlist__icon');

    if (icon.classList.contains('wishlist__icon--filled')) {
      icon.classList.remove('wishlist__icon--filled');
      icon.innerHTML = this._iconRemove;
    } else {
      icon.classList.add('wishlist__icon--filled');
      icon.innerHTML = this._iconAdd;
    }
  }

  addHandlerMoveToWishlist() {
    this._parentElement.addEventListener(
      'click',
      this._moveToWishlist.bind(this)
    );
  }
}

export default new WishlistView();
