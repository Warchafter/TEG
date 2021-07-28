import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    userProfileDetail: [],
    userProfileList: [],
    isVerified: false,
    error: null,
    loading: false
};

const fetchUserProfileDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchUserProfileDetailSuccess = (state, action) => {
    const updatedState = {
        userProfileDetail: action.userProfileDetail,
        isVerified: action.userProfileDetail.isVerified,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchUserProfileDetailFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false, isVerified: false });
};

const fetchUserProfileListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchUserProfileListSuccess = (state, action) => {
    const updatedState = {
        userProfileList: action.userProfileList,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchUserProfileListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};


const modifyUserProfileDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const modifyUserProfileDetailSuccess = (state, action) => {
    const updatedState = {
        userProfileDetail: action.userProfileDetail,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const modifyUserProfileDetailFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const verifyUserProfileRifStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const verifyUserProfileRifSuccess = (state, action) => {
    const updatedState = {
        isVerified: true,
        error: null,
        loading: false
    };
    return updateObject(state, { updatedState });
};

const verifyUserProfileRifFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        isVerified: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_PROFILE_DETAIL_START: return fetchUserProfileDetailStart(state, action);
        case actionTypes.FETCH_USER_PROFILE_DETAIL_SUCCESS: return fetchUserProfileDetailSuccess(state, action);
        case actionTypes.FETCH_USER_PROFILE_DETAIL_FAIL: return fetchUserProfileDetailFail(state, action);
        case actionTypes.FETCH_USER_PROFILE_LIST_START: return fetchUserProfileListStart(state, action);
        case actionTypes.FETCH_USER_PROFILE_LIST_SUCCESS: return fetchUserProfileListSuccess(state, action);
        case actionTypes.FETCH_USER_PROFILE_LIST_FAIL: return fetchUserProfileListFail(state, action);
        case actionTypes.MODIFY_USER_PROFILE_DETAIL_START: return modifyUserProfileDetailStart(state, action);
        case actionTypes.MODIFY_USER_PROFILE_DETAIL_SUCCESS: return modifyUserProfileDetailSuccess(state, action);
        case actionTypes.MODIFY_USER_PROFILE_DETAIL_FAIL: return modifyUserProfileDetailFail(state, action);
        case actionTypes.VERIFY_USER_PROFILE_RIF_START: return verifyUserProfileRifStart(state, action);
        case actionTypes.VERIFY_USER_PROFILE_RIF_SUCCESS: return verifyUserProfileRifSuccess(state, action);
        case actionTypes.VERIFY_USER_PROFILE_RIF_FAIL: return verifyUserProfileRifFail(state, action);
        default: return state;
    };
};

export default reducer;