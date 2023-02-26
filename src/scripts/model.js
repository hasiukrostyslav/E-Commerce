import data from './data';

export const state = {
  users: [
    {
      firstName: 'Rostyslav',
      lastName: 'Hasiuk',
      email: 'rostyslav@gmail.com',
      phone: '+380615325415',
      password: 1234567,
      country: 'Ukraine',
      city: 'Lviv',
      address: 'Shevchenka st. 111a, Lviv',
      zipCode: 45463,
      orders: [],
      wishlist: [],
      viewed: [],
      reviews: [],
    },
  ],
};

export function createAccount() {}
