import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {CityNames} from '../../../const.js';

const mockStore = configureStore([]);

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
    city: `Amsterdam`,
    coords: [52.3909553943508, 4.85309666406198]
  }
];

const store = mockStore({
  offers: Offers,
  city: CityNames.AMSTERDAM
});

it(`Should Main component render correctly`, () => {

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            offers={Offers}
            onTitleLinkClick={() => {}}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`section`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Main component empty content render correctly`, () => {

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            offers={[]}
            onTitleLinkClick={() => {}}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`section`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
