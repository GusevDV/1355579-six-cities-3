import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const offer = {
  id: 1,
  title: `Apartment 2`,
  price: 200,
  pricePeriod: `night`,
  thumnnailUrl: `/img/apartment-02.jpg`,
  objectType: `apartment`,
  isPremium: true,
  rating: 80,
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
