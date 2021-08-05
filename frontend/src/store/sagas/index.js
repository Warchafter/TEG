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
    fetchUserProfileDetailSaga,
    fetchUserProfileListSaga,
    modifyUserProfileDetailSaga,
    // verifyUserProfileDetailSaga
} from './userProfile';

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
    fetchBankListSaga,
    fetchPaymentMethodListSaga,
    fetchCurrencyListSaga,
    fetchPurchaseStatusListSaga,
    fetchPaymentStatusListSaga,
    createPurchaseBillSaga,
    modifyPurchaseBillSaga,
    fetchPurchaseBillSaga,
    fetchPurchaseBillListSaga,
    createBillDetailSaga,
    modifyBillDetailSaga,
    deleteBillDetailSaga,
    fetchBillDetailSaga,
    fetchBillDetailListSaga,
    createBillProductCharacteristicSaga,
    modifyBillProductCharacteristicSaga,
    deleteBillProductCharacteristicSaga,
    fetchBillProductCharacteristicSaga,
    fetchBillProductCharacteristicListSaga,
    createBillPaymentDetailSaga,
    modifyBillPaymentDetailSaga,
    deleteBillPaymentDetailSaga,
    fetchBillPaymentDetailSaga,
    fetchBillPaymentDetailListSaga
} from './bill';

import {
    toggleCorpoView
} from './corpo';

import {
    setMainContentTestingSaga,
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

export function* watchUserProfile() {
    yield all([
        takeLatest(actionTypes.FETCH_USER_PROFILE_DETAIL, fetchUserProfileDetailSaga),
        takeLatest(actionTypes.FETCH_USER_PROFILE_LIST, fetchUserProfileListSaga),
        takeLatest(actionTypes.MODIFY_USER_PROFILE_DETAIL, modifyUserProfileDetailSaga),
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

export function* watchBill() {
    yield all([
        takeEvery(actionTypes.FETCH_BANK_LIST, fetchBankListSaga),
        takeEvery(actionTypes.FETCH_PAYMENT_METHOD_LIST, fetchPaymentMethodListSaga),
        takeEvery(actionTypes.FETCH_CURRENCY_LIST, fetchCurrencyListSaga),
        takeEvery(actionTypes.FETCH_PURCHASE_STATUS_LIST, fetchPurchaseStatusListSaga),
        takeEvery(actionTypes.FETCH_PAYMENT_STATUS_LIST, fetchPaymentStatusListSaga),
        takeLatest(actionTypes.CREATE_PURCHASE_BILL, createPurchaseBillSaga),
        takeEvery(actionTypes.MODIFY_PURCHASE_BILL, modifyPurchaseBillSaga),
        takeEvery(actionTypes.FETCH_PURCHASE_BILL, fetchPurchaseBillSaga),
        takeEvery(actionTypes.FETCH_PURCHASE_BILL_LIST, fetchPurchaseBillListSaga),
        takeLatest(actionTypes.CREATE_BILL_DETAIL, createBillDetailSaga),
        takeEvery(actionTypes.MODIFY_BILL_DETAIL, modifyBillDetailSaga),
        takeLatest(actionTypes.DELETE_BILL_DETAIL, deleteBillDetailSaga),
        takeEvery(actionTypes.FETCH_BILL_DETAIL, fetchBillDetailSaga),
        takeEvery(actionTypes.FETCH_BILL_DETAIL_LIST, fetchBillDetailListSaga),
        takeLatest(actionTypes.CREATE_BILL_PRODUCT_CHARACTERISTIC, createBillProductCharacteristicSaga),
        takeEvery(actionTypes.MODIFY_BILL_PRODUCT_CHARACTERISTIC, modifyBillProductCharacteristicSaga),
        takeLatest(actionTypes.DELETE_BILL_PRODUCT_CHARACTERISTIC, deleteBillProductCharacteristicSaga),
        takeEvery(actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC, fetchBillProductCharacteristicSaga),
        takeEvery(actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_LIST, fetchBillProductCharacteristicListSaga),
        takeLatest(actionTypes.CREATE_BILL_PAYMENT_DETAIL, createBillPaymentDetailSaga),
        takeEvery(actionTypes.MODIFY_BILL_PAYMENT_DETAIL, modifyBillPaymentDetailSaga),
        takeEvery(actionTypes.DELETE_BILL_PAYMENT_DETAIL, deleteBillPaymentDetailSaga),
        takeEvery(actionTypes.FETCH_BILL_PAYMENT_DETAIL, fetchBillPaymentDetailSaga),
        takeEvery(actionTypes.FETCH_BILL_PAYMENT_DETAIL_LIST, fetchBillPaymentDetailListSaga),
    ]);
};

export function* watchCorpo() {
    yield all([
        takeEvery(actionTypes.TOGGLE_CORPO_VIEW, toggleCorpoView),
    ]);
};

export function* watchInterface() {
    yield all([
        takeEvery(actionTypes.TOGGLE_SIDEBAR, toggleSidebarSaga),
        takeEvery(actionTypes.SET_MAIN_CONTENT_TESTING, setMainContentTestingSaga),
    ]);
};