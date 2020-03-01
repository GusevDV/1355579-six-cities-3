import {CityNames} from '../../const.js';

export default [
  {
    id: 1,
    title: `Apartment 1`,
    price: 100,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-01.jpg`,
    objectType: `apartment`,
    isPremium: false,
    rating: 50,
    city: CityNames.AMSTERDAM,
    coords: [52.3909553943508, 4.85309666406198],
  },
  {
    id: 2,
    title: `Apartment 2`,
    price: 200,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-02.jpg`,
    objectType: `apartment`,
    isPremium: true,
    rating: 80,
    city: CityNames.AMSTERDAM,
    coords: [52.369553943508, 4.85309666406198],
  },
  {
    id: 3,
    title: `Apartment 3`,
    price: 250,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-01.jpg`,
    objectType: `apartment`,
    isPremium: true,
    rating: 95,
    city: CityNames.AMSTERDAM,
    coords: [52.3909553943508, 4.929309666406198]
  },
  {
    id: 4,
    title: `Apartment 4`,
    price: 199,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-02.jpg`,
    objectType: `apartment`,
    isPremium: false,
    rating: 70,
    city: CityNames.AMSTERDAM,
    coords: [52.3809553943508, 4.939309666406198]
  }
];

