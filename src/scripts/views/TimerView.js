import View from './View';

class TimerView extends View {
  _parentElement = document.querySelector('.banner__week');
  _daysElement = document.querySelector('.digit--days');
  _hoursElement = document.querySelector('.digit--hours');
  _minutesElement = document.querySelector('.digit--mins');
  _secondsElement = document.querySelector('.digit--sec');
  _days = 7;
  _hours = 24;
  _min = 60;
  _sec = 60;
  _milSec = 1000;

  constructor() {
    super();
    this._getCurrentDay();
  }

  _getCurrentDay() {
    this._currentDay = new Date().getTime();
  }

  _countDown(timer, countDownDate) {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const day = String(
      Math.trunc(
        distance / (this._milSec * this._sec * this._min * this._hours)
      )
    ).padStart(2, 0);
    const hour = String(
      Math.trunc(
        Math.trunc(
          distance % (this._milSec * this._sec * this._min * this._hours)
        ) /
          (this._milSec * this._sec * this._min)
      )
    ).padStart(2, 0);
    const minute = String(
      Math.trunc(
        (distance % (this._milSec * this._sec * this._min)) /
          (this._milSec * this._sec)
      )
    ).padStart(2, 0);
    const second = String(
      Math.trunc((distance % (this._milSec * this._sec)) / this._milSec)
    ).padStart(2, 0);

    this._daysElement.textContent = day;
    this._hoursElement.textContent = hour;
    this._minutesElement.textContent = minute;
    this._secondsElement.textContent = second;

    if (distance === 0) clearInterval(timer);
  }

  startCountDownTimer() {
    if (!this._parentElement) return;
    const countDownDate =
      this._currentDay +
      this._days * this._hours * this._sec * this._min * this._milSec;

    const timer = setInterval(
      () => this._countDown(timer, countDownDate),
      1000
    );
  }
}

export default new TimerView();
