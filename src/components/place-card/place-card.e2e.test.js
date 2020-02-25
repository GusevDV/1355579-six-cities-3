/* eslint-disable no-console */
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const offer = {
  title: `Apartment 1`,
  price: 100,
  pricePeriod: `night`,
  thumnnailUrl: `/img/apartment-01.jpg`,
  objectType: `apartment`,
  badgeText: null,
  rating: 50,
  cityId: 1
};

it(`Should title link be clicked`, () => {
  const onTitleLinkClick = jest.fn();

  const main = mount(
      <PlaceCard
        offer={offer}
        onTitleLinkClick={onTitleLinkClick}
        onCardHover={() => {}}
        onCardMouseLeave={() => {}}
      />
  );

  const titleLink = main.find(`.place-card__name-link`);

  titleLink.simulate(`click`);

  expect(onTitleLinkClick).toHaveBeenCalledTimes(1);
});

it(`Should onCardHover be called with offer argument`, () => {
  const onCardHover = jest.fn();

  const main = mount(
      <PlaceCard
        offer={offer}
        onTitleLinkClick={() => {}}
        onCardHover={onCardHover}
        onCardMouseLeave={() => {}}
      />
  );

  const card = main.find(`.cities__place-card`);

  card.simulate(`mouseover`);

  expect(onCardHover).toHaveBeenCalledWith(offer);
});

it(`Should onCardMouseLeave be called`, () => {
  const onCardMouseLeave = jest.fn();

  const main = mount(
      <PlaceCard
        offer={offer}
        onTitleLinkClick={() => {}}
        onCardHover={() => {}}
        onCardMouseLeave={onCardMouseLeave}
      />
  );

  const card = main.find(`.cities__place-card`);

  card.simulate(`mouseleave`);

  expect(onCardMouseLeave).toHaveBeenCalledTimes(1);
});
