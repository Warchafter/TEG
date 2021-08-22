import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';


import { makeStyles } from '@material-ui/styles';
import {
    Card,
    Container,
    Grid,
    TextField,
    Button,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    }
}));

const CreateSupplierRIFVisualizer = () => {
    const styles = useStyles();

    const supplierRIFSelected = useSelector(state => state.supplier.supplierRIFSelected);

    return (
        <div className={styles.root}>
            <Card>

            </Card>
        </div>
    );
};

export default CreateSupplierRIFVisualizer;