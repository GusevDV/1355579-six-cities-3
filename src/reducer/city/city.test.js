import {reducer, ActionType} from "./city.js";
import offers from '../../test-mocks/offers';

const initialState = {
  currentCity: null,
  coords: [],
  zoom: 0
};

describe(`City reducers`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`CHANGE_CITY`, () => {
    const action = {
      type: ActionType.CHANGE_CITY,
      payload: {
        name: offers[0].city,
        coords: offers[0].cityCoords,
        zoom: offers[0].cityZoom
      }
    };
    expect(reducer(initialState, action)).toEqual({
      currentCity: offers[0].city,
      coords: offers[0].cityCoords,
      zoom: offers[0].cityZoom
    });
  });

});
