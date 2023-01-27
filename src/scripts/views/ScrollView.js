import View from './View';

class ScrollView extends View {
  _parentElement = document.querySelector('body');
  _btnScrollToTop = document.querySelector('.footer__btn-up');

  _scrollToTop(e) {
    e.preventDefault();

    this._parentElement.scrollIntoView({ behavior: 'smooth' });
  }

  addHandlerScrollToTop() {
    this._btnScrollToTop.addEventListener(
      'click',
      this._scrollToTop.bind(this)
    );
  }
}

export default new ScrollView();
