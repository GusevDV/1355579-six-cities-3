import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

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
    city: `Amsterdam`,
    coords: [52.3909553943508, 4.85309666406198]
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
    city: `Amsterdam`,
    coords: [52.3909553943508, 4.85309666406198]
  }
];

it(`Should App component render correctly`, () => {

  const render = renderer.create(
      <App offers={Offers} onTitleLinkClick={() => {}} />,
      {
        createNodeMock: () => {
          return document.createElement(`section`);
        }
      }
  ).toJSON();

  expect(render).toMatchSnapshot();
});
