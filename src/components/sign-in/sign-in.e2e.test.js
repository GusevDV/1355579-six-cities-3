import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SignIn} from "./sign-in.jsx";
import {BrowserRouter} from 'react-router-dom';
import {AuthStatus} from "../../../const.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);
const store = mockStore({
  user: {
    authorizationStatus: AuthStatus.NO_AUTH,
    data: []
  }
});

it(`Should onSignIn be called`, () => {
  const onSignIn = jest.fn();

  const main = mount(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn auth={AuthStatus.NO_AUTH} onSignIn={onSignIn} />
        </BrowserRouter>
      </Provider>
  );

  const form = main.find(`.login__form`);

  form.simulate(`submit`);

  expect(onSignIn).toHaveBeenCalledTimes(1);
});

