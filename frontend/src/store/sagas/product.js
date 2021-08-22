import { put } from 'redux-saga/effects';
import axios from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export const getUserId = (state) => state.auth.user.userId

export function* createCharTypeSaga(action) {
    yield put(actions.createCharTypeStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    // let userId = yield select(getUserId);
    const body = JSON.stringify({ name: action.data.characteristicType });
    const url = '/product/characteristic-types/';
    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.createCharTypeSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData(`Creada el tipo de característica: ${action.data.characteristicType}`, 'success')));
    } catch (error) {
        yield put(actions.createCharTypeFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo crear el tipo de característica', 'error')));
    };
};

export function* fetchCharTypeListSaga(action) {
    yield put(actions.fetchCharTypeListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/product/characteristic-types/';
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchCharTypeListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchCharTypeListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los tipos de características', 'error')));
    };
};

export function* fetchBrandListSaga(action) {
    yield put(actions.fetchBrandListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/product/brands/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchBrandListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBrandListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer las marcas', 'error')));
    };
};

export function* createProductSaga(action) {
    yield put(actions.createProductStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify(action.data);
    const url = '/product/products/';
    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.createProductSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('El producto fue creado exitosamente', 'success')));
    } catch (error) {
        yield put(actions.createProductFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo crear el product', 'error')));
    };
};

export function* modifyProductSaga(action) {
    yield put(actions.modifyProductStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify(action.data);
    const url = `/product/products/${action.data.id}`;
    try {
        let response = yield axios.put(url, body, config);
        yield put(actions.modifyProductSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData(`El producto: ${action.data.name} fue modificado`, 'success')));
    } catch (error) {
        yield put(actions.modifyProductFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo modificar el producto', 'error')));
    };
};

export function* fetchProductListSaga(action) {
    yield put(actions.fetchProductListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/product/products/';
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchProductListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchProductListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el listado de productos', 'error')));
    };
};

export function* fetchProductListFilteredSaga(action) {
    yield put(actions.fetchProductListFilteredStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/product/products/?status=publicado`;
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchProductListFilteredSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchProductListFilteredFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el listado de productos publicados', 'error')));
    };
};

export function* fetchProductCharacteristicListFilteredSaga(action) {
    yield put(actions.fetchProductCharacteristicListFilteredStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/product/product-characteristics/?product=${action.data}`;
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchProductCharacteristicListFilteredSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchProductCharacteristicListFilteredFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el listado de características del producto', 'error')));
    };
};