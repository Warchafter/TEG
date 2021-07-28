import * as actionTypes from './actionTypes';

export const fetchUserProfileDetail = (userId) => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_DETAIL,
        userId: userId
    };
};

export const fetchUserProfileDetailStart = () => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_DETAIL_START
    };
};

export const fetchUserProfileDetailSuccess = (userProfileDetail) => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_DETAIL_SUCCESS,
        userProfileDetail: userProfileDetail
    };
};

export const fetchUserProfileDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_DETAIL_FAIL,
        error: error
    };
};

export const fetchUserProfileList = () => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_LIST
    };
};

export const fetchUserProfileListStart = () => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_LIST_START
    };
};

export const fetchUserProfileListSuccess = (userProfileList) => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_LIST_SUCCESS,
        userProfileList: userProfileList
    };
};

export const fetchUserProfileListFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_LIST_FAIL,
        error: error
    };
};

export const modifyUserProfileDetail = (modifiedUserProfileData) => {
    return {
        type: actionTypes.MODIFY_USER_PROFILE_DETAIL,
        modifiedUserProfileData: modifiedUserProfileData
    };
};

export const modifyUserProfileDetailStart = () => {
    return {
        type: actionTypes.MODIFY_USER_PROFILE_DETAIL_START
    };
};

export const modifyUserProfileDetailSuccess = (userProfileDetail) => {
    return {
        type: actionTypes.MODIFY_USER_PROFILE_DETAIL_SUCCESS,
        userProfileDetail: userProfileDetail
    };
};

export const modifyUserProfileDetailFail = (error) => {
    return {
        type: actionTypes.MODIFY_USER_PROFILE_DETAIL_FAIL,
        error: error
    };
};

export const verifyUserProfileRif = (isVerified) => {
    return {
        type: actionTypes.VERIFY_USER_PROFILE_RIF,
        isVerified: isVerified
    };
};

export const verifyUserProfileRifStart = () => {
    return {
        type: actionTypes.VERIFY_USER_PROFILE_RIF_START
    };
};

export const verifyUserProfileRifSuccess = (isVerified) => {
    return {
        type: actionTypes.VERIFY_USER_PROFILE_RIF_SUCCESS,
        isVerified: isVerified
    };
};

export const verifyUserProfileRifFail = (error) => {
    return {
        type: actionTypes.VERIFY_USER_PROFILE_RIF_FAIL,
        error: error
    };
};