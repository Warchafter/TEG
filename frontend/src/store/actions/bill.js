import * as actionTypes from './actionTypes';


export const fetchBankList = () => {
    return {
        type: actionTypes.FETCH_BANK_LIST
    };
};

export const fetchBankListStart = () => {
    return {
        type: actionTypes.FETCH_BANK_LIST_START
    };
};

export const fetchBankListSuccess = (bankList) => {
    return {
        type: actionTypes.FETCH_BANK_LIST_SUCCESS,
        bankList: bankList
    };
};

export const fetchBankListFail = (error) => {
    return {
        type: actionTypes.FETCH_BANK_LIST_FAIL,
        error: error
    };
};

export const fetchPaymentMethodList = () => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST
    };
};

export const fetchPaymentMethodListStart = () => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST_START
    };
};

export const fetchPaymentMethodListSuccess = (paymentMethodList) => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST_SUCCESS,
        paymentMethodList: paymentMethodList
    };
};

export const fetchPaymentMethodListFail = (error) => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST_FAIL,
        error: error
    };
};

export const fetchCurrencyList = () => {
    return {
        type: actionTypes.FETCH_CURRENCY_LIST
    };
};

export const fetchCurrencyListStart = () => {
    return {
        type: actionTypes.FETCH_CURRENCY_LIST_START
    };
};

export const fetchCurrencyListSuccess = (currencyList) => {
    return {
        type: actionTypes.FETCH_CURRENCY_LIST_SUCCESS,
        currencyList: currencyList
    };
};

export const fetchCurrencyListFail = (error) => {
    return {
        type: actionTypes.FETCH_CURRENCY_LIST_FAIL,
        error: error
    };
};

export const fetchPurchaseStatusList = () => {
    return {
        type: actionTypes.FETCH_PURCHASE_STATUS_LIST
    };
};

export const fetchPurchaseStatusListStart = () => {
    return {
        type: actionTypes.FETCH_PURCHASE_STATUS_LIST_START
    };
};

export const fetchPurchaseStatusListSuccess = (purchaseStatusList) => {
    return {
        type: actionTypes.FETCH_PURCHASE_STATUS_LIST_SUCCESS,
        purchaseStatusList: purchaseStatusList
    };
};

export const fetchPurchaseStatusListFail = (error) => {
    return {
        type: actionTypes.FETCH_PURCHASE_STATUS_LIST_FAIL,
        error: error
    };
};

export const fetchPaymentStatusList = () => {
    return {
        type: actionTypes.FETCH_PAYMENT_STATUS_LIST
    };
};

export const fetchPaymentStatusListStart = () => {
    return {
        type: actionTypes.FETCH_PAYMENT_STATUS_LIST_START
    };
};

export const fetchPaymentStatusListSuccess = (paymentStatusList) => {
    return {
        type: actionTypes.FETCH_PAYMENT_STATUS_LIST_SUCCESS,
        paymentStatusList: paymentStatusList
    };
};

export const fetchPaymentStatusListFail = (error) => {
    return {
        type: actionTypes.FETCH_PAYMENT_STATUS_LIST_FAIL,
        error: error
    };
};

export const createBillClientSubmission = (formData) => {
    return {
        type: actionTypes.CREATE_BILL_CLIENT_SUBMISSION,
        formData: formData
    };
};

export const createBillClientSubmissionStart = () => {
    return {
        type: actionTypes.CREATE_BILL_CLIENT_SUBMISSION_START
    };
};

export const createBillClientSubmissionSuccess = (billClientSubmissionCreated) => {
    return {
        type: actionTypes.CREATE_BILL_CLIENT_SUBMISSION_SUCCESS,
        billClientSubmissionCreated: billClientSubmissionCreated
    };
};

export const createBillClientSubmissionFail = (error) => {
    return {
        type: actionTypes.CREATE_BILL_CLIENT_SUBMISSION_FAIL,
        error: error
    };
};

