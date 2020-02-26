import React from 'react';
import PropTypes from 'prop-types';
import {offerType} from '../../types/offers-types.js';

const PlaceCard = (props) => {
  const {offer, onTitleLinkClick, onCardHover, onCardMouseLeave} = props;
  const {title, price, pricePeriod, thumnnailUrl, objectType, isPremium, rating} = offer;
  return (
    <article
      className="cities__place-card place-card"
      onMouseOver={() => onCardHover(offer.id)}
      onMouseLeave={onCardMouseLeave}
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
          <a className="place-card__name-link" href="#" onClick={onTitleLinkClick}>{title}</a>
        </h2>
        <p className="place-card__type">{objectType}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: offerType,
  onTitleLinkClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired
};

export default PlaceCard;
