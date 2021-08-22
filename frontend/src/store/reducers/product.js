import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    charTypeList: [],
    brandList: [],
    productCreated: [],
    productModified: [],
    productListCount: [],
    productListPag: [],
    productList: [],
    productListFilteredCount: [],
    productListFilteredPag: [],
    productListFiltered: [],
    setProductForBillDetailSupplierSearch: [],
    productCharacteristicListFiltered: [],
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

const fetchBrandListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchBrandListSuccess = (state, action) => {
    return updateObject(state, {
        brandList: action.brandList,
        error: null,
        loading: false
    });
};

const fetchBrandListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const createProductStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createProductSuccess = (state, action) => {
    const updatedState = {
        productCreated: action.productCreated,
        error: null,
        loading: false,
    };
    return updateObject(state, updatedState);
};

const createProductFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false});
};

const modifyProductStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const modifyProductSuccess = (state, action) => {
    const updatedState = {
        productModified: action.productModified,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const modidyProductFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchProductListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchProductListSuccess = (state, action) => {
    const updatedState = {
        productListCount: action.productList.count,
        productListPag: action.productList.links,
        productList: action.productList.results,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchProductListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchProductListFilteredStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchProductListFilteredSuccess = (state, action) => {
    const updatedState = {
        productListFilteredCount: action.productListFiltered.count,
        productListFilteredPag: action.productListFiltered.links,
        productListFiltered: action.productListFiltered.results,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchProductListFilteredFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const setProductForBillDetailSupplierSearch = (state, action) => {
    return updateObject(state, {
        productForBillDetailSupplierSearch: action.data
    });
};

const fetchProductCharacteristicListFilteredStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchProductCharacteristicListFilteredSuccess = (state, action) => {
    const updatedState = {
        productCharacteristicListFiltered: action.productCharacteristicListFiltered,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchProductCharacteristicListFilteredFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_CHAR_TYPE_START: return createCharTypeStart(state, action);
        case actionTypes.CREATE_CHAR_TYPE_SUCCESS: return createCharTypeSuccess(state, action);
        case actionTypes.CREATE_CHAR_TYPE_FAIL: return createCharTypeFail(state, action);
        case actionTypes.FETCH_CHAR_TYPE_LIST_START: return fetchCharTypesStart(state, action);
        case actionTypes.FETCH_CHAR_TYPE_LIST_SUCCESS: return fetchCharTypesSuccess(state, action);
        case actionTypes.FETCH_CHAR_TYPE_LIST_FAIL: return fetchCharTypesFail(state, action);
        case actionTypes.FETCH_BRAND_LIST_START: return fetchBrandListStart(state, action);
        case actionTypes.FETCH_BRAND_LIST_SUCCESS: return fetchBrandListSuccess(state, action);
        case actionTypes.FETCH_BRAND_LIST_FAIL: return fetchBrandListFail(state, action);
        case actionTypes.CREATE_PRODUCT_START: return createProductStart(state, action);
        case actionTypes.CREATE_PRODUCT_SUCCESS: return createProductSuccess(state, action);
        case actionTypes.CREATE_PRODUCT_FAIL: return createProductFail(state, action);
        case actionTypes.MODIFY_PRODUCT_START: return modifyProductStart(state, action);
        case actionTypes.MODIFY_PRODUCT_SUCCESS: return modifyProductSuccess(state, action);
        case actionTypes.MODIFY_PRODUCT_FAIL: return modidyProductFail(state, action);
        case actionTypes.FETCH_PRODUCT_LIST_START: return fetchProductListStart(state, action);
        case actionTypes.FETCH_PRODUCT_LIST_SUCCESS: return fetchProductListSuccess(state, action);
        case actionTypes.FETCH_PRODUCT_LIST_FAIL: return fetchProductListFail(state, action);
        case actionTypes.FETCH_PRODUCT_LIST_FILTERED_START: return fetchProductListFilteredStart(state, action);
        case actionTypes.FETCH_PRODUCT_LIST_FILTERED_SUCCESS: return fetchProductListFilteredSuccess(state, action);
        case actionTypes.FETCH_PRODUCT_LIST_FILTERED_FAIL: return fetchProductListFilteredFail(state, action);
        case actionTypes.SET_PRODUCT_FOR_BILL_DETAIL_SUPPLIER_SEARCH: return setProductForBillDetailSupplierSearch(state, action);
        case actionTypes.FETCH_PRODUCT_CHARACTERISTIC_LIST_FILTERED_START: return fetchProductCharacteristicListFilteredStart(state, action);
        case actionTypes.FETCH_PRODUCT_CHARACTERISTIC_LIST_FILTERED_SUCCESS: return fetchProductCharacteristicListFilteredSuccess(state, action);
        case actionTypes.FETCH_PRODUCT_CHARACTERISTIC_LIST_FILTERED_FAIL: return fetchProductCharacteristicListFilteredFail(state, action);
        default: return state;
    };
};

export default reducer;