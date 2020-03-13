const initialState = {
  offers: []
};

const ActionTypes = {
  FETCH_OFFERS: `FETCH_OFFERS`,
};

const ActionCreators = {
  fetchOffers: (content) => ({
    type: ActionTypes.FETCH_OFFERS,
    payload: content,
  })
};

const ApiCalls = {
  fetchOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreators.fetchOffers(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_OFFERS:
      return Object.assign({}, state, {offers: action.payload});
  }

  return state;
};

export {ActionCreators, ActionTypes, ApiCalls, reducer};
