import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./main-empty.jsx";

it(`Should PlaceCard component render correctly`, () => {

  const render = renderer.create(
      <MainEmpty/>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
