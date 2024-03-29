import View from './View';
import icons from '../../assets/svg/sprite.svg';

class PostView extends View {
  _headingEl = this._postPageEl.querySelector('h2');
  _infoBoxEl = this._postPageEl.querySelector('.blog__list');
  _imgEl = this._postPageEl.querySelector('.post__img');
  _mainTextEl = this._postPageEl.querySelector('.post__text-bold');
  _relatedPostsContainer = this._postPageEl.querySelector('.container');
  _postCommentsContainer = this._postPageEl.querySelector('.post__comments');
  _commetsHeading = this._postCommentsContainer.querySelector('h2');
  _postCommentsList = this._postPageEl.querySelector('.comment');
  _postForm = this._postPageEl.querySelector('.post__form');
  _inputName = document.getElementById('name');
  _inputEmail = this._postForm.querySelector('[type="email"]');
  _inputComment = document.getElementById('textarea-comment');
  _btnPost = this._postForm.querySelector('.btn');
  _sliderContainer = this._postPageEl.querySelector(
    '.post__carousel-container'
  );

  constructor() {
    super();
    this._setObserver(this._renderBreadcrumb.bind(this));
    this._addHandlerChangeSlide();
  }

  renderPostPage(e, data) {
    const link = e.target.closest('a[data-link="post"]');
    if (!link) return;

    const post = data.find((el) => el.title === link.textContent.trim());
    this._renderArticle(post);
    this._renderSlider(data);
    this._renderCards(data, post);
    this.renderComment(post);
    this._clearInputs(this._postForm);
  }

  // Article
  _renderArticle(post) {
    this._infoBoxEl.innerHTML = '';
    this._headingEl.textContent = post.title;
    this._imgEl.src = post.images.at(0);
    this._mainTextEl.textContent = post.text;
    this._infoBoxEl.insertAdjacentHTML(
      'afterbegin',
      this._generateDetailsList(post)
    );
  }

  _generateDetailsList(data) {
    return `
          <li class="blog__item">
            <p class="heading-quaternary--description heading-quaternary--description-main"
            >
              ${data.categories}
            </p>
          </li>
          <li class="blog__item">
            <p class="heading-quaternary--description">${this._dateFormatter(
              data.date
            )}</p>
          </li>
          <li class="blog__item">
            <svg class="blog__icon">
              <use xlink:href="${icons}#chat"></use>
            </svg>
            <p class="heading-quaternary--description comment-amount">${
              data.comments.length > 0 ? data.comments.length : 'No'
            } comment${data.comments.length === 1 ? '' : 's'}</p>
          </li>
    `;
  }

  // Slider
  _renderSlider(data) {
    this._sliderContainer.innerHTML = '';

    const posts = data.filter((post) => post.featuredPost);
    const markup = posts
      .map((post, i) => this._generatePostSlide(post, i))
      .join('');
    this._sliderContainer.insertAdjacentHTML('afterbegin', markup);
    this._setOrders();
  }

  _generatePostSlide(data, i) {
    return `
          <li class="sidebar__item post__carousel-item">
            <img
              class="sidebar__img ${i === 0 ? '' : 'sidebar__img-right'}"
              src="${data.images.find((img) => img.includes('-sm'))}"
              alt="${data.title}"
            >
            <div class="sidebar__feature-info ${
              i === 0 ? '' : 'u-order-first'
            } ">
              <p class="sidebar__date ${i === 0 ? '' : 'u-right'} ">
                <svg class="blog__icon">
                  <use xlink:href="${icons}#clock"></use>
                </svg>
                ${this._dateFormatter(data.date)}
              </p>
              <a class="sidebar__link" href="#" data-link="post">
                ${data.title}
              </a>
            </div>
          </li>
    `;
  }

  _setOrders() {
    this._postPageEl
      .querySelectorAll('.post__carousel-item')
      .forEach((card, i) => (card.style.order = i + 1));
  }

