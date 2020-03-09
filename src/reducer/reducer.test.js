/* import {reducer, ActionCreators, ActionTypes} from "./reducer.js";
import {CityNames} from '../../const.js';
import Offers from '../test-mocks/offers.js';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    city: CityNames.AMSTERDAM,
    offers: Offers,
  });
});

it(`Reducer should set offers by a given value`, () => {
  expect(reducer({
    offers: [],
    city: ``,
  }, ActionCreators.setOffers(`offers`))).toEqual({
    offers: `offers`,
    city: ``,
  });
});

it(`Reducer should change city by a given value`, () => {
  expect(reducer({
    offers: [],
    city: ``,
  }, ActionCreators.changeCity(`city`))).toEqual({
    offers: [],
    city: `city`,
  });
});

describe(`Action creators work correctly`, () => {

  it(`Action creator for changeCity returns correct action`, () => {
    expect(ActionCreators.changeCity(`city`)).toEqual({
      type: ActionTypes.CHANGE_CITY,
      payload: `city`
    });
  });

  it(`Action creator for setOffers returns correct action`, () => {
    expect(ActionCreators.setOffers(`offers`)).toEqual({
      type: ActionTypes.SET_OFFERS,
      payload: `offers`
    });
  });
});
 */
