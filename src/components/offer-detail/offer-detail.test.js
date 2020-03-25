import React from "react";
import renderer from "react-test-renderer";
import OfferDetail from "./offer-detail.jsx";
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
  }
});

it(`Should Main component render correctly`, () => {

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <OfferDetail
            offerId={`1`}
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

