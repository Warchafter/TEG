import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper
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

    const charTypes = useSelector(state => state.product.charTypes);

    const onCreateCharacteristicType = useCallback((data) => dispatch(actions.createCharType(data)), [dispatch]);
    const onFetchCharacteristicTypes = useCallback(() => dispatch(actions.fetchCharTypes()), [dispatch]);

    useEffect(() => {
        onFetchCharacteristicTypes();
    }, [onFetchCharacteristicTypes]);

    const onSubmit = (data) => {
        onCreateCharacteristicType(data);
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Nombre del Tipo de Característica"
                    name="characteristicType"
                    {...register('characteristicType', { required: true })}
                />
                <input type="submit" />
            </form>
            <Paper>
                {charTypes.map((index) => (
                    <li key={index.id}>{index.name}</li>
                ))}
            </Paper>
        </React.Fragment>
    );
}

export default CharacteristicTypeBuilder;