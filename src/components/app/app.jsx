import React from 'react';
import Main from '../main/main.jsx';
import PropTypes from 'prop-types';

const onTitleLinkClick = () => {};

const App = ({offers}) => {
  return (
    <Main
      offers={offers}
      onTitleLinkClick={onTitleLinkClick} />
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.string).isRequired
};


export default App;
