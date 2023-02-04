import View from './View';
import icons from '../../assets/svg/sprite.svg';

class SignUpModalView extends View {
  _parentElement = document.body;
  _btnOpen = document.querySelector('.topbar__register');
  _markup;

  constructor() {
    super();
    this._render();
    if (!document.querySelector('.overlay')) this._renderOverlay();
    this._modal = document.querySelector('.modal--sign-up');
    this._overlay = document.querySelector('.overlay');
    this._btnClose = this._modal.querySelector('.btn--close');
    this._btnSignIn = this._modal.querySelector('.modal__link-sign-in');
    this._btnSubmit = this._modal.querySelector('.btn--modal');
    this._inputElements = this._modal.querySelectorAll('.input');
    this._inputFullName = this._modal.querySelector('[name="full-name"]');
    this._inputEmail = this._modal.querySelector('[name="email-sign-up"]');
    this._inputPassword = this._modal.querySelector(
      '[name="password-sign-up"]'
    );
    this._inputPasswordConfirm = this._modal.querySelector(
      '[name="password-sign-up-confirm"]'
    );
    this._addHandlerSignIn();
  }

  _addHandlerSignIn() {
    if (!this._btnSignIn) return;
    this._btnSignIn.addEventListener('click', () => {
      this._modal.classList.add('hidden');
      document.querySelector('.modal--sign-in').classList.remove('hidden');
    });
  }

  _generateMarkup() {
    this._markup = `
    <section class="modal modal--small modal--sign-up hidden">
            <button class="btn--close" type="button">
                <svg class="close__icon">
                    <use
                        xlink:href="${icons}#cross"
                    ></use>
                </svg>
            </button>
            <h3 class="modal__heading u-margin-bottom-medium">Sign up</h3>
            <p class="modal__text u-margin-bottom-medium">Registration takes less than a minute but gives you full control over your orders.</p>
            <form action="#" class="modal__form">
                <div class="input__box">
                    <label class="label label--medium" for="full-name">Full Name</label>
                    <input class="input input--medium" type="text" name="full-name" id="full-name" placeholder="Your full name" required> 
                </div>
                <div class="input__box">
                    <label class="label label--medium" for="email-sign-up">Email</label>
                    <input class="input input--medium" type="email" name="email-sign-up" id="email-sign-up" placeholder="Your working email" required>
                </div>
                <div class="input__box">
                    <label class="label label--medium" for="password-sign-up">Password</label>
                    <input class="input input--medium input--padding-medium" type="password" name="password-sign-up" id="password-sign-up" placeholder="Enter your password" required>
                    <button type="button" class="input__btn input__btn--medium">
                        <svg class="input__icon input__icon--medium">
                            <use
                                xlink:href="${icons}#eye"
                            ></use>
                        </svg>
                    </button>
                </div>
                <div class="input__box">
                    <label class="label label--medium" for="password-sign-up-confirm">Confirm Password</label>
                    <input class="input input--medium input--padding-medium" type="password" name="password-sign-up-confirm" id="password-sign-up-confirm" placeholder="Confirm your password" required>
                    <button type="button" class="input__btn input__btn--medium">
                        <svg class="input__icon input__icon--medium">
                            <use
                                xlink:href="${icons}#eye"
                            ></use>
                        </svg>
                    </button>
                </div>
                <div class="modal__check">
                    <input class="checkbox__input" type="checkbox" name="check-sign-up" id="check-sign-up" checked>
                    <label class="checkbox__label checkbox__label--small" for="check-sign-up"><span class="checkbox__mark">&nbsp;</span>Remember me</label>
                </div>
                <button class="btn btn--solid btn--medium btn--modal" type="submit">Sign up</button>
                <p class="modal__cta u-margin-bottom-medium">Already have an account?
                    <a class="modal__link modal__link-sign-in" href="#">Sign in</a>
                </p>
            </form>
            <div class="modal__social">
                <p class="modal__social-text">Or sign in with</p>
                <ul class="social__list social__list--center">
                    <li class="social__item">
                        <a href="#" target="_blank" class="social__link social__link--light">
                            <svg class="social__icon">
                                <use
                                xlink:href="${icons}#facebook"
                                ></use>
                            </svg>
                        </a>
                    </li>
                    <li class="social__item">
                        <a href="#" target="_blank" class="social__link social__link--light">
                            <svg class="social__icon">
                                <use
                                xlink:href="${icons}#google"
                                ></use>
                            </svg>
                        </a>
                    </li>
                    <li class="social__item">
                        <a href="#" target="_blank" class="social__link social__link--light">
                            <svg class="social__icon">
                                <use
                                xlink:href="${icons}#twitter"
                                ></use>
                            </svg>
                        </a>
                    </li>
                    <li class="social__item">
                        <a href="#" target="_blank" class="social__link social__link--light">
                            <svg class="social__icon">
                                <use
                                xlink:href="${icons}#linked-in"
                                ></use>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    `;

    return this._markup;
  }
}

export default new SignUpModalView();