export const fetchBillClientSubmissionDetail = (id) => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_DETAIL,
        id: id
    };
};

export const fetchBillClientSubmissionDetailStart = () => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_DETAIL_START
    };
};

export const fetchBillClientSubmissionDetailSuccess = (billClientSubmissionDetail) => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_DETAIL_SUCCESS,
        billClientSubmissionDetail: billClientSubmissionDetail
    };
};

export const fetchBillClientSubmissionDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_DETAIL_FAIL,
        error: error
    };
};

export const fetchBillClientSubmissionList = (userId) => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST,
        userId: userId
    };
};

export const fetchBillClientSubmissionListStart = () => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST_START
    };
};

export const fetchBillClientSubmissionListSuccess = (billClientSubmissionListData) => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST_SUCCESS,
        billClientSubmissionListData: billClientSubmissionListData
    };
};

export const fetchBillClientSubmissionListFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST_FAIL,
        error: error
    };
};

export const fetchBillClientSubmissionListFiltered = () => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST_FILTERED
    };
};

export const fetchBillClientSubmissionListFilteredStart = () => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST_FILTERED_START
    };
};

export const fetchBillClientSubmissionListFilteredSuccess = (billClientSubmissionListFilteredData) => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST_FILTERED_SUCCESS,
        billClientSubmissionListFilteredData: billClientSubmissionListFilteredData
    };
};

export const fetchBillClientSubmissionListFilteredFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_CLIENT_SUBMISSION_LIST_FILTERED_FAIL,
        error: error
    };
};

export const setSelectedBillClientSubmission = (data) => {
    return {
        type: actionTypes.SET_SELECTED_BILL_CLIENT_SUBMISSION,
        data: data
    };
};

export const createPurchaseBill = (data) => {
    return {
        type: actionTypes.CREATE_PURCHASE_BILL,
        data: data
    };
};

export const createPurchaseBillStart = (purchaseBillData) => {
    return {
        type: actionTypes.CREATE_PURCHASE_BILL_START,
        purchaseBillData: purchaseBillData
    };
};

export const createPurchaseBillSuccess = (purchaseBillCreated) => {
    return {
        type: actionTypes.CREATE_PURCHASE_BILL_SUCCESS,
        purchaseBillCreated: purchaseBillCreated
    };
};

export const createPurchaseBillFail = (error) => {
    return {
        type: actionTypes.CREATE_PURCHASE_BILL_FAIL,
        error: error
    };
};

export const modifyPurchaseBill = (data) => {
    return {
        type: actionTypes.MODIFY_PURCHASE_BILL,
        data: data
    };
};

export const modifyPurchaseBillStart = (purchaseBillData, purchaseBillSelected) => {
    return {
        type: actionTypes.MODIFY_PURCHASE_BILL_START,
        purchaseBillData: purchaseBillData,
        purchaseBillSelected: purchaseBillSelected
    };
};

export const modifyPurchaseBillSuccess = (purchaseBillModifiedId) => {
    return {
        type: actionTypes.MODIFY_PURCHASE_BILL_SUCCESS,
        purchaseBillModifiedId: purchaseBillModifiedId
    };
};

export const modifyPurchaseBillFail = (error) => {
    return {
        type: actionTypes.MODIFY_PURCHASE_BILL_FAIL,
        error: error
    };
};

export const fetchPurchaseBill = (data) => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL,
        data: data
    };
};

export const fetchPurchaseBillStart = () => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_START
    };
};

export const fetchPurchaseBillSuccess = (purchaseBillData) => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_SUCCESS,
        purchaseBillData: purchaseBillData
    };
};

export const fetchPurchaseBillFail = (error) => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_FAIL,
        error: error
    };
};

export const fetchPurchaseBillList = () => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_LIST
    };
};

export const fetchPurchaseBillListStart = () => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_LIST_START
    };
};

export const fetchPurchaseBillListSuccess = (purchaseBillList) => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_LIST_SUCCESS,
        purchaseBillList: purchaseBillList
    };
};

