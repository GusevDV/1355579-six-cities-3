import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {CityNames} from '../../../const.js';
import Offers from '../../test-mocks/offers.js';

const mockStore = configureStore([]);

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
