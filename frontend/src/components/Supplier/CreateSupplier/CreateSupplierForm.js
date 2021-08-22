import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/styles';
import {
    Card,
    Container,
    Grid,
    TextField,
    Button,
} from '@material-ui/core';
import CloudDoneIcon from '@material-ui/icons/CloudDone';


import * as actions from '../../../store/actions';


const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    }
}));

const validationSchema = yup.object({
    purchase_bill: yup.number().required("El Nro de Factura es requerido"),
    payment_receipt_number: yup.number().required("El Nro de Factura es requerido")
});

const CreateSupplierForm = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const onCreateSupplier = useCallback((formData) => dispatch(actions.createSupplier(formData)), [dispatch]);
    // const on

    const [image, setImage] = React.useState(null);
    const formik = useFormik({
        initialValues: {
            name: null,
            rif: null,
            address: null
            // image: null
        },
        onSubmit: (values) => {
            const fd = new FormData();
            fd.append(
                "image",
                image
                // payment_receipt_image.name,
            );
            onCreateSupplier(values, fd);
        },
        validationSchema: validationSchema
    });

    const handleFile = (e) => {
        setImage(e.target.files[0]);
    };

    console.log(image)

    return (
        <div className={styles.root}>
            <Card>
                <Grid container>
                    <Grid item xs={12}>
                        <Container maxWidth="md">
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    id='name'
                                    name='name'
                                    label='Nombre del Proveedor'
                                    margin='normal'
                                    type="text"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    onBlur={formik.handleBlur}
                                />
                                <TextField
                                    id='rif'
                                    name='rif'
                                    label='RIF del proveedor'
                                    margin='normal'
                                    type="text"
                                    value={formik.values.rif}
                                    onChange={formik.handleChange}
                                    error={formik.touched.rif && Boolean(formik.errors.rif)}
                                    helperText={formik.touched.rif && formik.errors.rif}
                                    onBlur={formik.handleBlur}
                                />
                                <TextField
                                    id='address'
                                    name='address'
                                    label='Dirección del Proveedor'
                                    margin='normal'
                                    type="text"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                    onBlur={formik.handleBlur}
                                />
                                {image ? <p>{image.name}</p> : null}
                                <Button
                                    variant='contained'
                                    component='label'
                                >
                                    Seleccionar Archivo
                                    <input
                                        type='file'
                                        name='rif'
                                        onChange={(e) => handleFile(e)}
                                        hidden
                                    />
                                </Button>
                                <Button type='submit' variant='outlined'>Cargar</Button>
                            </form>
                        </Container>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default CreateSupplierForm;