export const fetchPurchaseBillListFail = (error) => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_LIST_FAIL,
        error: error
    };
};

export const fetchBillDetailListFiltered = (data) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_LIST_FILTERED,
        data: data
    };
};

export const fetchBillDetailListFilteredStart = () => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_LIST_FILTERED_START
    };
};

export const fetchBillDetailListFilteredSuccess = (billDetailListFiltered) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_LIST_FILTERED_SUCCESS,
        billDetailListFiltered: billDetailListFiltered
    };
};

export const fetchBillDetailListFilteredFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_LIST_FILTERED_FAIL,
        error: error
    };
};



export const setPurchaseBillToModify = (data) => {
    return {
        type: actionTypes.SET_PURCHASE_BILL_TO_MODIFY,
        data: data
    };
};

export const createBillDetail = (data) => {
    return {
        type: actionTypes.CREATE_BILL_DETAIL,
        data: data
    };
};

export const createBillDetailStart = (billDetailData) => {
    return {
        type: actionTypes.CREATE_BILL_DETAIL_START,
        billDetailData: billDetailData
    };
};

export const createBillDetailSuccess = (billDetailData) => {
    return {
        type: actionTypes.CREATE_BILL_DETAIL_SUCCESS,
        billDetailData: billDetailData
    };
};

export const createBillDetailFail = (error) => {
    return {
        type: actionTypes.CREATE_BILL_DETAIL_FAIL,
        error: error
    };
};

export const modifyBillDetail = (data) => {
    return {
        type: actionTypes.MODIFY_BILL_DETAIL,
        data: data
    };
};

export const modifyBillDetailStart = (billDetailData, billDetailSelected) => {
    return {
        type: actionTypes.MODIFY_BILL_DETAIL_START,
        billDetailData: billDetailData,
        billDetailSelected: billDetailSelected
    };
};

export const modifyBillDetailSuccess = (purchaseBillModifiedId) => {
    return {
        type: actionTypes.MODIFY_BILL_DETAIL_SUCCESS,
        purchaseBillModifiedId: purchaseBillModifiedId
    };
};

export const modifyBillDetailFail = (error) => {
    return {
        type: actionTypes.MODIFY_BILL_DETAIL_FAIL,
        error: error
    };
};

export const deleteBillDetail = (data) => {
    return {
        type: actionTypes.DELETE_BILL_DETAIL,
        data: data
    };
};

export const deleteBillDetailStart = (billDetailSelected) => {
    return {
        type: actionTypes.DELETE_BILL_DETAIL_START,
        billDetailSelected: billDetailSelected
    };
};

export const deleteBillDetailSuccess = () => {
    return {
        type: actionTypes.DELETE_BILL_DETAIL_SUCCESS
    };
};

export const deleteBillDetailFail = (error) => {
    return {
        type: actionTypes.DELETE_BILL_DETAIL_FAIL,
        error: error
    };
};

export const fetchBillDetail = (data) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL,
        data: data
    };
};

export const fetchBillDetailStart = (billDetailSelected) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_START,
        billDetailSelected: billDetailSelected
    };
};

export const fetchBillDetailSuccess = (billDetailData) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_SUCCESS,
        billDetailData: billDetailData
    };
};

export const fetchBillDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_FAIL,
        error: error
    };
};

export const fetchBillDetailList = (data) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_LIST,
        data: data
    };
};

export const fetchBillDetailListStart = () => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_LIST_START
    };
};

export const fetchBillDetailListSuccess = (billDetailList) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_LIST_SUCCESS,
        billDetailList: billDetailList
    };
};

export const fetchBillDetailListFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_LIST_FAIL,
        error: error
    };
};

export const createBillProductCharacteristic = (data) => {
    return {
        type: actionTypes.CREATE_BILL_PRODUCT_CHARACTERISTIC,
        data: data
    };
};

export const createBillProductCharacteristicStart = () => {
    return {
        type: actionTypes.CREATE_BILL_PRODUCT_CHARACTERISTIC_START
    };
};

