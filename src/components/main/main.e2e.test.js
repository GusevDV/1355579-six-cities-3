import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main.jsx";
import offers from '../../test-mocks/offers.js';
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({
  adapter: new Adapter(),
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
      <BrowserRouter>
        <Main
          offers={offers}
          currentCity={cities[1].currentCity}
          cityCoords={cities[1].cityCoords}
          cityZoom={cities[1].cityZoom}
          uniqCities={cities}
          hoverOffer={offers[2]}
          onChangeCity={(city) => handleChangeCity(city)}
          onChangeSortType={()=>{}}
          onChangeHoverOffer={()=>{}}
        />
      </BrowserRouter>
  );

  const cityLink = main.find(`.locations__item a`).first();

  cityLink.simulate(`click`);

  expect(handleChangeCity).toHaveBeenCalledTimes(1);
  expect(handleChangeCity).toHaveBeenCalledWith(cities[0]);
});

it(`Should onChangeSortType be called`, () => {

  const handleChangeSortType = jest.fn();

  const main = mount(
      <BrowserRouter>
        <Main
          offers={offers}
          currentCity={cities[1].currentCity}
          cityCoords={cities[1].cityCoords}
          cityZoom={cities[1].cityZoom}
          uniqCities={cities}
          hoverOffer={offers[2]}
          onChangeCity={() => {}}
          onChangeSortType={(sort) => handleChangeSortType(sort)}
          onChangeHoverOffer={()=>{}}
        />
      </BrowserRouter>
  );

  const sortOption = main.find(`.places__option`).at(2);

  sortOption.simulate(`click`);

  expect(handleChangeSortType).toHaveBeenCalledTimes(1);
  expect(handleChangeSortType).toHaveBeenCalledWith(2);

});

it(`Should onChangeHoverOffer be called`, () => {

  const handleChangeHoverOffer = jest.fn();

  const main = mount(
      <BrowserRouter>
        <Main
          offers={offers}
          currentCity={cities[1].currentCity}
          cityCoords={cities[1].cityCoords}
          cityZoom={cities[1].cityZoom}
          uniqCities={cities}
          hoverOffer={offers[2]}
          onChangeCity={() => {}}
          onChangeSortType={() => {}}
          onChangeHoverOffer={(offer) => handleChangeHoverOffer(offer)}
        />
      </BrowserRouter>
  );

  const offer = main.find(`.cities__place-card`).first();

  offer.simulate(`mouseover`);

  expect(handleChangeHoverOffer).toHaveBeenCalledTimes(1);
  expect(handleChangeHoverOffer).toHaveBeenCalledWith(offers[0].id);

  offer.simulate(`mouseleave`);

  expect(handleChangeHoverOffer).toHaveBeenCalledTimes(2);
  expect(handleChangeHoverOffer).toHaveBeenCalledWith(null);

});
