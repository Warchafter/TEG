import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import getSidebarNavItems from '../../data/sidebar-nav-items';

const initialState = {
    menuVisible: false,
    navItems: getSidebarNavItems()
};

const toggleSidebar = (state, action) => {
    return updateObject(state, {
        menuVisible: !state.menuVisible,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_SIDEBAR: return toggleSidebar(state, action);
        default:
            return state;
    };
};

export default reducer;