import '../styles/main.scss';
import signInModalView from './views/SignInModalView';
import signUpModalView from './views/SignUpModalView';
import cartModalView from './views/CartModalView';
import sizeModalView from './views/SIzeModalView';
import reviewModalView from './views/ReviewModalView';
import menuModalView from './views/MenuModalView';
import accountView from './views/AccountView';
import productView from './views/ProductView';
import contactView from './views/ContactView';
import listVIew from './views/ListVIew';

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

  // menuModalView.hideMenu();
}

function controlChangePages() {
  accountView.changeAccountTabs();
  productView.changeProductTabs();
  contactView.changeContactTabs();
  listVIew.toggleQuestion();
}

function init() {
  controlModal();
  controlChangePages();
}

init();