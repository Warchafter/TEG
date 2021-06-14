import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    charTypes: [],
    brands: [],
    error: null,
    loading: false
};

const createCharTypeStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createCharTypeSuccess = (state, action) => {
    const updatedCharTypes = state.charTypes.concat(action.charTypeCreatedId);
    const updatedState = {
        charTypes: updatedCharTypes,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const createCharTypeFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchCharTypesStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchCharTypesSuccess = (state, action) => {
    return updateObject(state, {
        charTypes: action.charTypes,
        error: null,
        loading: false
    });
};

const fetchCharTypesFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchBrandsStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchBrandsSuccess = (state, action) => {
    return updateObject(state, {
        brands: action.brands,
        error: null,
        loading: false
    });
};

const fetchBrandsFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_CHAR_TYPE_START: return createCharTypeStart(state, action);
        case actionTypes.CREATE_CHAR_TYPE_SUCCESS: return createCharTypeSuccess(state, action);
        case actionTypes.CREATE_CHAR_TYPE_FAIL: return createCharTypeFail(state, action);
        case actionTypes.FETCH_CHAR_TYPES_START: return fetchCharTypesStart(state, action);
        case actionTypes.FETCH_CHAR_TYPES_SUCCESS: return fetchCharTypesSuccess(state, action);
        case actionTypes.FETCH_CHAR_TYPES_FAIL: return fetchCharTypesFail(state, action);
        case actionTypes.FETCH_BRANDS_START: return fetchBrandsStart(state, action);
        case actionTypes.FETCH_BRANDS_SUCCESS: return fetchBrandsSuccess(state, action);
        case actionTypes.FETCH_BRANDS_FAIL: return fetchBrandsFail(state, action);
        default: return state;
    };
};

export default reducer;