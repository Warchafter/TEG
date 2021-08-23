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
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    let userId = yield select(getUserId);
    const url = `/user/users/${userId.id}/update/`
    try {
        let response = yield axios.patch(url, action.data, config);
        yield put(actions.modifyUserProfileDetailSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData("El perfil fue actualizado exitosamente!", 'success')));
    } catch (error) {
        yield put(actions.modifyUserProfileDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData("El perfil no pudo ser actualizado", 'error')));
    };
};

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

export function* fetchNonRifValidatedUsersSaga(action) {
    yield put(actions.fetchNonRifValidatedUsersStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/user/users/?roles=user&has_rif=true&rif_validated=false';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchNonRifValidatedUsersSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchNonRifValidatedUsersFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el listado de clientes', 'error')));
    };
};

export function* fetchRifValidatedUsersSaga(action) {
    yield put(actions.fetchRifValidatedUsersStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/user/users/?rif_validated=true&roles=user';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchRifValidatedUsersSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchRifValidatedUsersFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el listado de clientes', 'error')));
    };
};

export function* validateUserProfileRifSaga(action) {
    yield put(actions.validateUserProfileRifStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/user/users/${action.id}/validate-rif/`
    try {
        let response = yield axios.patch(url, action.data, config);
        yield put(actions.validateUserProfileRifSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData("El usuario ha sido verificado exitosamente!", 'success')));
    } catch (error) {
        yield put(actions.validateUserProfileRifFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData("El perfil no pudo ser verificado", 'error')));
    };
};