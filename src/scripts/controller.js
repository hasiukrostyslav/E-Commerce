import '../styles/main.scss';
import accountView from './views/AccountView';
import blogView from './views/BlogView';
import cardView from './views/CardView';
import catalogView from './views/CatalogView';
import cartModalView from './views/CartModalView';
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
let citiesList;

async function controlInitPage() {
  try {
    // Init page config
    view.init(model.state);

    // Calculate item rating
    model.calculateItemRating(model.state);

    // Render product cards
    cardView.render(model.state.catalog);

    // Init sliders config
    slidersView.initSlider();

    // Get Countries and Cities List
    const countriesList = await model.getCountry();

    citiesList = await model.getCity(countriesList);
    view.asyncInit(countriesList, citiesList);
  } catch (err) {
    console.error(err);
  }
}

function controlInitCatalogPage(e) {
  catalogView.init(e, model.state.catalog);
}

function controlRenderProductPage(e) {
  const article = cardView.clickOnCardLink(e);
  if (!article) return;

  const product = model.findItemByArticle(article);

  productView.renderProductPage(
    product,
    model.state.reviews,
    cardView.generateCardMarkup(product)
  );
}

function controlRenderBlogPage(e) {
  const { posts } = model.state;
  blogView.renderBlogPage(e, posts);
}

function controlRenderPostPage(e) {
  const { posts } = model.state;
  postView.renderPostPage(e, posts);
}

function controlModalCart(e) {
  cartModalView.addToCart(model.state.catalog, e);
  cartModalView.addHandlerChangeAmount(
    cartModalView.changeAmount(model.state.catalog, e)
  );
}

function controlCheckoutPage() {
  checkoutView.renderCheckoutPage(model.state.users, citiesList);
}

function controlSignIn(e) {
  e.preventDefault();

  const user = modalView.validationLogIn(model.state.users);
  const comments = model.findUsersComments(user);
  if (!user) return;
  navigationView.logInAccount(user);
  cardView.renderProfileCards(user);
  accountView.renderAccountData(user, comments, citiesList);
  checkoutView.toggleSignInBlock(model.state.users, citiesList, 'hidden');
}

function controlSignOut(e) {
  e.preventDefault();
  accountView.signOut();
  navigationView.logOutAccount();
  checkoutView.toggleSignInBlock();
}

function init() {
  view.addHandlerRender(controlInitPage);
  cardView.addHandlerRenderProductPage(controlRenderProductPage);
  catalogView.addHandlerInitPage(controlInitCatalogPage);
  blogView.addHandlerRanderBlogPage(controlRenderBlogPage);
  postView.addHandlerRenderPostPage(controlRenderPostPage);
  cartModalView.addHandlerAddToCart(controlModalCart);
  checkoutView.addHandlerRenderCheckoutPage(controlCheckoutPage);
  modalView.addHandlerLogIn(controlSignIn);
  accountView.addHandlerSignOut(controlSignOut);
}

init();
