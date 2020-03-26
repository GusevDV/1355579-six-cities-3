import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {offerType} from '../../types/offers-types.js';
import {reviewType} from '../../types/reviews-types.js';
import Header from '../header/header.jsx';
import {convertRatingToProcent} from '../../helpers/transform-helpers';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import ErrorArea from '../error/error-area.jsx';
import ThrobberSwitcher from '../throbber-switcher/throbber-switcher.jsx';
import PlaceCardListNearby from '../place-card-list-nearby/place-card-list-nearby.jsx';
import {mapDisplayType} from '../../../const.js';
import {ApiCall as ReviewsApiCall} from '../../reducer/reviews/reviews.js';
import {ApiCall as NearbyOffersApiCall} from '../../reducer/nearby-offers/nearby-offers.js';
import Map from '../map/map.jsx';
import {ErrorMessage, MAX_REVIEWS_COUNT} from '../../../const.js';

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
      host
    } = this.props.offer;

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
                  <button className="property__bookmark-button button" type="button">
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
                  <ThrobberSwitcher isLoading={this.props.reviews.isLoading} render={() => {
                    if (!this.props.reviews.isError) {
                      return <ReviewsList reviews={this.props.reviews.data} maxReviewsCount={MAX_REVIEWS_COUNT} />;
                    } else {
                      return <ErrorArea message={ErrorMessage.NETWROK_ERROR} />;
                    }
                  }}/>
                  <form className="reviews__form form" action="#" method="post">
                    <label className="reviews__label form__label" htmlFor="review">Your review</label>
                    <div className="reviews__rating-form form__rating">
                      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
                      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
                      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
                      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
                      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>

                      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
                      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
                        <svg className="form__star-image" width="37" height="33">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                      </label>
                    </div>
                    <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                    <div className="reviews__button-wrapper">
                      <p className="reviews__help">
                        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                      </p>
                      <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
                    </div>
                  </form>
                </section>
              </div>
            </div>
            <ThrobberSwitcher isLoading={this.props.nearbyOffers.isLoading} render={() => {
              if (!this.props.nearbyOffers.isError) {
                return (
                  <>
                    <Map
                      mapType={mapDisplayType.PROPERTY}
                      city={this.props.offer.cityCoords}
                      zoom={this.props.offer.cityZoom}
                      offers={[this.props.offer].concat(this.props.nearbyOffers.data)}
                      currentOffer={this.props.offer}
                    />
                    <PlaceCardListNearby nearbyOffers={this.props.nearbyOffers.data} />
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
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
  }),
  fetchReviews: PropTypes.func.isRequired,
  fetchNearbyOffers: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  offer: state.offers.data.find((offer) => offer.id === Number.parseInt(ownProps.offerId, 10)),
  nearbyOffers: state.nearbyOffers,
  reviews: state.reviews
});

const mapDispatchToProps = (dispatch) => ({
  fetchReviews: (offerId) => dispatch(ReviewsApiCall.fetchReviews(offerId)),
  fetchNearbyOffers: (offerId) => dispatch(NearbyOffersApiCall.fetchNearbyOffers(offerId))
});

export {OfferDetail};
export default connect(mapStateToProps, mapDispatchToProps)(OfferDetail);
