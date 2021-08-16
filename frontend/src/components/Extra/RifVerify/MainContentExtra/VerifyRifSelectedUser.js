import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Typography,
    Grid
} from '@material-ui/core';

import * as actions from '../../../../store/actions/index';

const useStyles = makeStyles(({ spacing, palette }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            padding: '10px',
        },
        button: {
            textTransform: 'none',
            margin: spacing(1),
            backgroundColor: '#4f5d73'
        },
        grid: {
            alignSelf: 'flex-start'
        },
    };
});


const UserProfileVerifyRIF = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const selectedUserProfileDetail = useSelector(state => state.userProfile.selectedUserProfileDetail);

    const onFetchSelectedUserProfileDetail = useCallback((user) => dispatch(actions.fetchUserProfileDetail(user)), [dispatch]);

    useEffect(() => {
        onFetchSelectedUserProfileDetail();
    }, []);

    return (
        <div className={styles.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography>
                        Verificación de Usuario
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Se está verificando el usuario XXXXX
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Dirección del RIF: XXXXXX
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        CONTENIDO IMAGEN DEL RIF SELECCIONABLE CON MEDIA CARD
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button>Verificar RIF</Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserProfileVerifyRIF;