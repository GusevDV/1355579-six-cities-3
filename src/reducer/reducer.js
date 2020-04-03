import {combineReducers} from "redux";
import {reducer as city} from "./city/city.js";
import {reducer as offers} from "./offers/offers.js";
import {reducer as favoriteOffers} from "./favorite-offers/favorite-offers.js";
import {reducer as nearbyOffers} from "./nearby-offers/nearby-offers.js";
import {reducer as reviews} from './reviews/reviews.js';
import {reducer as user} from './user/user.js';

export default combineReducers({
  city,
  offers,
  favoriteOffers,
  nearbyOffers,
  reviews,
  user
});
