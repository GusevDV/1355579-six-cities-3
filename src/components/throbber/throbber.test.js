import React from "react";
import renderer from "react-test-renderer";
import Throbber from "./throbber.jsx";

it(`Should Throbber component render correctly without throbber--centered class`, () => {

  const render = renderer.create(
      <Throbber/>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});

it(`Should Throbber component render correctly with throbber--centered class`, () => {

  const render = renderer.create(
      <Throbber mix={{position: `center-page`}}/>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
