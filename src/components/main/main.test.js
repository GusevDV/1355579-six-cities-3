import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {BrowserRouter} from 'react-router-dom';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Offers from '../../test-mocks/offers.js';

const mockStore = configureStore([]);

const store = mockStore({
  offers: {
    data: Offers,
    isLoading: false,
    isError: false,
  },
  city: {
    currentCity: Offers[0].city,
    coords: Offers[0].cityCoords,
    zoom: Offers[0].cityZoom,
  }
});

it(`Should Main component render correctly`, () => {

  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <Main
              offers={Offers}
              onTitleLinkClick={() => {}}
            />
          </BrowserRouter>
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
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`section`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
