import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {
    logoutSaga,
    authUserSaga,
    authLoadUserSaga,
    authUserSignUpSaga,
    authCheckStateSaga,
    authPasswordResetSaga,
    authUserActivationSaga,
    authPasswordResetConfirmSaga
} from './auth';

import {
    toggleCorpoView
} from './corpo';

import {
    toggleSidebarSaga,
} from './interface';

import {
    createCharTypeSaga, fetchBrandsSaga, fetchCharTypesSaga
} from './product';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_USER_SIGNUP, authUserSignUpSaga),
        takeEvery(actionTypes.AUTH_USER_ACTIVATION, authUserActivationSaga),
        takeEvery(actionTypes.AUTH_LOAD_USER, authLoadUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.AUTH_PASSWORD_RESET, authPasswordResetSaga),
        takeEvery(actionTypes.AUTH_PASSWORD_RESET_CONFIRM, authPasswordResetConfirmSaga),
    ]);
};

export function* watchProduct() {
    yield all([
        takeLatest(actionTypes.CREATE_CHAR_TYPE, createCharTypeSaga),
        takeEvery(actionTypes.FETCH_CHAR_TYPES, fetchCharTypesSaga),
        takeEvery(actionTypes.FETCH_BRANDS, fetchBrandsSaga),
    ]);
};

export function* watchCorpo() {
    yield all([
        takeEvery(actionTypes.TOGGLE_CORPO_VIEW, toggleCorpoView),
    ])
}

export function* watchInterface() {
    yield all([
        takeEvery(actionTypes.TOGGLE_SIDEBAR, toggleSidebarSaga),
    ]);
};