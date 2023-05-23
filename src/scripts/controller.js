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

    // Init orders status
    model.initOrdersStatus();

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

function controlCatalogFilters(e) {
  cardView.catalogInit(e, model.sortItems);
}

function controlRenderProductPage(e) {
  const article = cardView.clickOnCardLink(e);
  if (!article) return;

  const product = model.findItemByArticle(article);
  model.addToViewList(article, accountView.getUserId());

  productView.renderProductPage(
    product,
    model.state.reviews,
    cardView.generateCardMarkup(product),
    model.checkWishlist(accountView.getUserId(), article)
  );

  const user = model.findCurrentUser(accountView.getUserId());
  if (user) {
    cardView.renderProfileCards(user);
    accountView.renderWishlist(user);
    accountView.renderViewedList(user);
  }
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
  modalView.modalTimer();
}

function controlCheckoutPage() {
  checkoutView.renderCheckoutPage(model.state.users, citiesList);
}

function controlCreateOrder(e) {
  const orderId = model.createOrderId();
  const order = checkoutView.createOrder(orderId, e);
  if (!order) return;
  model.addOrder(order);

  const user = model.findCurrentUser(accountView.getUserId());
  if (user) accountView.renderOrders(user);
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

function controlUpdateProfileData(e) {
  const user = model.findCurrentUser(accountView.getUserId());
  const updatedData = accountView.updateProfileData(user, e);
  if (!updatedData) return;
  model.updateAccountData(user, updatedData);
  modalView.modalTimer();
}

function controlAddToWishlist(e) {
  const id = accountView.addToWishlist(e);
  modalView.modalTimer();
  if (!id) return;
  model.addRemoveWish(id);
  const user = model.findCurrentUser(id[0]);
  cardView.renderProfileCards(user);
  accountView.renderWishlist(user);
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

function controlSendMessage(e) {
  const message = contactView.sendMessage(e);
  if (!message) return;
  model.addContactMessage(message);
  modalView.modalTimer();
}

function controlSubscribe(e) {
  const email = view.subscribe(e);
  if (!email) return;
  model.addSubscribers(email);
  modalView.modalTimer();
}

function controlAddPostComment(e) {
  const postHeading = postView.getPostHeading();
  const comment = postView.addPostComment(e);
  if (!comment) return;

  const updatedData = model.updatePostComments(postHeading, comment);
  modalView.modalTimer();
  postView.renderComment(updatedData);
}

function controlAddProductReview(e) {
  const article = productView.getArticle();
  const review = productView.addReview(e);
  if (!review) return;
  model.updateReviewList(article, review);
  modalView.modalTimer();

  const product = model.findItemByArticle(article);
  model.calculateItemRating(model.state);

  productView.updateProductRating(product, model.state.reviews);
  cardView.updateItemRating(product);

  const user = model.findCurrentUser(accountView.getUserId());
  if (user) {
    const comments = model.findUsersComments(user);
    accountView.renderReviews(comments);
  }
}

function controlAddLikes(e) {
  const reviewData = productView.addLikes(e);
  if (!reviewData) return;
  modalView.modalTimer();

  model.addLikes(reviewData);
  productView.updateReview(reviewData, model.findReview(reviewData));
}

function controlTrackOrder(e) {
  trackView.trackOrder(model.getAllOrders(), e);
}

function controlRenderModalSize(e) {
  modalView.renderModalSize(model.state.size, e);
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
  accountView.addHandlerUpdateProfileData(controlUpdateProfileData);
  accountView.addHandlerAddToWishlist(controlAddToWishlist);
  accountView.addHandlerDeleteWishlistItems(controlDeleteWishlist);
  accountView.addHandlerDeleteViewlistItems(controlDeleteViewlist);
  accountView.addHandlerSignOut(controlSignOut);
  accountView.addHandlerDeleteAccount(controlDeleteAccount);
  modalView.addHandlerRegister(controlRegister);
  contactView.addHandlerSendMessage(controlSendMessage);
  view.addHandlerSubscribe(controlSubscribe);
  postView.addHandlerAddPostComment(controlAddPostComment);
  productView.addHandlerAddReview(controlAddProductReview);
  checkoutView.addHandlerCreateOrder(controlCreateOrder);
  productView.addHandlerAddLikes(controlAddLikes);
  trackView.addHandlerTrackOrder(controlTrackOrder);
  modalView.addHandlerRenderModalSize(controlRenderModalSize);
  cardView.addHandlerCatalogFilters(controlCatalogFilters);
}

init();