export const createBillProductCharacteristicSuccess = (billProductCharacteristicData) => {
    return {
        type: actionTypes.CREATE_BILL_PRODUCT_CHARACTERISTIC_SUCCESS,
        billProductCharacteristicData: billProductCharacteristicData
    };
};

export const createBillProductCharacteristicFail = (error) => {
    return {
        type: actionTypes.CREATE_BILL_PRODUCT_CHARACTERISTIC_FAIL,
        error: error
    };
};

export const modifyBillProductCharacteristic = (data) => {
    return {
        type: actionTypes.MODIFY_BILL_PRODUCT_CHARACTERISTIC,
        data: data
    };
};

export const modifyBillProductCharacteristicStart = (billProductCharacteristicData, billProductCharacteristicSelected) => {
    return {
        type: actionTypes.MODIFY_BILL_PRODUCT_CHARACTERISTIC_START,
        billProductCharacteristicData: billProductCharacteristicData,
        billProductCharacteristicSelected: billProductCharacteristicSelected
    };
};

export const modifyBillProductCharacteristicSuccess = () => {
    return {
        type: actionTypes.MODIFY_BILL_PRODUCT_CHARACTERISTIC_SUCCESS
    };
};

export const modifyBillProductCharacteristicFail = (error) => {
    return {
        type: actionTypes.MODIFY_BILL_PRODUCT_CHARACTERISTIC_FAIL,
        error: error
    };
};

export const deleteBillProductCharacteristic = (data) => {
    return {
        type: actionTypes.DELETE_BILL_PRODUCT_CHARACTERISTIC,
        data: data
    };
};

export const deleteBillProductCharacteristicStart = (billProductCharacteristicSelected) => {
    return {
        type: actionTypes.DELETE_BILL_PRODUCT_CHARACTERISTIC_START,
        billProductCharacteristicSelected: billProductCharacteristicSelected
    };
};

export const deleteBillProductCharacteristicSuccess = () => {
    return {
        type: actionTypes.DELETE_BILL_PRODUCT_CHARACTERISTIC_SUCCESS
    };
};

export const deleteBillProductCharacteristicFail = (error) => {
    return {
        type: actionTypes.DELETE_BILL_PRODUCT_CHARACTERISTIC_FAIL,
        error: error
    };
};

export const fetchBillProductCharacteristic = (data) => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC,
        data: data
    };
};

export const fetchBillProductCharacteristicStart = (billProductCharacteristicSelected) => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_START,
        billProductCharacteristicSelected: billProductCharacteristicSelected
    };
};

export const fetchBillProductCharacteristicSuccess = (billProductCharacteristicData) => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_SUCCESS,
        billProductCharacteristicData: billProductCharacteristicData
    };
};

export const fetchBillProductCharacteristicFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_FAIL,
        error: error
    };
};

export const fetchBillProductCharacteristicList = (data) => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_LIST,
        data: data
    };
};

export const fetchBillProductCharacteristicListStart = () => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_LIST_START
    };
};

export const fetchBillProductCharacteristicListSuccess = (billProductCharacteristicList) => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_LIST_SUCCESS,
        billProductCharacteristicList: billProductCharacteristicList
    };
};

export const fetchBillProductCharacteristicListFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_LIST_FAIL,
        error: error
    };
};

export const createBillPaymentDetail = (data, formData) => {
    return {
        type: actionTypes.CREATE_BILL_PAYMENT_DETAIL,
        data: data,
        formData: formData
    };
};

export const createBillPaymentDetailStart = () => {
    return {
        type: actionTypes.CREATE_BILL_PAYMENT_DETAIL_START
    };
};

export const createBillPaymentDetailSuccess = (billPaymentDetailCreated) => {
    return {
        type: actionTypes.CREATE_BILL_PAYMENT_DETAIL_SUCCESS,
        billPaymentDetailCreated: billPaymentDetailCreated
    };
};

