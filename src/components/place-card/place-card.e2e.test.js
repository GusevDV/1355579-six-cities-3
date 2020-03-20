import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlaceCard from "./place-card.jsx";
import Offers from '../../test-mocks/offers.js';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should title link be clicked`, () => {
  const onTitleLinkClick = jest.fn();

  const main = mount(
      <PlaceCard
        offer={Offers[0]}
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
        offer={Offers[0]}
        onTitleLinkClick={() => {}}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => {}}
      />
  );

  const card = main.find(`.cities__place-card`);

  card.simulate(`mouseover`);

  expect(onMouseEnter).toHaveBeenCalledWith(Offers[0].id);
});

it(`Should onCardMouseLeave be called`, () => {
  const onMouseLeave = jest.fn();

  const main = mount(
      <PlaceCard
        offer={Offers[0]}
        onTitleLinkClick={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={onMouseLeave}
      />
  );

  const card = main.find(`.cities__place-card`);

  card.simulate(`mouseleave`);

  expect(onMouseLeave).toHaveBeenCalledTimes(1);
});
