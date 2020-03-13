import {CityNames} from '../../../const.js';

const initialState = {
  city: CityNames.AMSTERDAM
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
};

const ActionCreators = {
  changeCity: (city) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: city,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return Object.assign({}, state, {city: action.payload});
  }

  return state;
};

export {ActionCreators, ActionTypes, reducer};
