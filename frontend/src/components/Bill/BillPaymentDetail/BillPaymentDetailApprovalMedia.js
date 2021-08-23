import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Button
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
        confirmButton: {
            font: family
        }
    };
});

const BillPaymentDetailApprovalMedia = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const purchaseBillToApprovePayment = useSelector(state => state.bill.purchaseBillToApprovePayment);

    const onFetchBillPaymentDetailListFiltered = useCallback((id) => dispatch(actions.fetchBillPaymentDetailListFiltered(id)), [dispatch]);
    const onModifyPurchaseBill = useCallback((id) => dispatch(actions.modifyPurchaseBill(id)), [dispatch]);

    const onPaymentApprovedHandler = () => {
        onModifyPurchaseBill(purchaseBillToApprovePayment.id);
    };

    useEffect(() => {
        if (purchaseBillToApprovePayment) {
            onFetchBillPaymentDetailListFiltered(purchaseBillToApprovePayment.id)
        }
    }, [purchaseBillToApprovePayment,])

    return (
        <div className={styles.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>

                </Grid>
                <Grid item xs={12}>
                    <Button onClick={onPaymentApprovedHandler} className={styles.confirmButton}>Confirmar Pago</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default BillPaymentDetailApprovalMedia;