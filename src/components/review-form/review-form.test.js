import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form.jsx";

it(`Should ReviewForm component render correctly`, () => {

  const render = renderer.create(
      <ReviewForm/>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
