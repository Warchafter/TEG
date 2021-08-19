import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Grid
} from '@material-ui/core';

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
    const styles = useStyles();

    return (
        <div className={styles.root}>
                <Notifier />
                <Grid container spacing={3}>
                    <Card className={styles.card}>
                        <Grid item xs={12}>
                            <h1>Solicitud de Facturación</h1>
                        </Grid>
                    </Card>
                    <Grid item xs={12}>
                    <Card className={styles.card}>
                        <BillClientSubmissionForm />
                    </Card>
                    </Grid>
                </Grid>
        </div>
    );
};

export default BillClientSubmission;