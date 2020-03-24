import React from 'react';
import PropTypes from 'prop-types';
import {createRatingPropType} from '../../types/rating-types.js';

const Review = (props) => {
  const date = new Date(props.date).format(`MM YYYY`);
  const {user, rating, comment} = props;
  return (
    <li className="reviews__item" >
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={`/${user.avatarUrl}`} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: rating}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={props.date}>{date}</time>
      </div>
    </li>
  );
};


Review.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.isRequired,
    isPro: PropTypes.bool,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  rating: createRatingPropType(true, 0, 5),
  comment: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
};

export default Review;
