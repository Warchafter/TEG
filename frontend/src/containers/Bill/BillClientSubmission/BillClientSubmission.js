import React, { useCallback, useSelector } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Grid,
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';
import BillClientSubmissionForm from '../../../components/Bill/BillClientSubmission/BillClientSubmissionForm';
import Notifier from '../../../components/Notifier/Notifier';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 'grow'
    },
    card: {
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        padding: '10px'
    },
}))


// Crear una pantalla de confirmación de creación de factura con un modal
// Crear una pantalla de creación de factura exitosa.

const BillClientSubmission = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


    return (
        <div className={styles.root}>
                <Notifier />
                <Card className={styles.card}>
                    <h1>Solicitud de Facturación</h1>
                    <BillClientSubmissionForm />
                </Card>
        </div>
    );
};

export default BillClientSubmission;