const initialState = {
  city: null,
  offers: null,
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionTypes.CHANGE_CITY,
    payload: city,
  }),
  getOffers: (offers) => ({
    type: ActionTypes.GET_OFFERS,
    payload: offers,
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

export {ActionCreator, ActionTypes, reducer};
