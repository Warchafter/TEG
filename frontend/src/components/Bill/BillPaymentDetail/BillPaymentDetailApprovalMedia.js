import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Grid,
    CardActionArea,
    ButtonGroup,
    CardMedia,
    Select,
    MenuItem,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    Card,
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles(({ spacing, palette }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            // paddingTop: '10px',
            flex: 1,
        },
        form: {
            display: "flex",
            flexDirection: "column",
            width: "20rem",
            margin: "0 auto"
        },
        header: {
            color: '#4f5d73',
            fontFamily: family,
            textAlign: 'right'
        },
        subHeader: {
            color: '#4f5d73',
            fontFamily: family
        },
        content: {
            color: '#828894',
            fontFamily: family
        },
        button: {
            textTransform: 'none',
            margin: spacing(1),
            backgroundColor: '#4f5d73'
        },
        grid: {
            alignSelf: 'flex-end'
        },
        cardActionArea: {
            maxWidth: 500,
            maxHeight: 500,
        },
        cardMedia: {
            height: '500px'
        },
        titlePayment: {
            width: '100%',
            padding: '0 1.5em',
            transition: '3s',
            textAlign: 'center',
        },
        tableHeaderCell: {
            fontWeight: 'bold',
            backgroundColor: '#3c4b64',
            color: palette.getContrastText(palette.primary.dark)
        },
        grinContainerPayment: {
            padding: '15px'
        },
        confirmButton: {
            font: family
        },
        denyButton: {
            font: family,
            color: 'white',
            backgroundColor: "#000"
        },
        buttonGroupGrid: {
            textAlign: 'center'
        },
        gridPaymentMedia: {
            textAlign: '-webkit-center'
        },
        paymentOptions: {
            width: 200
        },
        tableContainer: {
            borderRadius: 15,
            margin: '10px 10px',
        },
        tableHeaderCell: {
            fontWeight: 'bold',
            backgroundColor: '#3c4b64',
            color: palette.getContrastText(palette.primary.dark)
        },
    };
});

const BillPaymentDetailApprovalMedia = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const paymentStatusList = useSelector(state => state.bill.paymentStatusList);
    const purchaseBillToApprovePayment = useSelector(state => state.bill.purchaseBillToApprovePayment);
    const billPaymentDetailListFiltered = useSelector(state => state.bill.billPaymentDetailListFiltered);

    const onFetchPaymentStatusList = useCallback(() => dispatch(actions.fetchPaymentStatusList()), [dispatch,]);
    const onFetchBillPaymentDetailListFiltered = useCallback((id) => dispatch(actions.fetchBillPaymentDetailListFiltered(id)), [dispatch]);
    const onModifyPurchaseBill = useCallback((payment_status, id) => dispatch(actions.modifyPurchaseBill(payment_status, id)), [dispatch,]);
    const onResetBillClientSubmission = useCallback(() => dispatch(actions.resetBillClientSubmission()), [dispatch,]);

    const onPaymentApprovedHandler = (status) => {
        const payment_status = status;
        onModifyPurchaseBill(payment_status, purchaseBillToApprovePayment.id);
    };

    useEffect(() => {
        onResetBillClientSubmission();
        onFetchPaymentStatusList();
    }, [])

    useEffect(() => {
        if (purchaseBillToApprovePayment) {
            onFetchBillPaymentDetailListFiltered(purchaseBillToApprovePayment.id)
        }
    }, [purchaseBillToApprovePayment,])

    const formik = useFormik({
        initialValues: {
            payment_status: "",
        },
        onSubmit: (values) => {
            console.log(values);
            onModifyPurchaseBill(values, purchaseBillToApprovePayment.id);
        },
    });

    return (
        <div className={styles.root}>
            {
                purchaseBillToApprovePayment ?
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TableContainer component={styles.tableContainer}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={styles.tableHeaderCell}>
                                                <Typography >
                                                        Evidencias de Pago de la Factura # {purchaseBillToApprovePayment.id}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} className={styles.gridPaymentMedia}>
                                {
                                    billPaymentDetailListFiltered ?
                                    billPaymentDetailListFiltered.map(index => {
                                        return (
                                            <CardActionArea key={index.id} className={styles.cardActionArea}>
                                                <CardMedia
                                                    key={index.id}
                                                    className={styles.cardMedia}
                                                    image={index.payment_receipt_image}
                                                    title="RIF del Usuario"
                                                />
                                            </CardActionArea>
                                        )
                                    })
                                    : <h4>¡No hay Pagos Cargados todavía!</h4>
                                }
                        </Grid>
                        <Grid item xs={12} className={styles.buttonGroupGrid}>
                            <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Select
                                        labelId="payment-status-supplier-select"
                                        id="payment-status-select"
                                        name="payment_status"
                                        className={styles.paymentOptions}
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
                                    <Button type='submit'>Actualizar</Button>
                                </Grid>
                            </Grid>
                            </form>
                        </Grid>
                    </Grid>
                :
                <Card >
                    <h1>No hay ningún pago Cargado</h1>
                </Card>
            }
        </div>
    );
};

export default BillPaymentDetailApprovalMedia;