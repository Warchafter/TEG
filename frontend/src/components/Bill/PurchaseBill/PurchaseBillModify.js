import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Grid,
    MenuItem,
    Select,
    Typography,
    TextField
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    gridContainer: {
        padding: '10px'
    }
}));


const PurchaseBillModifyData = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const bankList = useSelector(state => state.bill.bankList);
    const currencyList = useSelector(state => state.bill.currencyList);
    const paymentMethodList = useSelector(state => state.bill.paymentMethodList);
    const purchaseStatusList = useSelector(state => state.bill.purchaseStatusList);
    const paymentStatusList = useSelector(state => state.bill.paymentStatusList);
    const purchaseBillToModify = useSelector(state => state.bill.purchaseBillToModify);

    const onFetchPaymentStatusList = useCallback(() => dispatch(actions.fetchPaymentStatusList()), [dispatch,]);
    const onFetchPurchaseStatusList = useCallback(() => dispatch(actions.fetchPurchaseStatusList()), [dispatch,]);
    const onFetchPaymentMethodList = useCallback(() => dispatch(actions.fetchPaymentMethodList()), [dispatch,]);
    const onFetchCurrencyList = useCallback(() => dispatch(actions.fetchCurrencyList()), [dispatch,]);
    const onFetchBankList = useCallback(() => dispatch(actions.fetchBankList()), [dispatch,]);
    const onModifyPurchaseBill = useCallback((formData, id) => dispatch(actions.modifyPurchaseBill(formData, id)), [dispatch]);

    useEffect(() => {
        onFetchPurchaseStatusList();
        onFetchPaymentStatusList();
        onFetchPaymentMethodList();
        onFetchCurrencyList();
        onFetchBankList();
    }, [])

    const formik = useFormik({
        initialValues: {
            // purchase_order_date: purchaseBillToModify.purchase_order_date,
            // purchase_payment_date: purchaseBillToModify.purchase_payment_date,
            // employee_in_charge: purchaseBillToModify.employee_in_charge.id,
            // bill_client_submission: purchaseBillToModify.bill_client_submission.id,
            payment_method: purchaseBillToModify.payment_method.id,
            currency: purchaseBillToModify.currency.id,
            bank: purchaseBillToModify.bank.id,
            purchase_status: purchaseBillToModify.purchase_status.id,
            payment_status: purchaseBillToModify.payment_status.id,
            // delivery_status: purchaseBillToModify.delivery_status.id
        },
        onSubmit: (values) => {
            onModifyPurchaseBill(values, purchaseBillToModify.id);
        },
    });


    return (
        <div className={styles.root}>
            <Card >
                <Grid container spacing={2} className={styles.gridContainer}>
                    <Grid item xs={12}>
                        <Typography >
                            Detalle de la factura {purchaseBillToModify.id}
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid item xs={12}>
                                <Select
                                    labelId="payment-status-supplier-select"
                                    id="payment-status-select"
                                    name="payment_status"
                                    value={formik.values.payment_status}
                                    onChange={formik.handleChange}
                                    >
                                        {paymentStatusList.map(index => (
                                                <MenuItem key={index.name} value={index.id}>
                                                    {index.name}
                                                </MenuItem>
                                        ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    labelId="purchase-status-supplier-select"
                                    id="purchase-status-select"
                                    name="purchase_status"
                                    value={formik.values.purchase_status}
                                    onChange={formik.handleChange}
                                    >
                                        {purchaseStatusList.map(index => (
                                                <MenuItem key={index.name} value={index.id}>
                                                    {index.name}
                                                </MenuItem>
                                        ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    labelId="bank-supplier-select"
                                    id="bank-select"
                                    name="bank"
                                    value={formik.values.bank}
                                    onChange={formik.handleChange}
                                    >
                                        {bankList.map(index => (
                                                <MenuItem key={index.name} value={index.id}>
                                                    {index.name}
                                                </MenuItem>
                                        ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    labelId="currency-supplier-select"
                                    id="currency-select"
                                    name="currency"
                                    value={formik.values.currency}
                                    onChange={formik.handleChange}
                                    >
                                        {currencyList.map(index => (
                                                <MenuItem key={index.name} value={index.id}>
                                                    {index.name}
                                                </MenuItem>
                                        ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    labelId="payment-method-supplier-select"
                                    id="payment-method-select"
                                    name="payment_method"
                                    value={formik.values.payment_method}
                                    onChange={formik.handleChange}
                                    >
                                        {paymentMethodList.map(index => (
                                                <MenuItem key={index.name} value={index.id}>
                                                    {index.name}
                                                </MenuItem>
                                        ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <button
                                type="submit"
                                className="btn btn-ghost-dark"
                            >Actualizar</button>
                        </form>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default PurchaseBillModifyData;