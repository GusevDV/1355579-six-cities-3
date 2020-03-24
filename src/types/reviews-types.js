import PropTypes from 'prop-types';
import {createRatingPropType} from './rating-types.js';

export const reviewType = {
  user: PropTypes.shape({
    id: PropTypes.isRequired,
    isPro: PropTypes.bool,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  rating: createRatingPropType(true, 0, 5),
  comment: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date),
};

