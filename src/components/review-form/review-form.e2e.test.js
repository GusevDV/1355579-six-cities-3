import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReviewForm from "./review-form.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should onFormSubmit be called`, () => {
  const onFormSubmit = jest.fn();

  const main = mount(
      <ReviewForm
        onFormSubmit={onFormSubmit}
        comment={`comment`}
        isActive={true}
        rating={1}
        isError={false}
        onChangeRating={()=>{}}
        onChangeComment={()=>{}}
      />
  );

  const form = main.find(`.reviews__form`);

  form.simulate(`submit`);

  expect(onFormSubmit).toHaveBeenCalledTimes(1);

});
