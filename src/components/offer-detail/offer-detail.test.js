import React from "react";
import renderer from "react-test-renderer";
import {OfferDetail} from "./offer-detail.jsx";
import {BrowserRouter} from 'react-router-dom';
import offers from '../../test-mocks/offers.js';
import reviews from '../../test-mocks/reviews.js';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AuthStatus} from '../../../const.js';

const mockStore = configureStore([]);

const store = mockStore({
  user: {
    authorizationStatus: AuthStatus.NO_AUTH,
    data: []
  }
});

it(`Should Main component render correctly with reviews AUTH`, () => {

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <OfferDetail
            offerId={`1`}
            offer={offers[0]}
            reviews={{
              data: reviews,
              isLoading: false,
              isErrorFetchReview: false,
              isErrorCreateReview: false,
            }}
            nearbyOffers={{
              data: offers.slice(0, 3),
              isLoading: false,
              isError: false,
            }}
            fetchReviews={()=>{}}
            fetchNearbyOffers={()=>{}}
            isAuthorized={true}
            onCreateReview={()=>{}}
            onChangeFavoriteStatus={()=>{}}
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

it(`Should Main component render correctly with reviews NO_AUTH`, () => {

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <OfferDetail
            offerId={`1`}
            offer={offers[0]}
            reviews={{
              data: reviews,
              isLoading: false,
              isErrorFetchReview: false,
              isErrorCreateReview: false,
            }}
            nearbyOffers={{
              data: offers.slice(0, 3),
              isLoading: false,
              isError: false,
            }}
            fetchReviews={()=>{}}
            fetchNearbyOffers={()=>{}}
            isAuthorized={false}
            onCreateReview={()=>{}}
            onChangeFavoriteStatus={()=>{}}
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

it(`Should Main component render correctly with loading reviews and nearby offers`, () => {

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <OfferDetail
            offerId={`1`}
            offer={offers[0]}
            reviews={{
              data: [],
              isLoading: true,
              isErrorFetchReview: false,
              isErrorCreateReview: false,
            }}
            nearbyOffers={{
              data: offers.slice(0, 3),
              isLoading: true,
              isError: false,
            }}
            fetchReviews={()=>{}}
            fetchNearbyOffers={()=>{}}
            isAuthorized={true}
            onCreateReview={()=>{}}
            onChangeFavoriteStatus={()=>{}}
          />
        </BrowserRouter></Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`section`);
        }
      })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Main component render correctly with errors`, () => {

  const tree = renderer.create(
      <Provider store={store}> <BrowserRouter>
        <OfferDetail
          offerId={`1`}
          offer={offers[0]}
          reviews={{
            data: [],
            isLoading: false,
            isErrorFetchReview: true,
            isErrorCreateReview: true,
          }}
          nearbyOffers={{
            data: offers.slice(0, 3),
            isLoading: false,
            isError: true,
          }}
          fetchReviews={()=>{}}
          fetchNearbyOffers={()=>{}}
          isAuthorized={true}
          onCreateReview={()=>{}}
          onChangeFavoriteStatus={()=>{}}
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
