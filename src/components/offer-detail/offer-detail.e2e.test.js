import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {OfferDetail} from "./offer-detail.jsx";
import offers from '../../test-mocks/offers.js';
import reviews from '../../test-mocks/reviews.js';
import {BrowserRouter} from 'react-router-dom';
import configureStore from "redux-mock-store";
import {AuthStatus} from '../../const.js';
import {Provider} from "react-redux";

Enzyme.configure({
  adapter: new Adapter(),
});
const mockStore = configureStore([]);

const store = mockStore({
  user: {
    authorizationStatus: AuthStatus.NO_AUTH,
    data: []
  }
});

it(`Should onChangeFavoriteStatus be called`, () => {
  const onChangeFavoriteStatus = jest.fn();

  const main = mount(
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
            onChangeFavoriteStatus={onChangeFavoriteStatus}
          />
        </BrowserRouter>
      </Provider>
  );

  const button = main.find(`.place-card__bookmark-button`).first();

  button.simulate(`click`);

  expect(onChangeFavoriteStatus).toHaveBeenCalledTimes(1);
  expect(onChangeFavoriteStatus).toHaveBeenCalledWith(1, true);

});

it(`Should fetchReviews and fetchNearbyOffers be called`, () => {
  const fetchReviews = jest.fn();
  const fetchNearbyOffers = jest.fn();
  mount(
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
            fetchReviews={fetchReviews}
            fetchNearbyOffers={fetchNearbyOffers}
            isAuthorized={true}
            onCreateReview={()=>{}}
            onChangeFavoriteStatus={() => {}}
          />
        </BrowserRouter>
      </Provider>
  );

  expect(fetchReviews).toHaveBeenCalledWith(`1`);
  expect(fetchNearbyOffers).toHaveBeenCalledWith(`1`);

});

it(`Should onCreateReview be called`, () => {
  const onCreateReview = jest.fn();

  const main = mount(
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
            onCreateReview={onCreateReview}
            onChangeFavoriteStatus={() => {}}
          />
        </BrowserRouter>
      </Provider>
  );

  const form = main.find(`.reviews__form`);

  form.simulate(`submit`);

  expect(onCreateReview).toHaveBeenCalledTimes(1);

});
