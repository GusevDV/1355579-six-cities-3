import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";
import {reducer, ActionType, ApiCall} from "./nearby-offers.js";
import offers from '../../test-mocks/server-offers.js';
import {transformOffers} from '../../helpers/api-adapters.js';

const api = createAPI(() => {});

describe(`Nearby offers reducers`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_NEARBY_OFFERS_START after situation without error`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const action = {
      type: ActionType.FETCH_NEARBY_OFFERS_START,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: true,
      isError: false,
    });
  });

  it(`FETCH_NEARBY_OFFERS_START after situation with error`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isError: true,
    };
    const action = {
      type: ActionType.FETCH_NEARBY_OFFERS_START,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: true,
      isError: false,
    });
  });

  it(`FETCH_NEARBY_OFFERS_SUCCESS`, () => {
    const initialState = {
      data: [],
      isLoading: true,
      isError: false,
    };
    const action = {
      type: ActionType.FETCH_NEARBY_OFFERS_SUCCESS,
      payload: offers
    };
    expect(reducer(initialState, action)).toEqual({
      data: offers,
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_NEARBY_OFFERS_FAILURE`, () => {
    const initialState = {
      data: [],
      isLoading: true,
      isError: false,
    };
    const action = {
      type: ActionType.FETCH_NEARBY_OFFERS_FAILURE,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: false,
      isError: true,
    });
  });

});

describe(`ApiCall work correctly`, () => {

  it(`Should API call to /hotels/1/nearby finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const nearbyOffersLoader = ApiCall.fetchNearbyOffers(1);

    const expectedActions = [
      {type: ActionType.FETCH_NEARBY_OFFERS_START},
      {type: ActionType.FETCH_NEARBY_OFFERS_SUCCESS, payload: transformOffers(offers)}
    ];

    apiMock
      .onGet(`hotels/1/nearby`)
      .reply(200, offers);

    return nearbyOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });

  it(`Should API call to /hotels/1/nearby finished failure`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const nearbyOffersLoader = ApiCall.fetchNearbyOffers(1);

    const expectedActions = [
      {type: ActionType.FETCH_NEARBY_OFFERS_START},
      {type: ActionType.FETCH_NEARBY_OFFERS_FAILURE}
    ];

    apiMock
      .onGet(`hotels/1/nearby`)
      .reply(500);

    return nearbyOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });
});
