import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Favorites} from "./favorites.jsx";
import offersGroupMock from '../../test-mocks/favorite-group-offers.js';
import {BrowserRouter} from 'react-router-dom';
import configureStore from "redux-mock-store";
import {AuthStatus} from '../../const.js';
import {Provider} from "react-redux";

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

it(`Should onfetchFavoriteOffers be called`, () => {

  const onFetchFavoriteOffers = jest.fn();

  mount(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites
            offersGroup={offersGroupMock}
            isLoading={false}
            isError={false}
            onFetchFavoriteOffers={onFetchFavoriteOffers}
            onChangeFavoriteStatus={()=>{}}
          />
        </BrowserRouter>
      </Provider>
  );

  expect(onFetchFavoriteOffers).toHaveBeenCalled();
});

it(`Should onfetchFavoriteOffers be called`, () => {

  const onChangeFavoriteStatus = jest.fn();

  const main = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Favorites
            offersGroup={offersGroupMock}
            isLoading={false}
            isError={false}
            onFetchFavoriteOffers={() => {}}
            onChangeFavoriteStatus={onChangeFavoriteStatus}
          />
        </BrowserRouter>
      </Provider>
  );

  const button = main.find(`.place-card__bookmark-button--active`).first();

  button.simulate(`click`);

  expect(onChangeFavoriteStatus).toHaveBeenCalled();
  expect(onChangeFavoriteStatus).toHaveBeenCalledWith(3, false);

});
