import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import Map from '../../components/map/map.jsx';
import CitiesList from '../../components/cities-list/cities-list.jsx';
import {offerType} from '../../types/offers-types.js';
import {CityCoords} from '../../../const.js';
import {ActionCreators} from "../../reducer";

const Main = (props) => {
  const currentOffers = props.offers.filter((offer) => (offer.city === props.city));
  return (
    <div className={`page page--gray page--main ${currentOffers.length || `page__main--index-empty`}`}>
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
        <CitiesList offers={props.offers} currentCity={props.city} onCityLinkClick={props.onCityLinkClick} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentOffers.length} places to stay in {props.city}
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
              <PlaceCardList offers={currentOffers} onTitleLinkClick={props.onTitleLinkClick} />
            </section>
            <div className="cities__right-section">
              {currentOffers.length ? (
                <Map city={CityCoords[props.city]} offers={currentOffers} />
              ) :
                <div className="cities">
                  <div className="cities__places-container cities__places-container--empty container">
                    <section className="cities__no-places">
                      <div className="cities__status-wrapper tabs__content">
                        <b className="cities__status">No places to stay available</b>
                        <p className="cities__status-description">We could not find any property availbale at the moment in Dusseldorf</p>
                      </div>
                    </section>
                    <div className="cities__right-section"></div>
                  </div>
                </div>
              }

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
  city: PropTypes.string.isRequired,
  onCityLinkClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  city: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onCityLinkClick: (e, city) => {
    e.preventDefault();
    dispatch(ActionCreators.changeCity(city));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
