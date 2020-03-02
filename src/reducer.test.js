import {reducer, ActionCreators, ActionTypes} from "./reducer.js";
import {CityNames} from '../const.js';

const Offers = [
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
  },
  {
    id: 5,
    title: `Apartment 5`,
    price: 199,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-02.jpg`,
    objectType: `apartment`,
    isPremium: false,
    rating: 70,
    city: CityNames.PARIS,
    coords: [48.8647553943508, 2.349009666406198]
  }
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    city: CityNames.AMSTERDAM,
    offers: Offers,
  });
});

it(`Reducer should set offers by a given value`, () => {
  expect(reducer({
    offers: [],
    city: ``,
  }, ActionCreators.setOffers(`offers`))).toEqual({
    offers: `offers`,
    city: ``,
  });
});

it(`Reducer should change city by a given value`, () => {
  expect(reducer({
    offers: [],
    city: ``,
  }, ActionCreators.changeCity(`city`))).toEqual({
    offers: [],
    city: `city`,
  });
});

describe(`Action creators work correctly`, () => {

  it(`Action creator for changeCity returns correct action`, () => {
    expect(ActionCreators.changeCity(`city`)).toEqual({
      type: ActionTypes.CHANGE_CITY,
      payload: `city`
    });
  });

  it(`Action creator for setOffers returns correct action`, () => {
    expect(ActionCreators.setOffers(`offers`)).toEqual({
      type: ActionTypes.SET_OFFERS,
      payload: `offers`
    });
  });
});
