import { put, call } from 'redux-saga/effects';

import axios from '../../axios-db';
import * as actions from '../actions/index';
import { getSnackbarData } from '../../shared/utility';

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'access');
    yield call([localStorage, 'removeItem'], 'refresh');
    yield call([localStorage, 'removeItem'], 'rememberMe');
    yield put(actions.logoutSucceed());
};

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        email: action.email,
        password: action.password,
    });
    const url = '/auth/jwt/create/';

    try {
        let response = yield axios.post(url, body, config)
        yield localStorage.setItem('access', response.data.access);
        yield localStorage.setItem('refresh', response.data.refresh);
        yield localStorage.setItem('rememberMe', action.rememberMe);
        yield put(actions.authSuccess(response.data.access, response.data.refresh, action.rememberMe));
        yield put(actions.authLoadUser());
    } catch (error) {
        yield put(actions.logout());
        yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.detail, 'error')));
        yield put(actions.authFail(error.response.data.detail));
    };
};

export function* authUserSignUpSaga(action) {
    yield put(actions.authSignUpStart());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        email: action.email,
        name: action.name,
        password: action.password,
        re_password: action.re_password
    });
    const url = '/auth/users/';

    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.authSignUpSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('Check your email to activate your account!', 'success')));
    } catch (error) {
        yield put(actions.logout());
        if (error.response.data.email) {
            yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.email[0], 'error')));
        } else if (error.response.data.password) {
            yield put(actions.enqueueSnackbar(getSnackbarData(`${error.response.data.password[0]} ${error.response.data.password[1]}`, 'error')));
        } else {
            yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.detail, 'error')));
        }
        yield put(actions.authSignUpFail(error.response.data.detail));
    };
};

export function* authUserActivationSaga(action) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        uid: action.uid,
        token: action.token,
    });
    const url = '/auth/users/activation/';

    try {
        yield axios.post(url, body, config);
        yield put(actions.authUserActivationSuccess());
        yield put(actions.enqueueSnackbar(getSnackbarData('Account activated!', 'success')));
    } catch (error) {
        yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.detail, 'error')));
        yield put(actions.authUserActivationFail(error.response.data.detail));
    };
};

export function* authLoadUserSaga(action) {
    const access = yield localStorage.getItem('access');
    if (!access) {
        yield put(actions.logout());
        yield put(actions.authUserLoadedFail());
    } else {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        const url = '/auth/users/me/';
        try {
            let response = yield axios.get(url, config)
            yield put(actions.authUserLoadedSuccess(response.data));
        } catch (error) {
            yield put(actions.logout());
            yield put(actions.authUserLoadedFail());
            yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.detail, 'error')));
            yield put(actions.authFail(error.response.data.detail));
        };
    };
};

export function* authCheckStateSaga(action) {
    const access = yield localStorage.getItem('access');
    const refresh = yield localStorage.getItem('refresh');
    const rememberMe = yield localStorage.getItem('rememberMe');
    if (access) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        let body = JSON.stringify({ token: access })

        try {
            let response = yield axios.post('/auth/jwt/verify/', body, config)

            if (response.data.code !== 'token_not_valid') {
                yield put(actions.authSuccess(access, refresh, rememberMe));
                yield put(actions.authLoadUser());
            } else {
                if (rememberMe && refresh) {
                    body = JSON.stringify({ refresh: refresh });
                    response = yield axios.post('/auth/jwt/refresh/', body, config);
                    yield put(actions.authSuccess(response.data.access, response.data.refresh, rememberMe));
                    yield put(actions.authLoadUser());
                } else {
                    yield put(actions.logout());
                    yield put(actions.authUserLoadedFail());
                }
            }
        } catch (error) {
            yield put(actions.logout());
            yield put(actions.authUserLoadedFail());
            yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.detail, 'error')));
            yield put(actions.authFail(error.response.data.detail));
        }
    } else {
        yield put(actions.logout());
        yield put(actions.authUserLoadedFail());
    }
};

export function* authPasswordResetSaga(action) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({ email: action.email });

    try {
        yield axios.post('/auth/users/reset_password/', body, config);
        yield put(actions.enqueueSnackbar(getSnackbarData('Check your email to confirm password reset!', 'success')));
        yield put(actions.authPasswordResetSuccess());
    } catch (error) {
        yield put(actions.authPasswordResetFail());
        yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.detail, 'error')));
    };
};

export function* authPasswordResetConfirmSaga(action) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({
        uid: action.uid,
        token: action.token,
        new_password: action.new_password,
        re_new_password: action.re_new_password
    });

    try {
        yield axios.post('/auth/users/reset_password_confirm/', body, config);
        yield put(actions.authPasswordResetConfirmSuccess());
        yield put(actions.enqueueSnackbar(getSnackbarData('Password reset successful!', 'success')));
    } catch (error) {
        yield put(actions.authPasswordResetConfirmFail());
        yield put(actions.enqueueSnackbar(getSnackbarData(error.response.data.detail, 'error')));
    };
};