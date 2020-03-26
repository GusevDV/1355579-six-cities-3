import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = (props) => {
  let {cities} = props;
  const {currentCity, maxCitiesCount} = props;
  cities = cities.slice(0, maxCitiesCount - 1);
  const handleCityLinkClick = (e, name, coords, zoom) => {
    e.preventDefault();
    props.onCityChange({name, coords, zoom});
  };
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city, index) => (
            <li key={`${city.name}-${index}`} className="locations__item">
              <a
                className={`locations__item-link ${city.name === currentCity ? `tabs__item--active` : `tabs__item`}`}
                href="#"
                onClick={(e) => handleCityLinkClick(e, city.name, city.coords, city.zoom)}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired
  })),
  currentCity: PropTypes.string,
  onCityChange: PropTypes.func.isRequired,
  maxCitiesCount: PropTypes.number.isRequired
};

export default CitiesList;
