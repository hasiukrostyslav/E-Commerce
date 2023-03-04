import View from './View';

class SlidersView extends View {
  _sectionsTabs = document.querySelectorAll('section[data-carousel="tabs"]');

  constructor() {
    super();
    this._setOrders();
    this._setDataAttribute();
    this._activateSlideTab();
    // this._setSlideInterval();
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
              ? arr.length - slide + +s.dataset.slide + 1
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
    cards.forEach((div) => {
      div
        .querySelectorAll('.card')
        .forEach((card, i) => (card.style.order = i + 1));
    });

    this._mainEl
      .querySelectorAll('.post__carousel-item')
      .forEach((card, i) => (card.style.order = i + 1));
  }

  _nextSlide(e) {
    const btnNext = e.target.closest('.carousel__btn--next');
    if (!btnNext) return;

    if (btnNext.closest('section').querySelectorAll('.card')) {
      const slides = btnNext.closest('section').querySelectorAll('.card');
      slides.forEach(
        (s, _, arr) =>
          (s.style.order =
            s.style.order <= 1 ? arr.length : (s.style.order -= 1))
      );
    }

    if (btnNext.closest('section').querySelectorAll('.post__carousel-item')) {
      const slides = [
        ...btnNext.closest('section').querySelectorAll('.post__carousel-item'),
      ];
      slides.forEach((s, _, arr) => {
        s.style.order = s.style.order <= 1 ? arr.length : (s.style.order -= 1);
        s.querySelector('.sidebar__feature-info').classList.add(
          'u-order-first'
        );
        s.querySelector('.sidebar__date').classList.add('u-right');
        s.querySelector('img').classList.add('sidebar__img-right');
      });

      const firstSlide = slides.find((el) => +el.style.order === 1);
      firstSlide
        .querySelector('.sidebar__feature-info')
        .classList.remove('u-order-first');
      firstSlide.querySelector('.sidebar__date').classList.remove('u-right');
      firstSlide.querySelector('img').classList.remove('sidebar__img-right');
    }
  }

  _prevSlide(e) {
    const btnPrev = e.target.closest('.carousel__btn--prev');
    if (!btnPrev) return;

    if (btnPrev.closest('section').querySelectorAll('.card')) {
      const slides = btnPrev.closest('section').querySelectorAll('.card');

      slides.forEach((s, _, arr) => {
        s.style.order =
          +s.style.order === arr.length
            ? 1
            : (s.style.order = +s.style.order + 1);
      });
    }

    if (btnPrev.closest('section').querySelectorAll('.post__carousel-item')) {
      const slides = [
        ...btnPrev.closest('section').querySelectorAll('.post__carousel-item'),
      ];
      slides.forEach((s, _, arr) => {
        s.style.order =
          +s.style.order === arr.length
            ? 1
            : (s.style.order = +s.style.order + 1);

        s.querySelector('.sidebar__feature-info').classList.add(
          'u-order-first'
        );
        s.querySelector('.sidebar__date').classList.add('u-right');
        s.querySelector('img').classList.add('sidebar__img-right');
      });

      const firstSlide = slides.find((el) => +el.style.order === 1);
      firstSlide
        .querySelector('.sidebar__feature-info')
        .classList.remove('u-order-first');
      firstSlide.querySelector('.sidebar__date').classList.remove('u-right');
      firstSlide.querySelector('img').classList.remove('sidebar__img-right');
    }
  }

  _sliderInterval() {
    const slider = [...document.querySelectorAll('.carousel__cards')];
    const sliderButtons = slider.filter(
      (el) => !el.closest('section').dataset.carousel
    );
    // const sliderTabs = slider.filter(
    //   (el) => el.closest('section').dataset.carousel
    // );

    sliderButtons.forEach((div) => {
      div.querySelectorAll('.card').forEach((s, _, arr) => {
        s.style.order = s.style.order <= 1 ? arr.length : (s.style.order -= 1);
      });
    });

    // sliderTabs.forEach((div) => {
    //   div.querySelectorAll('.card').forEach((s, i, arr) => {
    //     s.style.order = s.style.order <= 1 ? arr.length : (s.style.order -= 1);
    //     if (+s.style.order === 1 && +s.dataset.slide <= 6)
    //       this._activateSlideTab(+s.dataset.slide);
    //     if (+s.style.order === 1 && +s.dataset.slide > 6) {
    //       this._activateSlideTab(+s.dataset.slide - 6);
    //     }
    //   });
    // });
  }

  _setSlideInterval() {
    this._interval = setInterval(() => {
      this._sliderInterval();
    }, 5000);
  }

  _changeSlideInterval(e) {
    const btns = e.target.closest('.carousel__btns');
    if (!btns) return;

    clearInterval(this._interval);
    this._setSlideInterval();
  }

  _addHandlerChangeSlide() {
    // this._mainEl.addEventListener(
    //   'click',
    //   this._changeSlideInterval.bind(this)
    // );
    this._mainEl.addEventListener('click', this._nextSlide.bind(this));
    this._mainEl.addEventListener('click', this._prevSlide.bind(this));
    this._mainEl.addEventListener('click', this._clickTabs.bind(this));
  }
}
export default new SlidersView();
