import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        // flex: 1,
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
    },
    form: {
        width: '100%',
        minWidth: '720'
    },
    gridContainer: {
        width: '100%'
    },
    firstInputGrid: {
        alignSelf: 'center',
    },
    firstInput: {
        minWidth: '200px'
    },
    secondInput: {
        marginTop: '8px'
    }
}));

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const validationSchema = yup.object({
    product: yup.number().required("El Producto es requerido"),
    quantity: yup.number().required("La Cantidad es requerida"),
    price: yup.number().required("El Nro del recibo de pago es requerido"),
});

const PurchaseBillNewProductCard = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    // Bill Detail:
    // Purchase Bill ID --------> purchase_bill
    // Supplier Product ID -----> product
    // Quantity ----------------> quantity
    // Price -------------------> price

    const productList = useSelector(state => state.product.productList)
    const supplierProductList = useSelector(state => state.supplier.supplierProductList);
    const productForBillDetailSupplierSearch = useSelector(state => state.product.productForBillDetailSupplierSearch);
    const purchaseBillToInspect = useSelector(state => state.bill.purchaseBillToInspect);

    const onCreateBillDetail = useCallback((formData) => dispatch(actions.createBillDetail(formData)), [dispatch]);
    const onFetchProductList = useCallback(() => dispatch(actions.fetchProductList()), [dispatch]);
    const onFetchSupplierProductList = useCallback(() => dispatch(actions.fetchSupplierProductList()), [dispatch]);
    const onSetProductForBillDetailSupplierSearch = useCallback((data) => dispatch(actions.setProductForBillDetailSupplierSearch(data)), [dispatch]);

    useEffect(() => {
        onFetchSupplierProductList();
    }, [])

    const formik = useFormik({
        initialValues: {
            purchase_bill: purchaseBillToInspect.id,
            product: "", // Supplier Product ID
            quantity: "",
            price: ""
        },
        onSubmit: (values) => {
            onCreateBillDetail(values);
        },
        validationSchema: validationSchema
    });

    return (
        <div className={styles.root}>
            {
                supplierProductList ?
                <Card className={styles.productCard}>
                    <form className={styles.form} onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3} className={styles.gridContainer}>
                                <Grid item xs={5} className={styles.firstInputGrid}>
                                    <Select
                                        labelId="product-supplier-select"
                                        id="product-select"
                                        name="product"
                                        className={styles.firstInput}
                                        value={formik.values.product}
                                        onChange={formik.handleChange}
                                        >
                                            {supplierProductList.map(index => (
                                                    <MenuItem key={index.product.title} value={index.id}>
                                                        {index.product.title} - {index.supplier.name} - {index.price}
                                                    </MenuItem>
                                            ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        id='cantidad'
                                        name='quantity'
                                        label='Cantidad'
                                        margin='normal'
                                        type="number"
                                        className={styles.secondInput}
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                        helperText={formik.touched.quantity && formik.errors.quantity}
                                        onBlur={formik.handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        id='price'
                                        name='price'
                                        label='Precio'
                                        margin='normal'
                                        type="number"
                                        className={styles.secondInput}
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        error={formik.touched.price && Boolean(formik.errors.price)}
                                        helperText={formik.touched.price && formik.errors.price}
                                        onBlur={formik.handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        type="submit"
                                        variant='outlined'
                                        className={styles.button}
                                    >Cargar</Button>
                                </Grid>
                        </Grid>
                    </form>
                </Card>
                : loading
            }
        </div>
    );
};

export default PurchaseBillNewProductCard;