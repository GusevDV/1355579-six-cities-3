export const OfferType = {
  APARTMENT: `apartment`,
  ROOM: `room`,
  HOUSE: `house`,
  HOTEL: `hotel`,
};
export const MapSetting = {
  ZOOM: 12,
  ICON_URL: `/img/pin.svg`,
  ICON_URL_ACTIVE: `/img/pin-active.svg`,
  ICON_SIZE: [30, 30]
};

export const ErrorMessage = {
  NETWROK_ERROR: `Нам не удалось получить данные с сервера 😢`,
  COMMON_ERROR: `Что-то пошло не так. Попробуйте повторить попытку 😢`
};

export const MapDisplayType = {
  CITIES: `cities`,
  PROPERTY: `propery`,
};

export const PlaceCardType = {
  CITY: `CITY`,
  NEAR: `NEAR`,
};

export const AuthStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const Route = {
  OFFER_DETALIS: `/offer/:id`,
  LOGIN: `/login/`,
  FAVORITES: `/favorites/`
};

export const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

export const SortIndex = {
  PRICE_LOW_TO_HIGH: 1,
  PRICE_HIGH_TO_LOW: 2,
  TOP_RATED_FIRST: 3
};
export const sortTypes = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

export const MAX_CITIES_COUNT = 6;
export const MAX_REVIEWS_COUNT = 10;
export const BASE_API_URL = `https://htmlacademy-react-3.appspot.com/six-cities`;
