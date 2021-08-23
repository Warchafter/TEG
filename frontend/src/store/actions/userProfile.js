import * as actionTypes from './actionTypes';

export const fetchUserProfileDetail = () => {
    return {
        type: actionTypes.FETCH_USER_PROFILE_DETAIL
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

export const fetchSelectedUserProfileDetail = (selectedUserId) => {
    return {
        type: actionTypes.FETCH_SELECTED_USER_PROFILE_DETAIL,
        selectedUserId: selectedUserId
    };
};

export const fetchSelectedUserProfileDetailStart = () => {
    return {
        type: actionTypes.FETCH_SELECTED_USER_PROFILE_DETAIL_START
    };
};

export const fetchSelectedUserProfileDetailSuccess = (userProfileDetail) => {
    return {
        type: actionTypes.FETCH_SELECTED_USER_PROFILE_DETAIL_SUCCESS,
        userProfileDetail: userProfileDetail
    };
};

export const fetchSelectedUserProfileDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_SELECTED_USER_PROFILE_DETAIL_FAIL,
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

export const modifyUserProfileDetail = (data) => {
    return {
        type: actionTypes.MODIFY_USER_PROFILE_DETAIL,
        data: data
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

export const uploadUserProfileRif = (formData) => {
    return {
        type: actionTypes.UPLOAD_USER_PROFILE_RIF,
        formData: formData
    };
};

export const uploadUserProfileRifStart = () => {
    return {
        type: actionTypes.UPLOAD_USER_PROFILE_RIF_START
    };
};

export const uploadUserProfileRifSuccess = (userProfileRIFImage) => {
    return {
        type: actionTypes.UPLOAD_USER_PROFILE_RIF_SUCCESS,
        userProfileRIFImage: userProfileRIFImage
    };
};

export const uploadUserProfileRifFail = (error) => {
    return {
        type: actionTypes.UPLOAD_USER_PROFILE_RIF_FAIL,
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

export const fetchSpecializations = () => {
    return {
        type: actionTypes.FETCH_SPECIALIZATIONS
    };
};

export const fetchSpecializationsStart = () => {
    return {
        type: actionTypes.FETCH_SPECIALIZATIONS_START
    };
};

export const fetchSpecializationsSuccess = (specializationList) => {
    return {
        type: actionTypes.FETCH_SPECIALIZATIONS_SUCCESS,
        specializationList: specializationList
    };
};

export const fetchSpecializationsFail = (error) => {
    return {
        type: actionTypes.FETCH_SPECIALIZATIONS_FAIL,
        error: error
    };
};


export const fetchNonRifValidatedUsers = () => {
    return {
        type: actionTypes.FETCH_NON_RIF_VALIDATED_USERS
    };
};

export const fetchNonRifValidatedUsersStart = () => {
    return {
        type: actionTypes.FETCH_NON_RIF_VALIDATED_USERS_START
    };
};

export const fetchNonRifValidatedUsersSuccess = (nonRifValidatedUserList) => {
    return {
        type: actionTypes.FETCH_NON_RIF_VALIDATED_USERS_SUCCESS,
        nonRifValidatedUserList: nonRifValidatedUserList
    };
};

export const fetchNonRifValidatedUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_NON_RIF_VALIDATED_USERS_FAIL,
        error: error
    };
};

export const fetchRifValidatedUsers = () => {
    return {
        type: actionTypes.FETCH_RIF_VALIDATED_USERS
    };
};

export const fetchRifValidatedUsersStart = () => {
    return {
        type: actionTypes.FETCH_RIF_VALIDATED_USERS_START
    };
};

export const fetchRifValidatedUsersSuccess = (rifValidatedUserList) => {
    return {
        type: actionTypes.FETCH_RIF_VALIDATED_USERS_SUCCESS,
        rifValidatedUserList: rifValidatedUserList
    };
};

export const fetchRifValidatedUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_RIF_VALIDATED_USERS_FAIL,
        error: error
    };
};

export const setNonRifValidatedUserToInspect = (data) => {
    return {
        type: actionTypes.SET_NON_RIF_VALIDATED_USER_TO_INSPECT,
        data: data
    };
};

export const setRifValidatedUserToInspect = (data) => {
    return {
        type: actionTypes.SET_RIF_VALIDATED_USER_TO_INSPECT,
        data: data
    };
};

export const validateUserProfileRif = (id, data) => {
    return {
        type: actionTypes.VALIDATE_USER_PROFILE_RIF,
        id: id,
        data: data
    };
};

export const validateUserProfileRifStart = () => {
    return {
        type: actionTypes.VALIDATE_USER_PROFILE_RIF_START
    };
};

export const validateUserProfileRifSuccess = (userProfileDetail) => {
    return {
        type: actionTypes.VALIDATE_USER_PROFILE_RIF_SUCCESS,
        userProfileDetail: userProfileDetail
    };
};

export const validateUserProfileRifFail = (error) => {
    return {
        type: actionTypes.VALIDATE_USER_PROFILE_RIF_FAIL,
        error: error
    };
};