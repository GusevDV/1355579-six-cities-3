import PropTypes from 'prop-types';
import {OfferTypes, CityNames} from '../../const.js';

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
  rating: createRatingPropType(true, 0, 100),
  city: PropTypes.oneOf([CityNames.AMSTERDAM]),
  coords: PropTypes.arrayOf(PropTypes.number).isRequired
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
