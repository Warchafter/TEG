import * as actionTypes from './actionTypes';

export const toggleSidebar = () => {
    return {
        type: actionTypes.TOGGLE_SIDEBAR
    };
};

export const setMainContentTesting = (mainContentTesting) => {
    return {
        type: actionTypes.SET_MAIN_CONTENT_TESTING,
        mainContentTesting: mainContentTesting
    };
};

export const setSidebarUnfoldable = () => {
    return {
        type: actionTypes.SET_SIDEBAR_UNFOLDABLE
    };
};

export const setSidebarShow = () => {
    return {
        type: actionTypes.SET_SIDEBAR_SHOW
    };
};

export const setUserProfileMainContent = (selectedOption, contentComponent) => {
    return {
        type: actionTypes.SET_USER_PROFILE_MAIN_CONTENT,
        selectedOption: selectedOption,
        contentComponent: contentComponent
    };
};

export const setSupplierMainContent = (selectedOption) => {
    return {
        type: actionTypes.SET_SUPPLIER_MAIN_CONTENT,
        selectedOption: selectedOption
    };
};