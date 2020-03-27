import PropTypes from 'prop-types';
import {OfferTypes} from '../../const.js';

export const offerType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  pricePeriod: PropTypes.string.isRequired,
  thumnnailUrl: PropTypes.string.isRequired,
  objectType: PropTypes.oneOf([
    OfferTypes.APARTMENT,
    OfferTypes.HOTEL,
    OfferTypes.HOUSE,
    OfferTypes.ROOM]
  ).isRequired,
  isPremium: PropTypes.bool.isRequired,
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
}).isRequired;

function createRatingPropType(isRequired, min, max) {
  return function (props, propName) {
    const prop = props[propName];
    if (prop === null) {
      if (isRequired) {
        return new Error(`The prop ${propName} is marked as required`);
      }
    } else {
      if (props[propName] < min || props[propName] > max) {
        return new Error(`The ${propName} must be between ${min} and ${max}`);
      }
    }
    return null;
  };
}
