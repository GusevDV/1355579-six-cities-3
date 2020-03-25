import {combineReducers} from "redux";
import {reducer as city} from "./city/city.js";
import {reducer as offers} from "./offers/offers.js";
import {reducer as reviews} from './reviews/reviews.js';

export default combineReducers({
  city,
  offers,
  reviews,
});
