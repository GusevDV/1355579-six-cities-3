import React from "react";
import renderer from "react-test-renderer";
import FavoritesEmpty from "./favorites-empty.jsx";

it(`Should FavoritesEmpty component render correctly`, () => {

  const render = renderer.create(
      <FavoritesEmpty/>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});

