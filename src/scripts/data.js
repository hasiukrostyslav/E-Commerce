import images from './helper';

const data = {
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
      wishlist: [
        {
          id: 7,
          article: 166411108,
          title: 'Shirt',
          description: 'Shirt with insertion lace trims',
          price: 49.95,
          discountPercentage: 0,
          rating: 5,
          size: ['xs', 's', 'm', 'l', 'xl'],
          color: ['blue-gray', 'red', 'yellow'],
          brand: 'Ann Taylor',
          type: 'clothes',
          images: [
            images[`catalog-1.jpg`],
            images[`catalog-1.jpg`],
            images[`catalog-1.jpg`],
            images[`catalog-1.jpg`],
            images[`catalog-1.jpg`],
          ],
          category: ['new', 'trend', 'interest', 'all'],
        },
        {
          id: 10,
          article: 147140718,
          title: 'Bag',
          description: 'Leather crossbody bag',
          price: 179,
          discountPercentage: 50,
          rating: 5,
          size: [],
          color: ['red-dark', 'beige', 'brown'],
          brand: 'Luxur',
          type: 'accessories',
          images: [
            images[`catalog-11.jpg`],
            images[`catalog-11.jpg`],
            images[`catalog-11.jpg`],
            images[`catalog-11.jpg`],
            images[`catalog-11.jpg`],
          ],
          category: ['sale', 'interest', 'all'],
        },
      ],
      viewed: [
        {
          id: 15,
          article: 136421110,
          title: 'Shorts',
          description: 'Denim shorts',
          price: 24,
          discountPercentage: 20,
          rating: '',
          size: ['xs', 's', 'm', 'l', 'xl'],
          color: ['blue-dark'],
          brand: 'Jhon Smith',
          type: 'clothes',
          images: [
            images[`catalog-13.jpg`],
            images[`catalog-13.jpg`],
            images[`catalog-13.jpg`],
            images[`catalog-13.jpg`],
            images[`catalog-13.jpg`],
          ],
          category: ['sale', 'look', 'all'],
        },
        {
          id: 9,
          article: 190320414,
          title: 'Coat',
          description: 'Coat with colour contrast',
          price: 183.45,
          discountPercentage: 0,
          rating: '',
          size: ['xs', 's', 'm', 'l', 'xl'],
          color: ['black', 'gray'],
          brand: 'Jhon Smith',
          type: 'clothes',
          images: [
            images[`catalog-5.jpg`],
            images[`catalog-5.jpg`],
            images[`catalog-5.jpg`],
            images[`catalog-5.jpg`],
            images[`catalog-5.jpg`],
          ],
          category: ['new', 'trend', 'all'],
        },
        {
          id: 7,
          article: 166411108,
          title: 'Shirt',
          description: 'Shirt with insertion lace trims',
          price: 49.95,
          discountPercentage: 0,
          rating: 5,
          size: ['xs', 's', 'm', 'l', 'xl'],
          color: ['blue-gray', 'red', 'yellow'],
          brand: 'Ann Taylor',
          type: 'clothes',
          images: [
            images[`catalog-1.jpg`],
            images[`catalog-1.jpg`],
            images[`catalog-1.jpg`],
            images[`catalog-1.jpg`],
            images[`catalog-1.jpg`],
          ],
          category: ['new', 'trend', 'interest', 'all'],
        },
        {
          id: 8,
          article: 113002379,
          title: 'Watch',
          description: 'Chrono classic watch',
          price: 120.6,
          discountPercentage: 0,
          rating: 4,
          size: [],
          color: ['blue-dark', 'black'],
          brand: 'Luxer',
          type: 'accessories',
          images: [
            images[`catalog-7.jpg`],
            images[`catalog-7.jpg`],
            images[`catalog-7.jpg`],
            images[`catalog-7.jpg`],
            images[`catalog-7.jpg`],
          ],
          category: ['new', 'trend', 'all'],
        },
      ],
      reviews: [],
    },
  ],
  catalog: [
    {
      id: 1,
      article: 151253984,
      title: 'Cap',
      description: 'Black and white sport cap',
      price: 18.15,
      discountPercentage: 0,
      rating: 5,
      size: ['s', 'm', 'l'],
      color: ['black', 'white'],
      brand: 'NewCap',
      type: 'accessories',
      images: [
        images[`catalog-3.jpg`],
        images[`catalog-3.jpg`],
        images[`catalog-3.jpg`],
        images[`catalog-3.jpg`],
        images[`catalog-3.jpg`],
      ],
      category: ['new', 'all'],
    },
    {
      id: 2,
      article: 183591002,
      title: 'Sunglasses',
      description: 'Metal bridge sunglasses',
      price: 89.95,
      discountPercentage: 0,
      rating: '',
      size: [],
      color: ['orange', 'black', 'brown-light'],
      brand: 'Ann Taylor',
      type: 'accessories',
      images: [
        images[`catalog-16.jpg`],
        images[`catalog-16.jpg`],
        images[`catalog-16.jpg`],
        images[`catalog-16.jpg`],
        images[`catalog-16.jpg`],
      ],
      category: ['new', 'interest', 'all'],
    },
    {
      id: 3,
      article: 164169335,
      title: 'Romper',
      description: 'Green baby romper',
      price: 20.4,
      discountPercentage: 0,
      rating: 4,
      size: ['xs', 's', 'm', 'l', 'xl'],
      color: ['green', 'pink', 'purple'],
      brand: 'Banana Republic',
      type: 'clothes',
      images: [
        images[`catalog-4.jpg`],
        images[`catalog-4.jpg`],
        images[`catalog-4.jpg`],
        images[`catalog-4.jpg`],
        images[`catalog-4.jpg`],
      ],
      category: ['new', 'all'],
    },
    {
      id: 4,
      article: 140168894,
      title: 'Jeans',
      description: 'Mid-rise slim cropped fit jeans',
      price: 40,
      discountPercentage: 0,
      rating: '',
      size: ['xs', 's', 'm', 'l', 'xl'],
      color: ['blue-dark', 'black', 'gray'],
      brand: 'Ann Taylor',
      type: 'clothes',
      images: [
        images[`catalog-2.jpg`],
        images[`catalog-2.jpg`],
        images[`catalog-2.jpg`],
        images[`catalog-2.jpg`],
        images[`catalog-2.jpg`],
      ],
      category: ['new', 'interest', 'all'],
    },
    {
      id: 5,
      article: 103758821,
      title: 'Earrings',
      description: 'Red dangle earrings',
      price: 29.95,
      discountPercentage: 0,
      rating: 5,
      size: [],
      color: ['red-dark', 'red', 'pink', 'purple'],
      brand: 'DolcheVita',
      type: 'accessories',
      images: [
        images[`catalog-6.jpg`],
        images[`catalog-6.jpg`],
        images[`catalog-6.jpg`],
        images[`catalog-6.jpg`],
        images[`catalog-6.jpg`],
      ],
      category: ['new', 'all'],
    },
    {
      id: 6,
      article: 151492427,
      title: 'Baby shoes',
      description: 'Baby shoes with laces',
      price: 30.6,
      discountPercentage: 0,
      rating: '',
      size: [35, 36, 37, 38, 39],
      color: ['white', 'beige'],
      brand: 'NewCap',
      type: 'shoes',
      images: [
        images[`catalog-8.jpg`],
        images[`catalog-8.jpg`],
        images[`catalog-8.jpg`],
        images[`catalog-8.jpg`],
        images[`catalog-8.jpg`],
      ],
      category: ['new', 'all', 'viewed'],
    },
    {
      id: 7,
      article: 166411108,
      title: 'Shirt',
      description: 'Shirt with insertion lace trims',
      price: 49.95,
      discountPercentage: 0,
      rating: 5,
      size: ['xs', 's', 'm', 'l', 'xl'],
      color: ['blue-gray', 'red', 'yellow'],
      brand: 'Ann Taylor',
      type: 'clothes',
      images: [
        images[`catalog-1.jpg`],
        images[`catalog-1.jpg`],
        images[`catalog-1.jpg`],
        images[`catalog-1.jpg`],
        images[`catalog-1.jpg`],
      ],
      category: ['new', 'trend', 'interest', 'all', 'viewed'],
    },
    {
      id: 8,
      article: 113002379,
      title: 'Watch',
      description: 'Chrono classic watch',
      price: 120.6,
      discountPercentage: 0,
      rating: 4,
      size: [],
      color: ['blue-dark', 'black'],
      brand: 'Luxer',
      type: 'accessories',
      images: [
        images[`catalog-7.jpg`],
        images[`catalog-7.jpg`],
        images[`catalog-7.jpg`],
        images[`catalog-7.jpg`],
        images[`catalog-7.jpg`],
      ],
      category: ['new', 'trend', 'all'],
    },
    {
      id: 9,
      article: 190320414,
      title: 'Coat',
      description: 'Coat with colour contrast',
      price: 183.45,
      discountPercentage: 0,
      rating: '',
      size: ['xs', 's', 'm', 'l', 'xl'],
      color: ['black', 'gray'],
      brand: 'Jhon Smith',
      type: 'clothes',
      images: [
        images[`catalog-5.jpg`],
        images[`catalog-5.jpg`],
        images[`catalog-5.jpg`],
        images[`catalog-5.jpg`],
        images[`catalog-5.jpg`],
      ],
      category: ['new', 'trend', 'all', 'viewed'],
    },
    {
      id: 10,
      article: 147140718,
      title: 'Bag',
      description: 'Leather crossbody bag',
      price: 179,
      discountPercentage: 50,
      rating: 5,
      size: [],
      color: ['red-dark', 'beige', 'brown'],
      brand: 'Luxur',
      type: 'accessories',
      images: [
        images[`catalog-11.jpg`],
        images[`catalog-11.jpg`],
        images[`catalog-11.jpg`],
        images[`catalog-11.jpg`],
        images[`catalog-11.jpg`],
      ],
      category: ['sale', 'interest', 'all'],
    },
    {
      id: 11,
      article: 123186238,
      title: 'Jeans',
      description: 'Skinny push-up jeans',
      price: 80,
      discountPercentage: 50,
      rating: '',
      size: ['xs', 's', 'm', 'l', 'xl'],
      color: ['blue-dark', 'black', 'gray'],
      brand: 'Columbus',
      type: 'clothes',
      images: [
        images[`catalog-10.jpg`],
        images[`catalog-10.jpg`],
        images[`catalog-10.jpg`],
        images[`catalog-10.jpg`],
        images[`catalog-10.jpg`],
      ],
      category: ['sale', 'all', 'viewed'],
    },
    {
      id: 12,
      article: 113164046,
      title: 'Boots',
      description: 'Wide heel suede ankle boots',
      price: 148.95,
      sale: true,
      discountPercentage: 20,
      rating: 5,
      size: [36, 37, 38, 39, 40],
      color: ['black', 'brown', 'blue-gray'],
      brand: 'Fred Berry',
      type: 'shoes',
      images: [
        images[`catalog-17.jpg`],
        images[`catalog-17.jpg`],
        images[`catalog-17.jpg`],
        images[`catalog-17.jpg`],
        images[`catalog-17.jpg`],
      ],
      category: ['sale', 'all'],
    },
    {
      id: 13,
      article: 183260098,
      title: 'Sweatshirt',
      description: 'Basic hooded sweatshirt',
      price: 31,
      discountPercentage: 50,
      rating: 4,
      size: ['xs', 's', 'm', 'l', 'xl'],
      color: ['pink', 'blue-gray', 'yellow-light'],
      brand: 'Columbus',
      type: 'clothes',
      images: [
        images[`catalog-9.jpg`],
        images[`catalog-9-1.jpg`],
        images[`catalog-9-2.jpg`],
        images[`catalog-9-3.jpg`],
        images[`catalog-9-4.jpg`],
      ],
      category: ['sale', 'interest', 'all'],
    },
    {
      id: 14,
      article: 130753077,
      title: 'Shoes',
      description: 'Men fashion gray shoes',
      price: 85.5,
      discountPercentage: 0,
      rating: '',
      size: [37, 38, 39, 40, 41],
      color: ['gray', 'white', 'black'],
      brand: 'Conversion',
      type: 'shoes',
      images: [
        images[`catalog-12.jpg`],
        images[`catalog-12.jpg`],
        images[`catalog-12.jpg`],
        images[`catalog-12.jpg`],
        images[`catalog-12.jpg`],
      ],
      category: ['trend', 'all', 'viewed'],
    },
    {
      id: 15,
      article: 136421110,
      title: 'Shorts',
      description: 'Denim shorts',
      price: 24,
      discountPercentage: 20,
      rating: '',
      size: ['xs', 's', 'm', 'l', 'xl'],
      color: ['blue-dark'],
      brand: 'Jhon Smith',
      type: 'clothes',
      images: [
        images[`catalog-13.jpg`],
        images[`catalog-13.jpg`],
        images[`catalog-13.jpg`],
        images[`catalog-13.jpg`],
        images[`catalog-13.jpg`],
      ],
      category: ['sale', 'look', 'all'],
    },
    {
      id: 16,
      article: 106254276,
      title: 'Trenchcoat',
      description: 'Modal-blend trenchcoat',
      price: 18.15,
      discountPercentage: 0,
      rating: 5,
      size: ['xs', 's', 'm', 'l', 'xl'],
      color: ['black', 'white', 'red-dark'],
      brand: 'Jhon Smith',
      type: 'clothes',
      images: [
        images[`catalog-14.jpg`],
        images[`catalog-14.jpg`],
        images[`catalog-14.jpg`],
        images[`catalog-14.jpg`],
        images[`catalog-14.jpg`],
      ],
      category: ['new', 'trend', 'look', 'all'],
    },
    {
      id: 17,
      article: 146175048,
      title: 'Sandals',
      description: 'Leather sandals',
      price: 48,
      discountPercentage: 0,
      rating: 5,
      size: [38, 39, 40, 41, 42],
      color: ['black'],
      brand: 'Conversion',
      type: 'shoes',
      images: [
        images[`catalog-15.jpg`],
        images[`catalog-15.jpg`],
        images[`catalog-15.jpg`],
        images[`catalog-15.jpg`],
        images[`catalog-15.jpg`],
      ],
      category: ['new', 'look', 'all'],
    },
  ],
  posts: [
    {
      title: 'Bag Trends for Summer 2022',
      categories: 'Fashion',
      date: '24 August 2020',
      image: '',
      coments: '',
    },
    {
      title: 'Wardrobe Essentials Everyone Should Own Today',
      categories: 'Celebrity style',
      date: '5 August 2022',
      image: '',
      coments: '',
    },
    {
      title: 'Top 10 of This Season’s Hottest Sneakers',
      categories: 'Lifestyle',
      date: '16 July 2022',
      image: '',
      coments: '',
    },
    {
      title: "Modern Accessories 2022: Why Simple Isn't Easy",
      categories: 'Fashion',
      date: '2 July 2022',
      image: '',
      coments: '',
    },
    {
      title: '14 Items From End-of-Spring Sales Are Sure to Spark Joy',
      categories: 'Designers',
      date: '5 July 2022',
      image: '',
      coments: '',
    },
    {
      title: 'Best Fashion Instagrams of the Week',
      categories: 'Lifestyle',
      date: '9 April 2022',
      image: '',
      coments: '',
    },
    {
      title: 'Top 10 Looks from the Venice Film Festival',
      categories: 'Fashion',
      date: '12 March 2022',
      image: '',
      coments: '',
    },
  ],
};

export default data;
