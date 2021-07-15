import React from 'react';
import {
    Paper,
} from '@material-ui/core';

import Notifier from '../../components/Notifier/Notifier';
import SupplierTesting from '../../components/Supplier/Testing/SupplierTesting';

export const Supplier = props => {
    // This is a test file for all the api actions

    return (
        <React.Fragment>
            <Notifier />
            <Paper>
                <h1>Supplier Testing</h1>
                <SupplierTesting />
            </Paper>
        </React.Fragment>
    );
};

export default Supplier;