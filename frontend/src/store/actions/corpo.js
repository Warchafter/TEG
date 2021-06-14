import * as actionTypes from './actionTypes';

export const toggleCorpoView = (isCorpo) => {
    return {
        type: actionTypes.TOGGLE_CORPO_VIEW,
        isCorpo: isCorpo
    };
};