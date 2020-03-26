import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";
import reviews from '../../test-mocks/reviews.js';

it(`Should ReviewList component render correctly`, () => {

  const render = renderer.create(
      <ReviewsList
        reviews={reviews}
        maxReviewsCount={10}
      />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
