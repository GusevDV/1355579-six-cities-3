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
          fetchReviews={()=>{}}
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

it(`Should Main component render correctly with loading reviews`, () => {

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
          fetchReviews={()=>{}}
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

it(`Should Main component render correctly with reviews error`, () => {

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
          fetchReviews={()=>{}}
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
