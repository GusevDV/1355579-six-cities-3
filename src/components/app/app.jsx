import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {Router, Switch, Route} from 'react-router-dom';
import {connect} from "react-redux";
import Throbber from '../throbber/throbber.jsx';
import ErrorArea from '../error/error-area.jsx';
import Favorites from '../favorites/favorites.jsx';
import {ErrorMessage, Route as RoutePath} from '../../const.js';
import OfferDetail from '../offer-detail/offer-detail.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import PrivateRoute from "../private-route/private-route.jsx";
import history from '../../history.js';

const App = (props) => {

  if (props.isLoading) {
    return <Throbber isCenterPage={true} />;
  } else if (props.isError) {
    return <ErrorArea message={ErrorMessage.NETWROK_ERROR} />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Main />;
        </Route>
        <Route exact path='/offer/:id' render={(routeProps) => (
          <OfferDetail offerId={routeProps.match.params.id} />
        )} />
        <Route exact path={RoutePath.LOGIN} component={SignIn} />
        <Route exact path='/favorites' component={Favorites} />
        <PrivateRoute
          exact
          path={RoutePath.FAVORITES}
          render={() => <Favorites />}
        />
      </Switch>
    </Router>
  );


};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isLoading: state.offers.isLoading,
  isError: state.offers.isError,
});

export {App};
export default connect(mapStateToProps)(App);
