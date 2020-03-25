import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";
import {reducer, ActionType, ApiCall} from "./offers.js";
import {ActionType as CityActionType} from "../city/city.js";
import offers from '../../test-mocks/server-offers.js';
import {transformOffers} from '../../helpers/api-adapters.js';

const api = createAPI(() => {});

describe(`Offers reducers`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_OFFERS_START after situation without error`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const action = {
      type: ActionType.FETCH_OFFERS_START,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: true,
      isError: false,
    });
  });

  it(`FETCH_OFFERS_START after situation with error`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isError: true,
    };
    const action = {
      type: ActionType.FETCH_OFFERS_START,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: true,
      isError: false,
    });
  });

  it(`FETCH_OFFERS_SUCCESS`, () => {
    const initialState = {
      data: [],
      isLoading: true,
      isError: false,
    };
    const action = {
      type: ActionType.FETCH_OFFERS_SUCCESS,
      payload: offers
    };
    expect(reducer(initialState, action)).toEqual({
      data: offers,
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_OFFERS_FAILURE`, () => {
    const initialState = {
      data: [],
      isLoading: true,
      isError: false,
    };
    const action = {
      type: ActionType.FETCH_OFFERS_FAILURE,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: false,
      isError: true,
    });
  });

});

describe(`ApiCall work correctly`, () => {

  it(`Should API call to /hotels finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = ApiCall.fetchOffers();

    const expectedActions = [
      {type: ActionType.FETCH_OFFERS_START},
      {type: ActionType.FETCH_OFFERS_SUCCESS, payload: transformOffers(offers)},
      {type: CityActionType.CHANGE_CITY, payload: {
        name: offers[0].city.name,
        coords: [offers[0].city.location.latitude, offers[0].city.location.longitude],
        zoom: offers[0].city.location.zoom,
      }}
    ];

    apiMock
      .onGet(`/hotels`)
      .reply(200, offers);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
        expect(dispatch.mock.calls[2][0]).toEqual(expectedActions[2]);
      });
  });

  it(`Should API call to /hotels finished failure`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const callback = jest.fn();
    const offersLoader = ApiCall.fetchOffers(callback);

    const expectedActions = [
      {type: ActionType.FETCH_OFFERS_START},
      {type: ActionType.FETCH_OFFERS_FAILURE}
    ];

    apiMock
      .onGet(`/hotels`)
      .reply(500);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(callback).toHaveBeenCalledTimes(0);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });
});
