import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MainEmpty from '../main-empty/main-empty.jsx';
import PlaceCardList from "../place-card-list/place-card-list.jsx";
import Map from '../map/map.jsx';
import Header from '../header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import SortOptions from '../sort-options/sort-options.jsx';
import {offerType} from '../../types/offers-types.js';
import {ActionCreator as CityActionCreator} from "../../reducer/city/city.js";
import {ActionCreator as OffersActionCreator} from "../../reducer/offers/offers.js";
import {getOffersWithSort, getHoverOffer, getCurrentSort} from "../../reducer/offers/selectors.js";
import * as citySelectors from "../../reducer/city/selectors.js";
import {MAX_CITIES_COUNT, sortTypes} from '../../../const.js';
import withToggle from '../../hocs/with-toggle/with-toggle.js';

const SortOptionsWrapped = withToggle(SortOptions);

const Main = (props) => {
  const {offers, hoverOffer, currentSort, onChangeCity, onChangeSortType, onChangeHoverOffer} = props;
  return (
    <div className={`page page--gray page--main ${offers.length ? `page__main--index-empty` : ``}`}>
      <Header />
      {offers.length ? (
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList
            cities={props.uniqCities}
            currentCity={props.currentCity}
            onCityChange={onChangeCity}
            maxCitiesCount={MAX_CITIES_COUNT}
          />
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers.length} places to stay in {props.currentCity}
                </b>
                <SortOptionsWrapped sortTypes={sortTypes} activeItem={currentSort} onItemClick={(type) => onChangeSortType(type)} />
                <PlaceCardList
                  onMouseEnter={(offer) => onChangeHoverOffer(offer)}
                  onMouseLeave={() => onChangeHoverOffer(null)}
                  offers={offers}
                />
              </section>
              <div className="cities__right-section">
                {props.currentCity ? (
                  <Map city={props.cityCoords} zoom={props.cityZoom} offers={offers} currentOffer={hoverOffer} />
                ) : null}
              </div>
            </div>
          </div>
        </main>
      ) : (<MainEmpty />)}
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(offerType.isRequired).isRequired,
  currentCity: PropTypes.string,
  cityCoords: PropTypes.array,
  cityZoom: PropTypes.number,
  uniqCities: PropTypes.array.isRequired,
  hoverOffer: offerType,
  onChangeCity: PropTypes.func.isRequired,
  onChangeSortType: PropTypes.func.isRequired,
  onChangeHoverOffer: PropTypes.func.isRequired,
  currentSort: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  offers: getOffersWithSort(state),
  currentCity: citySelectors.getCurrentCityName(state),
  cityCoords: citySelectors.getCurrentCityCoords(state),
  cityZoom: citySelectors.getCurrentCityZoom(state),
  uniqCities: citySelectors.getCities(state),
  hoverOffer: getHoverOffer(state),
  currentSort: getCurrentSort(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeCity: (city) => dispatch(CityActionCreator.changeCity(city)),
  onChangeSortType: (sortType) => dispatch(OffersActionCreator.changeSortType(sortType)),
  onChangeHoverOffer: (offer) => dispatch(OffersActionCreator.changeHoverOffer(offer))
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
