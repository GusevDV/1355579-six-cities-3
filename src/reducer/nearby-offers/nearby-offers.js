import {transformOffers} from '../../helpers/api-adapters.js';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const ActionType = {
  FETCH_NEARBY_OFFERS_START: `FETCH_NEARBY_OFFERS_START`,
  FETCH_NEARBY_OFFERS_SUCCESS: `FETCH_NEARBY_OFFERS_SUCCESS`,
  FETCH_NEARBY_OFFERS_FAILURE: `FETCH_NEARBY_OFFERS_FAILURE`,
};

const ActionCreator = {
  fetchNearbyOffersStart: () => ({
    type: ActionType.FETCH_NEARBY_OFFERS_START,
  }),
  fetchNearbyOffersSuccess: (content) => ({
    type: ActionType.FETCH_NEARBY_OFFERS_SUCCESS,
    payload: content,
  }),
  fetchNearbyOffersFailure: () => ({
    type: ActionType.FETCH_NEARBY_OFFERS_FAILURE,
  })
};

const ApiCall = {
  fetchNearbyOffers: (hotelId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.fetchNearbyOffersStart());
    return api.get(`/hotels/${hotelId}/nearby`)
      .then((response) => {
        dispatch(ActionCreator.fetchNearbyOffersSuccess(transformOffers(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.fetchNearbyOffersFailure());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_NEARBY_OFFERS_START:
      return Object.assign({}, state, {isLoading: true, isError: false});
    case ActionType.FETCH_NEARBY_OFFERS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, isError: false, isLoading: false});
    case ActionType.FETCH_NEARBY_OFFERS_FAILURE:
      return Object.assign({}, state, {data: [], isError: true, isLoading: false});
  }

  return state;
};

export {ActionCreator, ActionType, ApiCall, reducer};
