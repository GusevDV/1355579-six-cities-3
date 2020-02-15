import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';

const onTitleLinkClick = () => {};


const App = ({offers, getPrice}) => {
  return (
    <Main
      offers={offers}
      onTitleLinkClick={onTitleLinkClick}
      getPrice={getPrice} />
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.string).isRequired,
  getPrice: PropTypes.func.isRequired,
};


export default App;
