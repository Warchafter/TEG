import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Notifier from '../../../components/Notifier/Notifier';
import {
    Typography,
    Paper
} from '@material-ui/core';
import CharacteristicTypeBuilder from '../../../components/Loaders/CharacteristicType/CharacteristicType';
import ProductBuilder from '../../../components/Loaders/Product/ProductBuilder';


export const Products = props => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <React.Fragment>
            <Paper>
                <Typography variant="h2">
                    Marcas:
                </Typography>
                <ProductBuilder />
            </Paper>
            <Paper>
                <Typography variant="h4">
                    Tipo de Característica:
                </Typography>
                <CharacteristicTypeBuilder></CharacteristicTypeBuilder>
            </Paper>
        </React.Fragment>
    );
};

export default Products;