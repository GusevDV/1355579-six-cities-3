export const OfferTypes = {
  APARTMENT: `apartment`,
  ROOM: `room`,
  HOUSE: `house`,
  HOTEL: `hotel`,
};
export const MapSettings = {
  ZOOM: 12,
  ICON_URL: `img/pin.svg`,
  ICON_SIZE: [30, 30]
};

export const CityNames = {
  AMSTERDAM: `Amsterdam`,
  PARIS: `Paris`,
};

export const CityCoords = {
  [CityNames.AMSTERDAM]: [52.38333, 4.9],
  [CityNames.PARIS]: [48.8647, 2.3490]
};

export const MAX_CITIES_COUNT = 6;
export const BASE_API_URL = `https://htmlacademy-react-3.appspot.com/six-cities`;
