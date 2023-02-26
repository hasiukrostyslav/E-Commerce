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

function controlSignIn() {}

function init() {}

init();
modalView.addHandlerLogIn();

// const search = document.querySelector('.search');
// const text = document.querySelector('.topbar__phone');
// const nav = document.querySelector('.navigation__toolbar');
// const btns = document.querySelector('.user-btns');
// const profile = document.querySelector('.user-profile');

// text.addEventListener('click', () => {
//   search.classList.add('search__shrink');
//   nav.style.display = 'flex';
//   btns.style.display = 'none';
//   profile.style.display = 'flex';
// });
// search.classList.add('search__shrink');
// nav.style.display = 'flex';

document.querySelector('.modal--sign-in').classList.remove('hidden');
// console.log(modalView);
