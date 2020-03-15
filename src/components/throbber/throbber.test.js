import React from "react";
import renderer from "react-test-renderer";
import Throbber from "./throbber.jsx";

it(`Should Throbber component render correctly`, () => {

  const render = renderer.create(
      <Throbber/>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
