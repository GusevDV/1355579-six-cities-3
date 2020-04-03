import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {offerType} from '../../types/offers-types.js';
import {reviewType} from '../../types/reviews-types.js';
import Header from '../header/header.jsx';
import {convertRatingToProcent} from '../../helpers/transform-helpers';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import withReviewForm from '../../hocs/with-review-form/with-review-form.js';
import ErrorArea from '../error/error-area.jsx';
import ThrobberSwitcher from '../throbber-switcher/throbber-switcher.jsx';
import PlaceCardListNearby from '../place-card-list-nearby/place-card-list-nearby.jsx';
import {ApiCall as OffersApiCall} from '../../reducer/offers/offers.js';
import {ApiCall as ReviewsApiCall} from '../../reducer/reviews/reviews.js';
import {ApiCall as NearbyOffersApiCall} from '../../reducer/nearby-offers/nearby-offers.js';
import {getCurrentOffer} from '../../reducer/offers/selectors.js';
import {getNearbyOffers} from '../../reducer/nearby-offers/selectors.js';
import {getAuthStatus} from '../../reducer/user/selectors.js';
import {getReviews} from '../../reducer/reviews/selectors.js';
import {authType} from '../../types/user-types.js';
import Map from '../map/map.jsx';
import {ErrorMessage, MAX_REVIEWS_COUNT, MapDisplayType} from '../../const.js';

const ReviewFormWrapped = withReviewForm(ReviewForm);

class OfferDetail extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchReviews(this.props.offerId);
    this.props.fetchNearbyOffers(this.props.offerId);
  }

  render() {
    const {
      title,
      description,
      price,
      pricePeriod,
      objectType,
      images,
      maxAdults,
      bedrooms,
      goods,
      isPremium,
      isFavorite,
      host
    } = this.props.offer;

    const {offerId, onChangeFavoriteStatus} = this.props;

    const rating = convertRatingToProcent(this.props.offer.rating);
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {images.map((image, i)=>(
                  <div key={i} className="property__image-wrapper">
                    <img className="property__image" src={image} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{title}</h1>
                  <button
                    className={`property__bookmark-button button ${isFavorite ? `property__bookmark-button--active` : ``}`}
                    type="button"
                    onClick={() => onChangeFavoriteStatus(offerId, !isFavorite)}
                  >
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: rating}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{this.props.offer.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {objectType}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;{pricePeriod}</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {goods.map((item, i) => (
                      <li key={i} className="property__inside-item">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro ? `property__avatar-wrapper--pro` : ``}`}>
                      <img className="property__avatar user__avatar" src={`/${host.avatarUrl}`} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {host.name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <ThrobberSwitcher isLoading={this.props.reviews.isLoadingFetchReview} render={() => {
                    if (!this.props.reviews.isErrorFetchReview) {
                      return <ReviewsList reviews={this.props.reviews.data} maxReviewsCount={MAX_REVIEWS_COUNT} />;
                    } else {
                      return <ErrorArea message={ErrorMessage.NETWROK_ERROR} />;
                    }
                  }}/>
                  {this.props.isAuthorized ? (
                    <ReviewFormWrapped
                      isError={this.props.reviews.isErrorCreateReview}
                      isFormDisabled={this.props.reviews.isLoadingCreateReview}
                      onSubmit={(data) => this.props.onCreateReview(this.props.offerId, data)}
                    />
                  ) : null}
                </section>
              </div>
            </div>
            <ThrobberSwitcher isLoading={this.props.nearbyOffers.isLoading} render={() => {
              if (!this.props.nearbyOffers.isError) {
                return (
                  <>
                    <Map
                      mapType={MapDisplayType.PROPERTY}
                      city={this.props.offer.cityCoords}
                      zoom={this.props.offer.cityZoom}
                      offers={[this.props.offer].concat(this.props.nearbyOffers.data)}
                      currentOffer={this.props.offer}
                    />
                    <PlaceCardListNearby nearbyOffers={this.props.nearbyOffers.data} onFavoriteClick={onChangeFavoriteStatus} />
                  </>
                );
              } else {
                return <ErrorArea message={ErrorMessage.NETWROK_ERROR} />;
              }
            }}/>
          </section>
        </main>
      </div>
    );
  }
}

OfferDetail.propTypes = {
  offer: offerType.isRequired,
  nearbyOffers: PropTypes.shape({
    data: PropTypes.arrayOf(offerType.isRequired).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
  }),
  offerId: PropTypes.string.isRequired,
  reviews: PropTypes.shape({
    data: PropTypes.arrayOf(reviewType).isRequired,
    isLoadingFetchReview: PropTypes.bool.isRequired,
    isLoadingCreateReview: PropTypes.bool.isRequired,
    isErrorFetchReview: PropTypes.bool.isRequired,
    isErrorCreateReview: PropTypes.bool.isRequired
  }),
  fetchReviews: PropTypes.func.isRequired,
  fetchNearbyOffers: PropTypes.func.isRequired,
  isAuthorized: authType.isRequired,
  onCreateReview: PropTypes.func.isRequired,
  onChangeFavoriteStatus: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  offer: getCurrentOffer(state, ownProps),
  nearbyOffers: getNearbyOffers(state),
  reviews: getReviews(state),
  isAuthorized: getAuthStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchReviews: (offerId) => dispatch(ReviewsApiCall.fetchReviews(offerId)),
  fetchNearbyOffers: (offerId) => dispatch(NearbyOffersApiCall.fetchNearbyOffers(offerId)),
  onCreateReview: (hotelId, data) => dispatch(ReviewsApiCall.createReview(hotelId, data)),
  onChangeFavoriteStatus: (hotelId, status) => dispatch(OffersApiCall.changeOfferFavoriteStatus(hotelId, status))
});

export {OfferDetail};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetail);
