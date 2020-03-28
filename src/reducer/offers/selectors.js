import {createSelector} from 'reselect';

const getOffers = (state) => state.offers.data;
const getCurrentCity = (state) => state.city.currentCity;

export const getOffersCurrentCity = createSelector(
    getOffers,
    getCurrentCity,
    (offers, city) => (city ? offers.filter((offer) => (offer.city === city)) : offers)
);

const getSortType = (state) => state.offers.sortType;

export const getCurrentSort = createSelector(
    getSortType,
    (sort) => sort
);

const getSortedOffers = (offers, sortType) => {
  switch (sortType) {
    case 1:
      return offers.slice().sort((a, b) => b.price - a.price);
    case 2:
      return offers.slice().sort((a, b) => a.price - b.price);
    case 3:
      return offers.slice().sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
};
export const getOffersWithSort = createSelector(
    getOffersCurrentCity,
    getCurrentSort,
    (offers, sortType) => getSortedOffers(offers, sortType)
);

const getOfferById = (state, props) => props.offerId;

export const getCurrentOffer = createSelector(
    getOffers,
    getOfferById,
    (offers, offerId) => offers.find((offer) => offer.id === Number.parseInt(offerId, 10))
);

export const getHoverOffer = createSelector(
    getOffersWithSort,
    (state) => state.offers.hoverOffer,
    (offers, hoverOffer) => hoverOffer ? offers.find((offer) => offer.id === hoverOffer) : null
);

