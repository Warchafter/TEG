import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
    Card,
    Button,
    Grid,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    CardActionArea,
    ButtonGroup,
    CardMedia
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles(({ spacing, palette }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            paddingTop: '10px',
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
        }
    };
});

const BillPaymentDetailApprovalMedia = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const purchaseBillToApprovePayment = useSelector(state => state.bill.purchaseBillToApprovePayment);
    const billPaymentDetailListFiltered = useSelector(state => state.bill.billPaymentDetailListFiltered);

    const onFetchBillPaymentDetailListFiltered = useCallback((id) => dispatch(actions.fetchBillPaymentDetailListFiltered(id)), [dispatch]);
    const onModifyPurchaseBill = useCallback((payment_status, id) => dispatch(actions.modifyPurchaseBill(payment_status, id)), [dispatch,]);
    const onResetBillClientSubmission = useCallback(() => dispatch(actions.resetBillClientSubmission()), [dispatch,]);
    const onPaymentApprovedHandler = (status) => {
        const payment_status = status;
        onModifyPurchaseBill(payment_status, purchaseBillToApprovePayment.id);
    };

    useEffect(() => {
        onResetBillClientSubmission();
    }, [])

    useEffect(() => {
        if (purchaseBillToApprovePayment) {
            onFetchBillPaymentDetailListFiltered(purchaseBillToApprovePayment.id)
        }
    }, [purchaseBillToApprovePayment,])

    return (
        <div className={styles.root}>
            {
                purchaseBillToApprovePayment ?
                    <Grid container spacing={3}>
                        <Grid item xs={12} className={styles.gridPaymentMedia}>
                                { billPaymentDetailListFiltered
                                    ?
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
                                    :
                                    <h4>¡No hay Pagos Cargados todavía!</h4>
                                }
                        </Grid>
                        <Grid item xs={12} className={styles.buttonGroupGrid}>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button onClick={() => onPaymentApprovedHandler(1)}>Rechazar</Button>
                                <Button onClick={() => onPaymentApprovedHandler(2)}>Pago Parcial</Button>
                                <Button onClick={() => onPaymentApprovedHandler(3)}>Pago Completo</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                : null
            }
        </div>
    );
};

export default BillPaymentDetailApprovalMedia;