import {CityNames} from '../const.js';
import offers from './mocks/offers.js';
const initialState = {
  city: CityNames.AMSTERDAM,
  offers
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  SET_OFFERS: `SET_OFFERS`,
  CHANGE_CURRENT_HOVER_OFFER_ID: `CHANGE_HOVER_OFFER`
};

const ActionCreators = {
  changeCity: (city) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: city,
  }),
  setOffers: (content) => ({
    type: ActionTypes.SET_OFFERS,
    payload: content,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});
    case ActionTypes.SET_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
  }

  return state;
};

export {ActionCreators, ActionTypes, reducer};
