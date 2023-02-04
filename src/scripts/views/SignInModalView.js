import View from './View';
import icons from '../../assets/svg/sprite.svg';

class SignInModalView extends View {
  _parentElement = document.body;
  _btnOpen = document.querySelector('.topbar__login');
  _btnCheckoutSignIn = document.querySelector('.checkout__sign-in-btn');
  _markup;

  constructor() {
    super();
    this._render();
    if (!document.querySelector('.overlay')) this._renderOverlay();
    this._modal = document.querySelector('.modal--sign-in');
    this._overlay = document.querySelector('.overlay');
    this._btnClose = this._modal.querySelector('.btn--close');
    this._btnSignUp = this._modal.querySelector('.modal__link-sign-up');
    this._btnSubmit = this._modal.querySelector('.btn--modal');
    this._inputElements = this._modal.querySelectorAll('.input');
    this._inputEmail = this._modal.querySelector('[name="email-sign-in"]');
    this._inputPassword = this._modal.querySelector(
      '[name="password-sign-in"]'
    );
    this._addHandlerSignIn();
    this._addHandlerSignUp();
  }

  _addHandlerSignUp() {
    if (!this._btnSignUp) return;
    this._btnSignUp.addEventListener('click', () => {
      this._modal.classList.add('hidden');
      document.querySelector('.modal--sign-up').classList.remove('hidden');
    });
  }

  _addHandlerSignIn() {
    if (!this._btnCheckoutSignIn) return;
    this._btnCheckoutSignIn.addEventListener('click', () => {
      this._removeHiddenClass();
    });
  }

  _generateMarkup() {
    this._markup = `
    <section class="modal modal--small modal--sign-in hidden">
            
            <button class="btn--close" type="button">
                <svg class="close__icon">
                    <use
                        xlink:href="${icons}#cross"
                    ></use>
                </svg>
            </button>
            <h3 class="modal__heading u-margin-bottom-medium">Sign in</h3>
            <p class="modal__text u-margin-bottom-medium">Sign in to your account using email and password provided during registration.</p>
            <form action="#" class="modal__form">
                <div class="input__box">
                    <label class="label label--medium" for="email-sign-in">Email</label>
                    <input class="input input--medium" type="email" name="email-sign-in" id="email-sign-in" placeholder="Your working email" required>
                </div>
                <div class="input__box">
                    <label class="label label--medium" for="password-sign-in">Password</label>
                    <input class="input input--medium input--padding-medium" type="password" name="password-sign-in" id="password-sign-in" placeholder="Enter your password" required>
                    <button type="button" class="input__btn input__btn--medium">
                        <svg class="input__icon input__icon--medium">
                            <use
                                xlink:href="${icons}#eye"
                            ></use>
                        </svg>
                    </button>
                </div>
                <div class="modal__check">
                    <input class="checkbox__input" type="checkbox" name="check-sign-in" id="check-sign-in" checked>
                    <label class="checkbox__label checkbox__label--small" for="check-sign-in"><span class="checkbox__mark">&nbsp;</span>Keep me signed in</label>
                        <a class="modal__link" href="#">Forgot password?</a>
                </div>
                <button class="btn btn--solid btn--medium btn--modal" type="submit">Sign in</button>
                <p class="modal__cta u-margin-bottom-medium">Don't have an account?
                    <a class="modal__link modal__link-sign-up" href="#">Sign up</a>
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

export default new SignInModalView();
