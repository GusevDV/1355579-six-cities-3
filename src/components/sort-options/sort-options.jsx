import React from 'react';
import PropTypes from 'prop-types';
import {sortTypes as types} from '../../../const.js';

const SortOptions = (props) => {
  const {sortTypes, isActive, activeItem, onItemClick, onToggle} = props;
  return (
    <form onClick={onToggle} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0">
        {sortTypes[activeItem]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActive ? `places__options--opened` : ``}`}>
        {sortTypes.map((param, i) => (
          <li
            key={`${param}-${i}`}
            className={`places__option ${activeItem === i ? `places__option--active` : ``}`}
            tabIndex={i}
            onClick={() => onItemClick(i)}
          >
            {param}
          </li>
        ))}
      </ul>
    </form>
  );
};

SortOptions.propTypes = {
  sortTypes: PropTypes.arrayOf(PropTypes.oneOf(types)).isRequired,
  isActive: PropTypes.bool.isRequired,
  activeItem: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SortOptions;
