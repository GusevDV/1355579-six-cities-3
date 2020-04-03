import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from 'react-router-dom';
import SignIn from "./sign-in.jsx";
import {AuthStatus} from '../../const.js';

const mockStore = configureStore([]);
const store = mockStore({
  user: {
    authorizationStatus: AuthStatus.NO_AUTH,
    data: []
  }
});

it(`Should SignIn component render correctly`, () => {

  const render = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn/>
        </BrowserRouter>
      </Provider>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});
