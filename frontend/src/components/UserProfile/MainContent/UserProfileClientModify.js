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
    name: yup.string()
        .min(2, '¡Muy Corto!')
        .max(50, '¡Muy Largo!')
        .required('¡El nombre de usuario es requerido!'),
    business_name: yup.string()
        .min(2, '¡Muy Corto!')
        .max(50, '¡Muy Largo!')
        .required("El Nro de Factura es requerido"),
    business_type: yup.number().required("Eliga un tipo de negocio.")
});



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
            name: userProfileDetail.name,
            business_name: userProfileDetail.business_name,
            business_type: userProfileDetail.business_type,
            // specialization: null,
            rif_address: userProfileDetail.rif_address
        },
        onSubmit: (values) => {
            onModifyUserProfileDetail(values);
        },
        validationSchema: validationSchema
    });

    const handleChange = (event, value) => {
        setNewSpecializationList(event.target.value);
    };

    const handleDelete = (e, value) => {
        e.preventDefault();
        console.log(value);
        setNewSpecializationList((current) => _without({current, value}));
    };

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setNewSpecializationList(value);
    };

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
            <Button onClick={test}>test button</Button>
            <Button onClick={specializationListHandler}>Click me</Button>
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
                            value={newSpecializationList}
                            onChange={handleChangeMultiple}
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                            >
                            {specializationList.map((index) => (
                                <option key={index.name} value={index.id, index.value}>
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
                            <h4 className={styles.content}>{userProfileDetail.business_type}</h4>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={3} className={styles.grid}>
                            <h5 className={styles.header}>Dirección del RIF</h5>
                        </Grid>
                        <Grid item xs={9} className={styles.grid}>
                            <h4 className={styles.content}>{userProfileDetail.rif_address}</h4>
                            <div className={styles.chips}>
                                {newSpecializationList.map((index) =>
                                    <Chip
                                        key={index.name}
                                        label={index.name}
                                        clickable
                                        className={styles.chip}
                                    />
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default UserProfileClient;


{/* <Autocomplete
                                    id="purchase_bill-combo-box"
                                    options={specializationList}
                                    getOptionLabel={(option) => option.name.toString()}
                                    renderInput={(params) => (
                                        <TextField
                                            id="standard-basic"
                                            name='specialization'
                                            label='Especializaciones'
                                            type='text'
                                            {...params}
                                            variant='outlined'
                                            value={formik.values.specialization}
                                            onChange={formik.handleChange}
                                            error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                                            helperText={formik.touched.specialization && formik.errors.specialization}
                                            onBlur={formik.handleBlur}
                                        />
                                    )}
                                /> */}


{/* <Grid item xs={6}>
{
    newSpecializationList.map((index) => {
        return <Chip key={index.id} label={index.name} variant="outlined" />
        return (
            <Chip
                variant="outlined"
                size="small"
                key={index.id}
                label={index.name}
                onDelete={handleSpecializationDelete}
            />
        )
    })
}
</Grid> */}


// <Select
//                             labelId="demo-mutiple-chip-checkbox-label"
//                             id="demo-mutiple-chip-checkbox"
//                             multiple
//                             value={newSpecializationList}
//                             onChange={handleChange}
//                             // className={styles.textField}
//                             IconComponent={KeyboardArrowDownIcon}
//                             renderValue={(selected) => {
//                                 <div className={styles.chips}>
//                                     {selected.map((index) => {
//                                         console.log(index);
//                                         console.log(selected);
//                                         <Chip
//                                             key={index.name}
//                                             label={index.name}
//                                             // clickable
//                                             // deleteIcon={
//                                             //     <CancelIcon
//                                             //         onMouseDown={(event) => event.stopPropagation()}
//                                             //     />
//                                             // }
//                                             // className={styles.chip}
//                                             // onDelete={(e) => handleDelete(e, value)}
//                                         />
//                                         <Chip
//                                         key={index.name}
//                                         label={index.name}
//                                         clickable
//                                         className={styles.chip}
//                                         />
//                                     })}
//                                 </div>
//                                 // <div className={styles.chips}>
//                                 //     {selected.map((value) => (
//                                 //         <Chip key={value.name} label={value.name} className={styles.chip} />
//                                 //     ))}
//                                 // </div>
//                             }}
//                         >
//                             {specializationList.map((index) => (
//                             <MenuItem key={index.name} value={index}>
//                                 <Checkbox checked={newSpecializationList.some(e => e.name === index.name)}/>
//                                 <ListItemText primary={index.name} />
//                             </MenuItem>
//                             ))}
//                         </Select>