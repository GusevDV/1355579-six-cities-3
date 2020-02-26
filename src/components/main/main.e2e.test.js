/* eslint-disable no-console */
import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const Offers = [
  {
    id: 1,
    title: `Apartment 1`,
    price: 100,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-01.jpg`,
    objectType: `apartment`,
    isPremium: false,
    rating: 50,
    cityId: 1
  },
  {
    id: 2,
    title: `Apartment 2`,
    price: 200,
    pricePeriod: `night`,
    thumnnailUrl: `/img/apartment-02.jpg`,
    objectType: `apartment`,
    isPremium: true,
    rating: 80,
    cityId: 1
  }
];

it(`Should title link be clicked`, () => {
  const onTitleLinkClick = jest.fn();

  const main = mount(
      <Main
        offers={Offers}
        onTitleLinkClick={onTitleLinkClick}
      />
  );

  const titleLink = main.find(`.place-card__name-link`);

  titleLink.forEach((link, index) => {
    titleLink.at(index).simulate(`click`);
  });

  expect(onTitleLinkClick).toHaveBeenCalledTimes(Offers.length);
});

