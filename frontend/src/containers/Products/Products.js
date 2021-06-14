import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Notifier from '../../components/Notifier/Notifier';
import ProductsList from '../../components/Products/ProductsList/ProductsList';

export const Products = props => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <ProductsList />
    )
}

export default Products;