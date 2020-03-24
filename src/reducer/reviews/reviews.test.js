import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";
import {reducer, ActionType, ApiCall} from "./reviews.js";
import reviews from '../../test-mocks/reviews.js';

const api = createAPI(() => {});

describe(`Reviews reducers`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      data: [],
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_REVIEWS_START after situation without error`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isError: false,
    };
    const action = {
      type: ActionType.FETCH_REVIEWS_START,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: true,
      isError: false,
    });
  });

  it(`FETCH_REVIEWS_START after situation with error`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isError: true,
    };
    const action = {
      type: ActionType.FETCH_REVIEWS_START,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: true,
      isError: false,
    });
  });

  it(`FETCH_REVIEWS_SUCCESS`, () => {
    const initialState = {
      data: [],
      isLoading: true,
      isError: false,
    };
    const action = {
      type: ActionType.FETCH_REVIEWS_SUCCESS,
      payload: reviews
    };
    expect(reducer(initialState, action)).toEqual({
      data: reviews,
      isLoading: false,
      isError: false,
    });
  });

  it(`FETCH_REVIEWS_FAILURE`, () => {
    const initialState = {
      data: [],
      isLoading: true,
      isError: false,
    };
    const action = {
      type: ActionType.FETCH_REVIEWS_FAILURE,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: false,
      isError: true,
    });
  });

});

describe(`ApiCall work correctly`, () => {

  it(`Should API call to /comments/1 finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = ApiCall.fetchReviews(1);

    const expectedActions = [
      {type: ActionType.FETCH_REVIEWS_START},
      {type: ActionType.FETCH_REVIEWS_SUCCESS, payload: reviews}
    ];

    apiMock
      .onGet(`/comments/1`)
      .reply(200, reviews);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });

  it(`Should API call to /comments/1 finished failure`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = ApiCall.fetchReviews(1);

    const expectedActions = [
      {type: ActionType.FETCH_REVIEWS_START},
      {type: ActionType.FETCH_REVIEWS_FAILURE}
    ];

    apiMock
      .onGet(`/comments/1`)
      .reply(500);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
        expect(dispatch.mock.calls[1][0]).toEqual(expectedActions[1]);
      });
  });
});
