import PropTypes from 'prop-types';
import {PlaceCardType} from '../const.js';

export const placeCardType = PropTypes.oneOf([
  PlaceCardType.CITY,
  PlaceCardType.NEAR,
  PlaceCardType.FAVORITE
]);
