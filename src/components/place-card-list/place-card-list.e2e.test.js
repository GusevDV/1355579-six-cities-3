import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCardList from "./place-card-list.jsx";
import offers from '../../test-mocks/offers.js';
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should onCardHover be called with offer.id argument`, () => {
  const onMouseEnter = jest.fn();

  const main = mount(
      <BrowserRouter>
        <PlaceCardList
          offers={offers}
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => {}}
          onFavoriteClick={() => {}}
        />
      </BrowserRouter>
  );

  const card = main.find(`.cities__place-card`).first();

  card.simulate(`mouseover`);

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
  expect(onMouseEnter).toHaveBeenCalledWith(offers[0].id);
});

it(`Should onCardMouseLeave be called`, () => {
  const onMouseLeave = jest.fn();

  const main = mount(
      <BrowserRouter>
        <PlaceCardList
          offers={offers}
          onMouseEnter={() => {}}
          onMouseLeave={onMouseLeave}
          onFavoriteClick={() => {}}
        />
      </BrowserRouter>
  );

  const card = main.find(`.cities__place-card`).first();

  card.simulate(`mouseleave`);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});

it(`Should onFavoriteClick be called`, () => {
  const onFavoriteClick = jest.fn();

  const main = mount(
      <BrowserRouter>
        <PlaceCardList
          offers={offers}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          onFavoriteClick={onFavoriteClick}
        />
      </BrowserRouter>
  );

  const button = main.find(`.place-card__bookmark-button`).first();

  button.simulate(`click`);

  expect(onFavoriteClick).toHaveBeenCalledTimes(1);
  expect(onFavoriteClick).toHaveBeenCalledWith(1, 1);
});
