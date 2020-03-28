import {createSelector} from 'reselect';

export const getReviews = createSelector(
    (state) => state.reviews,
    (reviews) => Object.assign({}, reviews)
);
