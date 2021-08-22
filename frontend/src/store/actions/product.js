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

export const fetchCharTypeList = () => {
    return {
        type: actionTypes.FETCH_CHAR_TYPE_LIST
    };
};

export const fetchCharTypeListStart = () => {
    return {
        type: actionTypes.FETCH_CHAR_TYPE_LIST_START
    };
};

export const fetchCharTypeListSuccess = (charTypeList) => {
    return {
        type: actionTypes.FETCH_CHAR_TYPE_LIST_SUCCESS,
        charTypeList: charTypeList
    };
};

export const fetchCharTypeListFail = (error) => {
    return {
        type: actionTypes.FETCH_CHAR_TYPE_LIST_FAIL,
        error: error
    };
};

export const fetchBrandList = () => {
    return {
        type: actionTypes.FETCH_BRAND_LIST
    };
};

export const fetchBrandListStart = () => {
    return {
        type: actionTypes.FETCH_BRAND_LIST_START
    };
};

export const fetchBrandListSuccess = (brandList) => {
    return {
        type: actionTypes.FETCH_BRAND_LIST_SUCCESS,
        brandList: brandList
    };
};

export const fetchBrandListFail = (error) => {
    return {
        type: actionTypes.FETCH_BRAND_LIST_FAIL,
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

export const fetchProductCharacteristicListFiltered = (data) => {
    return {
        type: actionTypes.FETCH_PRODUCT_CHARACTERISTIC_LIST_FILTERED,
        data: data
    };
};

export const fetchProductCharacteristicListFilteredStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_CHARACTERISTIC_LIST_FILTERED_START
    };
};

export const fetchProductCharacteristicListFilteredSuccess = (productCharacteristicListFiltered) => {
    return {
        type: actionTypes.FETCH_PRODUCT_CHARACTERISTIC_LIST_FILTERED_SUCCESS,
        productCharacteristicListFiltered: productCharacteristicListFiltered
    };
};

export const fetchProductCharacteristicListFilteredFail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCT_CHARACTERISTIC_LIST_FILTERED_FAIL,
        error: error
    };
};