import React from "react";
import renderer from "react-test-renderer";
import SortOptions from "./sort-options.jsx";
import {sortTypes as types} from "../../const.js";

it(`Should active SortOptions component render correctly`, () => {

  const render = renderer.create(
      <SortOptions
        sortTypes={types}
        isActive={true}
        activeItem={1}
        onItemClick={()=>{}}
        onToggle={()=>{}}
      />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});

it(`Should non active SortOptions component render correctly`, () => {

  const render = renderer.create(
      <SortOptions
        sortTypes={types}
        isActive={false}
        activeItem={0}
        onItemClick={()=>{}}
        onToggle={()=>{}}
      />
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
