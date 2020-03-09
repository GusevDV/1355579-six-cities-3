import React from "react";
import renderer from "react-test-renderer";
import Header from "./Header.jsx";

it(`Should Map component render correctly`, () => {
  const tree = renderer
    .create(<Header/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
