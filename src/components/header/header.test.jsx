import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from 'react-router-dom';
import {Header} from "./header.jsx";
import {AuthStatus} from '../../../const.js';

it(`Should Map component render correctly when user is auth`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Header auth={AuthStatus.AUTH} email={`email@email.test`}/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Map component render correctly when user is no auth`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Header auth={AuthStatus.NO_AUTH} />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
