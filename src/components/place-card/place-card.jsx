import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {offerType} from '../../types/offers-types.js';
import {convertRatingToProcent} from '../../helpers/transform-helpers.js';
import {PlaceCardType} from '../../../const.js';

const PlaceCard = (props) => {
  const {offer, placeCardType, onMouseEnter, onMouseLeave, onFavoriteClick} = props;
  const {title, price, pricePeriod, thumnnailUrl, objectType, isPremium} = offer;

  const rating = convertRatingToProcent(offer.rating);

  let articleClass;
  let imageWrapperClass;

  switch (placeCardType) {
    case PlaceCardType.CITY:
      articleClass = `cities__place-card`;
      imageWrapperClass = `cities__image-wrapper`;
      break;
    case PlaceCardType.NEAR:
      articleClass = `near-places__card`;
      imageWrapperClass = `near-places__image-wrapper`;
      break;
  }

  const renderCard = () => {
    return (
      <>
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}

        <div className={`${imageWrapperClass} place-card__image-wrapper`}>
          <img
            className="place-card__image"
            src={thumnnailUrl}
            width="260"
            height="200"
            alt="Place image"
          />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;{pricePeriod}</span>
            </div>
            <button
              className={`button ${offer.isFavorite ? `place-card__bookmark-button--active` : `place-card__bookmark-button`}`}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavoriteClick(offer.id, !offer.isFavorite);
              }}
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
            <span>{title}</span>
          </h2>
          <p className="place-card__type">{objectType}</p>
        </div>
      </>
    );
  };

  return (
    <>
      {placeCardType === PlaceCardType.CITY ? (
        <Link
          to={`offer/${offer.id}`}
          className={`${articleClass} place-card`}
          onMouseOver={() => onMouseEnter(offer.id)}
          onMouseLeave={onMouseLeave}
        >
          {renderCard()}
        </Link>
      ) : null}
      {placeCardType === PlaceCardType.NEAR ? (
        <article
          className={`${articleClass} place-card`}
          onMouseOver={() => onMouseEnter(offer.id)}
          onMouseLeave={onMouseLeave}
        >
          {renderCard()}
        </article>
      ) : null}
    </>
  );

};

PlaceCard.defaultProps = {
  placeCardType: PlaceCardType.CITY,
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

PlaceCard.propTypes = {
  offer: offerType.isRequired,
  placeCardType: PropTypes.oneOf([PlaceCardType.CITY, PlaceCardType.NEAR]),
  onFavoriteClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default React.memo(PlaceCard);
