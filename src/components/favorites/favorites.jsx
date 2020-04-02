import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import {connect} from 'react-redux';
import {PlaceCardType} from '../../const.js';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import {ApiCall as FavoriteOffersApiCall} from '../../reducer/favorite-offers/favorite-offers.js';
import {ApiCall as OffersApiCall} from "../../reducer/offers/offers.js";
import {getFavoriteOffersGroupByCity} from '../../reducer/favorite-offers/selectors.js';
import {offerType} from '../../types/offers-types.js';
import FavoritesEmpty from '../favorites-empty/favorites-empty.jsx';
import ThrobberSwitcher from '../throbber-switcher/throbber-switcher.jsx';

class Favorites extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchFavoriteOffers();
  }
  render() {
    const {offersGroup, isLoading, isError, onChangeFavoriteStatus} = this.props;
    return (
      <div className="page">
        <Header />
        <ThrobberSwitcher isLoading={isLoading} render={() => {
          if (Object.keys(offersGroup).length && !isError) {
            return (
              <main className="page__main page__main--favorites">
                <div className="page__favorites-container container">
                  <section className="favorites">
                    <h1 className="favorites__title">Saved listing</h1>
                    <ul className="favorites__list">
                      {Object.keys(offersGroup).map((city) => (
                        <li key={city} className="favorites__locations-items">
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <a className="locations__item-link" href="#">
                                <span>{city}</span>
                              </a>
                            </div>
                          </div>
                          <PlaceCardList
                            offers={offersGroup[city]}
                            placeCardType={PlaceCardType.FAVORITE}
                            onFavoriteClick={onChangeFavoriteStatus}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </main>
            );
          } else {
            return <FavoritesEmpty/>;
          }
        }}/>
        <Footer />
      </div>
    );
  }
}

Favorites.propTypes = {
  offersGroup: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(offerType.isRequired)
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onFetchFavoriteOffers: PropTypes.func.isRequired,
  onChangeFavoriteStatus: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offersGroup: getFavoriteOffersGroupByCity(state),
  isLoading: state.favoriteOffers.isLoading,
  isError: state.favoriteOffers.isError
});

const mapDispatchToProps = (dispatch) => ({
  onFetchFavoriteOffers: () => dispatch(FavoriteOffersApiCall.fetchFavoriteOffers()),
  onChangeFavoriteStatus: (hotelId, status) => dispatch(OffersApiCall.changeOfferFavoriteStatus(hotelId, status))
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);


