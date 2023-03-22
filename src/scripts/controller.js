import '../styles/main.scss';
import accountView from './views/AccountView';
import blogVIew from './views/BlogVIew';
import cardView from './views/CardView';
import catalogView from './views/CatalogView';
import checkoutView from './views/CheckoutView';
import contactView from './views/ContactView';
import headerView from './views/HeaderView';
import modalView from './views/ModalView';
import navigationView from './views/NavigationView';
import postView from './views/PostView';
import productView from './views/ProductView';
import slidersView from './views/SlidersView';
import trackView from './views/TrackView';
import View from './views/View';
import * as model from './model';

const view = new View();

const controlInitPage = function () {
  // Init page config
  view.init();

  // Render product cards
  cardView.render(model.state.catalog);

  // Init sliders config
  slidersView.initSlider();
};

const controlSignIn = function (e) {
  e.preventDefault();

  const user = modalView.validationLogIn(model.state.users);
  if (!user) return;

  console.log(user);

  navigationView.changeAccountToolbar(user.firstName);
  accountView.renderProfileData(user);
};

const controlOpenProductPage = function (e) {
  const article = cardView.clickToCardLink(e);
  if (!article) return;

  const product = model.findItemByArticle(article);
  console.log(product);

  productView.renderProductPage(product, cardView.generateCardMarkup(product));
};

function init() {
  view.addHandlerRender(controlInitPage);
  modalView.addHandlerLogIn(controlSignIn);
  cardView.addHandlerRenderProductPage(controlOpenProductPage);
}

init();
