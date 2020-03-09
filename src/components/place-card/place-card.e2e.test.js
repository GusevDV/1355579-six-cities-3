/* eslint-disable no-console */
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const offer = {
  id: 1,
  title: `Apartment 2`,
  price: 200,
  pricePeriod: `night`,
  thumnnailUrl: `/img/apartment-02.jpg`,
  objectType: `apartment`,
  isPremium: true,
  rating: 80,
  cityId: 1,
  coords: [52.3909553943508, 4.85309666406198],
};

it(`Should title link be clicked`, () => {
  const onTitleLinkClick = jest.fn();

  const main = mount(
      <PlaceCard
        offer={offer}
        onTitleLinkClick={onTitleLinkClick}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      />
  );

  const titleLink = main.find(`.place-card__name-link`);

  titleLink.simulate(`click`);

  expect(onTitleLinkClick).toHaveBeenCalledTimes(1);
});

it(`Should onCardHover be called with offer.id argument`, () => {
  const onMouseEnter = jest.fn();

  const main = mount(
      <PlaceCard
        offer={offer}
        onTitleLinkClick={() => {}}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => {}}
      />
  );

  const card = main.find(`.cities__place-card`);

  card.simulate(`mouseover`);

  expect(onMouseEnter).toHaveBeenCalledWith(offer.id);
});

it(`Should onCardMouseLeave be called`, () => {
  const onMouseLeave = jest.fn();

  const main = mount(
      <PlaceCard
        offer={offer}
        onTitleLinkClick={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={onMouseLeave}
      />
  );

  const card = main.find(`.cities__place-card`);

  card.simulate(`mouseleave`);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});
