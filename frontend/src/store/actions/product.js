import * as actionTypes from './actionTypes';

export const createCharType = (data) => {
    return {
        type: actionTypes.CREATE_CHAR_TYPE,
        data: data
    };
};

export const createCharTypeStart = (charTypeData) => {
    return {
        type: actionTypes.CREATE_CHAR_TYPE_START,
        charTypeData: charTypeData
    };
};

export const createCharTypeSuccess = (charTypeCreatedId) => {
    return {
        type: actionTypes.CREATE_CHAR_TYPE_SUCCESS,
        charTypeCreatedId: charTypeCreatedId
    };
};

export const createCharTypeFail = (error) => {
    return {
        type: actionTypes.CREATE_CHAR_TYPE_FAIL,
        error: error
    };
};

export const fetchCharTypes = () => {
    return {
        type: actionTypes.FETCH_CHAR_TYPES
    };
};

export const fetchCharTypesStart = () => {
    return {
        type: actionTypes.FETCH_CHAR_TYPES_START
    };
};

export const fetchCharTypesSuccess = (charTypes) => {
    return {
        type: actionTypes.FETCH_CHAR_TYPES_SUCCESS,
        charTypes: charTypes
    };
};

export const fetchCharTypesFail = (error) => {
    return {
        type: actionTypes.FETCH_CHAR_TYPES_FAIL,
        error: error
    };
};

export const fetchBrands = () => {
    return {
        type: actionTypes.FETCH_BRANDS
    };
};

export const fetchBrandsStart = () => {
    return {
        type: actionTypes.FETCH_BRANDS_START
    };
};

export const fetchBrandsSuccess = (brands) => {
    return {
        type: actionTypes.FETCH_BRANDS_SUCCESS,
        brands: brands
    };
};

export const fetchBrandsFail = (error) => {
    return {
        type: actionTypes.FETCH_BRANDS_FAIL,
        error: error
    };
};