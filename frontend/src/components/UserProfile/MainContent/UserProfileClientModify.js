import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Checkbox,
    Chip,
    Grid,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CancelIcon from '@material-ui/icons/Cancel';
// import Autocomplete from '@material-ui/lab/Autocomplete';

import _without from "lodash/without";

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
            alignSelf: 'flex-start'
        },
        textField: {
            width: '100%'
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
    }
});

const validationSchema = yup.object({
    business_name: yup.string()
        .min(2, '¡Muy Corto!')
        .max(50, '¡Muy Largo!')
        .required("El nombre del negocio es requerido"),
    business_type: yup.string().required("Eliga un tipo de negocio.")
});

const business_type_choices = [
    'Personal',
    'Consultorio',
    'Hospital',
    'Clínica',
    'Distribuidora',
    'Gubernamental'
]

const UserProfileClient = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);
    const specializationList = useSelector(state => state.userProfile.specializationList);

    const onFetchUserProfileDetail = useCallback((user) => dispatch(actions.fetchUserProfileDetail(user)), [dispatch]);
    const onFetchSpecializations = useCallback(() => dispatch(actions.fetchSpecializations()), [dispatch]);
    const onModifyUserProfileDetail = useCallback((data) => dispatch(actions.modifyUserProfileDetail(data)), [dispatch])
    const onSelectedOptionHandler = useCallback(
        (selectedOption, contentComponent) => dispatch(
            actions.setUserProfileMainContent(selectedOption, contentComponent)
        ), [dispatch]);

    const [newSpecializationList, setNewSpecializationList] = useState([]);
    const [finalSpecializationList, setFinalSpecializationList] = useState([]);

    const specializationListHandler = () => {
        setNewSpecializationList(JSON.parse(JSON.stringify(userProfileDetail.specialization)));
        userProfileDetail.specialization.map((index) => {
            setFinalSpecializationList(
                finalSpecializationList,
                ...[index.id]
            )
        })
        console.log(finalSpecializationList);
        // setNewSpecializationList(oldState => oldState, ...userProfileDetail.specialization);
    }

    useEffect(() => {
        onFetchSpecializations();
        if (isAuthenticated && userProfileDetail) {
            onFetchUserProfileDetail();
        };
        if (userProfileDetail) {
            specializationListHandler();
            console.log("jsoned")
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            business_name: userProfileDetail.business_name,
            business_type: userProfileDetail.business_type,
            specialization: [],
            rif_address: userProfileDetail.rif_address
        },
        onSubmit: (values) => {
            console.log("VALUES: ", values);
            onModifyUserProfileDetail(values);
        },
        validationSchema: validationSchema
    });

    const test = () => {
        // let testArray = {
        //     id: 14,
        //     name: "Laboratorio"
        // };
        // specializationList.map((index) => {
        //     console.log(index);
        //     let test = newSpecializationList.some(item => item === index);
        //     console.log(test);
        //     })

        console.log("Primer Arreglo", specializationList);
        console.log("Segundo Arreglo", newSpecializationList);
        // let data = [{name: 'Comoros', code: 'KM'}, {name: 'Congo', code: 'CG'}, {name: 'Congo, The Democratic Republic of the', code: 'CD'}, {name: 'Cook Islands', code: 'CK'}, {name: 'Costa Rica', code: 'CR'}, {name: 'Cote D\'Ivoire', code: 'CI'}, {name: 'Croatia', code: 'HR'}, {name: 'Cuba', code: 'CU'}, {name: 'Cyprus', code: 'CY'}]

        // let search = 'KM';
        // let filterData = data.filter(item => item.code.includes(search));
        // console.log(filterData);
        // console.log(specializationList);
        // console.log(newSpecializationList);
        // console.log(data);
    };

    return (
        <div className={styles.root}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={3}>
                            <h5 className={styles.header}>Usuario</h5>
                        </Grid>
                        <Grid item xs={9}>
                            <h4 className={styles.content}>{userProfileDetail.name}</h4>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={3}>
                            <h5 className={styles.header}>Especialización</h5>
                        </Grid>
                        <Grid item xs={9}>
                        <Select
                            multiple
                            native
                            value={formik.values.specialization}
                            onChange={evt => formik.setFieldValue(
                                "specialization",
                                [].slice
                                    .call(evt.target.selectedOptions)
                                    .map(option => {
                                        return parseInt(option.value)})
                                )
                                }
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                            >
                                {specializationList.map((index) => (
                                    <option key={index.name} value={index.id}>
                                        {index.name}
                                    </option>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={3} className={styles.grid}>
                            <h5 className={styles.header}>Nombre del Negocio</h5>
                        </Grid>
                        <Grid item xs={9} className={styles.grid}>
                            <TextField
                                id='business_name'
                                name='business_name'
                                // label='Nombre del Negocio'
                                className={styles.textField}
                                margin='normal'
                                type="text"
                                value={formik.values.business_name}
                                onChange={formik.handleChange}
                                error={formik.touched.business_name && Boolean(formik.errors.business_name)}
                                helperText={formik.touched.business_name && formik.errors.business_name}
                                onBlur={formik.handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={3} className={styles.grid}>
                            <h5 className={styles.header}>Tipo del Negocio</h5>
                        </Grid>
                        <Grid item xs={9} className={styles.grid}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.business_type}
                                onChange={formik.handleChange('business_type')}
                                error={formik.touched.business_name && Boolean(formik.errors.business_name)}
                                helperText={formik.touched.business_name && formik.errors.business_name}
                                onBlur={formik.handleBlur}
                            >
                                {business_type_choices.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={3} className={styles.grid}>
                            <h5 className={styles.header}>Dirección del RIF</h5>
                        </Grid>
                        <Grid item xs={9} className={styles.grid}>
                            <TextField
                                id='rif_address'
                                name='rif_address'
                                // label='Nombre del Negocio'
                                className={styles.textField}
                                margin='normal'
                                type="text"
                                value={formik.values.rif_address}
                                onChange={formik.handleChange}
                                error={formik.touched.rif_address && Boolean(formik.errors.rif_address)}
                                helperText={formik.touched.rif_address && formik.errors.rif_address}
                                onBlur={formik.handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <button
                            type="submit"
                            className="btn btn-dark"
                            name="Upload RIF"
                        >
                            Modificar
                        </button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default UserProfileClient;