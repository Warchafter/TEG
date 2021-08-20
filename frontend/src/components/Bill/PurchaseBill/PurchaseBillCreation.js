import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles(({ spacing, palette, theme }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            display: 'flex'
        },
    };
});

const PurchaseBillCreation = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const billClientSubmissionSelected = useSelector(state => state.bill.billClientSubmissionSelected);
    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);

    const onCreatePurchaseBill = useCallback((formData) => dispatch(actions.createPurchaseBill(formData)), [dispatch]);

    const formik = useFormik({
        initialValues: {
            purchase_order_date: null,
            purchase_payment_date: null,
            payment_method: 4,
            currency: 5,
            bank: 5,
            purchase_status: 1,
            delivery_status: 1,
            employee_in_charge: userProfileDetail.id,
            bill_client_submission: billClientSubmissionSelected.id
        },
        onSubmit: (values) => {
            onCreatePurchaseBill(values);
        },
    });


    return (
        <div>
            
        </div>
    );
};

export default PurchaseBillCreation;