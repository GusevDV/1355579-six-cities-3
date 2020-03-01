import {CityNames} from '../const.js';
import offers from './mocks/offers.js';
const initialState = {
  city: CityNames.AMSTERDAM,
  offers
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreators = {
  changeCity: (city) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: city,
  }),
  getOffers: (content) => ({
    type: ActionTypes.GET_OFFERS,
    payload: content,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});
    case ActionTypes.GET_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
  }

  return state;
};

export {ActionCreators, ActionTypes, reducer};
