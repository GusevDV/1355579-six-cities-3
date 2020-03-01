import {reducer, ActionCreator, ActionTypes} from "./reducer.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    city: null,
    offers: null,
  });
});


describe(`Action creators work correctly`, () => {

  it(`Action creator for changeCity returns correct action`, () => {
    expect(ActionCreator.changeCity(`city`)).toEqual({
      type: ActionTypes.CHANGE_CITY,
      payload: `city`
    });
  });

  it(`Action creator for getOffers returns correct action`, () => {
    expect(ActionCreator.getOffers(`offers`)).toEqual({
      type: ActionTypes.GET_OFFERS,
      payload: `offers`
    });
  });
});
