import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {offerType} from '../../types/offers-types.js';

const onTitleLinkClick = () => {};

const App = ({offers}) => {
  return (
    <Main
      offers={offers}
      onTitleLinkClick={onTitleLinkClick}
    />
  );
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  city: state.city,
});

App.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired,
  city: PropTypes.string.isRequired,
};

export {App};
export default connect(mapStateToProps)(App);
