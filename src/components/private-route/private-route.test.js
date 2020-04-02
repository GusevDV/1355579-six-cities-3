import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from 'react-router-dom';
import PrivateRoute from "./private-route.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({
  user: {
    isAuthrorized: true,
    data: []
  }
});

it(`Should Footer component render correctly`, () => {

  const render = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute exact={true} path={`path`} render={() => (
            <div></div>
          )} />
        </BrowserRouter>
      </Provider>
  )
  .toJSON();

  expect(render).toMatchSnapshot();
});

