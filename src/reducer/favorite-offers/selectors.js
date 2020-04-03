import {createSelector} from 'reselect';

const createGroupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});


export const getFavoriteOffersGroupByCity = createSelector(
    (state) => state.favoriteOffers.data,
    (offers) => createGroupBy(`city`)(offers)
);
