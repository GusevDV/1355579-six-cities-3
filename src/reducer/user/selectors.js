import {createSelector} from 'reselect';
import {AuthStatus} from '../../../const.js';

export const getAuthStatus = createSelector(
    (state) => state.user.authorizationStatus,
    (status) => status === AuthStatus.AUTH ? true : false
);
