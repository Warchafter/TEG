import React from 'react';
// import { useSelector } from 'react-redux';

import Notifier from '../../components/Notifier/Notifier';
import ProductForm from '../../components/Products/ProductForm';

export const Products = props => {

    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <React.Fragment>
            <Notifier />
            <ProductForm />
        </React.Fragment>
    )
}

export default Products;