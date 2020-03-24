import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from 'react-router-dom';
import Header from "./header.jsx";

it(`Should Map component render correctly`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Header/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
