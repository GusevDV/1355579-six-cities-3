import React from 'react';
import PropTypes from 'prop-types';
import {offerType} from '../../types/offers-types.js';
import {MAX_CITIES_COUNT} from '../../../const.js';

const CitiesList = (props) => {
  const {offers, currentCity} = props;
  const cities = offers.map((offer) => offer.city);
  let uniqCities = cities.filter((city, index) => cities.indexOf(city) === index);
  uniqCities.slice(0, MAX_CITIES_COUNT - 1);
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {uniqCities.map((city) => (
            <li key={city} className="locations__item">
              <a className={`locations__item-link ${city === currentCity ? `tabs__item--active` : `tabs__item`}`} href="#" onClick={(e) => props.onCityLinkClick(e, city)}>
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

CitiesList.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityLinkClick: PropTypes.func.isRequired
};

export default CitiesList;
