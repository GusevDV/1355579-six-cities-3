import {transformOffers} from '../../helpers/api-adapters.js';
import {ActionCreators as CityActions} from "../city/city.js";

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
  fetchOffers: () => (dispatch, getState, api) => {
    dispatch(ActionCreators.fetchOffersStart());
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreators.fetchOffersSuccess(transformOffers(response.data)));
        dispatch(CityActions.changeCity({
          name: response.data[0].city.name,
          coords: [response.data[0].city.location.latitude, response.data[0].city.location.longitude],
          zoom: response.data[0].city.location.zoom,
        }));
      })
      .catch(() => {
        dispatch(ActionCreators.fetchOffersFailure());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFERS_START:
      return Object.assign({}, state, {isLoading: true, isError: false});
    case ActionTypes.FETCH_OFFERS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, isError: false, isLoading: false});
    case ActionTypes.FETCH_OFFERS_FAILURE:
      return Object.assign({}, state, {data: [], isError: true, isLoading: false});
  }

  return state;
};

export {ActionCreators, ActionTypes, ApiCalls, reducer};
