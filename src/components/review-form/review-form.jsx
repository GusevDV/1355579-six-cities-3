import React from 'react';
import PropTypes from 'prop-types';
import ErrorArea from '../error/error-area.jsx';
import {ErrorMessage} from '../../const.js';

const ReviewForm = (props) => {
  const {rating, comment, isActive, isFormDisabled, isError, onChangeRating, onChangeComment, onFormSubmit} = props;

  const renderStars = () => {
    let elements = [];
    for (let i = 5; i >= 1; i--) {
      const ratingValue = i;
      elements.push(
          <React.Fragment key={`star-${i}`}>
            <input
              checked={rating === i}
              onChange={(event) => onChangeRating(event, ratingValue)}
              className="form__rating-input visually-hidden"
              name="rating"
              value={i}
              id={`${i}-stars`}
              type="radio"
              disabled={isFormDisabled}
            />
            <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
      );
    }
    return elements;
  };
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
      {isError && <ErrorArea message={ErrorMessage.COMMON_ERROR} />}
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {renderStars()}
      </div>
      <textarea
        value={comment}
        onChange={onChangeComment}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isFormDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isActive || isFormDisabled}>Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool,
  rating: PropTypes.number.isRequired,
  isError: PropTypes.bool.isRequired,
  onChangeRating: PropTypes.func.isRequired,
  onChangeComment: PropTypes.func.isRequired
};

ReviewForm.defaultProps = {
  isFormDisabled: false
};

export default ReviewForm;
