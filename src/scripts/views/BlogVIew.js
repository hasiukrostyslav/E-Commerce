import View from './View';
import icons from '../../assets/svg/sprite.svg';
import { NUMBER_OF_ITEMS } from '../config';

class BlogView extends View {
  _blogList = this._blogPageEl.querySelector('.blog__list-main');
  _pagination = this._blogPageEl.querySelector('.pagination');
  _categories = this._blogPageEl.querySelector('.sidebar__categories');
  _featured = this._blogPageEl.querySelector('.sidebar__featured');
  _searchForm = this._blogPageEl.querySelector('.search');
  _searchInput = this._blogPageEl.querySelector('.search__input');

  constructor() {
    super();
    this._addHandlerChangePaginationPage(this._changePaginationPage.bind(this));
  }

  renderBlogPage(e, data) {
    const link = e.target.closest('[data-link="blog"]');
    if (!link) return;

    this._renderBlogList(data);
    this._renderBlogCategories(this._getCategoriesType(data));
    this._renderBlogFeatured(data);
    this._addHandlerShowCategory(this._showCategoryBlog.bind(this, data));
    this._addHandlerSearchBlog(this._searchBlog.bind(this, data));
  }

  _renderBlogList(data) {
    this._blogList.innerHTML = '';
    this._pagination.innerHTML = '';

    const markup = data
      .map((post) => this._generateBlogList(post))
      .reverse()
      .join('');

    this._blogList.insertAdjacentHTML('afterbegin', markup);

    this._pagination.insertAdjacentHTML(
      'afterbegin',
      this._renderPagination(data)
    );

    this._setDataAttribute(this._blogList);
    this._showPaginationPage();
  }

  _generateBlogList(data) {
    return `
      <li class="blog__item-main">
        <figure class="blog__card--large">
          <img
            class="blog__img blog__img--large"
            src="${data.images.at(0)}"
            alt="${data.title}"
          />
          <figcaption class="blog__description--large">
            <a
              href="#"
              class="heading-quaternary--heading-link" data-link="post"
              >${data.title}</a
            >
            <ul class="blog__list">
              <li class="blog__item blog__item--top">
                <p class="heading-quaternary--item">${data.categories}</p>
              </li>
              <li class="blog__item blog__item--top">
                <p class="heading-quaternary--item">${this._dateFormatter(
                  data.date
                )}</p>
              </li>
              <li class="blog__item blog__item--top">
                <svg class="blog__icon">
                  <use xlink:href="${icons}#chat"></use>
                </svg>
                <p class="heading-quaternary--item">${
                  data.comments.length > 0 ? data.comments.length : 'No'
                } comment${data.comments.length === 1 ? '' : 's'}</p>
              </li>
            </ul>
            <p class="blog__text">
              ${data.text}
            </p>
          </figcaption>
        </figure>
      </li>
    `;
  }

  _renderPagination(data) {
    const numOfPages = Math.ceil(data.length / NUMBER_OF_ITEMS);

    const pages = Array.from(
      { length: numOfPages },
      (_, i) => ` <li class="pagination__item" data-pagination="${i + 1}">
                    <button class="btn pagination__btn ${
                      i === 0 ? 'pagination__btn--current' : ''
                    }">
                      ${i + 1}
                    </button>
                  </li>`
    );

    const btnNext = `
                <li class="pagination__item">
                  <button class="btn pagination__btn">
                    <svg class="pagination__icon">
                      <use xlink:href="${icons}#right"></use>
                    </svg>
                  </button>
                </li>
    `;

    if (pages.length > 1) pages.push(btnNext);
    return pages.join('');
  }

  _setDataAttribute(container) {
    [...container.children].forEach(
      (li, i) =>
        (li.dataset.pagination =
          i < NUMBER_OF_ITEMS ? 1 : Math.trunc(i / NUMBER_OF_ITEMS + 1))
    );
  }

  _showPaginationPage() {
    const blogs = this._blogList.querySelectorAll('.blog__item-main');

    blogs.forEach((blog) => blog.classList.remove('hidden'));

    if (blogs.length === 0) return;
    const pages = [...this._pagination.querySelectorAll('[data-pagination]')];

    const currentPage = pages.find((page) =>
      page.firstElementChild.classList.contains('pagination__btn--current')
    ).dataset.pagination;

    blogs.forEach(
      (blog) =>
        blog.dataset.pagination !== currentPage && blog.classList.add('hidden')
    );
  }

