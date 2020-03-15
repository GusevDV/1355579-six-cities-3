import React from "react";
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer.js';
import thunk from 'redux-thunk';
import createAPI from './api.js';
import {ApiCalls as offerApi} from "./reducer/offers/offers.js";
import {ActionCreators as CityActions} from "./reducer/city/city.js";

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(offerApi.fetchOffers(() => CityActions.changeCity({
  city: store.getState().offers.data[0].city,
  coords: store.getState().offers.data[0].cityCoords,
  zoom: store.getState().offers.data[0].cityZoom,
})));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
