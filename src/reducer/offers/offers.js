import {transformOffers, transformOffer} from '../../helpers/api-adapters.js';
import {ActionCreator as CityActions} from "../city/city.js";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  sortType: 0,
  hoverOffer: null,
};

const ActionType = {
  FETCH_OFFERS_START: `FETCH_OFFERS_START`,
  FETCH_OFFERS_SUCCESS: `FETCH_OFFERS_SUCCESS`,
  FETCH_OFFERS_FAILURE: `FETCH_OFFERS_FAILURE`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  CHANGE_HOVER_OFFER: `CHANGE_HOVER_OFFER`,
  UPDATE_OFFER: `UPDATE_OFFER`,
};

const ActionCreator = {
  fetchOffersStart: () => ({
    type: ActionType.FETCH_OFFERS_START,
  }),
  fetchOffersSuccess: (content) => ({
    type: ActionType.FETCH_OFFERS_SUCCESS,
    payload: content,
  }),
  fetchOffersFailure: () => ({
    type: ActionType.FETCH_OFFERS_FAILURE,
  }),
  changeSortType: (type) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: type,
  }),
  changeHoverOffer: (offer) => ({
    type: ActionType.CHANGE_HOVER_OFFER,
    payload: offer,
  }),
  updateOffer: (offer) => ({
    type: ActionType.UPDATE_OFFER,
    payload: offer,
  })
};

const ApiCall = {
  fetchOffers: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.fetchOffersStart());
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.fetchOffersSuccess(transformOffers(response.data)));
        dispatch(CityActions.changeCity({
          name: response.data[0].city.name,
          coords: [response.data[0].city.location.latitude, response.data[0].city.location.longitude],
          zoom: response.data[0].city.location.zoom,
        }));
      })
      .catch(() => {
        dispatch(ActionCreator.fetchOffersFailure());
      });
  },
  changeOfferFavoriteStatus: (offerId, status) => (dispatch, getState, api) => {
    const statusNumber = Number(status);
    return api.post(`/favorite/${offerId}/${statusNumber}`)
      .then((response) => {
        dispatch(ActionCreator.updateOffer(transformOffer(response.data)));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_OFFERS_START:
      return Object.assign({}, state, {isLoading: true, isError: false});
    case ActionType.FETCH_OFFERS_SUCCESS:
      return Object.assign({}, state, {data: action.payload.slice(), isError: false, isLoading: false});
    case ActionType.FETCH_OFFERS_FAILURE:
      return Object.assign({}, state, {data: [], isError: true, isLoading: false});
    case ActionType.UPDATE_OFFER:
      return Object.assign({}, state, {
        data: state.data.map((offer) => offer.id === action.payload.id ? action.payload : offer)
      });
    case ActionType.CHANGE_SORT_TYPE:
      return Object.assign({}, state, {sortType: action.payload});
    case ActionType.CHANGE_HOVER_OFFER:
      return Object.assign({}, state, {hoverOffer: action.payload});
  }

  return state;
};

export {ActionCreator, ActionType, ApiCall, reducer};
