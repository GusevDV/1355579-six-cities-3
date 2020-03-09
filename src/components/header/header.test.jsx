import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";

it(`Should Map component render correctly`, () => {
  const tree = renderer
    .create(<Header/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
