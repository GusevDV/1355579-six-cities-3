import React from 'react';
import PropTypes from 'prop-types';

const Throbber = (props) => {
  const {position} = props.mods;

  return (
    <div className={`throbber ${position === `center-page` ? `throbber--centered` : ``}`}>
      <img className="throbber__img" src='/img/throbber.svg' width={100} height={100} alt='throbber' />
    </div>
  );
};

Throbber.defaultProps = {
  mods: {
    position: `default`
  }
};

Throbber.propTypes = {
  mods: PropTypes.shape({
    position: PropTypes.oneOf([`center-page`, `default`])
  })
};


export default Throbber;
