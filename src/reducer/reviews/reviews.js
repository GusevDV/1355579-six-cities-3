const initialState = {
  data: [],
  isLoadingFetchReview: false,
  isLoadingCreateReview: false,
  isErrorFetchReview: false,
  isErrorCreateReview: false,
};

const ActionType = {
  FETCH_REVIEWS_START: `FETCH_REVIEWS_START`,
  FETCH_REVIEWS_SUCCESS: `FETCH_REVIEWS_SUCCESS`,
  FETCH_REVIEWS_FAILURE: `FETCH_REVIEWS_FAILURE`,
  CREATE_REVIEW_START: `CREATE_REVIEW_START`,
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
  createReviewStart: () => ({
    type: ActionType.CREATE_REVIEW_START,
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
    dispatch(ActionCreator.createReviewStart());
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
      return Object.assign({}, state, {isLoadingFetchReview: true, isErrorFetchReview: false, isErrorCreateReview: false});
    case ActionType.FETCH_REVIEWS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, isErrorFetchReview: false, isLoadingFetchReview: false});
    case ActionType.FETCH_REVIEWS_FAILURE:
      return Object.assign({}, state, {data: [], isErrorFetchReview: true, isLoadingFetchReview: false});
    case ActionType.CREATE_REVIEW_START:
      return Object.assign({}, state, {data: [], isLoadingCreateReview: true, isErrorCreateReview: false});
    case ActionType.CREATE_REVIEW_SUCCESS:
      return Object.assign({}, state, {data: action.payload, isErrorCreateReview: false, isLoadingCreateReview: false});
    case ActionType.CREATE_REVIEW_FAILURE:
      return Object.assign({}, state, {isErrorCreateReview: true, isLoadingCreateReview: false});
  }

  return state;
};

export {ActionCreator, ActionType, ApiCall, reducer};
