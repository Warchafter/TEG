import { put } from 'redux-saga/effects';
import axios from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';


export function* fetchUserProfileDetailSaga(action) {
    yield put(action.fetchUserProfileDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/user/users/${action.userId}`;
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchUserProfileDetailSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchUserProfileDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el perfil de usuario', 'error')));
    };
};

export function* fetchUserProfileListSaga(action) {
    yield put(action.fetchUserProfileListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/user/users/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchUserProfileListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchUserProfileListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el listado de usuarios')));
    };
};

export function* modifyUserProfileDetailSaga(action) {
    yield put(action.modifyUserProfileDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = ''
}

export function* fetchSupplierSaga(action) {
    yield put(actions.fetchSupplierStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/supplier/suppliers/' + action.data.supplierId + '/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchSupplierSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchSupplierFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el detalle del proveedor', 'error')));
    };
};

export function* fetchSupplierListSaga(action) {
    yield put(actions.fetchSupplierListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/supplier/suppliers/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchSupplierListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchSupplierListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los proveedores', 'error')));
    };
};

export function* modifySupplierProductSaga(action) {
    // The payload must contain all the fields of the product that is being
    // modified + the id of said product from the supplier list.
    yield put(actions.modifySupplierProductStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({
        product: action.data.supplierProductData.productId,
        supplier: action.data.supplierProductData.supplierID,
        price: action.data.supplierProductData.price,
        stock: action.data.supplierProductData.stock
    });
    const url = `/supplier/supplier-products/${action.data.supplierProductSelected}`;
    try {
        let response = yield axios.put(url, body, config);
        yield put(actions.modifySupplierProductSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('Modificado el producto del proveedor')));
    } catch (error) {
        yield put(actions.modifySupplierProductFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo modificar el producto del proveedor', 'error')));
    };
};
