import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {offerType} from '../../types/offers-types.js';
import {PlaceCardType} from '../../const.js';
import {placeCardType as placeType} from '../../types/place-types.js';

const PlaceCardList = React.memo(function PlaceCardList(props) {
  const {offers, placeCardType, onMouseEnter, onMouseLeave, onFavoriteClick} = props;

  let parentBlockClass;
  switch (placeCardType) {
    case PlaceCardType.CITY:
      parentBlockClass = `cities__places-list`;
      break;
    case PlaceCardType.FAVORITE:
      parentBlockClass = `favorites__places`;
      break;
  }

  return (
    <div className={`${parentBlockClass} places__list tabs__content`}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFavoriteClick={onFavoriteClick}
          placeCardType={placeCardType}
        />
      ))}
    </div>
  );

});

PlaceCardList.defaultProps = {
  placeCardType: PlaceCardType.CITY,
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(offerType.isRequired).isRequired,
  placeCardType: placeType,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onFavoriteClick: PropTypes.func.isRequired
};

export default PlaceCardList;
