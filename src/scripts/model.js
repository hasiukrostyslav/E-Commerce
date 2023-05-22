import data from './data';
import images from './helper';
// prettier-ignore
import { EXCLUSION_COUNTRIES, CITIES, DOUBLE_COUNTRIES, } from './config';

export const state = {};

function downloadData() {
  state.users = data.users;
  state.catalog = data.catalog;
  state.posts = data.posts;
  state.reviews = data.reviews;
  state.contactMessage = data.contactMessage;
  state.subscribers = data.subscribers;
  state.orders = data.orders;
  state.size = data.size;
}
downloadData();

// LOCAL STORAGE
const persistState = function () {
  localStorage.setItem('users', JSON.stringify(state.users));
  localStorage.setItem('catalog', JSON.stringify(state.catalog));
  localStorage.setItem('posts', JSON.stringify(state.posts));
  localStorage.setItem('reviews', JSON.stringify(state.reviews));
  localStorage.setItem('contactMessage', JSON.stringify(state.contactMessage));
  localStorage.setItem('subscribers', JSON.stringify(state.subscribers));
  localStorage.setItem('orders', JSON.stringify(state.orders));
};

const init = function () {
  const usersStorage = localStorage.getItem('users');
  const catalogStorage = localStorage.getItem('catalog');
  const postsStorage = localStorage.getItem('posts');
  const reviewsStorage = localStorage.getItem('reviews');
  const contactMessageStorage = localStorage.getItem('contactMessage');
  const subscribersStorage = localStorage.getItem('subscribers');
  const ordersStorage = localStorage.getItem('orders');

  if (usersStorage) state.users = JSON.parse(usersStorage);
  if (catalogStorage) state.catalogStorage = JSON.parse(catalogStorage);
  if (postsStorage) state.posts = JSON.parse(postsStorage);
  if (reviewsStorage) state.reviews = JSON.parse(reviewsStorage);
  if (contactMessageStorage)
    state.contactMessage = JSON.parse(contactMessageStorage);
  if (subscribersStorage) state.subscribers = JSON.parse(subscribersStorage);
  if (ordersStorage) state.orders = JSON.parse(ordersStorage);
};
init();

const clearState = function () {
  localStorage.clear('users');
  localStorage.clear('catalog');
  localStorage.clear('posts');
  localStorage.clear('reviews');
  localStorage.clear('contactMessage');
  localStorage.clear('subscribers');
  localStorage.clear('orders');
};

// CLEAR LOCAL STORAGE HOTKEY
const clearStorage = function (e) {
  if (e.code === 'KeyM' && e.ctrlKey) {
    e.preventDefault();
    clearState();
  }
};

const addHandlerClearStorage = function (handler) {
  document.addEventListener('keydown', handler);
};

addHandlerClearStorage(clearStorage);

// DIFFERENT FUNCTIONS
export const filterCategory = (category) =>
  state.catalog.filter((item) =>
    item.category.find((type) => type === category)
  );

export const findItemByArticle = (article) =>
  state.catalog.find((card) => card.article === article);

export const calculateItemRating = function (info) {
  const articles = [...new Set(info.reviews.map((review) => review.article))];

  info.catalog.forEach((item) => {
    item.reviews =
      info.reviews
        .filter((rv) => rv.article === item.article)
        .map((el) => el.rating) ?? [];

    if (articles.find((id) => id === item.article))
      item.rating = Math.round(
        info.reviews
          .filter((rev) => rev.article === item.article)
          .reduce((acc, el, _, arr) => acc + el.rating / arr.length, 0)
      );
  });
};

export const findUsersComments = function (user) {
  return state.reviews.filter(
    (review) => review.user === `${user.firstName} ${user.lastName}`
  );
};

// GET COUNTRY/CITY TO SELECT ELEMENTS
export const getCountry = async function () {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const europe = countries
      .filter(
        (country) => country.region === 'Europe' && country.independent === true
      )
      .map((country) => country.name.common)
      .sort();
    return europe.filter(
      (country) =>
        !EXCLUSION_COUNTRIES.some((exclusion) => exclusion === country)
    );
  } catch (err) {
    throw err;
  }
};
// getCountry();

function formatCityList(cities, country) {
  return cities.data
    .filter((city) => city.country === country)
    .sort((a, b) => b.populationCounts[0].value - a.populationCounts[0].value)
    .slice(0, 25)
    .map((city) => city.city)
    .map((city) =>
      city
        .split(' ')
        .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
        .join(' ')
        .split('-')
        .map((el, i) =>
          i !== 0 ? el[0].toUpperCase() + el.slice(1).toLowerCase() : el
        )
        .join('-')
    )
    .map((city) =>
      city.includes('(') ? city.slice(0, city.indexOf('(') - 1) : city
    )
    .sort();
}

export const getCity = async function (countries) {
  try {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries/population/cities'
    );
    const cities = await response.json();

    const entries = countries
      .filter(
        (country) =>
          !DOUBLE_COUNTRIES.some((exclusion) => exclusion === country)
      )
      .map((country) => ({
        [country]: formatCityList(cities, country),
      }));

    entries.push(...CITIES);
    return entries;
  } catch (err) {
    throw err;
  }
};

// FIND CURRENT USER
export const findCurrentUser = (id) =>
  state.users.find((user) => user.id === +id);

// DELETE WISHLIST/VIEW FROM USER PROFILE
export const deleteWishlist = function (id) {
  const currentUser = findCurrentUser(id);
  currentUser.wishlist.splice(0);
  persistState();
};

export const deleteViewlist = function (id) {
  const currentUser = findCurrentUser(id);
  currentUser.view.splice(0);
  persistState();
};

