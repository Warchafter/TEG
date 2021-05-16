import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (access, refresh, rememberMe) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        access: access,
        refresh: refresh,
        rememberMe: rememberMe
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authUserSignUp = (email, name, password, re_password) => {
    return {
        type: actionTypes.AUTH_USER_SIGNUP,
        email: email,
        name: name,
        password: password,
        re_password: re_password
    }
}

export const authSignUpStart = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_START
    };
};

export const authSignUpSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS,
        payload: payload
    };
};

export const authSignUpFail = (error) => {
    return {
        type: actionTypes.AUTH_SIGNUP_FAIL,
        error: error
    };
};

export const authUserActivation = (uid, token) => {
    return {
        type: actionTypes.AUTH_USER_ACTIVATION,
        uid: uid,
        token: token
    };
};

export const authUserActivationSuccess = () => {
    return {
        type: actionTypes.AUTH_SIGNUP_SUCCESS
    };
};

export const authUserActivationFail = (error) => {
    return {
        type: actionTypes.AUTH_SIGNUP_FAIL,
        error: error
    };
};

export const authUserLoadedSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_USER_LOADED_SUCCESS,
        payload: payload
    };
};

export const authUserLoadedFail = () => {
    return {
        type: actionTypes.AUTH_USER_LOADED_FAIL,
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, rememberMe) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        rememberMe: rememberMe
    };
};

export const authLoadUser = () => {
    return {
        type: actionTypes.AUTH_LOAD_USER
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };
};

export const authRememberMe = (rememberMe) => {
    return {
        type: actionTypes.AUTH_REMEMBER_ME,
        rememberMe: rememberMe
    };
};

export const authPasswordResetSuccess = () => {
    return {
        type: actionTypes.AUTH_PASSWORD_RESET_SUCCESS
    };
};

export const authPasswordResetFail = () => {
    return {
        type: actionTypes.AUTH_PASSWORD_RESET_FAIL
    };
};

export const authPasswordResetConfirmSuccess = () => {
    return {
        type: actionTypes.AUTH_PASSWORD_RESET_CONFIRM_SUCCESS
    };
};

export const authPasswordResetConfirmFail = () => {
    return {
        type: actionTypes.AUTH_PASSWORD_RESET_CONFIRM_FAIL
    };
};

export const authPasswordReset = (email) => {
    return {
        type: actionTypes.AUTH_PASSWORD_RESET,
        email: email
    }
}

export const authPasswordResetConfirm = (uid, token, new_password, re_new_password) => {
    return {
        type: actionTypes.AUTH_PASSWORD_RESET_CONFIRM,
        uid: uid,
        token: token,
        new_password: new_password,
        re_new_password: re_new_password
    }
}