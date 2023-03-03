import View from './View';

class SlidersView extends View {
  _sectionsTabs = document.querySelectorAll('section[data-carousel="tabs"]');

  constructor() {
    super();
    this._setOrders();
    this._setDataAttribute();
    this._activateSlideTab();
    this._addHandlerChangeSlide();
  }

  _setDataAttribute() {
    const sections = this._sectionsTabs;
    sections.forEach((el) => {
      el.querySelectorAll('.carousel__btn--tab').forEach(
        (btn, i) => (btn.dataset.slide = i + 1)
      );
      el.querySelectorAll('.card').forEach(
        (card, i) => (card.dataset.slide = i + 1)
      );
    });
  }

  _activateSlideTab(slide = 1) {
    this._sectionsTabs.forEach((el) => {
      el.querySelectorAll('.carousel__btn--tab').forEach((tab) =>
        tab.classList.remove('carousel__btn--current')
      );
    });

    this._sectionsTabs.forEach((el) => {
      const tab = el.querySelector(`.carousel__btn[data-slide="${slide}"]`);
      if (!tab) return;
      tab.classList.add('carousel__btn--current');
    });
  }

  _clickTabs(e) {
    if (!e.target.classList.contains('carousel__btn--tab')) return;
    const { slide } = e.target.dataset;
    const curSlide = e.target
      .closest('section')
      .querySelector('.carousel__btn--current');
    const cards = [...e.target.closest('section').querySelectorAll('.card')];

    cards.forEach((s, i, arr) => {
      if (slide > curSlide.dataset.slide) {
        if (slide - curSlide.dataset.slide === 1)
          s.style.order =
            s.style.order <= 1 ? arr.length : (s.style.order -= 1);

        if (slide - curSlide.dataset.slide > 1)
          s.style.order =
            +s.dataset.slide < +slide
              ? // Need to be fixed
                arr.length - slide + +s.dataset.slide + 1
              : (s.style.order = s.dataset.slide - slide + 1);
      }

      if (slide < curSlide.dataset.slide) {
        if (curSlide.dataset.slide - slide === 1) {
          s.style.order =
            +s.style.order === arr.length
              ? 1
              : (s.style.order = +s.style.order + 1);
        }

        if (curSlide.dataset.slide - slide > 1)
          s.style.order =
            s.dataset.slide < +slide
              ? +s.style.order + +curSlide.dataset.slide - slide
              : (s.style.order = +s.dataset.slide - slide + 1);
      }
    });

    this._activateSlideTab(slide);
  }

  _setOrders() {
    const cards = this._mainEl.querySelectorAll('.carousel__cards');
    cards.forEach((div) =>
      div
        .querySelectorAll('.card')
        .forEach((card, i) => (card.style.order = i + 1))
    );
  }

  _nextSlide(e) {
    const btnNext = e.target.closest('.carousel__btn--next');
    if (!btnNext) return;

    const slides = btnNext.closest('section').querySelectorAll('.card');
    slides.forEach(
      (s, _, arr) =>
        (s.style.order = s.style.order <= 1 ? arr.length : (s.style.order -= 1))
    );
  }

  _prevSlide(e) {
    const btnPrev = e.target.closest('.carousel__btn--prev');
    if (!btnPrev) return;

    const slides = btnPrev.closest('section').querySelectorAll('.card');

    slides.forEach((s, _, arr) => {
      s.style.order =
        +s.style.order === arr.length
          ? 1
          : (s.style.order = +s.style.order + 1);
    });
  }

  _addHandlerChangeSlide() {
    this._mainEl.addEventListener('click', this._nextSlide.bind(this));
    this._mainEl.addEventListener('click', this._prevSlide.bind(this));
    this._mainEl.addEventListener('click', this._clickTabs.bind(this));
  }
}
export default new SlidersView();
