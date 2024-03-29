import View from './View';

class SlidersView extends View {
  _sectionsTabs = document.querySelectorAll('section[data-carousel="tabs"]');

  initSlider() {
    this._setOrders();
    this._setDataAttribute();
    this._activateSlideTab();
    this._setSlideInterval();
    this._addHandlerChangeSlide();
  }

  _setOrders() {
    const cards = this._mainEl.querySelectorAll('.carousel__cards');
    cards.forEach((div) => {
      div
        .querySelectorAll('.card')
        .forEach((card, i) => (card.style.order = i + 1));
    });
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

  _activateSlideTab(slide = 1, slider = this._sectionsTabs) {
    slider.forEach((el) => {
      el.querySelectorAll('.carousel__btn--tab').forEach((tab) =>
        tab.classList.remove('carousel__btn--current')
      );
    });

    slider.forEach((el) => {
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

    cards.forEach((s, _, arr) => {
      if (slide > curSlide.dataset.slide) {
        if (slide - curSlide.dataset.slide === 1) this._minusOrder(s, arr);

        if (slide - curSlide.dataset.slide > 1)
          s.style.order =
            +s.dataset.slide < +slide
              ? arr.length - slide + +s.dataset.slide + 1
              : (s.style.order = s.dataset.slide - slide + 1);
      }

      if (slide < curSlide.dataset.slide) {
        if (curSlide.dataset.slide - slide === 1) {
          this._plusOrder(s, arr);
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

  _nextSlide(e) {
    const btnNext = e.target.closest('.carousel__btn--next');
    if (!btnNext) return;

    if (btnNext.closest('section').querySelectorAll('.card')) {
      const slides = btnNext.closest('section').querySelectorAll('.card');
      slides.forEach((s, _, arr) => this._minusOrder(s, arr));
    }

    this._resetSmallSlider(btnNext);
  }

  _prevSlide(e) {
    const btnPrev = e.target.closest('.carousel__btn--prev');
    if (!btnPrev) return;

    if (btnPrev.closest('section').querySelectorAll('.card')) {
      const slides = btnPrev.closest('section').querySelectorAll('.card');
      slides.forEach((s, _, arr) => this._plusOrder(s, arr));
    }

    this._resetSmallSlider(btnPrev);
  }

  _resetSmallSlider(btn) {
    const container = btn.closest('section');
    if (container.querySelectorAll('.carousel__btns').length !== 2) return;
    const slider = [...container.querySelectorAll('.card')];
    const tabLength = container.querySelectorAll('.carousel__btn--tab').length;

    if (btn.classList.contains('carousel__btn--next')) {
      this._resetSliderOrderNext(slider, tabLength);
      const firstSlide = slider.find((el) => +el.style.order === 1);
      this._activateSlideTab(firstSlide.dataset.slide, [container]);
    }

    if (btn.classList.contains('carousel__btn--prev')) {
      this._resetSliderOrderPrev(slider, tabLength);
      const firstSlide = slider.find((el) => +el.style.order === 1);
      this._activateSlideTab(firstSlide.dataset.slide, [container]);
    }
  }

  _resetSliderOrderPrev(slider) {
    const borderSlide = slider.find(
      (el) => +el.style.order === 1 && +el.dataset.slide === slider.length
    );

    if (borderSlide)
      slider.forEach((slide, _, arr) => this._plusOrder(slide, arr));
  }

  _resetSliderOrderNext(slider, length) {
    const borderSlide = slider.find(
      (el) => +el.style.order === 1 && +el.dataset.slide > length
    );

    if (borderSlide) slider.forEach((slide, i) => (slide.style.order = i + 1));
  }

  _changeTabWithInterval(section, tabs) {
    const slider = [...section.querySelectorAll('.card')];

    slider.forEach((s, i, arr) => {
      this._minusOrder(s, arr);

      if (+s.style.order === 1 && +s.dataset.slide <= tabs)
        this._activateSlideTab(i + 1, [section.closest('section')]);

      if (+s.style.order === 1 && +s.dataset.slide > tabs) {
        this._activateSlideTab(+s.dataset.slide - tabs, [
          section.closest('section'),
        ]);
      }

      this._resetSliderOrderNext(arr, tabs);
    });
  }

  _sliderInterval() {
    const slider = [...document.querySelectorAll('.carousel__cards')];
    const sliderButtons = slider.filter(
      (el) => !el.closest('section').dataset.carousel
    );
    const sliderTabs = slider.filter(
      (el) => el.closest('section').dataset.carousel
    );

    sliderButtons.forEach((div) => {
      div
        .querySelectorAll('.card')
        .forEach((s, _, arr) => this._minusOrder(s, arr));
    });

    const [lgSlider, smSlider] = sliderTabs;
    const [lgTabsLength, smTabsLength] = sliderTabs.map(
      (el) =>
        el.closest('section').querySelectorAll('.carousel__btn--tab').length
    );

    this._changeTabWithInterval(lgSlider, lgTabsLength);
    this._changeTabWithInterval(smSlider, smTabsLength);
  }

  _setSlideInterval() {
    this._interval = setInterval(() => {
      this._sliderInterval();
    }, 5000);
  }

  _changeSlideInterval(e) {
    const btns = e.target.closest('.carousel__btns');
    const card = e.target.closest('.card');
    if (!btns && !card) return;

    clearInterval(this._interval);
    this._setSlideInterval();
  }

  _addHandlerChangeSlide() {
    this._mainEl.addEventListener(
      'click',
      this._changeSlideInterval.bind(this)
    );
    this._mainEl.addEventListener('click', this._nextSlide.bind(this));
    this._mainEl.addEventListener('click', this._prevSlide.bind(this));
    this._mainEl.addEventListener('click', this._clickTabs.bind(this));
  }
}
export default new SlidersView();
