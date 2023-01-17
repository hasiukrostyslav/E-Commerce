import View from './View';
import icons from '../../assets/svg/sprite.svg';

class ReviewModalView extends View {
  _parentElement = document.body;
  _btnOpen = document.querySelector('.reviews__btn');

  constructor() {
    super();
    this._render();
    if (!document.querySelector('.overlay')) this._renderOverlay();
    this._modal = document.querySelector('.modal--review');
    this._overlay = document.querySelector('.overlay');
    this._btnClose = this._modal.querySelector('.btn--close');
  }

  _generateMarkup() {
    return `
    <section class="modal modal--small modal--review hidden">
      <button class="btn--close" type="button">
        <svg class="close__icon">
          <use xlink:href="${icons}#cross"></use>
        </svg>
      </button>
      <h3 class="modal__heading u-margin-bottom-medium">Leave a review</h3>
      <form action="#" class="review__form">
        <div class="input__box">
          <label class="label label--medium" for="name-review">Name</label>
          <input
            class="input input--medium"
            type="text"
            name="name-review"
            id="name-review"
            placeholder="Your name"
            required
          />
        </div>
        <div class="input__box">
          <label class="label label--medium" for="email-review">Email</label>
          <input
            class="input input--medium"
            type="email"
            name="email-review"
            id="email-review"
            placeholder="Your working email"
            required
          />
        </div>
        <div class="input__box">
          <label class="label label--medium" for="country">Rating</label>
          <select
            class="input input--medium select"
            name="country"
            id="country"
          >
            <option value="Choose rating" selected disabled>
              Choose rating
            </option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
          <button
            type="button"
            class="input__btn input__btn--medium select__btn"
          >
            <svg class="input__icon input__icon--medium">
              <use xlink:href="${icons}#down-chevron"></use>
            </svg>
          </button>
        </div>
        <div class="input__box">
          <p class="label label--medium">Upload a photo or video (optional)</p>

          <label class="label label--file label--small" for="file">
            Drag and drop here to upload
            <input
              class="input input--medium"
              type="file"
              name="file"
              id="file"
            />
          </label>
          <svg class="review__icon">
            <use xlink:href="${icons}#upload"></use>
          </svg>
          <button type="button" class="review__btn btn btn--outline btn--small">
            Or select file
          </button>
        </div>
        <div class="form__textarea-box review__textarea-box">
          <label class="label label--medium" for="review-textarea"
            >Review</label
          >
          <textarea
            class="form__textarea review__textarea input input--medium"
            name="textarea"
            id="review-textarea"
            placeholder="Write your message here"
            required
          ></textarea>
        </div>

        <button class="btn btn--solid btn--medium btn--modal" type="submit">
          Submit a review
        </button>
      </form>
    </section>
    `;
  }
}

export default new ReviewModalView();
