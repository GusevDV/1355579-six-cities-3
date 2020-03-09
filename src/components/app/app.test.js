import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {Provider} from "react-redux";
import {CityNames} from '../../../const.js';
import Offers from '../../test-mocks/offers.js';

const mockStore = configureStore([]);

it(`Should App component render correctly`, () => {

  const store = mockStore({
    offers: Offers,
    city: CityNames.AMSTERDAM
  });

  const render = renderer.create(
      <Provider store={store}><App onTitleLinkClick={() => {}}/></Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`section`);
        }
      }
  ).toJSON();

  expect(render).toMatchSnapshot();
});
