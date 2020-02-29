import React from "react";
import renderer from "react-test-renderer";
import Map from "./Map.jsx";

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

it(`Should Map component render correctly`, () => {
  const div = global.document.createElement(`div`);
  global.document.body.appendChild(div);
  const tree = renderer
    .create(<Map
      city={[52.38333, 4.9]}
      offers={Offers}
    />,
    {attachTo: div
    })
    .toJSON();

  expect(tree.getDOMNode()).toMatchSnapshot();
});