export const createBillPaymentDetailFail = (error) => {
    return {
        type: actionTypes.CREATE_BILL_PAYMENT_DETAIL_FAIL,
        error: error
    };
};

export const modifyBillPaymentDetail = (data) => {
    return {
        type: actionTypes.MODIFY_BILL_PAYMENT_DETAIL,
        data: data
    };
};

export const modifyBillPaymentDetailStart = (billPaymentDetailData, billPaymentDetailSelected) => {
    return {
        type: actionTypes.MODIFY_BILL_PAYMENT_DETAIL_START,
        billPaymentDetailData: billPaymentDetailData,
        billPaymentDetailSelected: billPaymentDetailSelected
    };
};

export const modifyBillPaymentDetailSuccess = () => {
    return {
        type: actionTypes.MODIFY_BILL_PAYMENT_DETAIL_SUCCESS
    };
};

export const modifyBillPaymentDetailFail = (error) => {
    return {
        type: actionTypes.MODIFY_BILL_PAYMENT_DETAIL_FAIL,
        error: error
    };
};

export const deleteBillPaymentDetail = (data) => {
    return {
        type: actionTypes.DELETE_BILL_PAYMENT_DETAIL,
        data: data
    };
};

export const deleteBillPaymentDetailStart = () => {
    return {
        type: actionTypes.DELETE_BILL_PAYMENT_DETAIL_START
    };
};

export const deleteBillPaymentDetailSuccess = () => {
    return {
        type: actionTypes.DELETE_BILL_PAYMENT_DETAIL_SUCCESS
    };
};

export const deleteBillPaymentDetailFail = () => {
    return {
        type: actionTypes.DELETE_BILL_PAYMENT_DETAIL_FAIL
    };
};

export const fetchBillPaymentDetail = (data) => {
    return {
        type: actionTypes.FETCH_BILL_PAYMENT_DETAIL,
        data: data
    };
};

export const fetchBillPaymentDetailStart = (billPaymentDetailSelected) => {
    return {
        type: actionTypes.FETCH_BILL_PAYMENT_DETAIL_START,
        billPaymentDetailSelected: billPaymentDetailSelected
    };
};

export const fetchBillPaymentDetailSuccess = (billPaymentDetailData) => {
    return {
        type: actionTypes.FETCH_BILL_PAYMENT_DETAIL_SUCCESS,
        billPaymentDetailData: billPaymentDetailData
    };
};

export const fetchBillPaymentDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_PAYMENT_DETAIL_FAIL,
        error: error
    };
};

export const fetchBillPaymentDetailList = (data) => {
    return {
        type: actionTypes.FETCH_BILL_PAYMENT_DETAIL_LIST,
        data: data
    };
};

export const fetchBillPaymentDetailListStart = () => {
    return {
        type: actionTypes.FETCH_BILL_PAYMENT_DETAIL_LIST_START
    };
};

export const fetchBillPaymentDetailListSuccess = (billPaymentDetailList) => {
    return {
        type: actionTypes.FETCH_BILL_PAYMENT_DETAIL_LIST_SUCCESS,
        billPaymentDetailList: billPaymentDetailList
    };
};

export const fetchBillPaymentDetailListFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_PAYMENT_DETAIL_LIST_FAIL,
        error: error
    };
};

export const fetchExchangeRates = (data) => {
    return {
        type: actionTypes.FETCH_EXCHANGE_RATES,
        data: data
    };
};

export const fetchExchangeRatesStart = () => {
    return {
        type: actionTypes.FETCH_EXCHANGE_RATES_START,
    };
};

export const fetchExchangeRatesSuccess = (exchangeRatesData) => {
    return {
        type: actionTypes.FETCH_EXCHANGE_RATES_SUCCESS,
        exchangeRatesData: exchangeRatesData
    };
};

export const fetchExchangeRatesFail = (error) => {
    return {
        type: actionTypes.FETCH_EXCHANGE_RATES_FAIL,
        error: error
    };
};