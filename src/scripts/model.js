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

// const persistBookmarks = function () {
//   localStorage.setItem('state', JSON.stringify(state));
// };

// persistBookmarks();
// const init = function () {
//   const storage = localStorage.getItem('state');
//   if (storage) state.bookmarks = JSON.parse(storage);
// };
// init();

// const clearBookmarks = function () {
//   localStorage.clear('state');
// };
// clearBookmarks();
