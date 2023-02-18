import View from './View';

class CatalogView extends View {
  _catalogPageEl = document.getElementById('main__catalog');

  _generateBreadcrumbLinks() {
    return `
      <li class="breadcrumb__item">
        <a href="#" class="breadcrumb__link breadcrumb__link--icon" data-link="home">
          <svg class="breadcrumb__icon">
            <use xlink:href="assets/svg/sprite.svg#home"></use>
          </svg>
        </a>
      </li>
      <li class="breadcrumb__item">
        <svg class="breadcrumb__icon breadcrumb__icon--light">
          <use xlink:href="assets/svg/sprite.svg#right-chevron"></use>
        </svg>
      </li>
      <li class="breadcrumb__item">
        <a href="#" class="breadcrumb__link" data-link="catalog">Women</a>
      </li>
      <li class="breadcrumb__item">
        <svg class="breadcrumb__icon breadcrumb__icon--light">
          <use xlink:href="assets/svg/sprite.svg#right-chevron"></use>
        </svg>
      </li>
      <li class="breadcrumb__item">
        <a href="#" class="breadcrumb__link breadcrumb__link--current" data-link="catalog">Clothes</a>
      </li>
    `;
  }

  // _generateBreadcrumbFilters() {
  //   return `
  //   <ul class="breadcrumb__catalog-list">
  //     <li class="breadcrumb__catalog-item">
  //       <button class="breadcrumb__catalog-btn">
  //         <svg class="breadcrumb__icon breadcrumb__icon--light clear-one">
  //           <use xlink:href="assets/svg/sprite.svg#cross"></use>
  //         </svg>
  //       </button>
  //       <a href="#" class="breadcrumb__link breadcrumb__link--current"
  //           >Dresses</a>
  //     </li>
  //     <li class="breadcrumb__catalog-item">
  //       <button class="breadcrumb__catalog-btn">
  //         <svg class="breadcrumb__icon breadcrumb__icon--light clear-one">
  //           <use xlink:href="assets/svg/sprite.svg#cross"></use>
  //         </svg>
  //       </button>
  //       <a href="#" class="breadcrumb__link breadcrumb__link--current"
  //           >Yellow</a>
  //     </li>
  //     <li class="breadcrumb__catalog-item">
  //       <button class="breadcrumb__catalog-btn">
  //         <svg class="breadcrumb__icon breadcrumb__icon--light clear-one">
  //           <use xlink:href="assets/svg/sprite.svg#cross"></use>
  //         </svg>
  //       </button>
  //       <a href="#" class="breadcrumb__link breadcrumb__link--current"
  //           >Cotton</a>
  //     </li>
  //     <li class="breadcrumb__catalog-item">
  //         <button class="breadcrumb__catalog-btn">
  //             <svg class="breadcrumb__icon clear-all">
  //                 <use xlink:href="assets/svg/sprite.svg#cross"></use>
  //             </svg>
  //         </button>
  //         <a href="#" class="breadcrumb__link">Clear all</a>
  //     </li>
  //   </ul>
  //   `;
  // }
}

export default new CatalogView();
