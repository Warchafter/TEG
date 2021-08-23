import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card, Grid
} from '@material-ui/core';

import PurchaseBillAddNewProductCard from '../../../components/Bill/PurchaseBill/PurchaseBillAddNewProductCard';
import PurchaseBillProductCard from '../../../components/Bill/PurchaseBill/PurchaseBillProductCard';

import * as actions from '../../../store/actions/index';
import PurchaseBillNewProductCard from './PurchaseBillNewProductCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    tableCardSkeleton: {
        border: '2px solid',
        borderColor: '#6a7a85',
        borderRadius: 8,
    },
    gridProducts: {
        padding: '10px'
    }
}));

const PurchaseBillProductTableSkeletonInspect = () => {
    const dispatch = useDispatch()
    const styles = useStyles();

    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);
    const billDetailListFiltered = useSelector(state => state.bill.billDetailListFiltered);
    const purchaseBillToInspect = useSelector(state => state.bill.purchaseBillToInspect);
    const purchaseBillAddingNewProduct = useSelector(state => state.bill.purchaseBillAddingNewProduct);

    const onFetchBillDetailListFiltered = useCallback((id) => dispatch(actions.fetchBillDetailListFiltered(id)), [dispatch]);

    useEffect(() => {
        if (purchaseBillToInspect) {
            onFetchBillDetailListFiltered(purchaseBillToInspect.id)
        }
    }, [purchaseBillToInspect,]);

    const canModifyPurchaseBill = () => {
        if (userProfileDetail.roles === 'user') {
            return null
        }
        return (
            <Grid item xs={12}>
                <PurchaseBillAddNewProductCard/>
            </Grid>
        );
    };

    return (
        <div className={styles.root}>
            <Card className={styles.tableCardSkeleton}>
                <Grid container spacing={1} className={styles.gridProducts}>
                    {
                        billDetailListFiltered
                        ?
                        billDetailListFiltered.map((row, index) => (
                                <Grid item xs={12}>
                                    <PurchaseBillProductCard key={row.id} number={index} data={row}/>
                                </Grid>
                        ))
                        :
                        <h1>No ha sido creado todavía!</h1>
                    }
                    {
                        purchaseBillAddingNewProduct ?
                            <Grid item xs={12}>
                                <PurchaseBillNewProductCard />
                            </Grid>
                        : null
                    }
                    {canModifyPurchaseBill()}
                </Grid>
            </Card>
        </div>
    );
};

export default PurchaseBillProductTableSkeletonInspect;