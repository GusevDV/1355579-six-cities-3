import React from "react";
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer.js';
import thunk from 'redux-thunk';
import createAPI from './api.js';
import history from './history';
import {Route} from './const.js';
import {ActionCreator as UserActionCreator, ApiCall as UserApiCall} from './reducer/user/user.js';
import {ApiCall as OfferApiCall} from "./reducer/offers/offers.js";


const api = createAPI(() => {
  history.push(Route.LOGIN);
  store.dispatch(UserActionCreator.signOut());
});

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(OfferApiCall.fetchOffers());
store.dispatch(UserApiCall.getAuthStatus());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
