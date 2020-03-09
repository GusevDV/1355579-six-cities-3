import axios from 'axios';
import BASE_API_URL from '../const.js';

const Error = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

export const createAPI = (onUnauthorized, onBadRequest) => {
  const api = axios.create({
    baseUrl: BASE_API_URL,
    timeout: 5000,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED && typeof onUnauthorized === `function`) {
      onUnauthorized();
      throw err;
    }
    if (response.status === Error.BAD_REQUEST && typeof onBadRequest === `function`) {
      onBadRequest();
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

