import React from "react";
import renderer from "react-test-renderer";
import PlaceCardList from "./place-card-list.jsx";

const Offers = [
  {
    id: 1,
    title: `Apartment 1`,
    price: 100,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-01.jpg`,
    objectType: `apartment`,
    isPremium: false,
    rating: 50,
    cityId: 1
  },
  {
    id: 2,
    title: `Apartment 2`,
    price: 200,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-02.jpg`,
    objectType: `apartment`,
    isPremium: true,
    rating: 80,
    cityId: 1
  }
];

it(`Should PlaceCardList component render correctly`, () => {

  const render = renderer.create(
      <PlaceCardList offers={Offers} onTitleLinkClick={() => {}} />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
