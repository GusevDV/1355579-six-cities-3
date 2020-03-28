import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveItemClick from './with-active-item-click.js';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveItemClick(MockComponent);

it(`should change active item id correctly`, () => {
  const wrapper = shallow(<MockComponentWrapped/>);
  expect(wrapper.props().activeItem).toBe(0);
  wrapper.props().onItemClick(1);
  expect(wrapper.props().activeItem).toBe(1);
  wrapper.props().onItemClick(2);
  expect(wrapper.props().activeItem).toBe(2);
  wrapper.props().onItemClick(null);
  expect(wrapper.props().activeItem).toBe(null);
});

it(`should onChangeItem func be called`, () => {
  const onChange = jest.fn();
  const arg = 1;
  const wrapper = shallow(<MockComponentWrapped onChangeItem={(i) => onChange(i)} />);
  wrapper.props().onItemClick(arg);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(arg);
});
