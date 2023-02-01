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
import scrollView from './views/ScrollView';
import offersView from './views/OffersView';
import orderView from './views/OrderView';
import wishlistView from './views/WishlistView';
import paginationView from './views/PaginationView';

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
  productView.addHandlerToggleProductInfo();
  orderView.addHandlerToggleOrders();
  catalogView.addHandlerToggleFilterContainer();
  catalogView.addHandlerDeleteFilter();
  catalogView.addHandlerToggleFilter();

  scrollView.addHandlerScrollToTop();
  sliderView.addHandlerChangeSlide();
  offersView.addHandlerChangeSlide();
}

function controlOrderView() {
  wishlistView.addHandlerMoveToWishlist();
}

function init() {
  controlModal();
  controlChangeView();
  controlOrderView();
}

init();
