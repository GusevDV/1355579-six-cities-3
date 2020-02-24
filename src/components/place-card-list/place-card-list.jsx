import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {offerType} from '../../types/offers-types.js';

class PlaceCardList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardId: 0,
    };
  }
  renderOfferCard(offer) {
    return (
      <PlaceCard
        key={offer.title}
        offer={offer}
        onTitleLinkClick={()=>{}}
      />
    );
  }
  render() {
    const {offers} = this.props;
    return (
      <>
        {offers.map(this.renderOfferCard)}
      </>
    );
  }
}
PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired
};

export default PlaceCardList;
