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
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    card: {
        maxHeight: 394,
    },
    content: {
        color: '#666666',
        whiteSpace: 'pre-wrap',
        paddingLeft: '20px'
    },
    scrollMenu: {
        overflow: 'auto',
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        maxHeight: 577,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#3c4b64',
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    formAlign: {
        textAlign: 'center'
    },
    selectItem: {
        minWidth: 250
    }
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
                        <TableContainer component={styles.tableContainer}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={styles.tableHeaderCell}>
                                            <Typography >
                                                Detalle de la factura {purchaseBillToModifyData.id}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                            <form onSubmit={formik.handleSubmit} className={styles.formAlign}>
                        <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Select
                                        labelId="bank-supplier-select"
                                        id="bank-select"
                                        name="bank"
                                        className={styles.selectItem}
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
                                        className={styles.selectItem}
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
                                        className={styles.selectItem}
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
                                    <button
                                        type="submit"
                                        className="btn btn-ghost-dark"
                                    >Actualizar</button>
                                </Grid>

                        </Grid>
                            </form>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default PurchaseBillModifyData;