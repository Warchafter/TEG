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
    createCharTypeSaga,
    fetchBrandsSaga,
    fetchCharTypesSaga
} from './product';

import {
    createSupplierSaga,
    fetchSupplierSaga,
    fetchSupplierListSaga,
    createSupplierEmailSaga,
    fetchSupplierEmailListSaga,
    createSupplierProductSaga,
    modifySupplierProductSaga,
    deleteSupplierProductSaga,
    fetchSupplierProductSaga,
    fetchSupplierProductListSaga,
} from './supplier';

import {
    toggleCorpoView
} from './corpo';

import {
    toggleSidebarSaga,
} from './interface';

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

export function* watchSupplier() {
    yield all([
        takeLatest(actionTypes.CREATE_SUPPLIER, createSupplierSaga),
        takeEvery(actionTypes.FETCH_SUPPLIER, fetchSupplierSaga),
        takeEvery(actionTypes.FETCH_SUPPLIER_LIST, fetchSupplierListSaga),
        takeLatest(actionTypes.CREATE_SUPPLIER_EMAIL, createSupplierEmailSaga),
        takeEvery(actionTypes.FETCH_SUPPLIER_EMAIL, fetchSupplierEmailListSaga),
        takeLatest(actionTypes.CREATE_SUPPLIER_PRODUCT, createSupplierProductSaga),
        takeEvery(actionTypes.MODIFY_SUPPLIER_PRODUCT, modifySupplierProductSaga),
        takeLatest(actionTypes.DELETE_SUPPLIER_PRODUCT, deleteSupplierProductSaga),
        takeEvery(actionTypes.FETCH_SUPPLIER_PRODUCT, fetchSupplierProductSaga),
        takeEvery(actionTypes.FETCH_SUPPLIER_PRODUCT_LIST, fetchSupplierProductListSaga),
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