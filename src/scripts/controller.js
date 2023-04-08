import '../styles/main.scss';
import accountView from './views/AccountView';
import blogView from './views/BlogVIew';
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
  view.init(model.state.posts);

  // Calculate item rating
  model.calculateItemRating(model.state);

  // Render product cards
  cardView.render(model.state.catalog);

  // Init sliders config
  slidersView.initSlider();
};

const controlInitCatalogPage = function (e) {
  catalogView.init(e, model.state.catalog);
};

const controlRenderProductPage = function (e) {
  const article = cardView.clickOnCardLink(e);
  if (!article) return;

  const product = model.findItemByArticle(article);

  productView.renderProductPage(
    product,
    model.state.reviews,
    cardView.generateCardMarkup(product)
  );
};

const controlRenderBlogPage = function (e) {
  const { posts } = model.state;
  blogView.renderBlogPage(e, posts);
};

const controlRenderPostPage = function (e) {
  const { posts } = model.state;
  postView.renderPostPage(e, posts);
};

const controlSignIn = function (e) {
  e.preventDefault();

  const user = modalView.validationLogIn(model.state.users);
  if (!user) return;

  navigationView.changeAccountToolbar(user.firstName);
  accountView.renderProfileData(user);
};

function init() {
  view.addHandlerRender(controlInitPage);
  cardView.addHandlerRenderProductPage(controlRenderProductPage);
  catalogView.addHandlerInitPage(controlInitCatalogPage);
  blogView.addHandlerRanderBlogPage(controlRenderBlogPage);
  postView.addHandlerRenderPostPage(controlRenderPostPage);
  modalView.addHandlerLogIn(controlSignIn);
}

init();
