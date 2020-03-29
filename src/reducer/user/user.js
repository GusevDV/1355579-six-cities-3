import {AuthStatus} from '../../../const.js';

const initialState = {
  authorizationStatus: AuthStatus.NO_AUTH,
  data: {}
};

const ActionType = {
  SIGN_IN: `SIGN_IN`,
  CHECK_AUTH_STATUS: `CHECK_AUTH_STATUS`,
  CHANGE_AUTH_STATUS: `CHANGE_AUTH_STATUS`
};

const ActionCreator = {
  checkAuthStatus: (data) => ({
    type: ActionType.CHECK_AUTH_STATUS,
    payload: data,
  }),
  changeAuthStatus: (status) => ({
    type: ActionType.CHANGE_AUTH_STATUS,
    payload: status,
  }),
  signIn: (data) => ({
    type: ActionType.SIGN_IN,
    payload: data
  }),
};

const ApiCall = {
  checkAuthStatus: () => (dispatch, getState, api) => {
    return api.get(`/login/`)
      .then((response) => {
        dispatch(ActionCreator.checkAuthStatus(response.data));
      });
  },
  signIn: (email, password) => (dispatch, getState, api) => {
    return api.post(`/login/`, {email, password})
      .then((response) => {
        dispatch(ActionCreator.signIn(response.data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHECK_AUTH_STATUS:
      return Object.assign({}, state, {
        authorizationStatus: AuthStatus.AUTH,
        data: action.payload
      });
    case ActionType.CHANGE_AUTH_STATUS:
      return Object.assign({}, state, {
        authorizationStatus: action.payload
      });
    case ActionType.SIGN_IN:
      return Object.assign({}, state, {
        authorizationStatus: AuthStatus.AUTH,
        data: action.payload
      });
  }

  return state;
};

export {ActionCreator, ActionType, ApiCall, reducer};
