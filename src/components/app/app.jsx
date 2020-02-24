import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';
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

App.propTypes = {
  offers: PropTypes.arrayOf(offerType).isRequired,
};


export default App;
