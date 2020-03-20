import React from 'react';
import PropTypes from 'prop-types';

const ErrorArea = (props) => {
  return (
    <p className="error">{props.message}</p>
  );
};

ErrorArea.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorArea;

