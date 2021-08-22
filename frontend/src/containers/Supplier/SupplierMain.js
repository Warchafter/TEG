import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card,
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import * as actions from '../../store/actions/index';
import SupplierMainOptions from '../../components/Supplier/SupplierMainOptions.js';
import Notifier from '../../components/Notifier/Notifier';
import CurrencyValueCard from '../../components/Cards/currencyValueCard';

const useStyles = makeStyles(() => ({
    paper: {
        border: '2px solid',
        borderColor: 'rgba(179, 179, 189, 0.3)',
        borderRadius: 16,
        transition: '0.4s',
        '&:hover': {
            borderColor: '#5B9FED',
        },
    },
    card: {
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        padding: '10px'
    },
    FBCard: {
        width: '100%'
    },
}));

export const SupplierMain = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const isLoadingExRate = useSelector(state => state.bill.loadingExRates);
    const ExRateDataLoaded = useSelector(state => state.bill.ExRateDataLoaded);
    const exchangeRates = useSelector(state => state.bill.exchangeRatesData);

    const onFetchExchangeRates = useCallback(() => dispatch(actions.fetchExchangeRates()), [dispatch]);

    useEffect(() => {
        onFetchExchangeRates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Notifier />
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Grid item xs={12}>
                            <Card className={styles.card}>
                                <SupplierMainOptions className={styles.mainOptions}/>
                            </Card>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <CurrencyValueCard exchangeRates={exchangeRates} loading={isLoadingExRate} ExRateDataLoaded={ExRateDataLoaded} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default SupplierMain;