// DELETE ACCOUNT
export const deleteUser = function (id) {
  const currentUser = findCurrentUser(id);
  const index = state.users.indexOf(currentUser);
  state.users.splice(index, 1);
  persistState();
};

// CREATE ACCOUNT
export const createAccount = function (newUser) {
  const [fullName, email, pass] = newUser;

  const account = {};
  account.id = Number.parseInt((Math.random() + 1) * 10 ** 7, 10);
  account.firstName = fullName.split(' ').at(0);
  account.lastName = fullName.split(' ').slice(1).join(' ');
  account.phone = '';
  account.email = email;
  account.password = pass;
  account.country = '';
  account.city = '';
  account.address = '';
  account.zipCode = '';
  account.orders = [];
  account.wishlist = [];
  account.view = [];

  state.users.push(account);
  persistState();
};

// ADD TO VIEW LIST
export const addToViewList = function (article, id) {
  const item = findItemByArticle(article);
  const user = findCurrentUser(id);
  if (!user) return;

  if (user.view.some((el) => el.article === item.article)) return;
  user.view.push(item);
  persistState();
};

// UPDATE ACCOUNT DATA
export const updateAccountData = function (user, newData) {
  const map = new Map(Object.entries(newData));
  map.forEach((value, key) => {
    user[key] = user[key] === value ? user[key] : value;
  });
  persistState();
};

// ADD CONTACT MESSAGE
export const addContactMessage = function (message) {
  state.contactMessage.push(message);
  persistState();
};

// ADD SUBSCRIBERS
export const addSubscribers = function (email) {
  state.subscribers.push(email);
  persistState();
};

// ADD POST COMMENT
export const updatePostComments = function (postHeading, comment) {
  const post = state.posts.find((el) => el.title === postHeading);
  post.comments.push(comment);
  persistState();
  return post;
};

// ADD PRODUCT REVIEW
const generateReviewId = function () {
  return `RV${String(Math.random()).slice(2, 8)}`;
};

export const updateReviewList = function (article, comment) {
  const item = state.catalog.find((el) => el.article === article);
  const review = {
    article: item.article,
    id: generateReviewId(),
    product: item.description,
    user: comment.fullName,
    date: comment.date,
    rating: +comment.rating,
    likes: [],
    dislikes: [],
    text: comment.text,
  };
  state.reviews.push(review);
  persistState();
};

// GENERATE ORDER ID
const generateRandomLetter = function () {
  return String.fromCodePoint(Math.floor(Math.random() * (90 - 65 + 1) + 65));
};

export const createOrderId = function () {
  const charOne = generateRandomLetter();
  const charTwo = generateRandomLetter();
  const charThree = generateRandomLetter();
  const number = String(Math.random()).slice(2, 11);

  return `${number.slice(0, 2)}${charOne}${charTwo}${number.slice(
    2,
    7
  )}${charThree}${number.slice(7)}`;
};

export const addOrder = function (newOrder) {
  newOrder.orders.items.forEach((item) => (item.images = images[item.images]));
  const activeUser = state.users.find((user) => user.email === newOrder.email);
  if (activeUser) activeUser.orders.push(newOrder.orders);
  if (!activeUser) state.orders.push(newOrder);
  persistState();
};

// ADD ITEM TO WISHLIST
export const addRemoveWish = function (id) {
  const [userId, itemId] = id;
  const user = findCurrentUser(userId);
  const item = user.wishlist.find((el) => el.article === itemId);

  if (item) user.wishlist.splice(user.wishlist.indexOf(item), 1);

  if (!item) {
    const newItem = findItemByArticle(itemId);
    user.wishlist.push(newItem);
  }
  persistState();
};

export const checkWishlist = function (id, article) {
  const user = findCurrentUser(id);
  if (!user) return;
  const item = user.wishlist.find((el) => el.article === article);
  if (item) return true;
};

export const findReview = function (reviewData) {
  return state.reviews.find((el) => el.id === reviewData.id);
};

export const addLikes = function (reviewData) {
  const review = findReview(reviewData);
  if (reviewData.likes === true) {
    const user = review.likes.find((el) => el === reviewData.userId);
    if (user) review.likes.splice(review.likes.indexOf(user), 1);
    if (!user) review.likes.push(reviewData.userId);
  }

  if (reviewData.dislikes === true) {
    const user = review.dislikes.find((el) => el === reviewData.userId);
    if (user) review.dislikes.splice(review.dislikes.indexOf(user), 1);
    if (!user) review.dislikes.push(reviewData.userId);
  }

  persistState();
};

export const getAllOrders = function () {
  const usersOrders = state.users.map((user) => user.orders).flat();
  const otherOrders = state.orders.map((user) => user.orders).flat();

  const orders = [...usersOrders, ...otherOrders];
  return orders;
};

export const initOrdersStatus = function () {
  const orders = getAllOrders();
  orders.forEach((order) => {
    if (
      Date.now() > +new Date(order.deliveryDate) &&
      order.status === 'progress'
    )
      order.status = 'delivered';
  });
};

export const sortItems = function (value) {
  state.catalog.forEach(
    (item) =>
      (item.newPrice =
        item.discountPercentage === 0
          ? item.price
          : item.price - (item.discountPercentage * item.price) / 100)
  );

  let sortedData;
  if (value === 'newest') {
    sortedData = state.catalog.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }
  if (value === 'oldest') {
    sortedData = state.catalog.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }
  if (value === 'low') {
    sortedData = state.catalog.sort((a, b) => a.newPrice - b.newPrice);
  }
  if (value === 'high') {
    sortedData = state.catalog.sort((a, b) => b.newPrice - a.newPrice);
  }
  return sortedData;
};
