import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    userProfileDetail: [],
    userProfileList: [],
    userProfileRIFImage: null,
    specializationList: [],
    selectedUserProfiledetail: [],
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

const fetshSelectedUserProfileDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetshSelectedUserProfileDetailSuccess = (state, action) => {
    const updatedState = {
        userProfileDetail: action.userProfileDetail,
        isVerified: action.userProfileDetail.isVerified,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetshSelectedUserProfileDetailFail = (state, action) => {
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

const uploadUserProfileRifStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const uploadUserProfileRifSuccess = (state, action) => {
    const updatedState = {
        userProfileRIFImage: action.userProfileRIFImage,
        error: null,
        loading: false
    }
    return updateObject(state, updatedState);
};

const uploadUserProfileRifFail = (state, action) => {
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

const fetchSpecializationsStart = (state, action) => {
    return updateObject(state, { error: null, loading: false });
};

const fetchSpecializationsSuccess = (state, action) => {
    const updatedState = {
        specializationList: action.specializationList,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchSpecializationsFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};


const fetchNonRifValidatedUsersStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchNonRifValidatedUsersSuccess = (state, action) => {
    const updatedState = {
        nonRifValidatedUserList: action.nonRifValidatedUserList,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchNonRifValidatedUsersFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_PROFILE_DETAIL_START: return fetchUserProfileDetailStart(state, action);
        case actionTypes.FETCH_USER_PROFILE_DETAIL_SUCCESS: return fetchUserProfileDetailSuccess(state, action);
        case actionTypes.FETCH_USER_PROFILE_DETAIL_FAIL: return fetchUserProfileDetailFail(state, action);
        case actionTypes.FETCH_SELECTED_USER_PROFILE_DETAIL_START: return fetshSelectedUserProfileDetailStart(state, action);
        case actionTypes.FETCH_SELECTED_USER_PROFILE_DETAIL_SUCCESS: return fetshSelectedUserProfileDetailSuccess(state, action);
        case actionTypes.FETCH_SELECTED_USER_PROFILE_DETAIL_FAIL: return fetshSelectedUserProfileDetailFail(state, action);
        case actionTypes.FETCH_USER_PROFILE_LIST_START: return fetchUserProfileListStart(state, action);
        case actionTypes.FETCH_USER_PROFILE_LIST_SUCCESS: return fetchUserProfileListSuccess(state, action);
        case actionTypes.FETCH_USER_PROFILE_LIST_FAIL: return fetchUserProfileListFail(state, action);
        case actionTypes.MODIFY_USER_PROFILE_DETAIL_START: return modifyUserProfileDetailStart(state, action);
        case actionTypes.MODIFY_USER_PROFILE_DETAIL_SUCCESS: return modifyUserProfileDetailSuccess(state, action);
        case actionTypes.MODIFY_USER_PROFILE_DETAIL_FAIL: return modifyUserProfileDetailFail(state, action);
        case actionTypes.UPLOAD_USER_PROFILE_RIF_START: return uploadUserProfileRifStart(state, action);
        case actionTypes.UPLOAD_USER_PROFILE_RIF_SUCCESS: return uploadUserProfileRifSuccess(state, action);
        case actionTypes.UPLOAD_USER_PROFILE_RIF_FAIL: return uploadUserProfileRifFail(state, action);
        case actionTypes.VERIFY_USER_PROFILE_RIF_START: return verifyUserProfileRifStart(state, action);
        case actionTypes.VERIFY_USER_PROFILE_RIF_SUCCESS: return verifyUserProfileRifSuccess(state, action);
        case actionTypes.VERIFY_USER_PROFILE_RIF_FAIL: return verifyUserProfileRifFail(state, action);
        case actionTypes.FETCH_SPECIALIZATIONS_START: return fetchSpecializationsStart(state, action);
        case actionTypes.FETCH_SPECIALIZATIONS_SUCCESS: return fetchSpecializationsSuccess(state, action);
        case actionTypes.FETCH_SPECIALIZATIONS_FAIL: return fetchSpecializationsFail(state, action);
        case actionTypes.FETCH_NON_RIF_VALIDATED_USERS_START: return fetchNonRifValidatedUsersStart(state, action);
        case actionTypes.FETCH_NON_RIF_VALIDATED_USERS_SUCCESS: return fetchNonRifValidatedUsersSuccess(state, action);
        case actionTypes.FETCH_NON_RIF_VALIDATED_USERS_FAIL: return fetchNonRifValidatedUsersFail(state, action);
        default: return state;
    };
};

export default reducer;

