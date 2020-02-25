import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const Offers = [
  {
    title: `Apartment 1`,
    price: 100,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-01.jpg`,
    objectType: `apartment`,
    badgeText: null,
    rating: 50,
    cityId: 1
  },
  {
    title: `Apartment 2`,
    price: 200,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-02.jpg`,
    objectType: `apartment`,
    badgeText: `Premium`,
    rating: 80,
    cityId: 1
  },
  {
    title: `Apartment 3`,
    price: 250,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-01.jpg`,
    objectType: `apartment`,
    badgeText: `Premium`,
    rating: 95,
    cityId: 1
  },
  {
    title: `Apartment 4`,
    price: 199,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-02.jpg`,
    objectType: `apartment`,
    badgeText: null,
    rating: 70,
    cityId: 1
  }
];

it(`Should App component render correctly`, () => {

  const render = renderer.create(
      <App offers={Offers} onTitleLinkClick={() => {}} />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
