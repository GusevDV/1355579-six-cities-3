import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerType} from '../../types/offers-types.js';
import {convertRatingToProcent} from '../../helpers/transform-helpers.js';

const PlaceCard = (props) => {
  const {offer, onMouseEnter, onMouseLeave} = props;
  const {title, price, pricePeriod, thumnnailUrl, objectType, isPremium} = offer;
  const rating = convertRatingToProcent(offer.rating);
  return (
    <article
      className="cities__place-card place-card"
      onMouseOver={() => onMouseEnter(offer.id)}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={thumnnailUrl}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;{pricePeriod}</span>
          </div>
          <button
            className="place-card__bookmark-button button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link className="place-card__name-link" to={`offer/${offer.id}`} >{title}</Link>
        </h2>
        <p className="place-card__type">{objectType}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: offerType,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default React.memo(PlaceCard);
