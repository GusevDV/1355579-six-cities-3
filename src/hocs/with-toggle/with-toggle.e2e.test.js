import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withToggle from './with-toggle.js';

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withToggle(MockComponent);

it(`should change active item id correctly`, () => {
  const wrapper = shallow(<MockComponentWrapped/>);
  expect(wrapper.props().isActive).toBe(false);
  wrapper.props().onToggle();
  expect(wrapper.props().isActive).toBe(true);
  wrapper.props().onToggle();
  expect(wrapper.props().isActive).toBe(false);
});
