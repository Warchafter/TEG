import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    Grid,
    Container
} from '@material-ui/core';
import {
    CFormControl,
    CFormLabel,
} from '@coreui/react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as actions from '../../../../store/actions/index';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "20rem",
        margin: "0 auto"
    }
}));

const validationSchema = yup.object({
    purchase_bill: yup.number().required("El Nro de Factura es requerido"),
    payment_receipt_number: yup.number().required("El Nro de Factura es requerido")
});

const CreateBillPaymentDetailLoader = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const purchaseBillList = useSelector(state => state.bill.purchaseBillList);
    const onCreateBillPaymentDetail = useCallback((fd, values) => dispatch(actions.createBillPaymentDetail(fd, values)), [dispatch]);
    const onFetchPurchaseBillList = useCallback(() => dispatch(actions.fetchPurchaseBillList()), [dispatch])
    const onFetchBillPaymentDetailList = useCallback(() => dispatch(actions.fetchBillPaymentDetailList()), [dispatch]);

    // const [purchaseBillListId, setPurchaseBillListId] = useState([]);

    useEffect(() => {
        onFetchBillPaymentDetailList();
        onFetchPurchaseBillList();
        // purchaseBillListIdHandler();
    }, [onFetchBillPaymentDetailList, onFetchPurchaseBillList]);


    const [payment_receipt_image, setPayment_receipt_image] = useState(null);
    const formik = useFormik({
        initialValues: {
            purchase_bill: null,
            payment_receipt_number: null
            // payment_receipt_image: null
        },
        onSubmit: (values) => {
            const fd = new FormData();
            // formData.append(
            //     "data",
            //     values
            // );
            fd.append(
                "payment_receipt_image",
                payment_receipt_image
                // payment_receipt_image.name,
            );
            onCreateBillPaymentDetail(values, fd);
        },
        validationSchema: validationSchema
    });

    const handleFile = (e) => {
        setPayment_receipt_image(e.target.files[0]);
    };

    // const purchaseBillListIdHandler = () => {
    //     purchaseBillList.map(index =>
    //         setPurchaseBillListId(oldArray => [...oldArray, index.id])
    //     )
    //     return purchaseBillListId;
    // };

    // {
    //     "purchase_bill": 68,
    //     "payment_receipt_number": 654981
    // }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Container maxWidth="md">
                        <form className={classes.form} onSubmit={formik.handleSubmit}>
                            <Autocomplete
                                id="purchase_bill-combo-box"
                                options={purchaseBillList}
                                getOptionLabel={(option) => option.id.toString()}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        id='purchase_bill'
                                        name='purchase_bill'
                                        label='Nro Factura'
                                        type='number'
                                        {...params}
                                        variant='outlined'
                                        value={formik.values.purchase_bill}
                                        onChange={formik.handleChange}
                                        error={formik.touched.purchase_bill && Boolean(formik.errors.purchase_bill)}
                                        helperText={formik.touched.purchase_bill && formik.errors.purchase_bill}
                                        onBlur={formik.handleBlur}
                                    />
                                )}
                            />
                            {/* <TextField
                                id='purchase_bill'
                                name='purchase_bill'
                                label='Nro Factura'
                                margin='normal'
                                type='number'
                                value={formik.values.purchase_bill}
                                onChange={formik.handleChange}
                                error={formik.touched.purchase_bill && Boolean(formik.errors.purchase_bill)}
                                helperText={formik.touched.purchase_bill && formik.errors.purchase_bill}
                                onBlur={formik.handleBlur}
                            /> */}
                            <TextField
                                id='payment_receipt_number'
                                name='payment_receipt_number'
                                label='Nro de recibo de pago'
                                margin='normal'
                                type="number"
                                value={formik.values.payment_receipt_number}
                                onChange={formik.handleChange}
                                error={formik.touched.payment_receipt_number && Boolean(formik.errors.payment_receipt_number)}
                                helperText={formik.touched.payment_receipt_number && formik.errors.payment_receipt_number}
                                onBlur={formik.handleBlur}
                            />
                            <div className="mb-3">
                                <CFormLabel htmlFor="formFileDisabled">
                                    Disabled file input example
                                </CFormLabel>
                                <CFormControl type="file" id="formFileDisabled" disabled />
                            </div>
                            <Button
                                variant='contained'
                                component='label'
                            >
                                Seleccionar Archivo
                                <input
                                    type='file'
                                    name='payment_receipt_image'
                                    onChange={(e) => handleFile(e)}
                                    hidden
                                />
                            </Button>
                            <Button type='submit' variant='outlined'>Cargar</Button>
                        </form>
                    </Container>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default CreateBillPaymentDetailLoader;