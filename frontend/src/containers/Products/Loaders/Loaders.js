import React from 'react';
import {
    Typography,
    Paper
} from '@material-ui/core';
import CharacteristicTypeBuilder from '../../../components/Loaders/CharacteristicType/CharacteristicType';
import ProductBuilder from '../../../components/Loaders/Product/ProductBuilder';


export const Products = props => {

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