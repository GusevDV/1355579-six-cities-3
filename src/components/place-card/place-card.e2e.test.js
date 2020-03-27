import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";
import Offers from '../../test-mocks/offers.js';
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should onCardHover be called with offer.id argument`, () => {
  const onMouseEnter = jest.fn();

  const main = mount(
      <BrowserRouter>
        <PlaceCard
          offer={Offers[0]}
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => {}}
        />
      </BrowserRouter>
  );

  const card = main.find(`.cities__place-card`);

  card.simulate(`mouseover`);

  expect(onMouseEnter).toHaveBeenCalledWith(Offers[0].id);
});

it(`Should onCardMouseLeave be called`, () => {
  const onMouseLeave = jest.fn();

  const main = mount(
      <BrowserRouter>
        <PlaceCard
          offer={Offers[0]}
          onMouseEnter={() => {}}
          onMouseLeave={onMouseLeave}
        />
      </BrowserRouter>
  );

  const card = main.find(`.cities__place-card`);

  card.simulate(`mouseleave`);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});
