import {reducer, ActionTypes} from "./city.js";
import Offers from '../../test-mocks/offers';

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
      type: ActionTypes.CHANGE_CITY,
      payload: {
        name: Offers[0].city,
        coords: Offers[0].cityCoords,
        zoom: Offers[0].cityZoom
      }
    };
    expect(reducer(initialState, action)).toEqual({
      currentCity: Offers[0].city,
      coords: Offers[0].cityCoords,
      zoom: Offers[0].cityZoom
    });
  });

});
