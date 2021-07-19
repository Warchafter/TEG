import { put } from 'redux-saga/effects';
import axios from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export const getUserId = (state) => state.auth.user.id

export function* fetchBankListSaga(action) {
    yield put(actions.fetchBankListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/bill/banks/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchBankListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBankListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los bancos', 'error')));
    };
};

export function* fetchPaymentMethodListSaga(action) {
    yield put(actions.fetchPaymentMethodListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/bill/payment-methods/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchPaymentMethodListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchPaymentMethodListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los métodos de pago', 'error')));
    };
};

export function* fetchCurrencyListSaga(action) {
    yield put(actions.fetchCurrencyListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/bill/currencies/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchCurrencyListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchCurrencyListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer las monedas', 'error')));
    };
};

export function* fetchPurchaseStatusListSaga(action) {
    yield put(actions.fetchPurchaseStatusListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/bill/purchase-status/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchPurchaseStatusListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchPurchaseStatusListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los estados de la compra', 'error')));
    };
};

export function* fetchPaymentStatusListSaga(action) {
    yield put(actions.fetchPaymentStatusListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/bill/payment-status/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchPaymentStatusListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchPaymentStatusListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los estados del pago', 'error')));
    };
};

export function* createPurchaseBillSaga(action) {
    yield put(actions.createPurchaseBillStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify(action.data);
    const url = '/bill/purchase-bills/';
    try {
        let response = yield axios.post(url, body, config);
        console.log(response);
        yield put(actions.createPurchaseBillSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('La Factura fue creada exitosamente!')));
    } catch (error) {
        yield put(actions.createPurchaseBillFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo crear la factura', 'error')));
    };
};

export function* modifyPurchaseBillSaga(action) {
    // The payload must contain all the fields of the product that is being
    // modified + the id of said product from the supplier list.
    yield put(actions.modifyPurchaseBillStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({
        purchase_order_date: action.data.purchaseBillData.purchase_order_date,
        purchase_payment_date: action.data.purchaseBillData.purchase_payment_date,
        payment_method: action.data.purchaseBillData.payment_method,
        currency: action.data.purchaseBillData.currency,
        bank: action.data.purchaseBillData.bank,
        purchase_status: action.data.purchaseBillData.purchase_status,
        payment_status: action.data.purchaseBillData.payment_status
    });
    const url = `/bill/purchase-bills/${action.data.purchaseBillSelected}`;
    try {
        let response = yield axios.put(url, body, config);
        yield put(actions.modifyPurchaseBillSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData(`Modificada la factura ${action.data.purchaseBillSelected}`)));
    } catch (error) {
        yield put(actions.modifyPurchaseBillFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo modificar la factura', 'error')));
    };
};

export function* fetchPurchaseBillSaga(action) {
    yield put(actions.fetchPurchaseBillStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/purchase-bills/${action.data.purchaseBillSelected}`;
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchPurchaseBillSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchPurchaseBillFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el detalle del producto', 'error')));
    };
};

export function* fetchPurchaseBillListSaga(action) {
    yield put(actions.fetchPurchaseBillListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/bill/purchase-bills/';
    try {
        console.log("before get");
        let response = yield axios.get(url, config);
        console.log("before put success");
        yield put(actions.fetchPurchaseBillListSuccess(response.data));
        console.log("after put success");
    } catch (error) {
        yield put(actions.fetchPurchaseBillListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer las facturas', 'error')));
    };
};

export function* createBillDetailSaga(action) {
    yield put(actions.createBillDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({
        purchase_bill: action.data.billDetailData.purchase_bill,
        product: action.data.billDetailData.product,
        quantity: action.data.billDetailData.quantity
    });
    const url = '/bill/bill-details/';
    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.createBillDetailSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('El detalle de la factura fue creado exitosamente!')));
    } catch (error) {
        yield put(actions.createBillDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo crear el detalle de la factura', 'error')));
    };
};

export function* modifyBillDetailSaga(action) {
    // The payload must contain all the fields of the product that is being
    // modified + the id of said product from the supplier list.
    yield put(actions.modifyBillDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({
        purchase_bill: action.data.billDetailData.purchase_bill,
        product: action.data.billDetailData.product,
        quantity: action.data.billDetailData.quantity
    });
    const url = `/bill/bill-details/${action.data.billDetailSelected}`;
    try {
        let response = yield axios.put(url, body, config);
        yield put(actions.modifyBillDetailSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData(`Modificada el detalle de la factura: ${action.data.billDetailSelected}`)));
    } catch (error) {
        yield put(actions.modifyBillDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo modificar detalle de la factura', 'error')));
    };
};

export function* deleteBillDetailSaga(action) {
    // The payload must contain all the fields of the product that is being
    // modified + the id of said product from the supplier list.
    yield put(actions.deleteBillDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-details/${action.data.billDetailSelected}`;
    try {
        let response = yield axios.delete(url, config);
        yield put(actions.deleteBillDetailSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('Eliminado el detalle de la factura')));
    } catch (error) {
        yield put(actions.deleteBillDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo eliminar el detalle de la factura', 'error')));
    };
};

export function* fetchBillDetailSaga(action) {
    yield put(actions.fetchBillDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-details/${action.data.billDetailSelected}`;
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchBillDetailSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el detalle de la factura', 'error')));
    };
};

export function* fetchBillDetailListSaga(action) {
    yield put(actions.fetchBillDetailListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/bill/bill-details/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchBillDetailListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillDetailListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los detalles de las facturas', 'error')));
    };
};

export function* createBillProductCharacteristicSaga(action) {
    yield put(actions.createBillProductCharacteristicStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({
        bill_detail: action.data.billProductCharacteristicData.bill_detail,
        characteristic_sel: action.data.billProductCharacteristicData.characteristic_sel,
    });
    const url = '/bill/bill-product-characteristics/';
    try {
        let response = yield axios.post(url, body, config);
        yield put(actions.createBillProductCharacteristicSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('El detalle de la factura fue creado exitosamente!')));
    } catch (error) {
        yield put(actions.createBillProductCharacteristicFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo crear el detalle de la factura', 'error')));
    };
};

export function* modifyBillProductCharacteristicSaga(action) {
    // This function implementation must be as following:
    // 1.- There must be an array of ids that belong to the product.
    // This array must handle all the objects for when the user wants to delete one,
    // it'll only make a put request and not a delete request. It's a matter of
    // replacing the whole array, instead of deleting a singular id within it.
    yield put(actions.modifyBillProductCharacteristicStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({
        bill_detail: action.data.billProductCharacteristicData.bill_detail,
        characteristic_sel: action.data.billProductCharacteristicData.characteristic_sel,
    });
    const url = `/bill/bill-product-characteristics/${action.data.billProductCharacteristicSelected}`;
    try {
        let response = yield axios.put(url, body, config);
        yield put(actions.modifyBillProductCharacteristicSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData(`Modificado las características del producto de la factura: ${action.data.billProductCharacteristicSelected}`)));
    } catch (error) {
        yield put(actions.modifyBillProductCharacteristicFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo modificar la característica del producto de la factura', 'error')));
    };
};

export function* deleteBillProductCharacteristicSaga(action) {
    // The payload must contain all the fields of the product that is being
    // modified + the id of said product from the supplier list.
    yield put(actions.deleteBillProductCharacteristicStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-product-characteristics/${action.data.billProductCharacteristicSelected}`;
    try {
        let response = yield axios.delete(url, config);
        yield put(actions.deleteBillProductCharacteristicSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('Eliminado las características del producto de la factura')));
    } catch (error) {
        yield put(actions.deleteBillProductCharacteristicFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo eliminar las características del producto de la factura', 'error')));
    };
};

export function* fetchBillProductCharacteristicSaga(action) {
    yield put(actions.fetchBillProductCharacteristicStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-product-characteristics/${action.data.billProductCharacteristicSelected}`;
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchBillProductCharacteristicSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillProductCharacteristicFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer las características del producto de la factura', 'error')));
    };
};

export function* fetchBillProductCharacteristicListSaga(action) {
    yield put(actions.fetchBillProductCharacteristicListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/bill/bill-product-characteristics/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchBillProductCharacteristicListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillProductCharacteristicListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los detalles de los productos de las facturas', 'error')));
    };
};

export function* createBillPaymentDetailSaga(action) {
    yield put(actions.createBillPaymentDetailStart());
    const access = yield localStorage.getItem('access');
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    console.log("This is the action.data");
    console.log(action.data);
    let body = JSON.stringify({
        purchase_bill: action.data.purchase_bill,
        payment_receipt_number: action.data.payment_receipt_number
    });
    let url = '/bill/bill-payment-details/';
    try {
        let response = yield axios.post(url, body, config);
        config = {
            headers: {
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        url = `/bill/bill-payment-details/${response.data.id}/upload-image/`;
        try {
            let responseFile = yield axios.post(url, action.formData, config);
            console.log(responseFile.data);
        } catch (error) {
            console.log(error);
            yield put(actions.createBillPaymentDetailFail(error));
            yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo cargar la imagen del recibo del pago', 'error')));
        }

        yield put(actions.createBillPaymentDetailSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('El detalle del pago fue creado exitosamente!')));
    } catch (error) {
        yield put(actions.createBillPaymentDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo crear el detalle del pago', 'error')));
    };
};

export function* modifyBillPaymentDetailSaga(action) {
    yield put(actions.modifyBillPaymentDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify({
        purchase_bill: action.data.billPaymentDetailData.purchase_bill,
        payment_receipt_number: action.data.billPaymentDetailData.payment_receipt_number,
        payment_receipt_image: action.data.billPaymentDetailData.payment_receipt_image
    });
    const url = `/bill/bill-payment-details/${action.data.billPaymentDetailSelected}/`;
    try {
        let response = yield axios.put(url, body, config);
        yield put(actions.modifyBillPaymentDetailSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('Modificado el detalle del pago')));
    } catch (error) {
        yield put(actions.modifyBillPaymentDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo modificar el detalle del pago', 'error')));
    };
};

export function* deleteBillPaymentDetailSaga(action) {
    yield put(actions.deleteBillPaymentDetailStart());
    const access = yield localStorage.getItem('access');
    let id = action.data;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-payment-details/${id}/`;
    try {
        yield axios.delete(url, config);
        yield put(actions.deleteBillPaymentDetailSuccess(id));
        yield put(actions.enqueueSnackbar(getSnackbarData(`Eliminado el detalle del pago: ${id}`)));
    } catch (error) {
        yield put(actions.deleteBillPaymentDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo modificar el detalle del pago', 'error')));
    };
};

export function* fetchBillPaymentDetailSaga(action) {
    yield put(actions.fetchBillPaymentDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-payment-details/${action.data.billPaymentDetailSelected}`;
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchBillPaymentDetailSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillPaymentDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el detalle del pago', 'error')));
    };
};

export function* fetchBillPaymentDetailListSaga(action) {
    yield put(actions.fetchBillPaymentDetailListStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/bill/bill-payment-details/';
    try {
        let response = yield axios.get(url, config);
        console.log(response.data);
        yield put(actions.fetchBillPaymentDetailListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillPaymentDetailListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los detalles de pago de las facturas', 'error')));
    };
};
