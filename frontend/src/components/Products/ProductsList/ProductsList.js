import React from 'react';
import { Grid } from '@material-ui/core';

import Product from '../Product/Product';
import useStyles from './styles';

const products = [
    { id: 1, name: 'Guantes de Nitrilo', description: 'Guantes de Nitrilo.', image: 'http://ih.com.ve/resources/pictures/products/manonitrilo.png' },
    { id: 2, name: 'Kit de Admisión', description: 'Kit de admisión.', image: 'http://ih.com.ve/resources/pictures/products/kit_admision_masculino_lujo.png' },
];

const Products = () => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <h1>Product List</h1>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;