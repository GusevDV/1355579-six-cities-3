import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form.jsx";

it(`Should no active ReviewForm component`, () => {

  const render = renderer.create(
      <ReviewForm
        onFormSubmit={()=>{}}
        comment={`comment`}
        isActive={false}
        rating={0}
        isError={false}
        onChangeRating={()=>{}}
        onChangeComment={()=>{}}
      />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});

it(`Should active ReviewForm component`, () => {

  const render = renderer.create(
      <ReviewForm
        onFormSubmit={()=>{}}
        comment={`comment`}
        isActive={true}
        rating={1}
        isError={false}
        onChangeRating={()=>{}}
        onChangeComment={()=>{}}
      />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});

it(`Should ReviewForm component with error`, () => {

  const render = renderer.create(
      <ReviewForm
        onFormSubmit={()=>{}}
        comment={`comment`}
        isActive={true}
        rating={1}
        isError={true}
        onChangeRating={()=>{}}
        onChangeComment={()=>{}}
      />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