  _changePaginationPage(e) {
    const btn = e.target.closest('.pagination__btn');
    if (!btn) return;

    const list = [...e.target.closest('ul').querySelectorAll('li')];
    const currentPage = list.find((li) =>
      li.firstElementChild.classList.contains('pagination__btn--current')
    );

    if (btn.closest('li').dataset.pagination) {
      list.forEach((li) =>
        li.firstElementChild.classList.remove('pagination__btn--current')
      );
      btn.classList.add('pagination__btn--current');
      this._showPaginationPage();
    }

    if (!btn.closest('li').dataset.pagination) {
      const nextPage = list.find(
        (li) => +li.dataset.pagination === +currentPage.dataset.pagination + 1
      );
      if (!nextPage) return;

      list.forEach((li) =>
        li.firstElementChild.classList.remove('pagination__btn--current')
      );

      nextPage.firstElementChild.classList.add('pagination__btn--current');
      this._showPaginationPage();
    }
  }

  _addHandlerChangePaginationPage(handler) {
    this._pagination.addEventListener('click', handler);
  }

  _searchBlog(data, e) {
    e.preventDefault();
    const btn = e.target.closest('.search__button');
    if (!btn) return;

    const inputValue = this._searchInput.value.toLowerCase();
    if (!inputValue) return;
    console.log(inputValue);
    const blogs = data.filter((blog) =>
      blog.title.toLowerCase().includes(inputValue)
    );
    console.log(blogs);

    this._searchInput.value = '';
  }

  _addHandlerSearchBlog(handler) {
    this._searchForm
      .querySelector('.search__button')
      .addEventListener('click', handler);
  }

  _showCategoryBlog(data, e) {
    e.preventDefault();
    this._categories
      .querySelectorAll('label')
      .forEach((el) => el.classList.remove('sidebar__label--current'));

    const label = e.target.closest('label');
    label.classList.add('sidebar__label--current');

    if (!label) return;

    const category = label.querySelector('.sidebar__link--title').textContent;

    const blogs =
      category === 'All'
        ? data
        : data.filter((blog) => blog.categories === category);

    this._renderBlogList(blogs);
  }

  _addHandlerShowCategory(handler) {
    this._categories.addEventListener('click', handler);
  }

  _renderBlogFeatured(data) {
    this._featured.innerHTML = '';
    const markup = data
      .filter((post) => post.featuredPost)
      .map((post) => this._generateBlogFeatured(post))
      .join('');

    this._featured.insertAdjacentHTML('afterbegin', markup);
  }

  _generateBlogFeatured(data) {
    return `
      <li class="sidebar__item">
        <a href="#" data-link="post">
          <img
            class="sidebar__img"
            src="${data.images.find((img) => img.includes('-sm'))}"
            alt="${data.title}"
          />
        </a>
        <div class="sidebar__feature-info">
          <p class="sidebar__date">
            <svg class="blog__icon">
              <use xlink:href="${icons}#clock"></use>
            </svg>
            ${this._dateFormatter(data.date)}
          </p>
          <a class="sidebar__link" href="#" data-link="post"
            >${data.title}</a
          >
        </div>
      </li>
    `;
  }

  _renderBlogCategories(data) {
    this._categories.innerHTML = '';
    const markup = data
      .map((categ) => this._generateBlogCategories(categ))
      .join('');

    this._categories.insertAdjacentHTML('afterbegin', markup);
  }

  _generateBlogCategories(data) {
    return `
      <li class="sidebar__item sidebar__item--category">
        <input type="radio" name="blogs" class="sidebar__radio" id="category-${
          data[0][0].toLowerCase() + data[0].slice(1)
        }" ${data[0] === 'All' ? 'checked' : ''}>
        <label class="sidebar__label ${
          data[0] === 'All' ? 'sidebar__label--current' : ''
        }" for="category-${data[0][0].toLowerCase() + data[0].slice(1)}">
          <span class="sidebar__link--title">${data[0]}</span>
          <span class="sidebar__link--count">${data[1]}</span>
        </label>
      </li>
    `;
  }

  _getCategoriesType(data) {
    const keys = [...new Set(data.map((el) => el.categories))];

    const entries = keys.map((key) => [
      key,
      data.filter((type) => type.categories === key).length,
    ]);
    entries.unshift(['All', data.length]);

    return entries;
  }

  addHandlerRanderBlogPage(handler) {
    this._parentElement.addEventListener('click', handler);
  }
}

export default new BlogView();
