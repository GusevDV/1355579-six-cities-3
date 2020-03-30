import {createSelector} from 'reselect';

export const getNearbyOffers = createSelector(
    (state) => state.nearbyOffers,
    (nearbyOffers) => nearbyOffers
);
