/* eslint-disable no-console */
import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const Offers = [
  `Flat 2`,
  `Very Nice Mega Cool Flat 3`,
  `Apartment`,
  `Beautiful & luxurious apartment at great location`,
  `Nice, cozy, warm big bed apartment`,
];

it(`Should title link be clicked`, () => {
  const onTitleLinkClick = jest.fn();

  const main = shallow(
      <Main
        offers={Offers}
        onTitleLinkClick={onTitleLinkClick}
        getPrice={()=>10}
      />
  );

  const titleLink = main.find(`.place-card__name-link`);

  titleLink.forEach((link, index) => {
    titleLink.at(index).simulate(`click`);
  });

  expect(onTitleLinkClick).toHaveBeenCalledTimes(Offers.length);
});

it(`Should getPrice be called`, () => {
  const getPrice = jest.fn();

  shallow(
      <Main
        offers={Offers}
        onTitleLinkClick={() => {}}
        getPrice={getPrice}
      />
  );

  expect(getPrice).toHaveBeenCalledTimes(Offers.length);
});
