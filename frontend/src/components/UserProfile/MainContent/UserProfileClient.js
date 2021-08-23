import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Grid,
    TextField,
    Chip
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
            textAlign: 'right',
            alignSelf: 'start'
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
        }
    }
});

// #828894

const UserProfileClient = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);

    const onFetchUserProfileDetail = useCallback((user) => dispatch(actions.fetchUserProfileDetail(user)), [dispatch]);
    const onSelectedOptionHandler = useCallback(
        (selectedOption, contentComponent) => dispatch(
            actions.setUserProfileMainContent(selectedOption, contentComponent)
        ), [dispatch]);

    useEffect(() => {
        // if (isAuthenticated && userProfileDetail) {
            onFetchUserProfileDetail();
        // };
    }, []);

    const optionSelectedHandler = (e) => {
        console.log(e.target.name);
        onSelectedOptionHandler(e.target.name, "something");
    };


    return (
        <div className={styles.root}>
            {
                userProfileDetail ?
                <Grid container spacing={3}>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={4}>
                            <h5 className={styles.header}>Usuario</h5>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="standard-read-only-input-name"
                                // label="Nombre"
                                className={styles.textField}
                                defaultValue={userProfileDetail.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {/* <h4 className={styles.content}>{userProfileDetail.name}</h4> */}
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={4} className={styles.grid}>
                            <h5 className={styles.header}>Correo</h5>
                        </Grid>
                        <Grid item xs={8} className={styles.grid}>
                            <TextField
                                id="standard-read-only-input-email"
                                // label="Correo"
                                className={styles.textField}
                                defaultValue={userProfileDetail.email}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {/* <h4 className={styles.content}>{userProfileDetail.email}</h4> */}
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={4} className={styles.grid}>
                            <h5 className={styles.header}>Nombre del Negocio</h5>
                        </Grid>
                        <Grid item xs={8} className={styles.grid}>
                            <TextField
                                id="standard-read-only-input-business-name"
                                // label="Correo"
                                multiline
                                className={styles.textField}
                                defaultValue={userProfileDetail.business_name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {/* <h4 className={styles.content}>{userProfileDetail.business_name}</h4> */}
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={4} className={styles.grid}>
                            <h5 className={styles.header}>Tipo del Negocio</h5>
                        </Grid>
                        <Grid item xs={8} className={styles.grid}>
                            <TextField
                                id="standard-read-only-input-business-type"
                                // label="Correo"
                                className={styles.textField}
                                defaultValue={userProfileDetail.business_type}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {/* <h4 className={styles.content}>{userProfileDetail.business_type}</h4> */}
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={4} className={styles.grid}>
                            <h5 className={styles.header}>Especializaciones</h5>
                        </Grid>
                        <Grid item xs={8} className={styles.grid}>
                            {
                                userProfileDetail.specializationList ?
                                userProfileDetail.specializationList.map((index) => {
                                    return <Chip key={index.id} label={index.name} variant="outlined" />
                                })
                                : null
                            }
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={4} className={styles.grid}>
                            <h5 className={styles.header}>Dirección del RIF</h5>
                        </Grid>
                        <Grid item xs={8} className={styles.grid}>
                            <TextField
                                id="standard-read-only-input-rif-address"
                                // label="Correo"
                                multiline
                                className={styles.textField}
                                defaultValue={userProfileDetail.rif_address}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {/* <h4 className={styles.content}>{userProfileDetail.rif_address}</h4> */}
                        </Grid>
                    </Grid>
                    <Grid item container spacing={6} xs={12}>
                        <Grid item xs={4} className={styles.grid}>
                            <h5 className={styles.header}>¿RIF Validado?</h5>
                        </Grid>
                        <Grid item xs={6} className={styles.grid}>
                            <h4 className={styles.content}>
                                {
                                userProfileDetail.rif_validated
                                    ?
                                        <h5 className={styles.content}>Si.</h5>
                                    :
                                        <h5 className={styles.content}>No.</h5>
                                }
                            </h4>
                        </Grid>
                        <Grid item xs={2} className={styles.grid}>
                            {
                                !userProfileDetail.rif_validated
                                    ?
                                    <button
                                    type="button"
                                    className="btn btn-dark"
                                    name="Upload RIF"
                                    onClick={(e) => optionSelectedHandler(e)}
                                    >
                                        <CloudDoneIcon />
                                        Actualizar
                                    </button>
                                    :
                                        null
                            }
                        </Grid>
                    </Grid>
                </Grid>
                : userProfileDetail
            }
        </div>
    );
};

export default UserProfileClient;