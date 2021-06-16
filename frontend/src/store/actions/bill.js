import * as actionTypes from './actionTypes';

export const fetchBankList = (data) => {
    return {
        type: actionTypes.FETCH_BANK_LIST,
        data: data
    };
};

export const fetchBankListStart = () => {
    return {
        type: actionTypes.FETCH_BANK_LIST_START
    };
};

export const fetchBankListSuccess = (bankData) => {
    return {
        type: actionTypes.FETCH_BANK_LIST_SUCCESS,
        bankData: bankData
    };
};

export const fetchBankListFail = (error) => {
    return {
        type: actionTypes.FETCH_BANK_LIST_FAIL,
        error: error
    };
};

export const fetchPaymentMethodList = (data) => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST,
        data: data
    };
};

export const fetchPaymentMethodListStart = () => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST_START
    };
};

export const fetchPaymentMethodListSuccess = (paymentMethodData) => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST_SUCCESS,
        paymentMethodData: paymentMethodData
    };
};

export const fetchPaymentMethodListFail = (error) => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST_FAIL,
        error: error
    };
};

export const fetchCurrencyList = (data) => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST,
        data: data
    };
};

export const fetchCurrencyListStart = () => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST_START
    };
};

export const fetchCurrencyListSuccess = (currencyData) => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST_SUCCESS,
        currencyData: currencyData
    };
};

export const fetchCurrencyListFail = (error) => {
    return {
        type: actionTypes.FETCH_PAYMENT_METHOD_LIST_FAIL,
        error: error
    };
};

export const fetchPurchaseStatusList = (data) => {
    return {
        type: actionTypes.FETCH_PURCHASE_STATUS_LIST,
        data: data
    };
};

export const fetchPurchaseStatusListStart = () => {
    return {
        type: actionTypes.FETCH_PURCHASE_STATUS_LIST_START
    };
};

export const fetchPurchaseStatusListSuccess = (currencyData) => {
    return {
        type: actionTypes.FETCH_PURCHASE_STATUS_LIST_SUCCESS,
        currencyData: currencyData
    };
};

export const fetchPurchaseStatusListFail = (error) => {
    return {
        type: actionTypes.FETCH_PURCHASE_STATUS_LIST_FAIL,
        error: error
    };
};

export const fetchPaymentStatusList = (data) => {
    return {
        type: actionTypes.FETCH_PAYMENT_STATUS_LIST,
        data: data
    };
};

export const fetchPaymentStatusListStart = () => {
    return {
        type: actionTypes.FETCH_PAYMENT_STATUS_LIST_START
    };
};

export const fetchPaymentStatusListSuccess = (paymentStatusData) => {
    return {
        type: actionTypes.FETCH_PAYMENT_STATUS_LIST_SUCCESS,
        paymentStatusData: paymentStatusData
    };
};

export const fetchPaymentStatusListFail = (error) => {
    return {
        type: actionTypes.FETCH_PAYMENT_STATUS_LIST_FAIL,
        error: error
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

export const createPurchaseBillSuccess = (purchaseBillCreatedId) => {
    return {
        type: actionTypes.CREATE_PURCHASE_BILL_SUCCESS,
        purchaseBillCreatedId: purchaseBillCreatedId
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

export const modifyPurchaseBillStart = (purchaseBillSelected, purchaseBillData) => {
    return {
        type: actionTypes.MODIFY_PURCHASE_BILL_START,
        purchaseBillSelected: purchaseBillSelected,
        purchaseBillData: purchaseBillData
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

export const fetchPurchaseBillStart = (purchaseBillSelected) => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_START,
        purchaseBillSelected: purchaseBillSelected
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

export const fetchPurchaseBillList = (data) => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_LIST,
        data: data
    };
};

export const fetchPurchaseBillListStart = () => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_LIST_START
    };
};

export const fetchPurchaseBillListSuccess = (purchaseBillsData) => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_LIST_SUCCESS,
        purchaseBillsData: purchaseBillsData
    };
};

