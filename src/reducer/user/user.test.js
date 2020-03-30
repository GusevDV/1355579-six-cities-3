import MockAdapter from "axios-mock-adapter";
import {AuthStatus} from '../../../const.js';
import createAPI from "../../api.js";
import {reducer, ActionType, ApiCall} from "./user.js";

const api = createAPI(() => {});

describe(`User reducers`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      authorizationStatus: AuthStatus.NO_AUTH,
      data: {}
    });
  });

  it(`SIGN_IN`, () => {
    const initialState = {
      authorizationStatus: AuthStatus.NO_AUTH,
      data: {}
    };
    const payload = {
      test: `test`,
    };
    const action = {
      type: ActionType.SIGN_IN,
      payload
    };
    expect(reducer(initialState, action)).toEqual({
      authorizationStatus: AuthStatus.AUTH,
      data: payload
    });
  });

  it(`SIGN_OUT`, () => {
    const initialState = {
      authorizationStatus: AuthStatus.AUTH,
      data: {test: true}
    };
    const action = {
      type: ActionType.SIGN_OUT
    };
    expect(reducer(initialState, action)).toEqual({
      authorizationStatus: AuthStatus.NO_AUTH,
      data: {}
    });
  });

});

describe(`ApiCall work correctly`, () => {

  it(`Should API call to POST /login finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const userLoader = ApiCall.signIn(`login@login.test`, `qwerty`);

    const payload = {test: true};
    const expectedActions = [
      {type: ActionType.SIGN_IN, payload}
    ];

    apiMock
      .onPost(`/login/`)
      .reply(200, payload);

    return userLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
      });
  });

  it(`Should API call to GET /login finished successfully`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const userLoader = ApiCall.getAuthStatus();

    const payload = {test: true};
    const expectedActions = [
      {type: ActionType.SIGN_IN, payload}
    ];

    apiMock
      .onGet(`/login/`)
      .reply(200, payload);

    return userLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual(expectedActions[0]);
      });
  });

});
