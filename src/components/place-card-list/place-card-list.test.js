import React from "react";
import renderer from "react-test-renderer";
import PlaceCardList from "./place-card-list.jsx";
import Offers from '../../test-mocks/offers.js';

it(`Should PlaceCardList component render correctly`, () => {

  const render = renderer.create(
      <PlaceCardList
        offers={Offers}
        onTitleLinkClick={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
