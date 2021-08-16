import React, {useCallback, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Grid
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
        }
    }
});

const UserProfileStaff = () => {
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
        if (isAuthenticated && userProfileDetail) {
            onFetchUserProfileDetail();
        };
    }, []);

    const optionSelectedHandler = (e) => {
        console.log(e.target.name);
        onSelectedOptionHandler(e.target.name, "something");
    }

    return (
        <div className={styles.root}>
            <Grid container spacing={3}>
                <Grid item container spacing={6} xs={12}>
                    <Grid item xs={3}>
                        <h5 className={styles.header}>Usuario</h5>
                    </Grid>
                    <Grid item xs={7}>
                        <h4 className={styles.content}>{userProfileDetail.name}</h4>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                </Grid>
                <Grid item container spacing={6} xs={12}>
                    <Grid item xs={3} className={styles.grid}>
                        <h5 className={styles.header}>Correo</h5>
                    </Grid>
                    <Grid item xs={7} className={styles.grid}>
                        <h4 className={styles.content}>{userProfileDetail.email}</h4>
                    </Grid>
                    <Grid item xs={2} className={styles.grid}>
                    </Grid>
                </Grid>
                <Grid item container spacing={6} xs={12}>
                    <Grid item xs={3} className={styles.grid}>
                        <h5 className={styles.header}>Nombre del Negocio</h5>
                    </Grid>
                    <Grid item xs={7} className={styles.grid}>
                        <h4 className={styles.content}>{userProfileDetail.business_name}</h4>
                    </Grid>
                    <Grid item xs={2} className={styles.grid}>
                    </Grid>
                </Grid>
                <Grid item container spacing={6} xs={12}>
                    <Grid item xs={3} className={styles.grid}>
                        <h5 className={styles.header}>Tipo del Negocio</h5>
                    </Grid>
                    <Grid item xs={7} className={styles.grid}>
                        <h4 className={styles.content}>{userProfileDetail.business_type}</h4>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserProfileStaff;