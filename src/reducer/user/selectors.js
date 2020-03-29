import {createSelector} from 'reselect';

export const getUserData = createSelector(
    (state) => state.user.data,
    (user) => Object.assign({}, user)
);

export const getUserEmail = createSelector(
    getUserData,
    (user) => user.email
);

export const getAuthStatus = createSelector(
    (state) => state.user.authorizationStatus,
    (status) => status
);
