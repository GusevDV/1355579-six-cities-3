import React from "react";
import renderer from "react-test-renderer";
import ErrorArea from "./error-area.jsx";

it(`Should Throbber component render correctly`, () => {

  const render = renderer.create(
      <ErrorArea message={`Error`}/>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
