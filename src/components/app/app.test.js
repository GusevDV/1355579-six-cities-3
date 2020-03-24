import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {Provider} from "react-redux";
import Offers from '../../test-mocks/offers.js';

const mockStore = configureStore([]);

it(`Should App component render correctly when offers is loaded with success`, () => {

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

  const render = renderer.create(
      <Provider store={store}><App /></Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`section`);
        }
      }
  ).toJSON();

  expect(render).toMatchSnapshot();
});

it(`Should App component render correctly when offers is fetching`, () => {

  const store = mockStore({
    offers: {
      data: Offers,
      isLoading: true,
      isError: false,
    },
    city: {
      currentCity: Offers[0].city,
      coords: Offers[0].cityCoords,
      zoom: Offers[0].cityZoom,
    }
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

it(`Should App component render correctly when offers is loaded with error`, () => {

  const store = mockStore({
    offers: {
      data: [],
      isLoading: false,
      isError: true,
    },
    city: {
      currentCity: Offers[0].city,
      coords: Offers[0].cityCoords,
      zoom: Offers[0].cityZoom,
    }
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
