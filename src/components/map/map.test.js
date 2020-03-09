import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";
import Offers from '../../test-mocks/offers.js';

it(`Should Map component render correctly`, () => {
  const tree = renderer
    .create(<Map
      city={[52.38333, 4.9]}
      offers={Offers}
    />,
    {
      createNodeMock: () => {
        return document.createElement(`section`);
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
