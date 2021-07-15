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