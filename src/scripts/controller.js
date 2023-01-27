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
import catalogView from './views/CatalogView';
import sliderView from './views/SliderView';
import paginationView from './views/PaginationView';
import scrollView from './views/ScrollView';

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

  menuModalView.addHandlerShowMenu();
  menuModalView.addHandlerHideMenu();
}

function controlChangeView() {
  accountView.addHandlerChangeTabs();
  productView.addHandlerChangeTabs();
  contactView.addHandlerChangeTabs();

  listVIew.addHandlertoggleQuestion();

  catalogView.addHandlerToggleFilterContainer();
  catalogView.addHandlerDeleteFilter();
  catalogView.addHandlerToggleFilter();

  scrollView.addHandlerScrollToTop();
}

function init() {
  controlModal();
  controlChangeView();
}

init();