  _changePostSlide(btn, func) {
    if (btn.closest('section').querySelectorAll('.post__carousel-item')) {
      const slides = [
        ...btn.closest('section').querySelectorAll('.post__carousel-item'),
      ];
      slides.forEach((s, _, arr) => {
        func(s, arr);
        s.querySelector('.sidebar__feature-info').classList.add(
          'u-order-first'
        );
        s.querySelector('.sidebar__date').classList.add('u-right');
        s.querySelector('img').classList.add('sidebar__img-right');
      });

      const firstSlide = slides.find((el) => +el.style.order === 1);
      if (!firstSlide) return;
      firstSlide
        .querySelector('.sidebar__feature-info')
        .classList.remove('u-order-first');
      firstSlide.querySelector('.sidebar__date').classList.remove('u-right');
      firstSlide.querySelector('img').classList.remove('sidebar__img-right');
    }
  }

  _nextSlide(e) {
    const btnNext = e.target.closest('.carousel__btn--next');
    if (!btnNext) return;

    this._changePostSlide(btnNext, this._minusOrder.bind(this));
  }

  _prevSlide(e) {
    const btnPrev = e.target.closest('.carousel__btn--prev');
    if (!btnPrev) return;

    this._changePostSlide(btnPrev, this._plusOrder.bind(this));
  }

  _addHandlerChangeSlide() {
    this._postPageEl.addEventListener('click', this._nextSlide.bind(this));
    this._postPageEl.addEventListener('click', this._prevSlide.bind(this));
  }

  // Related posts
  _renderCards(data, post) {
    this._relatedPostsContainer
      .querySelectorAll('figure')
      .forEach((el) => el.remove());

    const newest = data
      .slice(-3)
      .reverse()
      .filter((el) => el.title !== post.title);

    const markup = newest
      .slice(0, 2)
      .map((el) => this._generateBlogCards(el))
      .join('');

    this._relatedPostsContainer.insertAdjacentHTML('beforeend', markup);
  }

  // Comments

  renderComment(data) {
    this._postCommentsList.innerHTML = '';

    const { comments } = data;
    this._commetsHeading.textContent = `${comments.length} comment${
      comments.length === 1 ? '' : 's'
    }`;

    if (comments.length === 0) return;
    const markup = comments
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((el) => this._generateComment(el))
      .join('');
    this._postCommentsList.insertAdjacentHTML('afterbegin', markup);
    this._updateAmountInfo();
  }

  _updateAmountInfo() {
    const info = this._postPageEl.querySelector('.comment-amount');
    const amount = this._postCommentsList.querySelectorAll('li').length;
    info.textContent = `${amount} comment${amount === 1 ? '' : 's'}`;
  }

  _generateComment(data) {
    return `
        <li
          class="comment__block comment__block--md grid grid--col-3-fix grid--row-3"
        >
          <div class="comment__info">
            <p class="comment__user">${data.user}</p>
            <p class="comment__day">${this._dateFormatter(data.date)}</p>
          </div>
          <p class="comment__text u-margin-bottom-small-2">
          ${
            data.tag
              ? `<span class="comment__text--tag">${data.tag}</span>`
              : ''
          } ${data.text}
          </p>
          <button type="button" class="comment__reply-btn">
            <svg class="comment__reply-icon">
              <use xlink:href="${icons}#share-arrow"></use>
            </svg>
            Reply
          </button>
        </li>
    `;
  }

  addHandlerRenderPostPage(handler) {
    this._parentElement.addEventListener('click', handler);
  }

  // Breadcrumb
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

  getPostHeading() {
    return this._headingEl.textContent;
  }

  addPostComment(e) {
    e.preventDefault();
    this.getPostHeading();
    this._removeInputWarnings(this._postForm);

    const user = this._fullNameValidation(this._inputName, this._postForm);
    if (!user) return;

    const email = this._globalEmailValidation(
      this._inputEmail,
      this._postForm,
      this._inputEmail
    );
    if (!email) return;

    const text = this._textareaValidation(this._inputComment, this._postForm);
    if (!text) return;

    this._showModalPopup('comment');
    this._postForm.querySelectorAll('.input').forEach((el) => (el.value = ''));
    const date = new Date().toISOString();

    return {
      user,
      email,
      date,
      text,
    };
  }

  addHandlerAddPostComment(handler) {
    this._postForm.addEventListener('submit', handler);
  }
}

export default new PostView();
