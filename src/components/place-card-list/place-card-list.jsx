import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {offerType} from '../../types/offers-types.js';

class PlaceCardList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardId: null,
    };

    this.handleCardHover = this.handleCardHover.bind(this);
    this.renderOfferCard = this.renderOfferCard.bind(this);
    this.handleCardHover = this.handleCardHover.bind(this);
    this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
  }
  handleCardHover(offerId) {
    this.setState({
      activeCardId: offerId
    });
  }
  handleCardMouseLeave() {
    this.setState({
      activeCardId: null
    });
  }
  renderOfferCard(offer) {
    return (
      <PlaceCard
        key={offer.id}
        offer={offer}
        onTitleLinkClick={this.props.onTitleLinkClick}
        onCardHover={() => this.handleCardHover(offer.id)}
        onCardMouseLeave={this.handleCardMouseLeave}
      />
    );
  }
  render() {
    const {offers} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map(this.renderOfferCard)}
      </div>
    );
  }
}
PlaceCardList.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired,
  onTitleLinkClick: PropTypes.func.isRequired
};

export default PlaceCardList;
