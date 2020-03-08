import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {offerType} from '../../types/offers-types.js';

const PlaceCardList = (props) => {
  const {offers} = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onTitleLinkClick={props.onTitleLinkClick}
          onCardHover={() => props.onCardHover(offer.id)}
          onCardMouseLeave={props.onCardMouseLeave}
        />
      ))}
    </div>
  );

};
PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired,
  onTitleLinkClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired
};

export default PlaceCardList;
