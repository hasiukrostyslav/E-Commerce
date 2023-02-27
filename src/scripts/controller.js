import '../styles/main.scss';
import accountView from './views/AccountView';
import blogVIew from './views/BlogVIew';
import cardView from './views/CardView';
import catalogView from './views/CatalogView';
import checkoutView from './views/CheckoutView';
import contactView from './views/ContactView';
import headerView from './views/HeaderView';
import homeView from './views/HomeView';
import modalView from './views/ModalView';
import navigationView from './views/NavigationView';
import postView from './views/PostView';
import productView from './views/ProductView';
import trackView from './views/TrackView';
import View from './views/View';
import * as model from './model';

const view = new View();
view.init();

function controlCreateAccount() {}

function controlSignIn(e) {
  e.preventDefault();

  const user = modalView.validationLogIn(model.state.users);
  if (!user) return;

  console.log(user);

  navigationView.changeAccountToolbar(user.firstName);
  accountView.renderProfileData(user);
}

function init() {
  modalView.addHandlerLogIn(controlSignIn);
}

init();
