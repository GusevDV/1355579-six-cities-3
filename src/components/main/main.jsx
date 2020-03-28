import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import Map from '../map/map.jsx';
import Header from '../header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import {offerType} from '../../types/offers-types.js';
import {ActionCreator} from "../../reducer/city/city.js";
import {MAX_CITIES_COUNT} from '../../../const.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

const PlaceCardListWrapped = withActiveItem(PlaceCardList);

const Main = (props) => {
  const currentOffers = props.offers.filter((offer) => (offer.city === props.currentCity));
  return (
    <div className={`page page--gray page--main ${currentOffers.length ? `page__main--index-empty` : ``}`}>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          cities={props.uniqCities}
          currentCity={props.currentCity}
          onCityChange={props.changeCity}
          maxCitiesCount={MAX_CITIES_COUNT}
        />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentOffers.length} places to stay in {props.currentCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex="0"
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex="0">
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex="0">
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex="0">
                    Top rated first
                  </li>
                </ul>
              </form>
              <PlaceCardListWrapped offers={currentOffers} />
            </section>
            <div className="cities__right-section">
              {props.currentCity ? (
                <Map city={props.cityCoords} zoom={props.cityZoom} offers={currentOffers} />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(offerType.isRequired).isRequired,
  currentCity: PropTypes.string,
  cityCoords: PropTypes.array,
  cityZoom: PropTypes.number,
  changeCity: PropTypes.func.isRequired,
  uniqCities: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  offers: state.offers.data,
  currentCity: state.city.currentCity,
  cityCoords: state.city.coords,
  cityZoom: state.city.zoom,
  uniqCities: (function () {
    const cities = state.offers.data.map((offer) => ({
      name: offer.city,
      coords: offer.cityCoords,
      zoom: offer.cityZoom
    }));
    return cities.filter((item, index, self) => (
      index === self.findIndex((t) => (t.name === item.name))
    ));
  })(),
});

const mapDispatchToProps = (dispatch) => ({
  changeCity: (city) => dispatch(ActionCreator.changeCity(city))
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
