import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCardListNearby from "./place-card-list-nearby.jsx";
import offers from '../../test-mocks/offers.js';
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should onFavoriteClick be called`, () => {
  const onFavoriteClick = jest.fn();

  const main = mount(
      <BrowserRouter>
        <PlaceCardListNearby
          nearbyOffers={offers}
          onFavoriteClick={onFavoriteClick}
        />
      </BrowserRouter>
  );

  const button = main.find(`.place-card__bookmark-button`).first();

  button.simulate(`click`);

  expect(onFavoriteClick).toHaveBeenCalledTimes(1);
  expect(onFavoriteClick).toHaveBeenCalledWith(1, true);
});
