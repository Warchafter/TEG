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
}));


const PurchaseBillModifyData = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const bankList = useSelector(state => state.bill.bankList);
    const currencyList = useSelector(state => state.bill.currencyList);
    const paymentMethodList = useSelector(state => state.bill.paymentMethodList);
    const purchaseBillToModifyData = useSelector(state => state.bill.purchaseBillToModifyData);

    const onFetchPaymentMethodList = useCallback(() => dispatch(actions.fetchPaymentMethodList()), [dispatch,]);
    const onFetchCurrencyList = useCallback(() => dispatch(actions.fetchCurrencyList()), [dispatch,]);
    const onFetchBankList = useCallback(() => dispatch(actions.fetchBankList()), [dispatch,]);
    const onModifyPurchaseBill = useCallback((formData, id) => dispatch(actions.modifyPurchaseBill(formData, id)), [dispatch]);

    useEffect(() => {
        onFetchPaymentMethodList();
        onFetchCurrencyList();
        onFetchBankList();
    }, [])

    const formik = useFormik({
        initialValues: {
            // purchase_order_date: purchaseBillToModifyData.purchase_order_date,
            // purchase_payment_date: purchaseBillToModifyData.purchase_payment_date,
            // employee_in_charge: purchaseBillToModifyData.employee_in_charge.id,
            // bill_client_submission: purchaseBillToModifyData.bill_client_submission.id,
            payment_method: purchaseBillToModifyData.payment_method.id,
            currency: purchaseBillToModifyData.currency.id,
            bank: purchaseBillToModifyData.bank.id,
        //     purchase_status: purchaseBillToModifyData.purchase_status.id,
        //     payment_status: purchaseBillToModifyData.payment_status.id,
        //     delivery_status: purchaseBillToModifyData.delivery_status.id
        },
        onSubmit: (values) => {
            console.log(values);
            onModifyPurchaseBill(values, purchaseBillToModifyData.id);
        },
    });


    return (
        <div className={styles.root}>
            <Card >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography >
                            Detalle de la factura {purchaseBillToModifyData.id}
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
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