import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Card,
    Grid,
} from '@material-ui/core';

import Notifier from '../../../components/Notifier/Notifier';
import CreateSupplierForm from '../../../components/Supplier/CreateSupplier/CreateSupplierForm';
import CreateSupplierRIFVisualizer from '../../../components/Supplier/CreateSupplier/CreateSupplierRIFVisualizer';


const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    }
}));


const SupplierCreate = () => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Notifier />
            <Grid container spacing={3} >
                <Grid item xs={7}>
                    <Grid item xs={12}>
                            <Card className={styles.card}>
                                <CreateSupplierForm />
                            </Card>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Grid item xs={12}>
                        <Card className={styles.card}>
                            <CreateSupplierRIFVisualizer />
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default SupplierCreate;