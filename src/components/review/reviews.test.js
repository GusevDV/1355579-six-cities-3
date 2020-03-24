import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";
import reviews from '../../test-mocks/reviews.js';

it(`Should Review component render correctly`, () => {

  const render = renderer.create(
      <Review
        review={reviews[0]}
      />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
