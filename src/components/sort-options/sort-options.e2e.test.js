import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SortOptions from "./sort-options.jsx";
import {sortTypes as types} from "../../const.js";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should onItemClick be called and active class be added`, () => {
  const onItemClick = jest.fn();
  const arg = 2;

  const main = mount(
      <SortOptions
        sortTypes={types}
        isActive={true}
        activeItem={1}
        onItemClick={(i) => onItemClick(i)}
        onToggle={()=>{}}
      />
  );

  const option = main.find(`.places__option`).at(arg);

  expect(main.find(`.places__option`).at(2).hasClass(`places__option--active`)).toBe(false);

  option.simulate(`click`);
  main.setProps({activeItem: arg});

  expect(onItemClick).toHaveBeenCalledTimes(1);
  expect(onItemClick).toHaveBeenCalledWith(arg);
  expect(main.find(`.places__option`).at(2).hasClass(`places__option--active`)).toBe(true);
});

it(`Should onToggle be called and class changed`, () => {
  const onToggle = jest.fn();

  const main = mount(
      <SortOptions
        sortTypes={types}
        isActive={false}
        activeItem={1}
        onItemClick={()=>{}}
        onToggle={onToggle}
      />
  );

  const sortMenu = main.find(`.places__sorting`).first();

  sortMenu.simulate(`click`);
  main.setProps({isActive: true});

  expect(onToggle).toHaveBeenCalledTimes(1);
  expect(main.find(`.places__options`).first().hasClass(`places__options--opened`)).toBe(true);

  sortMenu.simulate(`click`);
  main.setProps({isActive: false});

  expect(onToggle).toHaveBeenCalledTimes(2);
  expect(main.find(`.places__options`).first().hasClass(`places__options--opened`)).toBe(false);
});
