import data from './data';
import { EXCLUSION_COUNTRIES, CITIES, DOUBLE_COUNTRIES } from './config';

export const state = {};

function downloadData() {
  state.users = data.users;
  state.catalog = data.catalog;
  state.posts = data.posts;
  state.reviews = data.reviews;
}
downloadData();

// LOCAL STORAGE
const persistState = function () {
  localStorage.setItem('users', JSON.stringify(state.users));
  localStorage.setItem('posts', JSON.stringify(state.posts));
  localStorage.setItem('reviews', JSON.stringify(state.reviews));
};

const init = function () {
  const usersStorage = localStorage.getItem('users');
  const postsStorage = localStorage.getItem('posts');
  const reviewsStorage = localStorage.getItem('reviews');

  if (usersStorage) state.users = JSON.parse(usersStorage);
  if (postsStorage) state.posts = JSON.parse(postsStorage);
  if (reviewsStorage) state.reviews = JSON.parse(reviewsStorage);
};
init();

const clearState = function () {
  localStorage.clear('users');
  localStorage.clear('posts');
  localStorage.clear('reviews');
};

// clearState();

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
getCountry();

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

// DELETE WISHLIST/VIEW FROM USER PROFILE
export const deleteWishlist = function (id) {
  const currentUser = state.users.find((user) => user.id === +id);
  currentUser.wishlist.splice(0);
  persistState();
};

export const deleteViewlist = function (id) {
  const currentUser = state.users.find((user) => user.id === +id);
  currentUser.view.splice(0);
  persistState();
};

// DELETE ACCOUNT
export const deleteUser = function (id) {
  const currentUser = state.users.find((user) => user.id === id);
  const index = state.users.indexOf(currentUser);
  state.users.splice(index, 1);
  persistState();
};
