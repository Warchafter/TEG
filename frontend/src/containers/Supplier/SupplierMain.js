import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import * as actions from '../../store/actions/index';
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
        border: '2px solid',
        borderColor: 'rgba(179, 179, 189, 0.3)',
        borderRadius: 16,
        transition: '0.4s',
        '&:hover': {
            borderColor: '#5B9FED',
        },
    },
    FBCard: {
        width: '100%'
    },
}));

export const SupplierMain = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    if (false) {
        console.log(classes);
    }

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
            <Grid container spacing={4}>
                {/* <Grid item xs={4}><Paper className={classes.paper}><Typography>Proveedores</Typography></Paper></Grid> */}
                <Grid item xs={4}>
                    <CurrencyValueCard exchangeRates={exchangeRates} loading={isLoadingExRate} ExRateDataLoaded={ExRateDataLoaded} />
                </Grid>
                {/* <Grid item xs={8}><ShowcaseCardDemo className={classes.FBCard}></ShowcaseCardDemo></Grid> */}
            </Grid>
        </React.Fragment>
    )

};

export default SupplierMain;