import {createSelector} from 'reselect';

const createGroupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, object) => {
    const value = object[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(object);
    return objectsByKeyValue;
  }, {});


export const getFavoriteOffersGroupByCity = createSelector(
    (state) => state.favoriteOffers.data,
    (offers) => createGroupBy(`city`)(offers)
);
