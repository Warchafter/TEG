import { put, select } from 'redux-saga/effects';
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

export function* fetchCharTypesSaga(action) {
    yield put(actions.fetchCharTypesStart());
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
        console.log(response.data);
        yield put(actions.fetchCharTypesSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchCharTypesSuccess(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los tipos de características', 'error')));
    };
};

export function* fetchBrandsSaga(action) {
    yield put(actions.fetchBrandsStart());
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
        yield put(actions.fetchBrandsSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBrandsFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer las marcas', 'error')));
    };
};