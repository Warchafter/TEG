import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    Autocomplete,
    Card,
    Grid,
    TextField,
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },
    productCard: {
        border: '2px solid',
        borderColor: '#E7EDF3',
        borderRadius: 16,
        transition: '0.4s',
        '&:hover': {
            borderColor: '#5B9FED',
        },
        textAlign: 'center',
        minHeight: '50px'
    }
}));

const validationSchema = yup.object({
    purchase_bill: yup.number().required("El Nro de Factura es requerido"),
    payment_receipt_number: yup.number().required("El Nro de Factura es requerido")
});


const PurchaseBillNewProductCard = () => {
    const dispatch = useDispatch;
    const styles = useStyles();

    // Bill Detail
    // Purchase Bill ID --------> purchase_bill
    // Supplier Product ID -----> product
    // Quantity ----------------> quantity
    // Price -------------------> price

    const productList = useSelector(state => state.product.productList)
    const productForBillDetailSupplierSearch = useSelector(state => state.product.productForBillDetailSupplierSearch);


    const onCreateBillDetail = useCallback((formData) => dispatch(actions.createBillDetail(formData)), [dispatch]);
    const onFetchProductList = useCallback(() => dispatch(actions.fetchProductList()), [dispatch]);
    const onSetProductForBillDetailSupplierSearch = useCallback((data) => dispatch(actions.onSetProductForBillDetailSupplierSearch(data)), [dispatch]);

    const formik = useFormik({
        initialValues: {
            purchase_bill: null,
            payment_receipt_number: null
            // payment_receipt_image: null
        },
        onSubmit: (values) => {
            onCreateBillDetail(values);
        },
        validationSchema: validationSchema
    });

    const defaultProps = {
        options: productList,
        getOptionLabel: (option) => option.title,
    };

    const flatProps = {
        options: productList.map((option) => option.title),
    };

    const [value, setValue] = React.useState(null);

    return (
        <div className={styles.root}>
            <Card className={styles.productCard}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                    <Autocomplete
                        {...defaultProps}
                        id="blur-on-select"
                        blurOnSelect
                        renderInput={(params) => <TextField {...params} label="blurOnSelect" margin="normal" />}
                    />
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default PurchaseBillNewProductCard;