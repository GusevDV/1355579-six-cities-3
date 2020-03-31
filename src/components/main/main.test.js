import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {BrowserRouter} from 'react-router-dom';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import offers from '../../test-mocks/offers.js';
import {AuthStatus} from '../../../const.js';

const mockStore = configureStore([]);

let store = mockStore({
  offers: {
    data: offers,
    isLoading: false,
    isError: false,
    sortType: 0
  },
  nearbyOffers: {
    data: offers,
    isLoading: false,
    isError: false
  },
  city: {
    currentCity: offers[0].city,
    coords: offers[0].cityCoords,
    zoom: offers[0].cityZoom
  },
  reviews: {
    data: [],
    isLoading: true,
    isError: false
  },
  user: {
    authorizationStatus: AuthStatus.NO_AUTH,
    data: []
  }
});

it(`Should Main component render correctly`, () => {

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

it(`Should Main component render correctly with empty offers`, () => {

  store = mockStore({
    offers: {
      data: [],
      isLoading: false,
      isError: false,
      sortType: 0
    },
    nearbyOffers: {
      data: offers,
      isLoading: false,
      isError: false
    },
    city: {
      currentCity: offers[0].city,
      coords: offers[0].cityCoords,
      zoom: offers[0].cityZoom
    },
    reviews: {
      data: [],
      isLoading: true,
      isError: false
    },
    user: {
      authorizationStatus: AuthStatus.NO_AUTH,
      data: []
    }
  });

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
