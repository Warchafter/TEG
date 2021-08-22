import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Lightbox from 'react-image-lightbox';

import { useFormik } from 'formik';
import * as yup from 'yup';

import {makeStyles} from '@material-ui/core/styles';
import {
    Button,
    CardActionArea,
    CardMedia,
    Grid,
    TextField,
} from '@material-ui/core';
import CloudDoneIcon from '@material-ui/icons/CloudDone';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles(({ spacing, palette }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            paddingTop: '10px'
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

yup.setLocale({
    mixed: {
        default: 'No es válido',
    },
    number: {
        min: 'Debe ser mayor que ${min}',
    },
});

const validationSchema = yup.object({
    purchase_bill: yup.number().required("Requerido"),
    payment_receipt_number: yup.number().min(6, 'Muy corto').required("Requerido")
});

const BillPaymentDetailUpload = () => {
    const styles = useStyles();
    const dispatch = useDispatch();

    const [payment_receipt_image, setPayment_receipt_image] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const billPaymentImageURL = useSelector(state => state.bill.billPaymentDetailImage);

    const onCreateBillPaymentDetail = useCallback((fd, values) => dispatch(actions.createBillPaymentDetail(fd, values)), [dispatch]);

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

    const billPaymentDetailImageHandler = () => {
            setImageList(prevArray => [billPaymentImageURL]);
    };

    const openHandler = () => {
        billPaymentDetailImageHandler();
        setIsOpen(true);
    };

    useEffect(() => {
        if (payment_receipt_image) {
            setPayment_receipt_image(false);
        }
    }, [payment_receipt_image]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    { billPaymentImageURL
                        ?
                        <CardActionArea className={styles.cardActionArea} onClick={openHandler}>
                            <CardMedia
                                className={styles.cardMedia}
                                image={billPaymentImageURL}
                                title="RIF del Usuario"
                            />
                        </CardActionArea>
                        :
                        null
                    }
                    {
                        payment_receipt_image ? payment_receipt_image.name : null
                    }
                </Grid>
                <Grid item xs={12}>
                    <form className={styles.form} onSubmit={formik.handleSubmit}>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                        <TextField
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
                        />
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
                        {payment_receipt_image ? <p>{payment_receipt_image.name}</p> : null}
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
                            variant="contained"
                            color="primary"
                            size="small"
                            type="submit"
                            disabled={payment_receipt_image}
                            className={styles.button}
                            startIcon={<CloudDoneIcon />}
                        >
                            Subir
                        </Button>
                    </form>
                </Grid>
            </Grid>
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
        </div>
    );
};

export default BillPaymentDetailUpload;