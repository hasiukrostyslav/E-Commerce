import View from './View';
import icons from '../../assets/svg/sprite.svg';

class SizeModalView extends View {
  _parentElement = document.body;
  _btnOpen = document.querySelector('.size-chart');
  _markup;

  constructor() {
    super();
    this._render();
    if (!document.querySelector('.overlay')) this._renderOverlay();
    this._modal = document.querySelector('.modal--size');
    this._overlay = document.querySelector('.overlay');
    this._btnClose = this._modal.querySelector('.btn--close');
  }

  _generateMarkup() {
    this._markup = `
    <section class="modal--size hidden">
      <button class="btn--close" type="button">
        <svg class="close__icon">
          <use xlink:href="${icons}#cross"></use>
        </svg>
      </button>
      <div class="size__wrapper">
        <h3 class="modal__heading u-margin-bottom-medium-2">Size chart</h3>
        <div class="size__tabs">
          <div class="tag__checkbox">
            <input
              class="tag__checkbox-btn"
              type="radio"
              name="category"
              id="women-size"
              checked
            />
            <label class="tag__checkbox-radio" for="women-size">Women</label>
          </div>
          <div class="tag__checkbox">
            <input
              class="tag__checkbox-btn"
              type="radio"
              name="category"
              id="men-size"
            />
            <label class="tag__checkbox-radio" for="men-size">Men</label>
          </div>
          <div class="tag__checkbox">
            <input
              class="tag__checkbox-btn"
              type="radio"
              name="category"
              id="kids-size"
            />
            <label class="tag__checkbox-radio" for="kids-size">Kids </label>
          </div>
        </div>
        <table class="size__table">
          <thead class="size__thead">
            <tr class="size_trow">
              <th class="size__theading" colspan="9">Footwear</th>
            </tr>
          </thead>
          <tbody class="size__tbody">
            <tr class="size__trow">
              <td class="size__tdata">Europe</td>
              <td class="size__tdata">35</td>
              <td class="size__tdata">36</td>
              <td class="size__tdata">37</td>
              <td class="size__tdata">38</td>
              <td class="size__tdata">39</td>
              <td class="size__tdata">40</td>
              <td class="size__tdata">41</td>
              <td class="size__tdata">42</td>
            </tr>
            <tr class="size__trow">
              <td class="size__tdata">USA</td>
              <td class="size__tdata">5</td>
              <td class="size__tdata">6</td>
              <td class="size__tdata">6.5</td>
              <td class="size__tdata">7.5</td>
              <td class="size__tdata">8</td>
              <td class="size__tdata">9</td>
              <td class="size__tdata">10</td>
              <td class="size__tdata">11</td>
            </tr>
            <tr class="size__trow">
              <td class="size__tdata">United Kingdom</td>
              <td class="size__tdata">2</td>
              <td class="size__tdata">3</td>
              <td class="size__tdata">4</td>
              <td class="size__tdata">5</td>
              <td class="size__tdata">6</td>
              <td class="size__tdata">7</td>
              <td class="size__tdata">8</td>
              <td class="size__tdata">9</td>
            </tr>
            <tr class="size__trow">
              <td class="size__tdata">China</td>
              <td class="size__tdata">230/83</td>
              <td class="size__tdata">235/84</td>
              <td class="size__tdata">240/85</td>
              <td class="size__tdata">245/86</td>
              <td class="size__tdata">255/87</td>
              <td class="size__tdata">260/88</td>
              <td class="size__tdata">265/89</td>
              <td class="size__tdata">275/90</td>
            </tr>
            <tr class="size__trow">
              <td class="size__tdata">Ukraine</td>
              <td class="size__tdata">35</td>
              <td class="size__tdata">36</td>
              <td class="size__tdata">37</td>
              <td class="size__tdata">38</td>
              <td class="size__tdata">39</td>
              <td class="size__tdata">40</td>
              <td class="size__tdata">41</td>
              <td class="size__tdata">42</td>
            </tr>
            <tr class="size__trow">
              <td class="size__tdata">Italy</td>
              <td class="size__tdata">35</td>
              <td class="size__tdata">36</td>
              <td class="size__tdata">37</td>
              <td class="size__tdata">38</td>
              <td class="size__tdata">39</td>
              <td class="size__tdata">40</td>
              <td class="size__tdata">41</td>
              <td class="size__tdata">42</td>
            </tr>
            <tr class="size__trow">
              <td class="size__tdata">South Korea</td>
              <td class="size__tdata">230</td>
              <td class="size__tdata">235</td>
              <td class="size__tdata">240</td>
              <td class="size__tdata">245</td>
              <td class="size__tdata">255</td>
              <td class="size__tdata">260</td>
              <td class="size__tdata">265</td>
              <td class="size__tdata">275</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="size__choice">
        <p class="size__text">I want to see size equivalence in:</p>
        <div class="size__units">
          <div class="tag__checkbox">
            <input
              class="tag__checkbox-btn"
              type="radio"
              name="units"
              id="cm"
              checked
            />
            <label class="tag__checkbox-radio" for="cm">cm</label>
          </div>
          <div class="tag__checkbox">
            <input
              class="tag__checkbox-btn"
              type="radio"
              name="units"
              id="inches"
            />
            <label class="tag__checkbox-radio" for="inches">Inches</label>
          </div>
        </div>
      </div>
      <div class="size__wrapper">
        <table class="size__table u-no-margin">
          <thead class="size__thead">
            <tr class="size_trow">
              <th class="size__theading" colspan="9">
                Equivalence in centimetres
              </th>
            </tr>
          </thead>
          <tbody class="size__tbody">
            <tr class="size__trow">
              <td class="size__tdata">Foot length</td>
              <td class="size__tdata">22.4 cm</td>
              <td class="size__tdata">23 cm</td>
              <td class="size__tdata">23.6 cm</td>
              <td class="size__tdata">24.3 cm</td>
              <td class="size__tdata">24.9 cm</td>
              <td class="size__tdata">25.5 cm</td>
              <td class="size__tdata">26.2 cm</td>
              <td class="size__tdata">26.8 cm</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    `;
    return this._markup;
  }
}

export default new SizeModalView();
