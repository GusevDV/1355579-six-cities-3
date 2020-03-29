import React from 'react';
import {reviewType} from '../../types/reviews-types.js';
import {convertRatingToProcent} from '../../helpers/transform-helpers.js';
import {monthNames} from '../../../const.js';

const Review = React.memo(function Review(props) {
  let date = new Date(props.review.date);
  date = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  const {user, comment} = props.review;
  const rating = convertRatingToProcent(props.review.rating);
  return (
    <li className="reviews__item" >
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={`${user.avatarUrl}`} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={props.review.date}>{date}</time>
      </div>
    </li>
  );
});


Review.propTypes = {
  review: reviewType,
};

export default Review;
