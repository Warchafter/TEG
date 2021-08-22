import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
    Chip,
    MenuItem,
    TextField,
    Grid,
    Input,
    InputLabel,
    Select
} from '@material-ui/core';

import * as actions from '../../store/actions/index';

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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
}));

const validationSchema = yup.object({
    bill_name_receiver: yup.string().required("El nombre de quien será realizada la factura es requerido"),
    product_requirements: yup.string().required("El requerimiento de la solicitud es requerido")
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ProductForm = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const brandList = useSelector(state => state.product.brandList)

    const onCreateProduct = useCallback((formData) => dispatch(actions.createProduct(formData)), [dispatch]);
    const onFetchBrandsList = useCallback(() => dispatch(actions.fetchBrandList()), [dispatch]);

    useEffect(() => {
        onFetchBrandsList();
    }, [])

    // {
    //     "title": "Test Product Title",
    //     "brand": [1,2,3],
    //     "description" : "Test Description",
    //     "status": "publicado"
    // }

    const [brand, setBrand] = React.useState([]);

    const handleChange = (event) => {
        setBrand(event.target.value);
        console.log(brand)
    };

    const formik = useFormik({
        initialValues: {
            title: null,
            brand: [],
            description: null,
            // published: null,
            status: 'publicado',
        },
        onSubmit: (values) => {
            onCreateProduct(values);
        },
        validationSchema: validationSchema
    });


    return (
        <div className={styles.root}>
            <Grid container spacing={4} className={styles.gridPadding}>
                <Grid item xs={3}>
                </Grid>
                <Grid item container spacing={5} xs={6}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid item xs={12}>
                            <TextField
                                id='title'
                                name='title'
                                label='Nombre del Producto'
                                type='text'
                                variant="filled"
                                className={styles.textField}
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                                onBlur={formik.handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <TextField
                                id='product_requirements'
                                name='product_requirements'
                                label='Requerimiento'
                                type='text'
                                multiline
                                variant="filled"
                                className={styles.textField}
                                value={formik.values.product_requirements}
                                onChange={formik.handleChange}
                                error={formik.touched.product_requirements && Boolean(formik.errors.product_requirements)}
                                helperText={formik.touched.product_requirements && formik.errors.product_requirements}
                                onBlur={formik.handleBlur}
                            /> */}
                                <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                                <Select
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    multiple
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                        <div className={styles.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value.name} label={value.name} className={styles.chip} />
                                        ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                    >
                                    {brandList.map((index) => (
                                        <MenuItem key={index.name} value={index}>
                                            {index.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {/* <InputLabel shrink htmlFor="select-multiple-native">
                                    Marcas
                                </InputLabel>
                                <Select
                                    multiple
                                    native
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                    inputProps={{
                                        id: 'select-multiple-native',
                                    }}
                                    >
                                    {brandList.map((index) => (
                                        <option key={index.name} value={index.id}>
                                            {index.name}
                                        </option>
                                    ))}
                                </Select> */}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='description'
                                name='description'
                                label='Requerimiento'
                                type='text'
                                multiline
                                variant="filled"
                                className={styles.textField}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                onBlur={formik.handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="brand-native-simple">Marca</InputLabel>
                                <Select
                                    native
                                    id='brand'
                                    name='brand'
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                >
                                    <option value="publicado">Publicado</option>
                                    <option value="borrador">Borrador</option>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <button
                                type="submit"
                                className="btn btn-ghost-dark"
                            >Enviar</button>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductForm;