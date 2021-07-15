import React from 'react';
import {
    Paper,
} from '@material-ui/core';

import Notifier from '../../components/Notifier/Notifier';
import BillTesting from '../../components/Bill/Testing/BillTesting';

export const Products = props => {

    return (
        <React.Fragment>
            <Notifier />
            <Paper>
                <h1>Bill Testing</h1>
                <BillTesting />
            </Paper>
        </React.Fragment>
    )
}

export default Products;