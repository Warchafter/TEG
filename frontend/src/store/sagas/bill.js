import { put, select } from 'redux-saga/effects';
import axios from '../../axios-db';

import { getSnackbarData } from '../../shared/utility';
import * as actions from '../actions/index';

export const getUserId = (state) => state.auth.user.id
export const getBillPaymentDetail = (state) => state.bill.billPaymentDetailSelected
export const getBillClientSubmissionSelected = (state) => state.bill.billClientSubmissionSelected

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
        yield put(actions.fetchPaymentStatusListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchPaymentStatusListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los estados del pago', 'error')));
    };
};

export function* createBillClientSubmissionSaga(action) {
    yield put(actions.createBillClientSubmissionStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const body = JSON.stringify(action.formData);
    const url = '/bill/bill-client-submissions/';
    try {
        let response = yield axios.post(url, body, config);
        console.log(response);
        yield put(actions.createBillClientSubmissionSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('La Solicitud fue enviada exitosamente!', 'success')));
    } catch (error) {
        yield put(actions.createBillClientSubmissionFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo enviar la solicitud', 'error')));
    };
};

export function* fetchBillClientSubmissionDetailSaga(action) {
    yield put(actions.fetchBillClientSubmissionDetailStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-client-submissions/${action.data.billClientSubmissionSelected}`;
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchBillClientSubmissionDetailSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillClientSubmissionDetailFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el detalle de la solicitud', 'error')));
    };
};

export function* fetchBillClientSubmissionListSaga(action) {
    yield put(actions.fetchBillClientSubmissionListStart());
    console.log("userId", action.userId);
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url1 = `/bill/bill-client-submissions/?user=${action.userId}`;
    const url2 = '/bill/bill-client-submissions/';

    try {
        let response = yield axios.get(action.userId ? url1 : url2, config);
        yield put(actions.fetchBillClientSubmissionListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillClientSubmissionListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer las solicitudes', 'error')));
    };
};

export function* fetchBillClientSubmissionListFilteredSaga(action) {
    yield put(actions.fetchBillClientSubmissionListFilteredStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = '/bill/bill-client-submissions/';
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchBillClientSubmissionListFilteredSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillClientSubmissionListFilteredFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer las solicitudes', 'error')));
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
        yield put(actions.createPurchaseBillSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('La Factura fue creada exitosamente!', 'success')));
    } catch (error) {
        yield put(actions.createPurchaseBillFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo crear la factura', 'error')));
    };
};

export function* modifyPurchaseBillSaga(action) {
    yield put(actions.modifyPurchaseBillStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/purchase-bills/${action.id}/`;
    try {
        let response = yield axios.patch(url, action.data, config);
        yield put(actions.modifyPurchaseBillSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData(`Modificada la factura # ${action.id}`, 'success')));
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
    const url = `/bill/purchase-bills/${action.data}/`;
    try {
        let response = yield axios.get(url, config);
        console.log("RESPONSE",response.data);
        yield put(actions.fetchPurchaseBillSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchPurchaseBillFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer el detalle del producto', 'error')));
    };
};

export function* fetchPurchaseBillListSaga(action) {
    yield put(actions.fetchPurchaseBillListStart());
    let billClientSubmissionSelected = yield select(getBillClientSubmissionSelected);
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    console.log(action.data)
    const url1 = '/bill/purchase-bills/';
    const url2 = `/bill/purchase-bills/?bill_client_submission=${action.data ? action.data.id : null}`;
    try {
        let response = yield axios.get(billClientSubmissionSelected ? url2 : url1, config);
        yield put(actions.fetchPurchaseBillListSuccess(response.data));
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
    const url = '/bill/bill-details/';
    try {
        let response = yield axios.post(url, action.data, config);
        yield put(actions.createBillDetailSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('El detalle de la factura fue creado exitosamente!', 'success')));
        yield put(actions.setPurchaseBillAddingNewProduct(false));
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
        let response = yield axios.patch(url, body, config);
        yield put(actions.modifyBillDetailSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData(`Modificado el detalle de la factura: ${action.data.billDetailSelected}`, 'success')));
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
        yield put(actions.enqueueSnackbar(getSnackbarData('Eliminado el detalle de la factura', 'success')));
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
        yield put(actions.fetchBillDetailListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillDetailListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los detalles de las facturas', 'error')));
    };
};

export function* fetchBillDetailListFilteredSaga(action) {
    yield put(actions.fetchBillDetailListFilteredStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-details/?purchase_bill=${action.data}`;
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchBillDetailListFilteredSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillDetailListFilteredFail(error));
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
    const url = '/bill/bill-product-characteristics/';
    try {
        console.log(action.data);
        let response = yield axios.post(url, action.data, config);
        yield put(actions.createBillProductCharacteristicSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('El detalle de la factura fue creado exitosamente!', 'success')));
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
        yield put(actions.enqueueSnackbar(getSnackbarData(`Modificadas las características del producto de la factura: ${action.data.billProductCharacteristicSelected}`, 'success')));
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
        yield put(actions.enqueueSnackbar(getSnackbarData('Eliminada las características del producto de la factura', 'success')));
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
        yield put(actions.fetchBillProductCharacteristicListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillProductCharacteristicListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los detalles de los productos de las facturas', 'error')));
    };
};

export function* fetchBillProductCharacteristicListFilteredSaga(action) {
    yield put(actions.fetchBillProductCharacteristicListFilteredStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-product-characteristics/?bill_detail=${action.data}`;
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchBillProductCharacteristicListFilteredSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillProductCharacteristicListFilteredFail(error));
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
    let url = '/bill/bill-payment-details/';
    console.log(action.data);
    try {
        let response1 = yield axios.post(url, action.data, config);
        url = `/bill/bill-payment-details/${response1.data.id}/upload-image/`;
        config = {
            headers: {
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        let response2 = yield axios.post(url, action.formData, config);
        console.log(response2);
        yield put(actions.createBillPaymentDetailSuccess(response1.data, response2.data.payment_receipt_image));
        yield put(actions.enqueueSnackbar(getSnackbarData('El detalle del pago fue creado exitosamente!', 'success')));
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
        yield put(actions.enqueueSnackbar(getSnackbarData('Modificado el detalle del pago','success')));
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
        yield put(actions.enqueueSnackbar(getSnackbarData(`Eliminado el detalle del pago: ${id}`, 'success')));
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
        yield put(actions.fetchBillPaymentDetailListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillPaymentDetailListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los detalles de pago de las facturas', 'error')));
    };
};

export function* fetchBillPaymentDetailListFilteredSaga(action) {
    yield put(actions.fetchBillPaymentDetailListFilteredStart());
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-payment-details/?purchase_bill=${action.data}`;
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchBillPaymentDetailListFilteredSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchBillPaymentDetailListFilteredFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los detalles de pago de las facturas', 'error')));
    };
};

export function* fetchExchangeRatesSaga(action) {
    yield put(actions.fetchExchangeRatesStart());
    const url = 'https://s3.amazonaws.com/dolartoday/data.json'
    try {
        let response = yield axios.get(url);
        yield put(actions.fetchExchangeRatesSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchExchangeRatesFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer las tasas del día', 'error')));
    };
};

export function* uploadBillPaymentDetailImageSaga(action) {
    yield put(action.uploadBillPaymentDetailImageStart());
    let billPaymentDetail = yield select(getBillPaymentDetail);
    const access = yield localStorage.getItem('access');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access ? `JWT ${access}` : null,
            'Accept': 'application/json'
        }
    };
    const url = `/bill/bill-payment-details/${billPaymentDetail.id}/upload-image/`;
    try {
        let response = axios.post(url, action.data, config);
        yield put(actions.uploadBillPaymentDetailImageSuccess(response.data));
        yield put(actions.enqueueSnackbar(getSnackbarData('¡Se cargó el pago exitosamente!'), 'success'));
    } catch (error) {
        yield put(actions.uploadBillPaymentDetailImageFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo cargar el pago', 'error')));
    };
};


export function* fetchPurchaseBillPendingListSaga(action) {
    yield put(actions.fetchPurchaseBillPendingListStart());
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    const url = '/bill/purchase-bills/?purchase_status=1';
    try {
        let response = yield axios.get(url, config);
        yield put(actions.fetchPurchaseBillPendingListSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchPurchaseBillPendingListFail(error));
        yield put(actions.enqueueSnackbar(getSnackbarData('No se pudo traer los detalles de pago de las facturas', 'error')));
    };
};