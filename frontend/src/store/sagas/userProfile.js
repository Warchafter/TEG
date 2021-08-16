import { put, select } from 'redux-saga/effects';
import axios from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export const getUserId = (state) => state.auth.user


export function* fetchUserProfileDetailSaga(action) {
    yield put(actions.fetchUserProfileDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/user/users/current/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchUserProfileDetailSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchUserProfileDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el perfil de usuario', 'error')));
    };
};

export function* fetchSelectedUserProfileDetailSaga(action) {
    yield put(actions.fetchSelectedUserProfileDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/user/users/${action.selectedUserId}/`;
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchSelectedUserProfileDetailSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchSelectedUserProfileDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el perfil de usuario', 'error')));
    };
};

export function* fetchUserProfileListSaga(action) {
    yield put(actions.fetchUserProfileListStart());
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
    yield put(actions.modifyUserProfileDetailStart());
    // const access = yield localStorage.getItem('access');
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': access ? `JWT ${access}` : null,
    //         'Accept': 'application/json'
    //     }
    // };
    // const url = ''
}

export function* uploadUserProfileRifSaga(action) {
    yield put(actions.uploadUserProfileRifStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    let userId = yield select(getUserId);
    console.log(action.formData);
    const url = `/user/users/${userId.id}/upload-image/`;
    try {
        let response = yield axios.post(url, action.formData, config);
        yield put(actions.uploadUserProfileRifSuccess(response.data.rif));
        yield put(actions.enqueueSnackbar(getSnackbarData('El RIF ha sido actualizado exitosamente', 'success')));
    } catch (error) {
        console.log(error);
        yield put(actions.uploadUserProfileRifFail());
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo actualizar el RIF', 'error')));
    };
};

export function* fetchSpecializationsSaga(action) {
    yield put(actions.fetchSpecializationsStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/user/specializations/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchSpecializationsSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchSpecializationsFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el listado de Especializaciones', 'error')));
    };
};