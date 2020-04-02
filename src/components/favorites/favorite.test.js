import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from 'react-router-dom';
import {Favorites} from "./favorites.jsx";
import offersGroupMock from '../../test-mocks/favorite-group-offers.js';
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {AuthStatus} from '../../const.js';

const mockStore = configureStore([]);

let store = mockStore({
  user: {
    authorizationStatus: AuthStatus.NO_AUTH,
    data: []
  }
});

it(`Should Favorite component render correctly when offers is loaded with success`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <Favorites
              offersGroup={offersGroupMock}
              isLoading={false}
              isError={false}
              onFetchFavoriteOffers={()=>{}}
              onChangeFavoriteStatus={()=>{}}
            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Favorite component render correctly when offers is loaded with error`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <Favorites
              offersGroup={{}}
              isLoading={false}
              isError={true}
              onFetchFavoriteOffers={()=>{}}
              onChangeFavoriteStatus={()=>{}}
            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});


it(`Should Favorite component render correctly when offers is loading`, () => {
  const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <Favorites
              offersGroup={{}}
              isLoading={true}
              isError={false}
              onFetchFavoriteOffers={()=>{}}
              onChangeFavoriteStatus={()=>{}}
            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
