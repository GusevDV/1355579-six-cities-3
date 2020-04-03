import {AuthStatus} from '../../const.js';

const initialState = {
  authorizationStatus: AuthStatus.NO_AUTH,
  data: {}
};

const ActionType = {
  SIGN_IN: `SIGN_IN`,
  SIGN_OUT: `SIGN_OUT`,
};

const ActionCreator = {
  signIn: (data) => ({
    type: ActionType.SIGN_IN,
    payload: data
  }),
  signOut: () => ({
    type: ActionType.SIGN_OUT,
  })
};

const ApiCall = {
  getAuthStatus: () => (dispatch, getState, api) => {
    return api.checkAuth()
      .then((response) => {
        dispatch(ActionCreator.signIn(response.data));
      })
      .catch(() => {
        dispatch(ActionCreator.signOut());
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
    case ActionType.SIGN_OUT:
      return Object.assign({}, state, {
        authorizationStatus: AuthStatus.NO_AUTH,
        data: {}
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
