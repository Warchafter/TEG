import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';

import BillPaymentDetailApprovalMedia from '../../../components/Bill/BillPaymentDetail/BillPaymentDetailApprovalMedia';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },
}));

const BillPaymentDetailApproval = () => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Card >
                <BillPaymentDetailApprovalMedia />
            </Card>
        </div>
    );
};

export default BillPaymentDetailApproval;