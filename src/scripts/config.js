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
  fullNameChar: 'Full name must contain only letters.',
  name: 'Please provide a valid name.',
  nameChar: 'Name must contain only letters.',
  lastName: 'Please provide a valid last name.',
  lastNameChar: 'Last name must contain only letters.',
  emailEmpty: 'Please enter your email address.',
  emailSign: 'An email address must contain a single @.',
  emailSignFirst: "An email address mustn't start with a @.",
  emailSignLast: "The last character mustn't be a @.",
  emailDot: 'An email address must contain a single .',
  emailDotFirst: "An email address mustn't start with a .",
  emailDotLast: "The last character mustn't be a .",
  emailNew: "An email address isn't connected to an account.",
  emailDuplicate: 'An account using this email address already exists.',
  passEmpty: 'Please enter your Password.',
  passLength: 'Password should contain at least 6 character.',
  passWrong: "Password isn't correct, please try again.",
  passConfirm: 'Password and Confirm Password does not match.',
  passNewEmpty: 'Please fill new Password.',
  passNew: 'Password cannot be the same as old',
  phoneLength: 'Phone number must be at least 10 digits',
  phone: 'Phone number must contain only digits and signs + - ()',
  address: 'Please provide a valid address',
  zipCode: 'ZIP Code must contain only digits',
  zipCodeLength: 'ZIP Code must be at least 3 digits',
  field: 'This field cannot be empty.',
  rating: 'Please select score.',
  size: 'Please select a size.',
  emptyCart: 'Your cart is empty',
  country: 'Please select a delivery country',
  city: 'Please select a delivery city',
  cardNum: 'Invalid Credit Card number',
  cardDate: 'Invalid Expiry Date',
  cardCVC: 'Invalid CVC code',
  orderNum: 'Please enter Orders number',
};

export const ACCOUNT_TEXT = {
  orders: 'You have not done orders yet',
  wishlist: 'You have not added items to the wishlist yet',
  view: 'You have not viewed items yet',
  review: 'You have not added comments to the products yet',
  trackOrder:
    'We did not find the order with this number. Maybe the number is incorrect.',
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

// Fake country API
// prettier-ignore
export const EXCLUSION_COUNTRIES = ['Cyprus', 'Belarus', 'Moldova', 'North Macedonia', 'Russia', 'Vatican City',];

export const DOUBLE_COUNTRIES = ['Czechia', 'Ukraine', 'United Kingdom'];
// prettier-ignore
export const CITIES = [
  {
    Czechia: ['Brno', 'Liberec', 'Olmouc', 'Ostrava', 'Plzen', 'Prague'],
  },
  {
    Ukraine: [
      'Bila Tserkva', 'Cherkasy', 'Chernihiv', 'Chernivtsi', 'Dnipro', 'Ivano-Frankivsk', 'Kamianske', 'Kharkiv', 'Kherson', 'Khmelnytskyi', 'Kiyv', 'Kramatorsk', 'Kremenchuk', 'Kropyvnytskyi', 'Kryvyi Rih', 'Lutsk', 'Lviv', 'Mykolaiv', 'Odesa', 'Poltava', 'Rivne', 'Sumy', 'Ternopil', 'Uzhhorod', 'Vinnytsia', 'Zaporizhzhia', 'Zhytomyr',
    ],
  },
  {
    'United Kingdom': [
      'Belfast', 'Birmingham', 'Bournemouth', 'Bristol', 'Cardiff', 'Coventry', 'Edinburgh', 'Glasgow', 'Leeds', 'Leicester', 'Liverpool', 'London', 'Manchester', 'Middlesbrough', 'Newcastle', 'Nottingham', 'Sheffield', 'Southampton', 'Stoke',
    ],
  },
];

export const POPUP_MESSAGE = {
  contact: 'Thank you! Your message has been sent.',
  comment: 'Thank you! Your comment has been added.',
  saveChanges: 'Your changes have been saved.',
  addToCart: 'Item has been added to the cart.',
  checkout: 'Thank you! Your order has been completed.',
  subscribe: 'Thank you for subscribing.',
  signIn: 'You must sign in to add item to wishlist',
  addToWishlist: 'Item has been added to the wishlist.',
  addLikes: 'You must sign in to add like to the item.',
};

export const LETTER_CODE = {
  capitalA: 65,
  capitalZ: 95,
};
