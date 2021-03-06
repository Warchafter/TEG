import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Grid,
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    textField: {
        minWidth: '600px'
    },
    gridPadding: {
        padding: '20px'
    },
    alignButton: {
        textAlign: 'center'
    }
}))

const validationSchema = yup.object({
    bill_name_receiver: yup.string().min(6,"Muy Corto").max(30, "Muy largo").required("El nombre de quien será realizada la factura es requerido"),
    product_requirements: yup.string().required("El requerimiento de la solicitud es requerido")
});

const BillClientSubmissionForm = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const onCreateBillClientSubmission = useCallback((formData) => dispatch(actions.createBillClientSubmission(formData)), [dispatch]);

    const formik = useFormik({
        initialValues: {
            bill_name_receiver: "",
            product_requirements: ""
        },
        onSubmit: (values) => {
            onCreateBillClientSubmission(values);
        },
        validationSchema: validationSchema
    });

    return (
        <div className={styles.root}>
            <Grid container spacing={4} className={styles.gridPadding}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={5} xs={6} column>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid item xs={12}>
                                <TextField
                                    id='bill_name_receiver'
                                    name='bill_name_receiver'
                                    label='Nombre a quien se hará la factura'
                                    type='text'
                                    className={styles.textField}
                                    value={formik.values.bill_name_receiver}
                                    onChange={formik.handleChange}
                                    error={formik.touched.bill_name_receiver && Boolean(formik.errors.bill_name_receiver)}
                                    helperText={formik.touched.bill_name_receiver && formik.errors.bill_name_receiver}
                                    onBlur={formik.handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='product_requirements'
                                    name='product_requirements'
                                    label='Requerimiento'
                                    type='text'
                                    multiline
                                    className={styles.textField}
                                    value={formik.values.product_requirements}
                                    onChange={formik.handleChange}
                                    error={formik.touched.product_requirements && Boolean(formik.errors.product_requirements)}
                                    helperText={formik.touched.product_requirements && formik.errors.product_requirements}
                                    onBlur={formik.handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12} className={styles.alignButton}>
                                <button
                                    type="submit"
                                    className="btn btn-ghost-dark"
                                >Enviar</button>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </div>
    );
};

export default BillClientSubmissionForm;