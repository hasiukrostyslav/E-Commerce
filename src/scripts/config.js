export const DAYS = 7;
export const HOURS = 24;
export const MINUTES = 60;
export const SECONDS = 60;
export const MILISECONDS = 1000;
export const MAXSCORE = 5;
export const NUMBER_OF_ITEMS = 4;
export const NUMBER_OF_ORDERS = 6;
export const MIN_PRICE = 0;
export const MAX_PRICE = 1000;
export const COLOR_SELECTED = 'rgb(23, 105, 106)';

// prettier-ignore
export const SEARCH_EXCLUSION = ['a', 'am', 'is', 'are', 'at', 'of', 'in', 'the', 'out', 'with', 'if', 'else', 'then', 'to'];

export const ERROR = {
  fullName: 'Please provide a valid full name.',
  name: 'Please provide a valid name.',
  lastName: 'Please provide a valid last name.',
  email: 'Please provide a valid email.',
  emailWrong: "The email isn't connected to an account.",
  passWrong: "The password isn't correct, please try again.",
  passLength: 'The password should contain at least 6 character.',
  passConfirm: 'The password and confirm password should be equal.',
  passNew: 'New password cannot be the same as old',
  rating: 'Please select score.',
  size: 'Please select a size.',
  emptyCart: 'Your cart is empty',
};

export const ACCOUNT_TEXT = {
  orders: 'You have not done orders yet',
  wishlist: 'You have not added items to the wishlist yet',
  view: 'You have not viewed items yet',
  review: 'You have not added comments to the products yet',
};

export const SHIPPING = [
  {
    type: 'Courier to your address',
    price: 25,
    text: 'Estimated date:',
    day: 2,
  },
  {
    type: 'Pick up from store',
    price: 0,
    text: 'Pick up on',
    day: 1,
    time: 'from 12:00',
  },
  { type: 'UPS Ground Shipping', price: 10, text: 'Up to one week' },
  {
    type: 'Pick up at Createx Locker',
    price: 8.5,
    text: ' Pick up on',
    day: 1,
    time: 'from 12:00',
  },
  { type: 'Createx Global Export', price: 15, text: '3-4 days' },
];

export const DISCOUNT = {
  promoCode: 'NEWSEASON2023',
  discount: 0.1,
};
