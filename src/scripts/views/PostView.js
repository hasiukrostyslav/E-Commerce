import View from './View';

class PostView extends View {
  constructor() {
    super();

    this._setObserver(this._renderBreadcrumb.bind(this));
  }

  _renderBreadcrumb(e) {
    if (!this._postPageEl.classList.contains('hidden')) {
      if (!e.find((ev) => ev.target.id === 'main__post')) return;
      if (this._breadcrumbList.querySelector('.breadcrumb__link--subpage')) {
        this._breadcrumbList
          .querySelector('.breadcrumb__link--subpage')
          .closest('li')
          .remove();
      }

      const link = this._breadcrumbEl.querySelector('.breadcrumb__link--page');
      link.textContent = this._blogPageEl.dataset.title;
      link.dataset.link = this._blogPageEl.id.split('__').at(-1);
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
