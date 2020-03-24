import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from "react-redux";
import Throbber from '../throbber/throbber.jsx';
import ErrorArea from '../error/error-area.jsx';
import {ErrorMessages} from '../../../const.js';
import OfferDetail from '../offer-detail/offer-detail.jsx';

const App = (props) => {

  if (props.isLoading) {
    return <Throbber mods={{position: `center-page`}} />;
  } else if (props.isError) {
    return <ErrorArea message={ErrorMessages.NETWROK_ERROR} />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />;
        </Route>
        <Route exact path='/offer/:id' render={(routeProps) => (
          <OfferDetail offerId={routeProps.match.params.id} />
        )} />
      </Switch>
    </BrowserRouter>
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
