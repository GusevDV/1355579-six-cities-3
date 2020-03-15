import {transformOffers} from '../../helpers/api-adapters.js';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const ActionTypes = {
  FETCH_OFFERS_START: `FETCH_OFFERS_START`,
  FETCH_OFFERS_SUCCESS: `FETCH_OFFERS_SUCCESS`,
  FETCH_OFFERS_FAILURE: `FETCH_OFFERS_FAILURE`,
};

const ActionCreators = {
  fetchOffersStart: () => ({
    type: ActionTypes.FETCH_OFFERS_START,
  }),
  fetchOffersSuccess: (content) => ({
    type: ActionTypes.FETCH_OFFERS_SUCCESS,
    payload: content,
  }),
  fetchOffersFailure: () => ({
    type: ActionTypes.FETCH_OFFERS_FAILURE,
  })
};

const ApiCalls = {
  fetchOffers: (callbackAction) => (dispatch, getState, api) => {
    dispatch(ActionCreators.fetchOffersStart());
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreators.fetchOffersSuccess(transformOffers(response.data)));
        if (callbackAction) {
          dispatch(callbackAction());
        }
      })
      .catch(() => {
        dispatch(ActionCreators.fetchOffersFailure());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFERS_START:
      return Object.assign({}, state, {isLoading: true});
    case ActionTypes.FETCH_OFFERS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, isError: false, isLoading: false});
    case ActionTypes.FETCH_OFFERS_FAILURE:
      return Object.assign({}, state, {data: [], isError: true, isLoading: false});
  }

  return state;
};

export {ActionCreators, ActionTypes, ApiCalls, reducer};
