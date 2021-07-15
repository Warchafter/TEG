import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import * as actions from '../../../store/actions/index';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}))

const CharacteristicTypeBuilder = () => {
    const classes = useStyles();

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const supplierList = useSelector(state => state.supplier.supplierList);
    const supplierEmailList = useSelector(state => state.supplier.supplierEmailList);

    const onFetchSupplierEmails = useCallback(() => dispatch(actions.fetchSupplierEmailList()), [dispatch]);
    const onFetchSupplierList = useCallback(() => dispatch(actions.onFetchSupplierList()), [dispatch]);
    const onCreateSupplierEmail = useCallback((data) => dispatch(actions.createCharType(data)), [dispatch]);

    useEffect(() => {
        onFetchSupplierEmails();
        onFetchSupplierList();
    }, [onFetchSupplierEmails, onFetchSupplierList]);

    const onSubmit = (data) => {
        onCreateSupplierEmail(data);
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Correo del proveedor"
                    name="email"
                    {...register('email', { required: true })}
                />
                <input
                    type="text"
                    placeholder="Descripción del correo"
                    name="description"
                    {...register('description', { required: true })}
                />
                <input
                    type="checkbox"
                    placeholder="Correo Principal"
                    name="is_Main"
                    {...register('is_Main', { required: false })}
                />
                <input type="submit" />
            </form>
            <Paper>
                {supplierList.map((index) => (
                    <li key={index.id}>{index.name}</li>
                ))}
            </Paper>
            <Paper>
                {supplierEmailList.map((index) => (
                    <li key={index.id}>{index.name}</li>
                ))}
            </Paper>
        </React.Fragment>
    );
}

export default CharacteristicTypeBuilder;