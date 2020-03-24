import React from 'react';
import Throbber from '../throbber/throbber.jsx';
import PropTypes from 'prop-types';

const ThrobberSwitcher = (props) => {
  const {isLoading, render} = props;

  if (isLoading) {
    return <Throbber {...props} />;
  } else {
    return render();
  }

};

ThrobberSwitcher.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired
};

export default ThrobberSwitcher;
