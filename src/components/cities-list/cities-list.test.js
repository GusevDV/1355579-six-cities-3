import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "./cities-list.jsx";

const cities = [
  {name: `Paris`, coords: [48.85661, 2.351499], zoom: 13},
  {name: `Amsterdam`, coords: [52.37454, 4.897976], zoom: 13},
];

it(`Should CitiesList render correctly`, () => {
  const tree = renderer
    .create(<CitiesList
      cities={cities}
      onCityChange = {() => {}}
      currentCity={`Amsterdam`}
      maxCitiesCount={6}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
