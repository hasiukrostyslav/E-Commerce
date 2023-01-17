import '../styles/main.scss';
import signInModalView from './views/SignInModalView';
import signUpModalView from './views/SignUpModalView';
import cartModalView from './views/CartModalView';
import sizeModalView from './views/SIzeModalView';
import reviewModalView from './views/ReviewModalView';
import menuModalView from './views/MenuModalView';

function controlModal() {
  signInModalView.addHandlerOpenModal();
  signInModalView.addHandlerCloseModal();

  signUpModalView.addHandlerOpenModal();
  signUpModalView.addHandlerCloseModal();

  cartModalView.addHandlerOpenModal();
  cartModalView.addHandlerCloseModal();

  sizeModalView.addHandlerOpenModal();
  sizeModalView.addHandlerCloseModal();

  reviewModalView.addHandlerOpenModal();
  reviewModalView.addHandlerCloseModal();
}

controlModal();

menuModalView.showMenu();
