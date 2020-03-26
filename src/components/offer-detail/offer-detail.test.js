import React from "react";
import renderer from "react-test-renderer";
import {OfferDetail} from "./offer-detail.jsx";
import {BrowserRouter} from 'react-router-dom';
import offers from '../../test-mocks/offers.js';
import reviews from '../../test-mocks/reviews.js';

it(`Should Main component render correctly with reviews`, () => {

  const tree = renderer.create(
      <BrowserRouter>
        <OfferDetail
          offerId={`1`}
          offer={offers[0]}
          reviews={{
            data: reviews,
            isLoading: false,
            isError: false,
          }}
          nearbyOffers={{
            data: offers.slice(0, 3),
            isLoading: false,
            isError: false,
          }}
          fetchReviews={()=>{}}
          fetchNearbyOffers={()=>{}}
        />
      </BrowserRouter>,
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
      <BrowserRouter>
        <OfferDetail
          offerId={`1`}
          offer={offers[0]}
          reviews={{
            data: [],
            isLoading: true,
            isError: false,
          }}
          nearbyOffers={{
            data: offers.slice(0, 3),
            isLoading: true,
            isError: false,
          }}
          fetchReviews={()=>{}}
          fetchNearbyOffers={()=>{}}
        />
      </BrowserRouter>,
      {
        createNodeMock: () => {
          return document.createElement(`section`);
        }
      })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Main component render correctly with reviews and nearby offers error`, () => {

  const tree = renderer.create(
      <BrowserRouter>s
        <OfferDetail
          offerId={`1`}
          offer={offers[0]}
          reviews={{
            data: [],
            isLoading: false,
            isError: true,
          }}
          nearbyOffers={{
            data: offers.slice(0, 3),
            isLoading: false,
            isError: true,
          }}
          fetchReviews={()=>{}}
          fetchNearbyOffers={()=>{}}
        />
      </BrowserRouter>,
      {
        createNodeMock: () => {
          return document.createElement(`section`);
        }
      })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
