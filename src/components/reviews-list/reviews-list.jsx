import React from 'react';
import PropTypes from 'prop-types';
import {reviewType} from '../../types/reviews-types.js';
import Review from '../review/review.jsx';

const ReviewsList = (props) => {
  return (
    <>
      <h2 classnName="reviews__title">Reviews &middot; <span className="reviews__amount">{props.reviews.length}</span></h2>
      <ul className="reviews__list">
        {props.reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.shape(reviewType).isRequired
};

export default ReviewsList;

