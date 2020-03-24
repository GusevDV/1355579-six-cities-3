import React from "react";
import renderer from "react-test-renderer";
import PlaceCardList from "./place-card-list.jsx";
import Offers from '../../test-mocks/offers.js';
import {BrowserRouter} from 'react-router-dom';

it(`Should PlaceCardList component render correctly`, () => {

  const render = renderer.create(
      <BrowserRouter>
        <PlaceCardList
          offers={Offers}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
      </BrowserRouter>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
