import { put } from 'redux-saga/effects';
import axios from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export const getUserId = (state) => state.auth.user.userId

export function* createSupplierSaga(action) {
    yield put(actions.createSupplierStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({
        name: action.data.supplierData.name,
        rif: action.data.supplierData.rif,
        image: action.data.supplierData.image,
        address: action.data.supplierData.address
    });
    const url = '/supplier/suppliers/';
    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.createSupplierSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData(`Creado el proveedor: ${action.data.supplierData.name}`)));
    } catch (error) {
        yield put(actions.createSupplierFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo crear el proveedor', 'error')));
    };
};

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

export function* createSupplierEmailSaga(action) {
    yield put(actions.createSupplierEmailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({
        supplier: action.data.supplierEmailData.supplierId,
        email: action.data.supplierEmailData.email,
        description: action.data.supplierEmailData.description,
        is_Main: action.data.supplierEmailData.is_Main
    });
    const url = '/supplier/supplier-emails/';
    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.createSupplierSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData(`Creado el proveedor: ${action.data.supplierData.name}`)));
    } catch (error) {
        yield put(actions.createSupplierFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo crear el proveedor', 'error')));
    };
};

export function* fetchSupplierEmailListSaga(action) {
    yield put(actions.fetchSupplierEmailListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/supplier/supplier-emails/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchSupplierListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchSupplierListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los proveedores', 'error')));
    };
};

export function* createSupplierProductSaga(action) {
    // I should send a payload with the supplier product object and also
    // the product name to be displayed in the snackbar
    yield put(actions.createSupplierProductStart());
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
    const url = '/supplier/supplier-products/';
    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.createSupplierProductSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData(`Añadido el producto del proveedor: ${action.data.supplierData.product}`)));
    } catch (error) {
        yield put(actions.createSupplierProductFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo añadir el producto del proveedor', 'error')));
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

export function* deleteSupplierProductSaga(action) {
    // The payload must contain all the fields of the product that is being
    // modified + the id of said product from the supplier list.
    yield put(actions.deleteSupplierProductStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const url = `/supplier/supplier-products/${action.data.supplierProductSelected}`;
    try {
        let response = yield axios.delete(url, config);
        yield put(actions.deleteSupplierProductSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('Eliminado el producto del proveedor')));
    } catch (error) {
        yield put(actions.deleteSupplierProductFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo eliminar el producto del proveedor', 'error')));
    };
};

export function* fetchSupplierProductSaga(action) {
    yield put(actions.fetchSupplierProductStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/supplier/supplier-products/${action.data.supplierProductSelected}/`;
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchSupplierProductSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchSupplierProductFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el detalle del producto', 'error')));
    };
};

export function* fetchSupplierProductListSaga(action) {
    yield put(actions.fetchSupplierProductListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/supplier/supplier-products/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchSupplierProductListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchSupplierProductListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los productos', 'error')));
    };
};