import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    isCorpo: false,
}

const toggleCorpoView = (state, action) => {
    return updateObject(state, {
        isCorpo: !action.isCorpo,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_SIDEBAR: return toggleCorpoView(state, action);
        default:
            return state;
    };
};

export default reducer;