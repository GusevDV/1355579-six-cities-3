import React from "react";
import renderer from "react-test-renderer";
import offers from '../../test-mocks/offers.js';
import PlaceCardListNearby from "./place-card-list-nearby.jsx";
import {BrowserRouter} from 'react-router-dom';

it(`Should PlaceCardListNearby component render correctly`, () => {

  const render = renderer.create(
      <BrowserRouter>
        <PlaceCardListNearby
          nearbyOffers={offers.slice(0, 3)}
          onFavoriteClick={()=>{}}
        />
      </BrowserRouter>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
