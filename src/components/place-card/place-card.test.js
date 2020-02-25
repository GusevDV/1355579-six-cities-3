import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const offer = {
  title: `Apartment 1`,
  price: 100,
  pricePeriod: `night`,
  thumnnailUrl: `/img/apartment-01.jpg`,
  objectType: `apartment`,
  badgeText: null,
  rating: 50,
  cityId: 1
};

it(`Should PlaceCard component render correctly`, () => {

  const render = renderer.create(
      <PlaceCard
        offer={offer}
        onTitleLinkClick={() => {}}
        onCardHover={() => {}}
        onCardMouseLeave={() => {}}
      />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
