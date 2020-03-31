
import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withReviewForm from './with-review-form.js';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withReviewForm(MockComponent);

it(`should change comment correctly`, () => {
  const wrapper = shallow(<MockComponentWrapped onSubmit={()=>{}} />);
  expect(wrapper.props().comment).toBe(``);
  wrapper.props().onChangeComment({target: {value: `comment`}});
  expect(wrapper.props().comment).toBe(`comment`);
});

it(`should change rating correctly`, () => {
  const wrapper = shallow(<MockComponentWrapped onSubmit={()=>{}} />);
  expect(wrapper.props().rating).toBe(0);
  wrapper.props().onChangeRating({}, 1);
  expect(wrapper.props().rating).toBe(1);
});

it(`should onSubmit work correctly`, () => {
  const onSubmit = jest.fn();
  const wrapper = shallow(<MockComponentWrapped onSubmit={onSubmit} />);

  const mockPreventDefault = jest.fn();
  const mockEvent = {
    preventDefault: mockPreventDefault
  };

  const data = {
    rating: 1,
    comment: `comment`
  };

  wrapper.props().onChangeRating({}, data.rating);
  wrapper.props().onChangeComment({target: {value: data.comment}});
  wrapper.props().onFormSubmit(mockEvent, data);

  expect(onSubmit).toHaveBeenCalled();
  expect(mockPreventDefault).toHaveBeenCalled();
  expect(onSubmit).toHaveBeenCalledWith(data);
});

it(`should isActive work correctly`, () => {
  const wrapper = shallow(<MockComponentWrapped onSubmit={()=>{}} />);

  wrapper.props().onChangeComment({target: {value: `x`.repeat(49)}});
  wrapper.props().onChangeRating({}, 0);
  expect(wrapper.props().isActive).toBe(false);

  wrapper.props().onChangeComment({target: {value: `x`.repeat(301)}});
  wrapper.props().onChangeRating({}, 0);
  expect(wrapper.props().isActive).toBe(false);

  for (let rating = 1; rating < 5; rating++) {
    wrapper.props().onChangeRating({}, rating);
    for (let chars = 50; chars <= 300; chars++) {
      wrapper.props().onChangeComment({target: {value: `x`.repeat(chars)}});
      expect(wrapper.props().isActive).toBe(true);
    }
  }

  wrapper.props().onChangeRating({}, 0);
  for (let chars = 50; chars <= 300; chars++) {
    wrapper.props().onChangeComment({target: {value: `x`.repeat(chars)}});
    expect(wrapper.props().isActive).toBe(false);
  }

  for (let rating = 1; rating < 5; rating++) {
    wrapper.props().onChangeRating({}, rating);
    wrapper.props().onChangeComment({target: {value: `x`.repeat(49)}});
    expect(wrapper.props().isActive).toBe(false);

    wrapper.props().onChangeRating({}, rating);
    wrapper.props().onChangeComment({target: {value: `x`.repeat(301)}});
    expect(wrapper.props().isActive).toBe(false);
  }

});
