import PropTypes from 'prop-types';
import {AuthStatus} from '../../const.js';

export const authType = PropTypes.oneOf([AuthStatus.AUTH, AuthStatus.NO_AUTH]);
