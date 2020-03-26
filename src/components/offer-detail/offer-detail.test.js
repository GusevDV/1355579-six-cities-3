import React from "react";
import renderer from "react-test-renderer";
import {OfferDetail} from "./offer-detail.jsx";
import {BrowserRouter} from 'react-router-dom';
import offers from '../../test-mocks/offers.js';

it(`Should Main component render correctly`, () => {

  const tree = renderer.create(
      <BrowserRouter>
        <OfferDetail
          offerId={`1`}
          offer={offers[0]}
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

