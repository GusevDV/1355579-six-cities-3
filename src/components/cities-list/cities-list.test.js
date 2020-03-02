import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "./cities-list.jsx";
import {CityNames} from '../../../const.js';

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
    city: `Amsterdam`,
    coords: [52.3909553943508, 4.85309666406198]
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
    city: `Paris`,
    coords: [52.3909553943508, 4.85309666406198]
  }
];

it(`Should CitiesList render correctly`, () => {
  const tree = renderer
    .create(<CitiesList
      offers={Offers}
      onCityLinkClick = {() => {}}
      currentCity={CityNames.AMSTERDAM}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
