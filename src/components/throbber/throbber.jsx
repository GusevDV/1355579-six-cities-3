import React from 'react';
import PropTypes from 'prop-types';

const Throbber = (props) => {
  const {isCenterPage} = props;

  return (
    <div className={`throbber ${isCenterPage ? `throbber--centered` : ``}`}>
      <img className="throbber__img" src='/img/throbber.svg' width={100} height={100} alt='throbber' />
    </div>
  );
};

Throbber.propTypes = {
  isCenterPage: PropTypes.bool
};

Throbber.defaultProps = {
  isCenterPage: false
};

export default Throbber;
