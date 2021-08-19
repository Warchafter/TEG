import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    isAuthLoading: false,
    isAuthFuncLoaded: false,
    user: null,
    rememberMe: false,
    error: null,
    errorRefresh: null,
    loading: null,
    loadingRefresh: null,
    authRedirectPath: '/',
    isLoaded: false,
    userHasData: false
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        access: action.access,
        refresh: action.refresh,
        isAuthenticated: true,
        error: null,
        loading: false,
        rememberMe: action.rememberMe,
        isLoaded: true
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        access: null,
        refresh: null,
        error: action.error,
        loading: false,
        isAuthenticated: false,
        user: null,
        isLoaded: false
    });
};

const authSignUpStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSignUpSuccess = (state, action) => {
    return updateObject(state, {
        user: action.payload,
        error: null,
        loading: false,
        isAuthenticated: false
    });
};

const authSignUpFail = (state, action) => {
    return updateObject(state, {
        access: null,
        refresh: null,
        error: action.error,
        loading: false,
        isAuthenticated: false,
        user: null
    });
};

const authUserActivationFail = (state, action) => {
    return updateObject(state, {
        access: null,
        refresh: null,
        error: action.error,
        loading: false,
        isAuthenticated: false,
        user: null
    });
};

const authUserLoadedSuccess = (state, action) => {
    return updateObject(state, {
        user: action.payload,
        isAuthenticated: true,
        isLoaded: true,
        isAuthFuncLoaded: true
    });
};

const authUserLoadedFail = (state, action) => {
    return updateObject(state, {
        user: null,
        isAuthenticated: false,
        isAuthFuncLoaded: true
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        rememberMe: false,
        isAuthFuncLoaded: false
    });
};

const authRememberMe = (state, action) => {
    return updateObject(state, {
        rememberMe: action.rememberMe
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    });
};

const authCheckUserDataStart = (state, action) => {
    return updateObject(state, { loading: true, isAuthFuncLoaded: false });
};

const authCheckUserDataSuccess = (state, action) => {
    return updateObject(state, {
        userHasData: true,
        loading: false,
        isAuthFuncLoaded: true
    });
};

const authCheckUserDataFail = (state, action) => {
    return updateObject(state, {
        userHasData: false,
        loading: false,
        isAuthFuncLoaded: true
    });
};

const authRefreshAccessTokenStart = (state, action) => {
    return updateObject(state, { errorRefresh: false, loadingRefresh: true });
};

const authRefreshAccessTokenSuccess = (state, action) => {
    return updateObject(state, {
        errorRefresh: false,
        loadingRefresh: false,
    });
};

const authRefreshAccessTokenFail = (state, action) => {
    return updateObject(state, {
        errorRefresh: action.error,
        loadingRefresh: false,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_SIGNUP_START: return authSignUpStart(state, action);
        case actionTypes.AUTH_SIGNUP_SUCCESS: return authSignUpSuccess(state, action);
        case actionTypes.AUTH_SIGNUP_FAIL: return authSignUpFail(state, action);
        case actionTypes.AUTH_USER_LOADED_SUCCESS: return authUserLoadedSuccess(state, action);
        case actionTypes.AUTH_USER_LOADED_FAIL: return authUserLoadedFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.AUTH_REMEMBER_ME: return authRememberMe(state, action);
        case actionTypes.AUTH_USER_ACTIVATION_FAIL: return authUserActivationFail(state, action);
        case actionTypes.AUTH_CHECK_USER_DATA_START: return authCheckUserDataStart(state, action);
        case actionTypes.AUTH_CHECK_USER_DATA_SUCCESS: return authCheckUserDataSuccess(state, action);
        case actionTypes.AUTH_CHECK_USER_DATA_FAIL: return authCheckUserDataFail(state, action);
        case actionTypes.AUTH_REFRESH_ACCESS_TOKEN_START: return authRefreshAccessTokenStart(state, action);
        case actionTypes.AUTH_REFRESH_ACCESS_TOKEN_SUCCESS: return authRefreshAccessTokenSuccess(state, action);
        case actionTypes.AUTH_REFRESH_ACCESS_TOKEN_FAIL: return authRefreshAccessTokenFail(state, action);
        default:
            return state;
    };
};

export default reducer;