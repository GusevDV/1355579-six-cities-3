import axios from 'axios';
import {BASE_API_URL} from './const.js';
import {transformFieldsToCamelCase} from './helpers/transform-helpers.js';

const createAPI = (onUnauthorized) => {

  axios.defaults.withCredentials = true;

  const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 5000,
    transformResponse: [
      (data) => {
        let dataObject;

        try {
          dataObject = JSON.parse(data);
        } catch (error) {
          return data;
        }

        return transformFieldsToCamelCase(dataObject);
      }
    ]
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;
    if (response.status === 401 && typeof onUnauthorized === `function`) {
      onUnauthorized();
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  // checkAuth - request without interceptors
  api.checkAuth = () => axios.get(`${BASE_API_URL}/login/`);

  return api;
};

export default createAPI;
