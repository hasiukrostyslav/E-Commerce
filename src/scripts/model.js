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
