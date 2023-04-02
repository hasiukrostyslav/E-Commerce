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
      wishlist: [],
      viewed: [],
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
      size: ['s', 'm', 'l'],
      color: ['black', 'white', 'gray'],
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
      size: [35, 36, 37, 38, 39],
      color: ['white', 'beige', 'gray'],
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
      size: [],
      color: ['blue-dark', 'black', 'brown'],
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
      size: ['xs', 's', 'm', 'l', 'xl'],
      color: ['black', 'gray', 'blue-dark'],
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
      size: ['xs', 's', 'm', 'l', 'xl'],
      color: ['blue-dark', 'blue-gray', 'black'],
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
      size: [38, 39, 40, 41, 42],
      color: ['black', 'gray', 'brown-light'],
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
      title: '14 Items From End-of-Spring Sales Are Sure to Spark Joy',
      categories: 'Designers',
      date: '2022-07-05T13:26:17.000Z',
      images: [images[`blog-5.jpg`], images[`blog-5-sm.jpg`]],
      comments: [
        {
          user: 'Devon Lane',
          date: '2023-02-20T13:26:17.000Z',
          text: 'Phasellus varius faucibus ultrices odio in. Massa neque dictum natoque ornare rutrum malesuada et phasellus. Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.',
        },

        {
          user: 'Albert Flores',
          date: '2023-03-07T09:13:10.000Z',
          text: 'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc. Fames faucibus nisl duis id diam.',
        },
        {
          user: 'Marvin McKinney',
          date: '2023-03-28T08:13:10.000Z',
          text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
        },
      ],
      featuredPost: true,
      text: 'Vulputate vitae pellentesque scelerisque luctus consequat mattis pellentesque dui odio. Interdum aenean sit viverra amet,malesuada ornare sed gravida rhoncus, congue. Purus auctor nullam diam quis est hendrerit ac euismod...',
    },
    {
      title: 'Best Fashion Instagrams of the Week',
      categories: 'Celebrity style',
      date: '2022-04-09T13:26:17.000Z',
      images: [images[`blog-6.jpg`], images[`blog-6-sm.jpg`]],
      comments: [],
      featuredPost: true,
      text: 'Sollicitudin et nec congue magna quis commodo quis luctus risus. Dolor, dignissim semper faucibus quisque massa ut enim. Turpis viverra mattis semper pellentesque facilisis. Ut id eget sagittis lectus...',
    },
    {
      title: 'Top 10 Looks from the Venice Film Festival',
      categories: 'Celebrity style',
      date: '2022-03-12T13:26:17.000Z',
      images: [images[`blog-7.jpg`], images[`blog-7-sm.jpg`]],
      comments: [
        {
          user: 'Annette Black',
          date: '2023-03-13T09:13:10.000Z',
          text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
          tag: '@Devon Lane',
        },
        {
          user: 'Albert Flores',
          date: '2023-03-17T09:13:10.000Z',
          text: 'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc. Fames faucibus nisl duis id diam.',
        },
        {
          user: 'Marvin McKinney',
          date: '2023-03-28T08:13:10.000Z',
          text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
        },
      ],
      featuredPost: true,
      text: 'Vulputate vitae pellentesque scelerisque luctus consequat mattis pellentesque dui odio. Interdum aenean sit viverra amet,malesuada ornare sed gravida rhoncus, congue. Purus auctor nullam diam quis est hendrerit ac euismod...',
    },
    {
      title: '4 Ways to Wear a Polo T-shirt',
      categories: 'Lifestyle',
      date: '2022-02-27T13:26:17.000Z',
      images: [images[`blog-8.jpg`]],
      comments: [
        {
          user: 'Devon Lane',
          date: '2023-02-20T13:26:17.000Z',
          text: 'Phasellus varius faucibus ultrices odio in. Massa neque dictum natoque ornare rutrum malesuada et phasellus. Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.',
        },
        {
          user: 'Annette Black',
          date: '2023-03-01T09:13:10.000Z',
          text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
          tag: '@Devon Lane',
        },
        {
          user: 'Albert Flores',
          date: '2023-03-07T09:13:10.000Z',
          text: 'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc. Fames faucibus nisl duis id diam.',
        },
        {
          user: 'Marvin McKinney',
          date: '2023-03-28T08:13:10.000Z',
          text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
        },
      ],
      featuredPost: false,
      text: 'Tellus sed morbi massa quis sed. Faucibus tincidunt magna enim ultricies fringilla at rhoncus, hac. Sollicitudin et nec congue magna quis commodo quis luctus risus. Dolor, dignissim semper faucibus quisque massa ut enim...',
    },
    {
      title: "What Men's Shoes will be in Fashion in the Spring-Summer of 2023",
      categories: 'Designers',
      date: '2022-10-19T13:26:17.000Z',
      images: [images[`blog-9.jpg`]],
      comments: [],
      featuredPost: false,
      text: 'Mauris tincidunt sollicitudin tristique odio eget volutpat. Fringilla viverra amet, mi interdum blandit. Tellus sed morbi massa quis sed. Faucibus tincidunt magna enim ultricies fringilla at rhoncus, hac...',
    },
    {
      title: 'Luxe Gifts Everyone Will Love',
      categories: 'Lifestyle',
      date: '2022-12-01T13:26:17.000Z',
      images: [images[`blog-10.jpg`]],
      comments: [
        {
          user: 'Devon Lane',
          date: '2023-02-20T13:26:17.000Z',
          text: 'Phasellus varius faucibus ultrices odio in. Massa neque dictum natoque ornare rutrum malesuada et phasellus. Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.',
        },
        {
          user: 'Annette Black',
          date: '2023-03-01T09:13:10.000Z',
          text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
          tag: '@Devon Lane',
        },
      ],
      featuredPost: false,
      text: 'Vulputate vitae pellentesque scelerisque luctus consequat mattis pellentesque dui odio. Interdum aenean sit viverra amet,malesuada ornare sed gravida rhoncus, congue. Purus auctor nullam diam quis est hendrerit ac euismod...',
    },
    {
      title: 'Where Fashion Gets Easy',
      categories: 'Lifestyle',
      date: '2022-06-10T13:26:17.000Z',
      images: [images[`blog-11.jpg`]],
      comments: [
        {
          user: 'Devon Lane',
          date: '2023-02-20T13:26:17.000Z',
          text: 'Phasellus varius faucibus ultrices odio in. Massa neque dictum natoque ornare rutrum malesuada et phasellus. Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.',
        },

        {
          user: 'Marvin McKinney',
          date: '2023-03-28T08:13:10.000Z',
          text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
        },
      ],
      featuredPost: false,
      text: 'Sollicitudin et nec congue magna quis commodo quis luctus risus. Dolor, dignissim semper faucibus quisque massa ut enim. Turpis viverra mattis semper pellentesque facilisis. Ut id eget sagittis lectus...',
    },
    {
      title: 'What is Influencer Marketing? – The Ultimate Guide for 2023',
      categories: 'Fashion',
      date: '2022-07-28T13:26:17.000Z',
      images: [images[`blog-12.jpg`]],
      comments: [],
      featuredPost: false,
      text: 'Mauris tincidunt sollicitudin tristique odio eget volutpat. Fringilla viverra amet, mi interdum blandit. Tellus sed morbi massa quis sed. Faucibus tincidunt magna enim ultricies fringilla at rhoncus, hac...',
    },
    {
      title: 'A Must Have Dupe for Those Sell Out Classic Shoes',
      categories: 'Lifestyle',
      date: '2023-01-15T13:26:17.000Z',
      images: [images[`blog-13.jpg`]],
      comments: [
        {
          user: 'Devon Lane',
          date: '2023-02-20T13:26:17.000Z',
          text: 'Phasellus varius faucibus ultrices odio in. Massa neque dictum natoque ornare rutrum malesuada et phasellus. Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.',
        },
      ],
      featuredPost: false,
      text: 'Vulputate vitae pellentesque scelerisque luctus consequat mattis pellentesque dui odio. Interdum aenean sit viverra amet,malesuada ornare sed gravida rhoncus, congue. Purus auctor nullam diam quis est hendrerit ac euismod...',
    },
    {
      title: 'The New Fashion Rules for 2022 & Beyond',
      categories: 'Designers',
      date: '2022-09-13T13:26:17.000Z',
      images: [images[`blog-14.jpg`]],
      comments: [],
      featuredPost: false,
      text: 'Sollicitudin et nec congue magna quis commodo quis luctus risus. Dolor, dignissim semper faucibus quisque massa ut enim. Turpis viverra mattis semper pellentesque facilisis. Ut id eget sagittis lectus...',
    },
    {
      title: 'Summer Outfits & Makeup ',
      categories: 'Lifestyle',
      date: '2022-11-07T13:26:17.000Z',
      images: [images[`blog-15.jpg`]],
      comments: [],
      featuredPost: false,
      text: 'Mauris tincidunt sollicitudin tristique odio eget volutpat. Fringilla viverra amet, mi interdum blandit. Tellus sed morbi massa quis sed. Faucibus tincidunt magna enim ultricies fringilla at rhoncus, hac...',
    },
    {
      title: 'Where to Find Must Have Accessories for Spring Summer',
      categories: 'Fashion',
      date: '2022-08-02T13:26:17.000Z',
      images: [images[`blog-16.jpg`]],
      comments: [],
      featuredPost: false,
      text: 'Vulputate vitae pellentesque scelerisque luctus consequat mattis pellentesque dui odio. Interdum aenean sit viverra amet,malesuada ornare sed gravida rhoncus, congue. Purus auctor nullam diam quis est hendrerit ac euismod...',
    },
    {
      title: "Modern Accessories 2022: Why Simple Isn't Easy",
      categories: 'Fashion',
      date: '2023-01-12T13:26:17.000Z',
      images: [images[`blog-4.jpg`]],
      comments: [
        {
          user: 'Albert Flores',
          date: '2023-03-07T09:13:10.000Z',
          text: 'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc. Fames faucibus nisl duis id diam.',
        },
        {
          user: 'Marvin McKinney',
          date: '2023-03-28T08:13:10.000Z',
          text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
        },
      ],
      featuredPost: false,
      text: 'Tellus sed morbi massa quis sed. Faucibus tincidunt magna enim ultricies fringilla at rhoncus, hac. Sollicitudin et nec congue magna quis commodo quis luctus risus. Dolor, dignissim semper faucibus quisque massa ut enim...',
    },
    {
      title: 'Top 10 of This Season’s Hottest Sneakers',
      categories: 'Lifestyle',
      date: '2023-02-20T13:26:17.000Z',
      images: [images[`blog-2.jpg`]],
      comments: [
        {
          user: 'Devon Lane',
          date: '2023-02-20T13:26:17.000Z',
          text: 'Phasellus varius faucibus ultrices odio in. Massa neque dictum natoque ornare rutrum malesuada et phasellus. Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.',
        },
        {
          user: 'Annette Black',
          date: '2023-03-01T09:13:10.000Z',
          text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
          tag: '@Devon Lane',
        },
        {
          user: 'Albert Flores',
          date: '2023-03-07T09:13:10.000Z',
          text: 'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc. Fames faucibus nisl duis id diam.',
        },
        {
          user: 'Marvin McKinney',
          date: '2023-03-28T08:13:10.000Z',
          text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
        },
      ],
      featuredPost: false,
      text: 'Sollicitudin et nec congue magna quis commodo quis luctus risus. Dolor, dignissim semper faucibus quisque massa ut enim. Turpis viverra mattis semper pellentesque facilisis. Ut id eget sagittis lectus...',
    },
    {
      title: 'Wardrobe Essentials Everyone Should Own Today',
      categories: 'Lifestyle',
      date: '2023-03-09T13:26:17.000Z',
      images: [images[`blog-3.jpg`]],
      comments: [
        {
          user: 'Marvin McKinney',
          date: '2023-03-28T08:13:10.000Z',
          text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
        },
      ],
      featuredPost: false,
      text: 'Mauris tincidunt sollicitudin tristique odio eget volutpat. Fringilla viverra amet, mi interdum blandit. Tellus sed morbi massa quis sed. Faucibus tincidunt magna enim ultricies fringilla at rhoncus, hac...',
    },
    {
      title: 'Bag Trends for Summer 2023',
      categories: 'Fashion',
      date: '2023-04-01T13:26:17.000Z',
      images: [images[`blog-1.jpg`]],
      comments: [],
      featuredPost: false,
      text: 'Vulputate vitae pellentesque scelerisque luctus consequat mattis pellentesque dui odio. Interdum aenean sit viverra amet,malesuada ornare sed gravida rhoncus, congue. Purus auctor nullam diam quis est hendrerit ac euismod...',
    },
  ],
  reviews: [
    {
      article: 183260098,
      user: 'Devon Lane',
      date: '2022-12-15T13:26:17.000Z',
      rating: 5,
      likes: 2,
      dislikes: 0,
      text: 'Phasellus varius faucibus ultrices odio in. Massa neque dictum natoque ornare rutrum malesuada et phasellus. Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.',
    },
    {
      article: 183260098,
      user: 'Annette Black',
      date: '2023-03-24T09:13:10.000Z',
      rating: 4,
      likes: 2,
      dislikes: 1,
      text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
      tag: '@Devon Lane',
    },
    {
      article: 183260098,
      user: 'Albert Flores',
      date: '2023-02-07T09:13:10.000Z',
      rating: 1,
      likes: 0,
      dislikes: 3,
      text: 'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc. Fames faucibus nisl duis id diam.',
    },
    {
      article: 183260098,
      user: 'Marvin McKinney',
      date: '2022-07-28T08:13:10.000Z',
      rating: 5,
      likes: 3,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 183260098,
      user: 'Iryna Smith',
      date: '2023-01-05T09:13:10.000Z',
      rating: 3,
      likes: 0,
      dislikes: 3,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Libero commodo sit dui ac proin.',
    },
    {
      article: 183260098,
      user: 'Adam Nedved',
      date: '2022-08-17T08:13:10.000Z',
      rating: 2,
      likes: 0,
      dislikes: 0,
      text: 'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc. Fames faucibus nisl duis id diam.',
    },
    {
      article: 183260098,
      user: 'May Simpson',
      date: '2023-03-01T09:13:10.000Z',
      rating: 5,
      likes: 2,
      dislikes: 0,
      text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
    },
    {
      article: 183260098,
      user: 'Hanna Flowers',
      date: '2022-12-28T09:13:10.000Z',
      rating: 4,
      likes: 0,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus.',
    },
    {
      article: 183260098,
      user: 'Alex Moon',
      date: '2022-04-10T08:13:10.000Z',
      rating: 5,
      likes: 1,
      dislikes: 2,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 183260098,
      user: 'Kateryna James',
      date: '2022-04-24T08:13:10.000Z',
      rating: 5,
      likes: 5,
      dislikes: 0,
      text: 'Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.',
    },
    {
      article: 183260098,
      user: 'Rostyslav Hasiuk',
      date: '2022-09-01T08:13:10.000Z',
      rating: 5,
      likes: 2,
      dislikes: 1,
      text: 'Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 183260098,
      user: 'Maria Shevchenko',
      date: '2023-02-14T09:13:10.000Z',
      rating: 5,
      likes: 1,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 146175048,
      user: 'Rostyslav Hasiuk',
      date: '2022-02-24T09:13:10.000Z',
      rating: 5,
      likes: 1,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 146175048,
      user: 'Alex Moon',
      date: '2022-02-24T19:18:13.000Z',
      rating: 5,
      likes: 1,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 106254276,
      user: 'Rostyslav Hasiuk',
      date: '2022-03-04T07:38:10.000Z',
      rating: 5,
      likes: 1,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 113164046,
      user: 'Alex Moon',
      date: '2023-01-11T15:48:27.000Z',
      rating: 5,
      likes: 2,
      dislikes: 0,
      text: 'Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 147140718,
      user: 'May Simpson',
      date: '2023-03-01T09:13:10.000Z',
      rating: 5,
      likes: 2,
      dislikes: 0,
      text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
    },
    {
      article: 147140718,
      user: 'Hanna Flowers',
      date: '2022-12-28T09:13:10.000Z',
      rating: 5,
      likes: 0,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus.',
    },
    {
      article: 147140718,
      user: 'Alex Moon',
      date: '2022-04-10T08:13:10.000Z',
      rating: 5,
      likes: 1,
      dislikes: 2,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 147140718,
      user: 'Kateryna James',
      date: '2022-04-24T08:13:10.000Z',
      rating: 5,
      likes: 5,
      dislikes: 0,
      text: 'Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.',
    },
    {
      article: 113002379,
      user: 'Iryna Smith',
      date: '2023-01-05T09:13:10.000Z',
      rating: 5,
      likes: 0,
      dislikes: 3,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Libero commodo sit dui ac proin.',
    },
    {
      article: 113002379,
      user: 'Adam Nedved',
      date: '2022-08-17T08:13:10.000Z',
      rating: 3,
      likes: 0,
      dislikes: 0,
      text: 'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc. Fames faucibus nisl duis id diam.',
    },
    {
      article: 113002379,
      user: 'May Simpson',
      date: '2023-03-01T09:13:10.000Z',
      rating: 5,
      likes: 2,
      dislikes: 0,
      text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
    },
    {
      article: 113002379,
      user: 'Hanna Flowers',
      date: '2022-12-28T09:13:10.000Z',
      rating: 3,
      likes: 0,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus.',
    },
    {
      article: 113002379,
      user: 'Alex Moon',
      date: '2022-04-10T08:13:10.000Z',
      rating: 4,
      likes: 1,
      dislikes: 2,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 113002379,
      user: 'Kateryna James',
      date: '2022-04-24T08:13:10.000Z',
      rating: 5,
      likes: 5,
      dislikes: 0,
      text: 'Viverra natoque nulla cras vel nisl proin senectus. Tortor sed eleifend ante tristique felis sed urna aliquet. Suspendisse fames egestas sed duis purus diam et.',
    },
    {
      article: 166411108,
      user: 'Annette Black',
      date: '2023-03-24T09:13:10.000Z',
      rating: 5,
      likes: 2,
      dislikes: 1,
      text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
      tag: '@Devon Lane',
    },
    {
      article: 166411108,
      user: 'Albert Flores',
      date: '2023-02-07T09:13:10.000Z',
      rating: 1,
      likes: 0,
      dislikes: 3,
      text: 'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc. Fames faucibus nisl duis id diam.',
    },
    {
      article: 166411108,
      user: 'Marvin McKinney',
      date: '2022-07-28T08:13:10.000Z',
      rating: 5,
      likes: 3,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 166411108,
      user: 'Iryna Smith',
      date: '2023-01-05T09:13:10.000Z',
      rating: 3,
      likes: 0,
      dislikes: 3,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Libero commodo sit dui ac proin.',
    },
    {
      article: 166411108,
      user: 'Adam Nedved',
      date: '2022-08-17T08:13:10.000Z',
      rating: 5,
      likes: 0,
      dislikes: 0,
      text: 'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc. Fames faucibus nisl duis id diam.',
    },
    {
      article: 166411108,
      user: 'May Simpson',
      date: '2023-03-01T09:13:10.000Z',
      rating: 5,
      likes: 2,
      dislikes: 0,
      text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
    },
    {
      article: 166411108,
      user: 'Hanna Flowers',
      date: '2022-12-28T09:13:10.000Z',
      rating: 4,
      likes: 0,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus.',
    },
    {
      article: 166411108,
      user: 'Alex Moon',
      date: '2022-07-18T12:27:10.000Z',
      rating: 5,
      likes: 1,
      dislikes: 2,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 103758821,
      user: 'May Simpson',
      date: '2023-03-01T09:13:10.000Z',
      rating: 5,
      likes: 2,
      dislikes: 0,
      text: 'Egestas fermentum natoque sollicitudin mauris. Facilisis praesent urna sed rhoncus quis pharetra pellentesque erat sagittis.',
    },
    {
      article: 164169335,
      user: 'Hanna Flowers',
      date: '2022-12-28T09:13:10.000Z',
      rating: 4,
      likes: 0,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus.',
    },
    {
      article: 164169335,
      user: 'Alex Moon',
      date: '2022-04-10T08:13:10.000Z',
      rating: 4,
      likes: 1,
      dislikes: 2,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
    {
      article: 151253984,
      user: 'Rostyslav Hasiuk',
      date: '2022-02-24T09:13:10.000Z',
      rating: 5,
      likes: 1,
      dislikes: 0,
      text: 'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit consequat erat libero, tincidunt. Eros ut aliquam proin et duis. Mauris, egestas congue nibh dui a nulla.',
    },
  ],
};

export default data;
