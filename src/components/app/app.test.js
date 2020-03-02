import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
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

it(`Should App component render correctly`, () => {

  const store = mockStore({
    offers: Offers,
    city: CityNames.AMSTERDAM
  });

  const render = renderer.create(
      <Provider store={store}><App onTitleLinkClick={() => {}}/></Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`section`);
        }
      }
  ).toJSON();

  expect(render).toMatchSnapshot();
});
