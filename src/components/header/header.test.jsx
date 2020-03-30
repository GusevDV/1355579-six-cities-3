import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from 'react-router-dom';
import {Header} from "./header.jsx";

it(`Should Map component render correctly when user is auth`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Header isAuthorized={true} email={`email@email.test`}/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Map component render correctly when user is no auth`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Header isAuthorized={false} />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
