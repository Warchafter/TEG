import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import getSidebarNavItems from '../../data/sidebar-nav-items';

const initialState = {
    menuVisible: false,
    mainContentTesting: null,
    navItems: getSidebarNavItems(),
    sidebarUnfoldable: false,
    sidebarShow: false,
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_SIDEBAR: return toggleSidebar(state, action);
        case actionTypes.SET_MAIN_CONTENT_TESTING: return setMainContentTesting(state, action);
        case actionTypes.SET_SIDEBAR_SHOW: return setSidebarShow(state, action);
        case actionTypes.SET_SIDEBAR_UNFOLDABLE: return setSidebarUnfoldable(state, action);
        default:
            return state;
    };
};

export default reducer;