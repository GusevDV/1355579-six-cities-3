import React from 'react';
import PropTypes from 'prop-types';
import {reviewType} from '../../types/reviews-types.js';
import Review from '../review/review.jsx';

const ReviewsList = (props) => {
  const reviews = props.reviews.slice(0, props.maxReviewsCount - 1);
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{props.reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewType).isRequired,
  maxReviewsCount: PropTypes.number.isRequired,
};

export default ReviewsList;

