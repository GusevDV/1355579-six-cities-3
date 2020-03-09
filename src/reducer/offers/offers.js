const initialState = {
  offers: []
};

const ActionTypes = {
  SET_OFFERS: `SET_OFFERS`,
};

const ActionCreators = {
  setOffers: (content) => ({
    type: ActionTypes.SET_OFFERS,
    payload: content,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
  }

  return state;
};

export {ActionCreators, ActionTypes, reducer};
