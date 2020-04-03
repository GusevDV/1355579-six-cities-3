import PropTypes from 'prop-types';
import {OfferType} from '../const.js';
import {createRatingPropType} from './rating-types.js';

export const offerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  pricePeriod: PropTypes.string.isRequired,
  thumnnailUrl: PropTypes.string.isRequired,
  objectType: PropTypes.oneOf([
    OfferType.APARTMENT,
    OfferType.HOTEL,
    OfferType.HOUSE,
    OfferType.ROOM]
  ).isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  maxAdults: PropTypes.number.isRequired,
  rating: createRatingPropType(true, 0, 5),
  goods: PropTypes.array.isRequired,
  host: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
  city: PropTypes.string.isRequired,
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
});
