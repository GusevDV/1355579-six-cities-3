import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {connect} from "react-redux";
import Throbber from '../throbber/throbber.jsx';
import ErrorArea from '../error/error-area.jsx';
import {ErrorMessages} from '../../../const.js';

const onTitleLinkClick = () => {};

const App = (props) => {

  function renderApp() {
    if (props.isLoading) {
      return <Throbber />;
    } else if (props.isError) {
      return <ErrorArea message={ErrorMessages.NETWROK_ERROR} />;
    }
    return <Main onTitleLinkClick={onTitleLinkClick} />;
  }

  return (
    <>
      {renderApp()}
    </>
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
