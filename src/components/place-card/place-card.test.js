import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";
import Offers from '../../mocks/offers.js';

it(`Should PlaceCard component render correctly`, () => {

  const render = renderer.create(
      <PlaceCard
        offer={Offers[0]}
        onTitleLinkClick={() => {}}
        onCardHover={() => {}}
        onCardMouseLeave={() => {}}
      />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
