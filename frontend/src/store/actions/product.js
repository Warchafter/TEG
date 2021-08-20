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

export const createProduct = (data) => {
    return {
        type: actionTypes.CREATE_PRODUCT,
        data: data
    };
};

export const createProductStart = () => {
    return {
        type: actionTypes.CREATE_PRODUCT_START
    };
};

export const createProductSuccess = (productCreated) => {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        productCreated: productCreated
    };
};

export const createProductFail = (error) => {
    return {
        type: actionTypes.CREATE_PRODUCT_FAIL,
        error: error
    };
};

export const modifyProduct = (data) => {
    return {
        type: actionTypes.MODIFY_PRODUCT,
        data: data
    };
};

export const modifyProductStart = () => {
    return {
        type: actionTypes.MODIFY_PRODUCT_START
    };
};

export const modifyProductSuccess = (productModified) => {
    return {
        type: actionTypes.MODIFY_PRODUCT_SUCCESS,
        productModified: productModified
    };
};

export const modifyProductFail = (error) => {
    return {
        type: actionTypes.MODIFY_PRODUCT_FAIL,
        error: error
    };
};

export const fetchProductList = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_LIST
    };
};

export const fetchProductListStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_LIST_START
    };
};

export const fetchProductListSuccess = (productList) => {
    return {
        type: actionTypes.FETCH_PRODUCT_LIST_SUCCESS,
        productList: productList
    };
};

export const fetchProductListFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCT_LIST_FAIL,
        error: error
    };
};

export const fetchProductListFiltered = (data) => {
    return {
        type: actionTypes.FETCH_PRODUCT_LIST_FILTERED,
        data: data
    };
};

export const fetchProductListFilteredStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_LIST_FILTERED_START
    };
};

export const fetchProductListFilteredSuccess = (productListFiltered) => {
    return {
        type: actionTypes.FETCH_PRODUCT_LIST_FILTERED_SUCCESS,
        productListFiltered: productListFiltered
    };
};

export const fetchProductListFilteredFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCT_LIST_FILTERED_FAIL,
        error: error
    };
};

export const setProductForBillDetailSupplierSearch = (data) => {
    return {
        type: actionTypes.SET_PRODUCT_FOR_BILL_DETAIL_SUPPLIER_SEARCH,
        data: data
    };
};