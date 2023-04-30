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
  model.addToViewList(article, accountView.getUserId());

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

  const user = modalView.signIn(model.state.users);
  if (!user) return;
  const comments = model.findUsersComments(user);
  navigationView.logInAccount(user);
  cardView.renderProfileCards(user);
  accountView.renderAccountData(user, comments, citiesList);
  checkoutView.toggleSignInBlock(model.state.users, citiesList, 'hidden');
}

function controlAddToWishlist(e) {
  cardView.addToWishlist(e);
}

function controlDeleteWishlist(e) {
  const id = accountView.deleteWishlistItems(e);
  if (!id) return;
  model.deleteWishlist(id);
}

function controlDeleteViewlist(e) {
  const id = accountView.deleteViewlistItems(e);
  if (!id) return;
  model.deleteViewlist(id);
}

function controlSignOut(e) {
  e.preventDefault();
  accountView.signOut();
  navigationView.logOutAccount();
  checkoutView.toggleSignInBlock();
}

function controlDeleteAccount(e) {
  e.preventDefault();
  model.deleteUser(accountView.getUserId());
  accountView.signOut();
  navigationView.logOutAccount();
  checkoutView.toggleSignInBlock();
}

function controlRegister(e) {
  e.preventDefault();
  const newUser = modalView.registerUser(model.state.users);
  if (!newUser) return;
  model.createAccount(newUser);
}

function init() {
  view.addHandlerRender(controlInitPage);
  cardView.addHandlerRenderProductPage(controlRenderProductPage);
  catalogView.addHandlerInitPage(controlInitCatalogPage);
  blogView.addHandlerRanderBlogPage(controlRenderBlogPage);
  postView.addHandlerRenderPostPage(controlRenderPostPage);
  cartModalView.addHandlerAddToCart(controlModalCart);
  checkoutView.addHandlerRenderCheckoutPage(controlCheckoutPage);
  modalView.addHandlerSignIn(controlSignIn);
  cardView.addHandlerAddToWishlist(controlAddToWishlist);
  accountView.addHandlerDeleteWishlistItems(controlDeleteWishlist);
  accountView.addHandlerDeleteViewlistItems(controlDeleteViewlist);
  accountView.addHandlerSignOut(controlSignOut);
  accountView.addHandlerDeleteAccount(controlDeleteAccount);
  modalView.addHandlerRegister(controlRegister);
}

init();
