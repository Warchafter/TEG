import React from 'react';
// import { useSelector } from 'react-redux';

import Notifier from '../../components/Notifier/Notifier';
import ProductsList from '../../components/Products/ProductsList/ProductsList';

export const Products = props => {

    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <React.Fragment>
            <Notifier />
            <ProductsList />
        </React.Fragment>
    )
}

export default Products;