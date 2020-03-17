
const initialState = {
  currentCity: null,
  coords: [],
  zoom: 0
};

const ActionTypes = {
  CHANGE_CITY: `CHANGE_CITY`,
};

const ActionCreators = {
  changeCity: (payload) => ({
    type: ActionTypes.CHANGE_CITY,
    payload,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_CITY:
      return Object.assign({}, state, {
        currentCity: action.payload.name,
        coords: action.payload.coords,
        zoom: action.payload.zoom,
      });
  }

  return state;
};

export {ActionCreators, ActionTypes, reducer};
