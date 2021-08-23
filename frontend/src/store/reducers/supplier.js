import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    supplierData: [],
    supplierCreatedId: null,
    supplierList: [],
    supplierEmail: [],
    supplierEmailCreatedId: null,
    supplierEmailList: [],
    supplierProductData: [],
    supplierProductCreatedId: null,
    supplierProductSelected: null,
    supplierProductModifiedId: null,
    supplierProductListCount: [],
    supplierProductListPag: [],
    supplierProductList: [],
    supplierRIFSelected: null,
    error: null,
    loading: false
};

const createSupplierStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createSupplierSuccess = (state, action) => {
    const updatedSupplier = state.supplierList.concat(action.supplierCreatedId);
    const updatedState = {
        supplierList: updatedSupplier,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const createSupplierFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchSupplierStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchSupplierSuccess = (state, action) => {
    const updatedSupplier = state.supplierList.concat(action.supplierData);
    const updatedState = {
        supplierList: updatedSupplier,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchSupplierFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchSupplierListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchSupplierListSuccess = (state, action) => {
    const updatedState = {
        supplierList: action.supplierList,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchSupplierListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const createSupplierEmailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createSupplierEmailSuccess = (state, action) => {
    const updatedSupplier = state.supplierEmail.concat(action.supplierEmailCreatedId);
    const updatedState = {
        supplierList: updatedSupplier,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const createSupplierEmailFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchSupplierEmailListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchSupplierEmailListSuccess = (state, action) => {
    const updatedState = {
        supplierEmailList: action.supplierEmailList,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchSupplierEmailListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const createSupplierProductStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createSupplierProductSuccess = (state, action) => {
    const updatedSupplier = state.supplierProductData.concat(action.supplierProductCreatedId);
    const updatedState = {
        supplierList: updatedSupplier,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const createSupplierProductFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const modifySupplierProductStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const modifySupplierProductSuccess = (state, action) => {
    const updatedState = {
        supplierProductData: action.supplierProductData,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const modifySupplierProductFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const deleteSupplierProductStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const deleteSupplierProductSuccess = (state, action) => {
    return updateObject(state, { error: null, loading: false });
};

const deleteSupplierProductFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchSupplierProductStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const fetchSupplierProductSuccess = (state, action) => {
    const updatedState = {
        supplierProductData: action.supplierProductData,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchSupplierProductFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchSupplierProductListStart = (state, action) => {
    return updateObject(state, { error: null, loading: false });
};

const fetchSupplierProductListSuccess = (state, action) => {
    const updatedState = {
        supplierProductListCount: action.supplierProductData.count,
        supplierProductListPag: action.supplierProductData.links,
        supplierProductList: action.supplierProductData.results,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchSupplierProductListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const setSupplierRIFSelected = (state, action) => {
    return updateObject(state, { supplierRIFSelected: action.data });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_SUPPLIER_START: return createSupplierStart(state, action);
        case actionTypes.CREATE_SUPPLIER_SUCCESS: return createSupplierSuccess(state, action);
        case actionTypes.CREATE_SUPPLIER_FAIL: return createSupplierFail(state, action);
        case actionTypes.FETCH_SUPPLIER_START: return fetchSupplierStart(state, action);
        case actionTypes.FETCH_SUPPLIER_SUCCESS: return fetchSupplierSuccess(state, action);
        case actionTypes.FETCH_SUPPLIER_FAIL: return fetchSupplierFail(state, action);
        case actionTypes.FETCH_SUPPLIER_LIST_START: return fetchSupplierListStart(state, action);
        case actionTypes.FETCH_SUPPLIER_LIST_SUCCESS: return fetchSupplierListSuccess(state, action);
        case actionTypes.FETCH_SUPPLIER_LIST_FAIL: return fetchSupplierListFail(state, action);
        case actionTypes.CREATE_SUPPLIER_EMAIL_START: return createSupplierEmailStart(state, action);
        case actionTypes.CREATE_SUPPLIER_EMAIL_SUCCESS: return createSupplierEmailSuccess(state, action);
        case actionTypes.CREATE_SUPPLIER_EMAIL_FAIL: return createSupplierEmailFail(state, action);
        case actionTypes.FETCH_SUPPLIER_EMAIL_LIST_START: return fetchSupplierEmailListStart(state, action);
        case actionTypes.FETCH_SUPPLIER_EMAIL_LIST_SUCCESS: return fetchSupplierEmailListSuccess(state, action);
        case actionTypes.FETCH_SUPPLIER_EMAIL_LIST_FAIL: return fetchSupplierEmailListFail(state, action);
        case actionTypes.CREATE_SUPPLIER_PRODUCT_START: return createSupplierProductStart(state, action);
        case actionTypes.CREATE_SUPPLIER_PRODUCT_SUCCESS: return createSupplierProductSuccess(state, action);
        case actionTypes.CREATE_SUPPLIER_PRODUCT_FAIL: return createSupplierProductFail(state, action);
        case actionTypes.MODIFY_SUPPLIER_PRODUCT_START: return modifySupplierProductStart(state, action);
        case actionTypes.MODIFY_SUPPLIER_PRODUCT_SUCCESS: return modifySupplierProductSuccess(state, action);
        case actionTypes.MODIFY_SUPPLIER_PRODUCT_FAIL: return modifySupplierProductFail(state, action);
        case actionTypes.DELETE_SUPPLIER_PRODUCT_START: return deleteSupplierProductStart(state, action);
        case actionTypes.DELETE_SUPPLIER_PRODUCT_SUCCESS: return deleteSupplierProductSuccess(state, action);
        case actionTypes.DELETE_SUPPLIER_PRODUCT_FAIL: return deleteSupplierProductFail(state, action);
        case actionTypes.FETCH_SUPPLIER_PRODUCT_START: return fetchSupplierProductStart(state, action);
        case actionTypes.FETCH_SUPPLIER_PRODUCT_SUCCESS: return fetchSupplierProductSuccess(state, action);
        case actionTypes.FETCH_SUPPLIER_PRODUCT_FAIL: return fetchSupplierProductFail(state, action);
        case actionTypes.FETCH_SUPPLIER_PRODUCT_LIST_START: return fetchSupplierProductListStart(state, action);
        case actionTypes.FETCH_SUPPLIER_PRODUCT_LIST_SUCCESS: return fetchSupplierProductListSuccess(state, action);
        case actionTypes.FETCH_SUPPLIER_PRODUCT_LIST_FAIL: return fetchSupplierProductListFail(state, action);
        case actionTypes.SET_SUPPLIER_RIF_SELECTED: return setSupplierRIFSelected(state, action);
        default: return state;
    };
};

export default reducer;