import View from './View';
import { DAYS, HOURS, MINUTES, SECONDS, MILISECONDS } from '../config';

class TimerView extends View {
  _parentElement = document.querySelector('.banner__week');
  _daysElement = document.querySelector('.digit--days');
  _hoursElement = document.querySelector('.digit--hours');
  _minutesElement = document.querySelector('.digit--mins');
  _secondsElement = document.querySelector('.digit--sec');

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
      Math.trunc(distance / (MILISECONDS * SECONDS * MINUTES * HOURS))
    ).padStart(2, 0);

    const hour = String(
      Math.trunc(
        Math.trunc(distance % (MILISECONDS * SECONDS * MINUTES * HOURS)) /
          (MILISECONDS * SECONDS * MINUTES)
      )
    ).padStart(2, 0);

    const minute = String(
      Math.trunc(
        (distance % (MILISECONDS * SECONDS * MINUTES)) / (MILISECONDS * SECONDS)
      )
    ).padStart(2, 0);

    const second = String(
      Math.trunc((distance % (MILISECONDS * SECONDS)) / MILISECONDS)
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
      this._currentDay + DAYS * HOURS * MINUTES * SECONDS * MILISECONDS;

    const timer = setInterval(
      () => this._countDown(timer, countDownDate),
      1000
    );
  }
}

export default new TimerView();
