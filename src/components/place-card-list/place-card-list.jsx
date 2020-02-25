import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {offerType} from '../../types/offers-types.js';

class PlaceCardList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {},
    };
    this.handleCardHover = this.handleCardHover.bind(this);
    this.renderOfferCard = this.renderOfferCard.bind(this);
    this.handleCardHover = this.handleCardHover.bind(this);
    this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
  }
  handleCardHover(offer) {
    this.setState((prevState) => ({
      activeCard: Object.assign({}, prevState.offer, offer)
    }));
  }
  handleCardMouseLeave() {
    this.setState((prevState) => ({
      activeCard: Object.assign({}, prevState.offer, {})
    }));
  }
  renderOfferCard(offer) {
    return (
      <PlaceCard
        key={offer.title}
        offer={offer}
        onTitleLinkClick={this.props.onTitleLinkClick}
        onCardHover={() => this.handleCardHover(offer)}
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
