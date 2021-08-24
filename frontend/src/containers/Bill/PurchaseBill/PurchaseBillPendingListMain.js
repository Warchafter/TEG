import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';

import * as actions from '../../../store/actions/index';
import PurchaseBillPendingListTable from '../../../components/Bill/PurchaseBill/PurchaseBillPendingListTable';
import PurchaseBillModify from '../../../components/Bill/PurchaseBill/PurchaseBillModify';
import Notifier from '../../../components/Notifier/Notifier';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
}));

const PurchaseBillPendingListMain = () => {
    const styles = useStyles();

    const purchaseBillToModify = useSelector(state => state.bill.purchaseBillToModify);

    return (
        <div className={styles.root}>
            <Notifier />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <PurchaseBillPendingListTable />
                </Grid>
                {
                    purchaseBillToModify ?
                    <Grid item xs={5}>
                        <PurchaseBillModify />
                    </Grid>
                    : null
                }
                <Grid item xs={12}>
                &nbsp;
                </Grid>
            </Grid>
        </div>
    );
};

export default PurchaseBillPendingListMain;