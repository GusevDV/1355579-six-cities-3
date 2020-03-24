import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";
import {BrowserRouter} from 'react-router-dom';
import Offers from '../../test-mocks/offers.js';

it(`Should PlaceCard component render correctly`, () => {

  const render = renderer.create(
      <BrowserRouter>
        <PlaceCard
          offer={Offers[0]}
          onTitleLinkClick={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
      </BrowserRouter>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
