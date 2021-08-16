import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import getSidebarNavItems from '../../data/sidebar-nav-items';

const initialState = {
    menuVisible: false,
    mainContentTesting: null,
    navItems: getSidebarNavItems(),
    sidebarUnfoldable: false,
    sidebarShow: false,
    userProfileSelectedOption: 'title',
    userProfileContentComponent: null
};

const toggleSidebar = (state, action) => {
    return updateObject(state, {
        menuVisible: !state.menuVisible,
    });
};

const setMainContentTesting = (state, action) => {
    return updateObject(state, {
        mainContentTesting: action.mainContentTesting
    });
};

const setSidebarShow = (state, action) => {
    return updateObject(state, {
        sidebarShow: !state.sidebarShow
    });
};

const setSidebarUnfoldable = (state, action) => {
    return updateObject(state, {
        sidebarUnfoldable: !state.sidebarUnfoldable
    });
};

const setUserProfileMainContent = (state, action) => {
    return updateObject(state, {
        userProfileSelectedOption: action.selectedOption,
        userProfileContentComponent: action.contentComponent
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_SIDEBAR: return toggleSidebar(state, action);
        case actionTypes.SET_MAIN_CONTENT_TESTING: return setMainContentTesting(state, action);
        case actionTypes.SET_SIDEBAR_SHOW: return setSidebarShow(state, action);
        case actionTypes.SET_SIDEBAR_UNFOLDABLE: return setSidebarUnfoldable(state, action);
        case actionTypes.SET_USER_PROFILE_MAIN_CONTENT: return setUserProfileMainContent(state, action);
        default:
            return state;
    };
};

export default reducer;