import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

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
    cityId: 1,
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
    cityId: 1,
    coords: [52.3909553943508, 4.85309666406198]
  }
];

it(`Should Main component render correctly`, () => {

  const tree = renderer
    .create(<Main
      offers={Offers}
      onTitleLinkClick={() => {}}
    />,
    {
      createNodeMock: () => {
        return document.createElement(`section`);
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
