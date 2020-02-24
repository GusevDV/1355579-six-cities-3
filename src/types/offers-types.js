import PropTypes from 'prop-types';

export const offerType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  pricePeriod: PropTypes.string.isRequired,
  thumnnailUrl: PropTypes.string.isRequired,
  objectType: PropTypes.string.isRequired,
  badgeText: PropTypes.PropTypes.string,
  rating: createRatingPropType(true, 0, 100)
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
