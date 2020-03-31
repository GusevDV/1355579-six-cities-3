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
      isErrorFetchReview: false,
      isErrorCreateReview: false
    });
  });

  it(`FETCH_REVIEWS_START after situation without error`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false
    };
    const action = {
      type: ActionType.FETCH_REVIEWS_START,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: true,
      isErrorFetchReview: false,
      isErrorCreateReview: false
    });
  });

  it(`FETCH_REVIEWS_START after situation with error`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isErrorFetchReview: true,
      isErrorCreateReview: false
    };
    const action = {
      type: ActionType.FETCH_REVIEWS_START,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: true,
      isErrorFetchReview: false,
      isErrorCreateReview: false
    });
  });

  it(`FETCH_REVIEWS_SUCCESS`, () => {
    const initialState = {
      data: [],
      isLoading: true,
      isErrorFetchReview: false,
      isErrorCreateReview: false
    };
    const action = {
      type: ActionType.FETCH_REVIEWS_SUCCESS,
      payload: reviews
    };
    expect(reducer(initialState, action)).toEqual({
      data: reviews,
      isLoading: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false
    });
  });

  it(`FETCH_REVIEWS_FAILURE`, () => {
    const initialState = {
      data: [],
      isLoading: true,
      isErrorFetchReview: false,
      isErrorCreateReview: false
    };
    const action = {
      type: ActionType.FETCH_REVIEWS_FAILURE,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: false,
      isErrorFetchReview: true,
      isErrorCreateReview: false
    });
  });

  it(`CREATE_REVIEW_SUCCESS after situation without error`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false
    };
    const action = {
      type: ActionType.CREATE_REVIEW_SUCCESS,
      payload: {test: true}
    };
    expect(reducer(initialState, action)).toEqual({
      data: {test: true},
      isLoading: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false
    });
  });

  it(`CREATE_REVIEW_SUCCESS after situation with error`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isErrorFetchReview: false,
      isErrorCreateReview: true,
    };
    const action = {
      type: ActionType.CREATE_REVIEW_SUCCESS,
      payload: {test: true}
    };
    expect(reducer(initialState, action)).toEqual({
      data: {test: true},
      isLoading: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false
    });
  });

  it(`CREATE_REVIEW_FAILURE`, () => {
    const initialState = {
      data: [],
      isLoading: false,
      isErrorFetchReview: false,
      isErrorCreateReview: false,
    };
    const action = {
      type: ActionType.CREATE_REVIEW_FAILURE,
    };
    expect(reducer(initialState, action)).toEqual({
      data: [],
      isLoading: false,
      isErrorFetchReview: false,
      isErrorCreateReview: true
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

  it(`Should API call to POST /comments/1 finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const body = {test: true};
    const reviewsLoader = ApiCall.createReview(1, body);

    const expectedActions = [
      {type: ActionType.CREATE_REVIEW_SUCCESS, payload: body},
    ];

    apiMock
      .onPost(`/comments/1`, body)
      .reply(200, body);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
      });
  });

  it(`Should API call to POST /comments/1 finished failure`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const body = {test: true};
    const reviewsLoader = ApiCall.createReview(1, body);

    const expectedActions = [
      {type: ActionType.CREATE_REVIEW_FAILURE}
    ];


    apiMock
      .onPost(`/comments/1`, body)
      .reply(500);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
      });
  });

});
