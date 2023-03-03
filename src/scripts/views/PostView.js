import View from './View';

class PostView extends View {
  _blog = document.getElementById('main__blog');
  _postPageEl = document.getElementById('main__post');

  constructor() {
    super();

    this._setObserver(this._renderBreadcrumb.bind(this));
  }

  _renderBreadcrumb() {
    if (!this._postPageEl.classList.contains('hidden')) {
      const link = this._breadcrumbEl.querySelector('.breadcrumb__link--page');
      link.textContent = this._blog.dataset.title;
      link.dataset.link = this._blog.id.split('__').at(-1);
      const postTitle = this._postPageEl.querySelector('h2');

      this._breadcrumbList.insertAdjacentHTML(
        'beforeend',
        this._renderBreadcrumbLink(
          this._postPageEl.id.split('__').at(-1),
          postTitle.textContent
        )
      );
    }

    const subPage = [
      ...this._breadcrumbList.querySelectorAll('.breadcrumb__link--subpage'),
    ].find((el) => el.dataset.link === 'post');
    if (!subPage) return;

    if (this._postPageEl.classList.contains('hidden') && subPage) {
      subPage.closest('li').remove();
    }
  }
}

export default new PostView();