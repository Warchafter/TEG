import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
} from '@material-ui/core';

import * as actions from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    gridButtonsSupplierMainOptions: {
        textAlign: 'center',
    },
    card: {
        // boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.04)',
    },
}));

const SupplierMainOptions = (props) => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const onSelectedOptionHandler = useCallback(
        (selectedOption, contentComponent) => dispatch(
            actions.setSupplierMainContent(selectedOption, contentComponent)
        ), [dispatch]);

    const optionSelectedHandler = (e) => {
        console.log(e.target.name);
        onSelectedOptionHandler(e.target.name, "something");
    }

    return (
        <div className={styles.root}>
            <Grid container spacing={1}>
                <Grid item xs={12} className={styles.gridButtonsSupplierMainOptions}>
                    <button
                        type="button"
                        className="btn btn-ghost-dark"
                        style={{width: '90%'}}
                        name="Perfil de Usuario"
                        onClick={(e) => optionSelectedHandler(e)}
                    >Perfil de Usuario</button>
                </Grid>
                <Grid item xs={12} className={styles.gridButtonsSupplierMainOptions}>
                    <button
                        id="1st Option"
                        type="button"
                        className="btn btn-ghost-dark"
                        style={{width: '90%'}}
                        name="Modificar Perfil"
                        onClick={(e) => optionSelectedHandler(e)}
                    >Modificar Perfil</button>
                </Grid>
                <Grid item xs={12} className={styles.gridButtonsSupplierMainOptions}>
                    <button
                        type="button"
                        className="btn btn-ghost-dark"
                        style={{width: '90%'}}
                        name="Subir RIF"
                        onClick={(e) => optionSelectedHandler(e)}
                    >Subir RIF</button>
                </Grid>
            </Grid>
        </div>
    );
};

export default SupplierMainOptions;