
const initialState = {
  currentCity: null,
  coords: [],
  zoom: 0
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
};

const ActionCreator = {
  changeCity: (payload) => ({
    type: ActionType.CHANGE_CITY,
    payload,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        currentCity: action.payload.name,
        coords: action.payload.coords,
        zoom: action.payload.zoom,
      });
  }

  return state;
};

export {ActionCreator, ActionType, reducer};
