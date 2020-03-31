const initialState = {
  data: [],
  isLoading: false,
  isErrorFetchReview: false,
  isErrorCreateReview: false,
};

const ActionType = {
  FETCH_REVIEWS_START: `FETCH_REVIEWS_START`,
  FETCH_REVIEWS_SUCCESS: `FETCH_REVIEWS_SUCCESS`,
  FETCH_REVIEWS_FAILURE: `FETCH_REVIEWS_FAILURE`,
  CREATE_REVIEW_SUCCESS: `CREATE_REVIEW_SUCCESS`,
  CREATE_REVIEW_FAILURE: `CREATE_REVIEW_FAILURE`,
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
  }),
  createReviewSucces: (data) => ({
    type: ActionType.CREATE_REVIEW_SUCCESS,
    payload: data
  }),
  createReviewFailure: () => ({
    type: ActionType.CREATE_REVIEW_FAILURE,
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
  createReview: (hotelId, data) => (dispatch, getState, api) => {
    return api.post(`/comments/${hotelId}`, data)
    .then((response) => {
      dispatch(ActionCreator.createReviewSucces(response.data));
    })
    .catch(() => {
      dispatch(ActionCreator.createReviewFailure());
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_REVIEWS_START:
      return Object.assign({}, state, {isLoading: true, isErrorFetchReview: false});
    case ActionType.FETCH_REVIEWS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, isErrorFetchReview: false, isLoading: false});
    case ActionType.FETCH_REVIEWS_FAILURE:
      return Object.assign({}, state, {data: [], isErrorFetchReview: true, isLoading: false});
    case ActionType.CREATE_REVIEW_SUCCESS:
      return Object.assign({}, state, {data: action.payload, isErrorCreateReview: false});
    case ActionType.CREATE_REVIEW_FAILURE:
      return Object.assign({}, state, {isErrorCreateReview: true});
  }

  return state;
};

export {ActionCreator, ActionType, ApiCall, reducer};
