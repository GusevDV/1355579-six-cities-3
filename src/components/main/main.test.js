import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const OffersMocks = [
  `Flat 2`,
  `Very Nice Mega Cool Flat 3`,
  `Apartment`,
  `Beautiful & luxurious apartment at great location`,
  `Nice, cozy, warm big bed apartment`,
];

it(`Should Main component render correctly`, () => {
  const render = renderer
    .create(<Main
      offers={OffersMocks}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(render).toMatchSnapshot();
});
