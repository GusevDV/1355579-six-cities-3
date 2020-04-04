import {createSelector} from 'reselect';

const getCity = (state) => state.city.currentCity;

export const getCurrentCityName = createSelector(
    getCity,
    (city) => city
);

const getCityCoords = (state) => state.city.coords;

export const getCurrentCityCoords = createSelector(
    getCityCoords,
    (coords) => coords.slice()
);

const getCityZoom = (state) => state.city.zoom;

export const getCurrentCityZoom = createSelector(
    getCityZoom,
    (zoom) => zoom
);

const getUniqueCities = (offers) => {
  const cities = offers.map((offer) => ({
    name: offer.city,
    coords: offer.cityCoords,
    zoom: offer.cityZoom
  }));
  return cities.filter((item, index, self) => (
    index === self.findIndex((element) => (element.name === item.name))
  ));
};
const getOffers = (state) => state.offers.data;

export const getCities = createSelector(
    getOffers,
    (offers) => getUniqueCities(offers)
);


