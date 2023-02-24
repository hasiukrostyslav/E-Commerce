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

    if (
      this._postPageEl.classList.contains('hidden') &&
      this._breadcrumbList.querySelector('.breadcrumb__link--subpage') &&
      this._breadcrumbList.querySelector('.breadcrumb__link--subpage').dataset
        .link === this._postPageEl.id.split('__').at(-1)
    ) {
      this._breadcrumbList
        .querySelector('.breadcrumb__link--subpage')
        .closest('li')
        .remove();
    }
  }
}

export default new PostView();
