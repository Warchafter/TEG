import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
}))

const SupplierCreation = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const onSupplierCreationHandler = useCallback((formData) => dispatch(actions.createSupplier(formData)), [dispatch]);

    

    return (
        <div className={styles.root}>
            <Card >
                <h1>SUPPLIER CREATION</h1>
            </Card>
        </div>
    );
};

export default SupplierCreation;