import * as actionTypes from './actionTypes';

export const createSupplier = (data) => {
    return {
        type: actionTypes.CREATE_SUPPLIER,
        data: data
    };
};

export const createSupplierStart = (supplierData) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_START,
        supplierData: supplierData
    };
};

export const createSupplierSuccess = (supplierCreatedId) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_SUCCESS,
        supplierCreatedId: supplierCreatedId
    };
};

export const createSupplierFail = (error) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_FAIL,
        error: error
    };
};

export const fetchSupplier = (data) => {
    return {
        type: actionTypes.FETCH_SUPPLIER,
        data: data
    };
};

export const fetchSupplierStart = () => {
    return {
        type: actionTypes.FETCH_SUPPLIER_START
    };
};

export const fetchSupplierSuccess = (supplierData) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_SUCCESS,
        supplierData: supplierData
    };
};

export const fetchSupplierFail = (error) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_FAIL,
        error: error
    };
};

export const fetchSupplierList = (data) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_LIST,
        data: data
    };
};

export const fetchSupplierListStart = () => {
    return {
        type: actionTypes.FETCH_SUPPLIER_LIST_START
    };
};

export const fetchSupplierListSuccess = (supplierList) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_LIST_SUCCESS,
        supplierList: supplierList
    };
};

export const fetchSupplierListFail = (error) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_LIST_FAIL,
        error: error
    };
};

export const createSupplierEmail = (data) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_EMAIL,
        data: data
    };
};

export const createSupplierEmailStart = (supplierEmail) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_EMAIL_START,
        supplierEmail: supplierEmail
    };
};

export const createSupplierEmailSuccess = (supplierEmailCreatedId) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_EMAIL_SUCCESS,
        supplierEmailCreatedId: supplierEmailCreatedId
    };
};

export const createSupplierEmailFail = (error) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_EMAIL_FAIL,
        error: error
    };
};

export const fetchSupplierEmailList = () => {
    return {
        type: actionTypes.FETCH_SUPPLIER_EMAIL
    };
};

export const fetchSupplierEmailListStart = () => {
    return {
        type: actionTypes.FETCH_SUPPLIER_EMAIL_START
    };
};

export const fetchSupplierEmailListSuccess = (supplierEmailList) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_EMAIL_SUCCESS,
        supplierEmailList: supplierEmailList
    };
};

export const fetchSupplierEmailListFail = (error) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_EMAIL_FAIL,
        error: error
    };
};

export const createSupplierProduct = (data) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_PRODUCT,
        data: data
    };
};

export const createSupplierProductStart = (supplierProductData) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_PRODUCT_START,
        supplierProductData: supplierProductData
    };
};

export const createSupplierProductSuccess = (supplierProductCreatedId) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_PRODUCT_SUCCESS,
        supplierProductCreatedId: supplierProductCreatedId
    };
};

export const createSupplierProductFail = (error) => {
    return {
        type: actionTypes.CREATE_SUPPLIER_PRODUCT_FAIL,
        error: error
    };
};

export const modifySupplierProduct = (data) => {
    return {
        type: actionTypes.MODIFY_SUPPLIER_PRODUCT,
        data: data
    };
};

export const modifySupplierProductStart = (supplierProductData, supplierProductSelected) => {
    return {
        type: actionTypes.MODIFY_SUPPLIER_PRODUCT_START,
        supplierProductData: supplierProductData,
        supplierProductSelected: supplierProductSelected
    };
};

export const modifySupplierProductSuccess = (supplierProductModifiedId) => {
    return {
        type: actionTypes.MODIFY_SUPPLIER_PRODUCT_SUCCESS,
        supplierProductModifiedId: supplierProductModifiedId
    };
};

export const modifySupplierProductFail = (error) => {
    return {
        type: actionTypes.MODIFY_SUPPLIER_PRODUCT_FAIL,
        error: error
    };
};

export const deleteSupplierProduct = (data) => {
    return {
        type: actionTypes.DELETE_SUPPLIER_PRODUCT,
        data: data
    };
};

export const deleteSupplierProductStart = (supplierProductSelected) => {
    return {
        type: actionTypes.DELETE_SUPPLIER_PRODUCT_START,
        supplierProductSelected: supplierProductSelected
    };
};

export const deleteSupplierProductSuccess = () => {
    return {
        type: actionTypes.DELETE_SUPPLIER_PRODUCT_SUCCESS
    };
};

export const deleteSupplierProductFail = (error) => {
    return {
        type: actionTypes.DELETE_SUPPLIER_PRODUCT_FAIL,
        error: error
    };
};

export const fetchSupplierProduct = (data) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_PRODUCT,
        data: data
    };
};

export const fetchSupplierProductStart = (supplierProductSelected) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_PRODUCT_START,
        supplierProductSelected: supplierProductSelected
    };
};

export const fetchSupplierProductSuccess = (supplierProductData) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_PRODUCT_SUCCESS,
        supplierProductData: supplierProductData
    };
};

export const fetchSupplierProductFail = (error) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_PRODUCT_FAIL,
        error: error
    };
};

export const fetchSupplierProductList = () => {
    return {
        type: actionTypes.FETCH_SUPPLIER_PRODUCT_LIST
    };
};

export const fetchSupplierProductListStart = () => {
    return {
        type: actionTypes.FETCH_SUPPLIER_PRODUCT_LIST_START
    };
};

export const fetchSupplierProductListSuccess = (supplierProductData) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_PRODUCT_LIST_SUCCESS,
        supplierProductData: supplierProductData
    };
};

export const fetchSupplierProductListFail = (error) => {
    return {
        type: actionTypes.FETCH_SUPPLIER_PRODUCT_LIST_FAIL,
        error: error
    };
};

export const setSupplierRIFSelected = (data) => {
    return {
        type: actionTypes.SET_SUPPLIER_RIF_SELECTED,
        data: data
    };
};
