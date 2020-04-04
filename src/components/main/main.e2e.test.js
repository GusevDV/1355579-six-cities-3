import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main.jsx";
import offers from '../../test-mocks/offers.js';
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

const cities = [
  {
    name: offers[0].city,
    coords: offers[0].cityCoords,
    zoom: offers[0].cityZoom
  },
  {
    name: offers[1].city,
    coords: offers[1].cityCoords,
    zoom: offers[1].cityZoom,
  }
];

it(`Should onChangeCity be called`, () => {

  const handleChangeCity = jest.fn();

  const main = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Main
            offers={offers}
            currentCity={cities[1].name}
            cityCoords={cities[1].coords}
            cityZoom={cities[1].zoom}
            uniqCities={cities}
            hoverOffer={offers[2]}
            onChangeCity={(city) => handleChangeCity(city)}
            onChangeSortType={()=>{}}
            onChangeHoverOffer={()=>{}}
            onChangeFavoriteStatus={() => {}}
            currentSort={1}
          />
        </BrowserRouter>
      </Provider>
  );

  const cityLink = main.find(`.locations__item a`).first();

  cityLink.simulate(`click`);

  expect(handleChangeCity).toHaveBeenCalledTimes(1);
  expect(handleChangeCity).toHaveBeenCalledWith(cities[0]);
});

it(`Should onChangeSortType be called`, () => {

  const handleChangeSortType = jest.fn();

  const main = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Main
            offers={offers}
            currentCity={cities[1].name}
            cityCoords={cities[1].coords}
            cityZoom={cities[1].zoom}
            uniqCities={cities}
            hoverOffer={offers[2]}
            onChangeCity={() => {}}
            onChangeSortType={(sort) => handleChangeSortType(sort)}
            onChangeHoverOffer={()=>{}}
            onChangeFavoriteStatus={() => {}}
            currentSort={1}
          />
        </BrowserRouter>
      </Provider>
  );

  const sortOption = main.find(`.places__option`).at(2);

  sortOption.simulate(`click`);

  expect(handleChangeSortType).toHaveBeenCalledTimes(1);
  expect(handleChangeSortType).toHaveBeenCalledWith(2);

});

it(`Should onChangeHoverOffer be called`, () => {

  const handleChangeHoverOffer = jest.fn();

  const main = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Main
            offers={offers}
            currentCity={cities[1].name}
            cityCoords={cities[1].coords}
            cityZoom={cities[1].zoom}
            uniqCities={cities}
            hoverOffer={offers[2]}
            onChangeCity={() => {}}
            onChangeSortType={() => {}}
            onChangeHoverOffer={(offer) => handleChangeHoverOffer(offer)}
            onChangeFavoriteStatus={() => {}}
            currentSort={1}
          />
        </BrowserRouter>
      </Provider>
  );

  const offer = main.find(`.cities__place-card`).first();

  offer.simulate(`mouseover`);

  expect(handleChangeHoverOffer).toHaveBeenCalledTimes(1);
  expect(handleChangeHoverOffer).toHaveBeenCalledWith(offers[0].id);

  offer.simulate(`mouseleave`);

  expect(handleChangeHoverOffer).toHaveBeenCalledTimes(2);
  expect(handleChangeHoverOffer).toHaveBeenCalledWith(null);

});

it(`Should onChangeFavoriteStatus be called`, () => {

  const onChangeFavoriteStatus = jest.fn();

  const main = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Main
            offers={offers}
            currentCity={cities[1].name}
            cityCoords={cities[1].coords}
            cityZoom={cities[1].zoom}
            uniqCities={cities}
            hoverOffer={offers[2]}
            onChangeCity={() => {}}
            onChangeSortType={() => {}}
            onChangeHoverOffer={() => {}}
            onChangeFavoriteStatus={onChangeFavoriteStatus}
            currentSort={1}
          />
        </BrowserRouter>
      </Provider>
  );

  const button = main.find(`.place-card__bookmark-button`).first();

  button.simulate(`click`);

  expect(onChangeFavoriteStatus).toHaveBeenCalledTimes(1);
  expect(onChangeFavoriteStatus).toHaveBeenCalledWith(1, true);

});

