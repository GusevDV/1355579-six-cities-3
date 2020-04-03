import {transformOffers} from '../../helpers/api-adapters.js';
import {ActionType as OffersActionType} from '../offers/offers.js';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const ActionType = {
  FETCH_FAVORITE_OFFERS_START: `FETCH_FAVORITE_OFFERS_START`,
  FETCH_FAVORITE_OFFERS_SUCCESS: `FETCH_FAVORITE_OFFERS_SUCCESS`,
  FETCH_FAVORITE_OFFERS_FAILURE: `FETCH_FAVORITE_OFFERS_FAILURE`,
};

const ActionCreator = {
  fetchFavoriteOffersStart: () => ({
    type: ActionType.FETCH_FAVORITE_OFFERS_START,
  }),
  fetchFavoriteOffersSuccess: (content) => ({
    type: ActionType.FETCH_FAVORITE_OFFERS_SUCCESS,
    payload: content,
  }),
  fetchFavoriteOffersFailure: () => ({
    type: ActionType.FETCH_FAVORITE_OFFERS_FAILURE,
  }),
};

const ApiCall = {
  fetchFavoriteOffers: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.fetchFavoriteOffersStart());
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.fetchFavoriteOffersSuccess(transformOffers(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.fetchFavoriteOffersFailure());
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_FAVORITE_OFFERS_START:
      return Object.assign({}, state, {isLoading: true, isError: false});
    case ActionType.FETCH_FAVORITE_OFFERS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, isError: false, isLoading: false});
    case ActionType.FETCH_FAVORITE_OFFERS_FAILURE:
      return Object.assign({}, state, {data: [], isError: true, isLoading: false});
    case OffersActionType.UPDATE_OFFER:
      return Object.assign({}, state, {
        data: state.data.filter((offer) => offer.id !== action.payload.id)
      });
  }

  return state;
};

export {ActionCreator, ActionType, ApiCall, reducer};
