import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "./cities-list.jsx";
import {CityNames} from '../../../const.js';

const Cities = [
  `Paris`,
  `Amsterdam`
];

it(`Should CitiesList render correctly`, () => {
  const tree = renderer
    .create(<CitiesList
      cities={Cities}
      onCityChange = {() => {}}
      currentCity={CityNames.AMSTERDAM}
      maxCitiesCount={6}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
