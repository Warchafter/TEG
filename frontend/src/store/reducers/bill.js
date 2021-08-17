import * as actionTypes from '../actions/actionTypes';
import { updateObject, removeItemOnce } from '../../shared/utility';

const initialState = {
    bankList: [],
    paymentMethodList: [],
    currencyList: [],
    purchaseStatusList: [],
    paymentStatusList: [],
    billClientSubmissionCreated: [],
    billClientSubmissionDetail: [],
    billClientSubmissionListCount: [],
    billClientSubmissionListPag: [],
    billClientSubmissionList: [],
    billClientSubmissionSelected: [],
    isBillClientSubmissionSelected: false,
    purchaseBillListCount: [],
    purchaseBillListPag: [],
    purchaseBillList: [],
    purchaseBillData: [],
    purchaseBillCreated: [],
    purchaseBillSelected: [],
    purchaseBillModifiedId: null,
    billDetailData: [],
    billDetailSelected: [],
    billDetailListCount: [],
    billDetailListPag: [],
    billDetailList: [],
    billDetailId: [],
    billDetailCreated: [],
    billDetailSelectedId: null,
    billProductCharacteristicSelected: [],
    billProductCharacteristicId: null,
    billProductCharacteristicIds: [],
    billProductCharacteristicData: [],
    billProductCharacteristicListCount: [],
    billProductCharacteristicListPag: [],
    billProductCharacteristicList: [],
    billPaymentDetailData: [],
    billPaymentDetailCreatedId: [],
    billPaymentDetailSelected: [],
    billPaymentDetailId: [],
    billPaymentDetailListCount: [],
    billPaymentDetailListPag: [],
    billPaymentDetailList: [],
    exchangeRatesData: [],
    error: null,
    loading: false,
    loadingBillClientSubmissionHistoryList: false,
    loadingExRates: false,
    ExRateDataLoaded: false
};

const fetchBankListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchBankListSuccess = (state, action) => {
    return updateObject(state, {
        bankList: action.bankList,
        error: null,
        loading: false
    });
};

const fetchBankListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchPaymentMethodListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchPaymentMethodListSuccess = (state, action) => {
    return updateObject(state, {
        paymentMethodList: action.paymentMethodList,
        error: null,
        loading: false
    });
};

const fetchPaymentMethodListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchCurrencyListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchCurrencyListSuccess = (state, action) => {
    return updateObject(state, {
        currencyList: action.currencyList,
        error: null,
        loading: false
    });
};

const fetchCurrencyListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchPurchaseStatusListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchPurchaseStatusListSuccess = (state, action) => {
    return updateObject(state, {
        purchaseStatusList: action.purchaseStatusList,
        error: null,
        loading: false
    });
};

const fetchPurchaseStatusListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchPaymentStatusListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchPaymentStatusListSuccess = (state, action) => {
    return updateObject(state, {
        paymentStatusList: action.paymentStatusList,
        error: null,
        loading: false
    });
};

const fetchPaymentStatusListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const createBillClientSubmissionStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createBillClientSubmissionSuccess = (state, action) => {
    const updatedState = {
        billClientSubmissionCreated: action.billClientSubmissionCreated,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const createBillClientSubmissionFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchBillClientSubmissionDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const fetchBillClientSubmissionDetailSuccess = (state, action) => {
    const updatedState = {
        BillClientSubmissionDetail: action.BillClientSubmissionDetail,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchBillClientSubmissionDetailFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchBillClientSubmissionListStart = (state, action) => {
    return updateObject(state, { error: null, loadingBillClientSubmissionHistoryList: true });
};

const fetchBillClientSubmissionListSuccess = (state, action) => {
    const updatedState = {
        billClientSubmissionListCount: action.billClientSubmissionListData.count,
        billClientSubmissionListPag: action.billClientSubmissionListData.links,
        billClientSubmissionList: action.billClientSubmissionListData.results,
        error: null,
        loadingBillClientSubmissionHistoryList: false
    };
    return updateObject(state, updatedState);
};

const fetchBillClientSubmissionListFail = (state, action) => {
    return updateObject(state, { error: action.error, loadingBillClientSubmissionHistoryList: false });
};

const setSelectedBillClientSubmission = (state, action) => {
    console.log(action)
    return updateObject(state, {
        billClientSubmissionSelected: action.data,
        isBillClientSubmissionSelected: true
    })
}

const createPurchaseBillStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createPurchaseBillSuccess = (state, action) => {
    const updatedState = {
        purchaseBillCreated: action.purchaseBillCreated,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const createPurchaseBillFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const modifyPurchaseBillStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const modifyPurchaseBillSuccess = (state, action) => {
    const updatedState = {
        purchaseBillData: action.purchaseBillData,
        purchaseBillSelected: action.purchaseBillSelected,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const modifyPurchaseBillFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const fetchPurchaseBillStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

const fetchPurchaseBillSuccess = (state, action) => {
    const updatedState = {
        purchaseBillSelected: action.purchaseBillSelected,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchPurchaseBillFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchPurchaseBillListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchPurchaseBillListSuccess = (state, action) => {
    const updatedState = {
        purchaseBillListCount: action.purchaseBillList.count,
        purchaseBillListPag: action.purchaseBillList.links,
        purchaseBillList: action.purchaseBillList.results,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchPurchaseBillListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const createBillDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createBillDetailSuccess = (state, action) => {
    const updatedBill = state.billDetailData.concat(action.billDetailCreatedId);
    const updatedState = {
        billDetailData: updatedBill,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const createBillDetailFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const modifyBillDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const modifyBillDetailSuccess = (state, action) => {
    const updatedState = {
        billDetailData: action.billDetailData,
        billDetailSelected: action.billDetailSelected,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const modifyBillDetailFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const deleteBillDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const deleteBillDetailSuccess = (state, action) => {
    return updateObject(state, { error: null, loading: false });
};

const deleteBillDetailFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchBillDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchBillDetailSuccess = (state, action) => {
    const updatedState = {
        billDetailData: action.billDetailData,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchBillDetailFail = (state, action) => {
    return updateObject(state, {
        billDetailSelected: [],
        error: action.error,
        loading: false
    });
};

const fetchBillDetailListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchBillDetailListSuccess = (state, action) => {
    const updatedState = {
        billDetailListCount: action.billDetailList.count,
        billDetailListPag: action.billDetailList.links,
        billDetailList: action.billDetailList.results,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchBillDetailListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const createBillProductCharacteristicStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createBillProductCharacteristicSuccess = (state, action) => {
    const updatedBillProdCharIds = state.billProductCharacteristicListData.concat(action.billProductCharacteristicData);
    const updatedState = {
        billProductCharacteristicListData: updatedBillProdCharIds,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const createBillProductCharacteristicFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const modifyBillProductCharacteristicStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const modifyBillProductCharacteristicSuccess = (state, action) => {
    const updatedState = {
        billDetailData: action.billDetailData,
        billDetailSelected: action.billDetailSelected,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const modifyBillProductCharacteristicFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const deleteBillProductCharacteristicStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const deleteBillProductCharacteristicSuccess = (state, action) => {
    return updateObject(state, { error: null, loading: false });
};

const deleteBillProductCharacteristicFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchBillProductCharacteristicStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchBillProductCharacteristicSuccess = (state, action) => {
    const updatedState = {
        billProductCharacteristicData: action.billProductCharacteristicData,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchBillProductCharacteristicFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchBillProductCharacteristicListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchBillProductCharacteristicListSuccess = (state, action) => {
    const updatedState = {
        billProductCharacteristicListCount: action.billProductCharacteristicList.count,
        billProductCharacteristicListPag: action.billProductCharacteristicList.links,
        billProductCharacteristicList: action.billProductCharacteristicList.results,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchBillProductCharacteristicListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const createBillPaymentDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const createBillPaymentDetailSuccess = (state, action) => {
    const updatedBillPaymentDetailList = state.billPaymentDetailList.push(action.billPaymentDetailCreated);
    const updatedState = {
        billPaymentDetailList: updatedBillPaymentDetailList,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const createBillPaymentDetailFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const modifyBillPaymentDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const modifyBillPaymentDetailSuccess = (state, action) => {
    const updatedState = {
        billPaymentDetailData: action.billPaymentDetailData,
        billPaymentDetailSelected: action.billPaymentDetailSelected,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const modifyBillPaymentDetailFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const deleteBillPaymentDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const deleteBillPaymentDetailSuccess = (state, action) => {
    const updatedState = {
        billPaymentDetailList: removeItemOnce(state.billPaymentDetailList, action.id),
        billPaymentDetailListCount: state.billPaymentDetailListCount - 1,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const deleteBillPaymentDetailFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchBillPaymentDetailStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchBillPaymentDetailSuccess = (state, action) => {
    const updatedState = {
        billPaymentDetailData: action.billPaymentDetailData,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchBillPaymentDetailFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchBillPaymentDetailListStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const fetchBillPaymentDetailListSuccess = (state, action) => {
    const updatedState = {
        billPaymentDetailListCount: action.billPaymentDetailList.count,
        billPaymentDetailListPag: action.billPaymentDetailList.links,
        billPaymentDetailList: action.billPaymentDetailList.results,
        error: null,
        loading: false
    };
    return updateObject(state, updatedState);
};

const fetchBillPaymentDetailListFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const fetchExchangeRatesStart = (state, action) => {
    return updateObject(state, { error: null, loadingExRates: true, ExRateDataLoaded: false });
};

const fetchExchangeRatesSuccess = (state, action) => {
    const updatedState = {
        exchangeRatesData: action.exchangeRatesData,
        error: null,
        loadingExRates: false,
        ExRateDataLoaded: true
    };
    return updateObject(state, updatedState);
};

const fetchExchangeRatesFail = (state, action) => {
    return updateObject(state, { error: action.error, loadingExRates: false, ExRateDataLoaded: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BANK_LIST_START: return fetchBankListStart(state, action);
        case actionTypes.FETCH_BANK_LIST_SUCCESS: return fetchBankListSuccess(state, action);
        case actionTypes.FETCH_BANK_LIST_FAIL: return fetchBankListFail(state, action);
        case actionTypes.FETCH_PAYMENT_METHOD_LIST_START: return fetchPaymentMethodListStart(state, action);
        case actionTypes.FETCH_PAYMENT_METHOD_LIST_SUCCESS: return fetchPaymentMethodListSuccess(state, action);
        case actionTypes.FETCH_PAYMENT_METHOD_LIST_FAIL: return fetchPaymentMethodListFail(state, action);
        case actionTypes.FETCH_CURRENCY_LIST_START: return fetchCurrencyListStart(state, action);
        case actionTypes.FETCH_CURRENCY_LIST_SUCCESS: return fetchCurrencyListSuccess(state, action);
        case actionTypes.FETCH_CURRENCY_LIST_FAIL: return fetchCurrencyListFail(state, action);
        case actionTypes.FETCH_PURCHASE_STATUS_LIST_START: return fetchPurchaseStatusListStart(state, action);
        case actionTypes.FETCH_PURCHASE_STATUS_LIST_SUCCESS: return fetchPurchaseStatusListSuccess(state, action);
        case actionTypes.FETCH_PURCHASE_STATUS_LIST_FAIL: return fetchPurchaseStatusListFail(state, action);
        case actionTypes.FETCH_PAYMENT_STATUS_LIST_START: return fetchPaymentStatusListStart(state, action);
        case actionTypes.FETCH_PAYMENT_STATUS_LIST_SUCCESS: return fetchPaymentStatusListSuccess(state, action);
        case actionTypes.FETCH_PAYMENT_STATUS_LIST_FAIL: return fetchPaymentStatusListFail(state, action);
        case actionTypes.CREATE_BILL_CLIENT_SUBMISSION_START: return createBillClientSubmissionStart(state, action);
        case actionTypes.CREATE_BILL_CLIENT_SUBMISSION_SUCCESS: return createBillClientSubmissionSuccess(state, action);
        case actionTypes.CREATE_BILL_CLIENT_SUBMISSION_FAIL: return createBillClientSubmissionFail(state, action);
        case actionTypes.FETCH_BILL_CLIENT_SUBMISSION_DETAIL_START: return fetchBillClientSubmissionDetailStart(state, action);
        case actionTypes.FETCH_BILL_CLIENT_SUBMISSION_DETAIL_SUCCESS: return fetchBillClientSubmissionDetailSuccess(state, action);
        case actionTypes.FETCH_BILL_CLIENT_SUBMISSION_DETAIL_FAIL: return fetchBillClientSubmissionDetailFail(state, action);
        case actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST_START: return fetchBillClientSubmissionListStart(state, action);
        case actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST_SUCCESS: return fetchBillClientSubmissionListSuccess(state, action);
        case actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST_FAIL: return fetchBillClientSubmissionListFail(state, action);
        case actionTypes.SET_SELECTED_BILL_CLIENT_SUBMISSION: return setSelectedBillClientSubmission(state, action);
        case actionTypes.CREATE_PURCHASE_BILL_START: return createPurchaseBillStart(state, action);
        case actionTypes.CREATE_PURCHASE_BILL_SUCCESS: return createPurchaseBillSuccess(state, action);
        case actionTypes.CREATE_PURCHASE_BILL_FAIL: return createPurchaseBillFail(state, action);
        case actionTypes.MODIFY_PURCHASE_BILL_START: return modifyPurchaseBillStart(state, action);
        case actionTypes.MODIFY_PURCHASE_BILL_SUCCESS: return modifyPurchaseBillSuccess(state, action);
        case actionTypes.MODIFY_PURCHASE_BILL_FAIL: return modifyPurchaseBillFail(state, action);
        case actionTypes.FETCH_PURCHASE_BILL_START: return fetchPurchaseBillStart(state, action);
        case actionTypes.FETCH_PURCHASE_BILL_SUCCESS: return fetchPurchaseBillSuccess(state, action);
        case actionTypes.FETCH_PURCHASE_BILL_FAIL: return fetchPurchaseBillFail(state, action);
        case actionTypes.FETCH_PURCHASE_BILL_LIST_START: return fetchPurchaseBillListStart(state, action);
        case actionTypes.FETCH_PURCHASE_BILL_LIST_SUCCESS: return fetchPurchaseBillListSuccess(state, action);
        case actionTypes.FETCH_PURCHASE_BILL_LIST_FAIL: return fetchPurchaseBillListFail(state, action);
        case actionTypes.CREATE_BILL_DETAIL_START: return createBillDetailStart(state, action);
        case actionTypes.CREATE_BILL_DETAIL_SUCCESS: return createBillDetailSuccess(state, action);
        case actionTypes.CREATE_BILL_DETAIL_FAIL: return createBillDetailFail(state, action);
        case actionTypes.MODIFY_BILL_DETAIL_START: return modifyBillDetailStart(state, action);
        case actionTypes.MODIFY_BILL_DETAIL_SUCCESS: return modifyBillDetailSuccess(state, action);
        case actionTypes.MODIFY_BILL_DETAIL_FAIL: return modifyBillDetailFail(state, action);
        case actionTypes.DELETE_BILL_DETAIL_START: return deleteBillDetailStart(state, action);
        case actionTypes.DELETE_BILL_DETAIL_SUCCESS: return deleteBillDetailSuccess(state, action);
        case actionTypes.DELETE_BILL_DETAIL_FAIL: return deleteBillDetailFail(state, action);
        case actionTypes.FETCH_BILL_DETAIL_START: return fetchBillDetailStart(state, action);
        case actionTypes.FETCH_BILL_DETAIL_SUCCESS: return fetchBillDetailSuccess(state, action);
        case actionTypes.FETCH_BILL_DETAIL_FAIL: return fetchBillDetailFail(state, action);
        case actionTypes.FETCH_BILL_DETAIL_LIST_START: return fetchBillDetailListStart(state, action);
        case actionTypes.FETCH_BILL_DETAIL_LIST_SUCCESS: return fetchBillDetailListSuccess(state, action);
        case actionTypes.FETCH_BILL_DETAIL_LIST_FAIL: return fetchBillDetailListFail(state, action);
        case actionTypes.CREATE_BILL_PRODUCT_CHARACTERISTIC_START: return createBillProductCharacteristicStart(state, action);
        case actionTypes.CREATE_BILL_PRODUCT_CHARACTERISTIC_SUCCESS: return createBillProductCharacteristicSuccess(state, action);
        case actionTypes.CREATE_BILL_PRODUCT_CHARACTERISTIC_FAIL: return createBillProductCharacteristicFail(state, action);
        case actionTypes.MODIFY_BILL_PRODUCT_CHARACTERISTIC_START: return modifyBillProductCharacteristicStart(state, action);
        case actionTypes.MODIFY_BILL_PRODUCT_CHARACTERISTIC_SUCCESS: return modifyBillProductCharacteristicSuccess(state, action);
        case actionTypes.MODIFY_BILL_PRODUCT_CHARACTERISTIC_FAIL: return modifyBillProductCharacteristicFail(state, action);
        case actionTypes.DELETE_BILL_PRODUCT_CHARACTERISTIC_START: return deleteBillProductCharacteristicStart(state, action);
        case actionTypes.DELETE_BILL_PRODUCT_CHARACTERISTIC_SUCCESS: return deleteBillProductCharacteristicSuccess(state, action);
        case actionTypes.DELETE_BILL_PRODUCT_CHARACTERISTIC_FAIL: return deleteBillProductCharacteristicFail(state, action);
        case actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_START: return fetchBillProductCharacteristicStart(state, action);
        case actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_SUCCESS: return fetchBillProductCharacteristicSuccess(state, action);
        case actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_FAIL: return fetchBillProductCharacteristicFail(state, action);
        case actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_LIST_START: return fetchBillProductCharacteristicListStart(state, action);
        case actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_LIST_SUCCESS: return fetchBillProductCharacteristicListSuccess(state, action);
        case actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_LIST_FAIL: return fetchBillProductCharacteristicListFail(state, action);
        case actionTypes.CREATE_BILL_PAYMENT_DETAIL_START: return createBillPaymentDetailStart(state, action);
        case actionTypes.CREATE_BILL_PAYMENT_DETAIL_SUCCESS: return createBillPaymentDetailSuccess(state, action);
        case actionTypes.CREATE_BILL_PAYMENT_DETAIL_FAIL: return createBillPaymentDetailFail(state, action);
        case actionTypes.MODIFY_BILL_PAYMENT_DETAIL_START: return modifyBillPaymentDetailStart(state, action);
        case actionTypes.MODIFY_BILL_PAYMENT_DETAIL_SUCCESS: return modifyBillPaymentDetailSuccess(state, action);
        case actionTypes.MODIFY_BILL_PAYMENT_DETAIL_FAIL: return modifyBillPaymentDetailFail(state, action);
        case actionTypes.DELETE_BILL_PAYMENT_DETAIL_START: return deleteBillPaymentDetailStart(state, action);
        case actionTypes.DELETE_BILL_PAYMENT_DETAIL_SUCCESS: return deleteBillPaymentDetailSuccess(state, action);
        case actionTypes.DELETE_BILL_PAYMENT_DETAIL_FAIL: return deleteBillPaymentDetailFail(state, action);
        case actionTypes.FETCH_BILL_PAYMENT_DETAIL_START: return fetchBillPaymentDetailStart(state, action);
        case actionTypes.FETCH_BILL_PAYMENT_DETAIL_SUCCESS: return fetchBillPaymentDetailSuccess(state, action);
        case actionTypes.FETCH_BILL_PAYMENT_DETAIL_FAIL: return fetchBillPaymentDetailFail(state, action);
        case actionTypes.FETCH_BILL_PAYMENT_DETAIL_LIST_START: return fetchBillPaymentDetailListStart(state, action);
        case actionTypes.FETCH_BILL_PAYMENT_DETAIL_LIST_SUCCESS: return fetchBillPaymentDetailListSuccess(state, action);
        case actionTypes.FETCH_BILL_PAYMENT_DETAIL_LIST_FAIL: return fetchBillPaymentDetailListFail(state, action);
        case actionTypes.FETCH_EXCHANGE_RATES_START: return fetchExchangeRatesStart(state, action);
        case actionTypes.FETCH_EXCHANGE_RATES_SUCCESS: return fetchExchangeRatesSuccess(state, action);
        case actionTypes.FETCH_EXCHANGE_RATES_FAIL: return fetchExchangeRatesFail(state, action);
        default: return state;
    };
};

export default reducer;