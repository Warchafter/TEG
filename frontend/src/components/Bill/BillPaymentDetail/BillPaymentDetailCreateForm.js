import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Lightbox from 'react-image-lightbox';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    CardActionArea,
    CardMedia,
    Grid,
    Container,
    Card
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
    }
});

const validationSchema = yup.object({
    payment_receipt_number: yup.number().min(6, "El Nº no puede ser tan pequeño").required("El Nro del recibo de pago es requerido")
});

const BillPaymentDetailCreateForm = (props) => {
    const styles = useStyles();

    const dispatch = useDispatch();

    const purchaseBillToModifyPayment = useSelector(state => state.bill.purchaseBillToModifyPayment);
    const billPaymentDetailImageURL = useSelector(state => state.bill.billPaymentDetailImageURL);

    const onCreateBillPaymentDetail = useCallback((values, fd) => dispatch(actions.createBillPaymentDetail(values, fd)), [dispatch]);

    const [payment_receipt_image, setPayment_receipt_image] = useState(null);
    const [imageSet, setImageSet] = useState(true);
    const [imageList, setImageList] = useState([]);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            purchase_bill: purchaseBillToModifyPayment.id,
            payment_receipt_number: ""
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
            console.log("FD: ",fd);
            console.log("Values: ",values);
            onCreateBillPaymentDetail(values, fd);
        },
        validationSchema: validationSchema
    });

    const handleFile = (e) => {
        setPayment_receipt_image(e.target.files[0]);
    };

    const billPaymentDetailImageHandler = () => {
        setImageList(prevArray => [billPaymentDetailImageURL]);
    };

    const openHandler = () => {
        billPaymentDetailImageHandler();
        setIsOpen(true);
    };

    useEffect(() => {
        if (payment_receipt_image) {
            setImageSet(false);
        }
    }, [payment_receipt_image]);

    return (
        <React.Fragment>
            <Card>
                <Grid container>
                    <Grid item xs={12}>
                        <Container maxWidth="md">
                            <h6>Cargar pago de la Factura Nº: # {purchaseBillToModifyPayment.id}</h6>
                            { billPaymentDetailImageURL
                                ?
                                <CardActionArea className={styles.cardActionArea} onClick={openHandler}>
                                    <CardMedia
                                        className={styles.cardMedia}
                                        image={billPaymentDetailImageURL}
                                        title="RIF del Usuario"
                                    />
                                </CardActionArea>
                                :
                                null
                            }
                            <form className={styles.form} onSubmit={formik.handleSubmit}>
                                <TextField
                                    id='payment_receipt_number'
                                    name='payment_receipt_number'
                                    label='Nº de recibo de pago'
                                    margin='normal'
                                    type="number"
                                    value={formik.values.payment_receipt_number}
                                    onChange={formik.handleChange}
                                    error={formik.touched.payment_receipt_number && Boolean(formik.errors.payment_receipt_number)}
                                    helperText={formik.touched.payment_receipt_number && formik.errors.payment_receipt_number}
                                    onBlur={formik.handleBlur}
                                />
                                {payment_receipt_image ?
                                    <p>{payment_receipt_image.name}</p>
                                    :null
                                }
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
                                <Button
                                    type="submit"
                                    variant='outlined'
                                    disabled={imageSet}
                                    className={styles.button}
                                >Cargar</Button>
                            </form>
                        </Container>
                    </Grid>
                </Grid>
            </Card>
            {isOpen && (
                <Lightbox
                    mainSrc={imageList[photoIndex]}
                    nextSrc={imageList[(photoIndex + 1) % imageList.length]}
                    prevSrc={imageList[(photoIndex + imageList.length - 1) % imageList.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + imageList.length - 1) % imageList.length,)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % imageList.length,)
                    }
                />
            )}
        </React.Fragment>
    );
};

export default BillPaymentDetailCreateForm;