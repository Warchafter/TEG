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
    bill_payment_detail: yup.number().required("El id del Detalle del Pago es requerido"),
    purchase_bill: yup.number().required("El Nro de Factura es requerido"),
    payment_receipt_number: yup.number().required("El Nro de Factura es requerido")
})

const ModifyBillPaymentDetailLoader = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const purchaseBillList = useSelector(state => state.bill.purchaseBillList);
    const billPaymentDetail = useSelector(state => state.bill.billPaymentDetail);
    const onModifyBillPaymentDetail = useCallback((fd, values) => dispatch(actions.modifyBillPaymentDetail(fd, values)), [dispatch]);
    const onFetchPurchaseBillList = useCallback(() => dispatch(actions.fetchPurchaseBillList()), [dispatch]);
    const onFetchBillPaymentDetail = useCallback(() => dispatch(actions.fetchBillPaymentDetail()), [dispatch]);

    // const [purchaseBillListId, setPurchaseBillListId] = useState([]);

    useEffect(() => {
        onFetchPurchaseBillList();
        // purchaseBillListIdHandler();
    }, [onFetchPurchaseBillList,]);


    const [payment_receipt_image, setPayment_receipt_image] = useState(null);
    const formik = useFormik({
        initialValues: {
            billPaymentDetail: null,
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
            onModifyBillPaymentDetail(values, fd);
        },
        validationSchema: validationSchema
    });

    const handleFile = (e) => {
        setPayment_receipt_image(e.target.files[0]);
    };

    const [billSelected, setBillSelected] = useState(null);

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
                            <TextField
                                id='bill_payment_detail'
                                name='bill_payment_detail'
                                label='Nro Factura'
                                type='number'
                                variant='outlined'
                                value={formik.values.bill_payment_detail}
                                onChange={(e) => {
                                    formik.handleChange();
                                    setBillSelected(e.target.value)
                                }}
                                error={formik.touched.bill_payment_detail && Boolean(formik.errors.bill_payment_detail)}
                                helperText={formik.touched.bill_payment_detail && formik.errors.bill_payment_detail}
                                onBlur={formik.handleBlur}
                            />
                            <Button
                                onClick={() => onFetchBillPaymentDetail(billSelected)}
                            >
                                Buscar Detalle
                            </Button>
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
                                        defaultValue={billPaymentDetail.purchase_bill.id}
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
                                defaultValue={billPaymentDetail.payment_receipt_number}
                                value={formik.values.payment_receipt_number}
                                onChange={formik.handleChange}
                                error={formik.touched.payment_receipt_number && Boolean(formik.errors.payment_receipt_number)}
                                helperText={formik.touched.payment_receipt_number && formik.errors.payment_receipt_number}
                                onBlur={formik.handleBlur}
                            />
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

export default ModifyBillPaymentDetailLoader;