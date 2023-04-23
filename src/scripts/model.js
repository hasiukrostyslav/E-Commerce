import data from './data';

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

// const getCountry = async function () {
//   try {
//     const response = await fetch(
//       'https://countriesnow.space/api/v0.1/countries/population/cities'
//     );
//     console.log(response);
//     const data = await response.json();

//     console.log(data.data);

//   } catch (err) {
//     console.error(err);
//   }
// };
// getCountry();

// 'https://countriesnow.space/api/v0.1/countries/population/cities'

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
