import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import Map from '../../components/map/map.jsx';
import CitiesList from '../../components/cities-list/cities-list.jsx';
import {offerType} from '../../types/offers-types.js';
import {CityCoords} from '../../../const.js';
import {ActionCreators} from "../../reducer";
import {MAX_CITIES_COUNT} from '../../../const.js';
import withPlaceCardList from '../../hocs/with-place-card-list/with-place-card-list.js';

const PlaceCardListWrapped = withPlaceCardList(PlaceCardList);

const Main = (props) => {
  const currentOffers = props.offers.filter((offer) => (offer.city === props.currentCity));
  return (
    <div className={`page page--gray page--main ${currentOffers.length ? `page__main--index-empty` : ``}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
              <PlaceCardListWrapped offers={currentOffers} onTitleLinkClick={props.onTitleLinkClick} />
            </section>
            <div className="cities__right-section">
              <Map city={CityCoords[props.currentCity]} offers={currentOffers} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired,
  onTitleLinkClick: PropTypes.func.isRequired,
  currentCity: PropTypes.string.isRequired,
  changeCity: PropTypes.func.isRequired,
  uniqCities: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  currentCity: state.city,
  uniqCities: (function () {
    const cities = state.offers.map((offer) => offer.city);
    return cities.filter((city, index) => cities.indexOf(city) === index);
  })()
});

const mapDispatchToProps = (dispatch) => ({
  changeCity: (city) => dispatch(ActionCreators.changeCity(city))
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
