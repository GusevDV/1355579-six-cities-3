const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const ActionType = {
  FETCH_REVIEWS_START: `FETCH_REVIEWS_START`,
  FETCH_REVIEWS_SUCCESS: `FETCH_REVIEWS_SUCCESS`,
  FETCH_REVIEWS_FAILURE: `FETCH_REVIEWS_FAILURE`,
};

const ActionCreator = {
  fetchReviewsStart: () => ({
    type: ActionType.FETCH_REVIEWS_START,
  }),
  fetchReviewsSuccess: (content) => ({
    type: ActionType.FETCH_REVIEWS_SUCCESS,
    payload: content,
  }),
  fetchReviewsFailure: () => ({
    type: ActionType.FETCH_REVIEWS_FAILURE,
  })
};

const ApiCall = {
  fetchReviews: (hotelId) => (dispatch, getState, api) => {
    dispatch(ActionCreator.fetchReviewsStart());
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        dispatch(ActionCreator.fetchReviewsSuccess(response.data));
      })
      .catch(() => {
        dispatch(ActionCreator.fetchReviewsFailure());
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_REVIEWS_START:
      return Object.assign({}, state, {isLoading: true, isError: false});
    case ActionType.FETCH_REVIEWS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, isError: false, isLoading: false});
    case ActionType.FETCH_REVIEWS_FAILURE:
      return Object.assign({}, state, {data: [], isError: true, isLoading: false});
  }

  return state;
};

export {ActionCreator, ActionType, ApiCall, reducer};