export const fetchPurchaseBillListFail = (error) => {
    return {
        type: actionTypes.FETCH_PURCHASE_BILL_LIST_FAIL,
        error: error
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

export const createBillDetailSuccess = (billDetailIds) => {
    return {
        type: actionTypes.CREATE_BILL_DETAIL_SUCCESS,
        billDetailIds: billDetailIds
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

export const modifyBillDetailStart = (billDetailSelected, billDetailData) => {
    return {
        type: actionTypes.MODIFY_BILL_DETAIL_START,
        billDetailSelected: billDetailSelected,
        billDetailData: billDetailData
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

export const fetchBillDetailListSuccess = (billsData) => {
    return {
        type: actionTypes.FETCH_BILL_DETAIL_LIST_SUCCESS,
        billsData: billsData
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

export const createBillProductCharacteristicStart = (billProductCharacteristicIds, billDetailId) => {
    return {
        type: actionTypes.CREATE_BILL_PRODUCT_CHARACTERISTIC_START,
        billProductCharacteristicIds: billProductCharacteristicIds,
        billDetailId: billDetailId
    };
};

export const createBillProductCharacteristicSuccess = (billDetailCreatedId) => {
    return {
        type: actionTypes.CREATE_BILL_PRODUCT_CHARACTERISTIC_SUCCESS,
        billDetailCreatedId: billDetailCreatedId
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

export const modifyBillProductCharacteristicStart = (billProductCharacteristicIds, billDetailId, billDetailSelectedId) => {
    return {
        type: actionTypes.MODIFY_BILL_PRODUCT_CHARACTERISTIC_START,
        billProductCharacteristicIds: billProductCharacteristicIds,
        billDetailId: billDetailId,
        billDetailSelectedId: billDetailSelectedId
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

export const fetchBillProductCharacteristicStart = (billProductCharacteristicId) => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_START,
        billProductCharacteristicId: billProductCharacteristicId
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

export const fetchBillProductCharacteristicListSuccess = (billProductCharacteristicListData) => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_LIST_SUCCESS,
        billProductCharacteristicListData: billProductCharacteristicListData
    };
};

export const fetchBillProductCharacteristicListFail = (error) => {
    return {
        type: actionTypes.FETCH_BILL_PRODUCT_CHARACTERISTIC_LIST_FAIL,
        error: error
    };
};

export const createPaymentDetail = (data) => {
    return {
        type: actionTypes.CREATE_PAYMENT_DETAIL,
        data: data
    };
};

export const createPaymentDetailStart = (paymentDetailData) => {
    return {
        type: actionTypes.CREATE_PAYMENT_DETAIL_START,
        paymentDetailData: paymentDetailData
    };
};

export const createPaymentDetailSuccess = (paymentDetailCreatedId) => {
    return {
        type: actionTypes.CREATE_PAYMENT_DETAIL_SUCCESS,
        paymentDetailCreatedId: paymentDetailCreatedId
    };
};

export const createPaymentDetailFail = (error) => {
    return {
        type: actionTypes.CREATE_PAYMENT_DETAIL_FAIL,
        error: error
    };
};

export const modifyPaymentDetail = (data) => {
    return {
        type: actionTypes.MODIFY_PAYMENT_DETAIL,
        data: data
    };
};

export const modifyPaymentDetailStart = (paymentDetailSelected, paymentDetailData) => {
    return {
        type: actionTypes.MODIFY_PAYMENT_DETAIL_START,
        paymentDetailSelected: paymentDetailSelected,
        paymentDetailData: paymentDetailData
    };
};

export const modifyPaymentDetailSuccess = () => {
    return {
        type: actionTypes.MODIFY_PAYMENT_DETAIL_SUCCESS
    };
};

export const modifyPaymentDetailFail = (error) => {
    return {
        type: actionTypes.MODIFY_PAYMENT_DETAIL_FAIL,
        error: error
    };
};

export const fetchPaymentDetail = (data) => {
    return {
        type: actionTypes.FETCH_PAYMENT_DETAIL,
        data: data
    };
};

export const fetchPaymentDetailStart = (paymentDetailId) => {
    return {
        type: actionTypes.FETCH_PAYMENT_DETAIL_START,
        paymentDetailId: paymentDetailId
    };
};

export const fetchPaymentDetailSuccess = (paymentDetailData) => {
    return {
        type: actionTypes.FETCH_PAYMENT_DETAIL_SUCCESS,
        paymentDetailData: paymentDetailData
    };
};

export const fetchPaymentDetailFail = (error) => {
    return {
        type: actionTypes.FETCH_PAYMENT_DETAIL_FAIL,
        error: error
    };
};

export const fetchPaymentDetailList = (data) => {
    return {
        type: actionTypes.FETCH_PAYMENT_DETAIL_LIST,
        data: data
    };
};

export const fetchPaymentDetailListStart = () => {
    return {
        type: actionTypes.FETCH_PAYMENT_DETAIL_LIST_START
    };
};

export const fetchPaymentDetailListSuccess = (paymentDetailListData) => {
    return {
        type: actionTypes.FETCH_PAYMENT_DETAIL_LIST_SUCCESS,
        paymentDetailListData: paymentDetailListData
    };
};

export const fetchPaymentDetailListFail = (error) => {
    return {
        type: actionTypes.FETCH_PAYMENT_DETAIL_LIST_FAIL,
        error: error
    };
};