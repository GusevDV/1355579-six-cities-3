import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";
import offers from '../../test-mocks/offers.js';
import {mapDisplayType} from '../../../const.js';

it(`Should Map city component render correctly`, () => {
  const tree = renderer
    .create(<Map
      city={[52.38333, 4.9]}
      offers={offers}
      zoom={13}
    />,
    {
      createNodeMock: () => {
        return document.createElement(`section`);
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Map property component render correctly`, () => {
  const tree = renderer
    .create(<Map
      city={[52.38333, 4.9]}
      offers={offers}
      zoom={13}
      mapType={mapDisplayType.PROPERTY}
    />,
    {
      createNodeMock: () => {
        return document.createElement(`section`);
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
