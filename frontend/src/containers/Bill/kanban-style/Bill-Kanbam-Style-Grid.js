import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import NiceHeaderCard from '../../../components/Cards/niceHeaderCard';
import KanbanCardDemo from '../../../components/MUI-Components/PaymentKambamCard/payment-kanbam-card';
import CurrencyValueCard from '../../../components/Cards/currencyValueCard';


// import CIcon from '@coreui/icons-react'
// import { freeSet } from '@coreui/icons'

import cx from 'clsx';
import Card from '@material-ui/core/Card';

import * as actions from '../../../store/actions/index';
import Notifier from '../../../components/Notifier/Notifier';


const useStyles = makeStyles(({ spacing, palette, theme }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            display: 'flex'
        },
        card: {
            display: 'flex',
            padding: spacing(2),
            minWidth: 180,
            borderRadius: 12,
            boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
            '& > *:nth-child(1)': {
                marginRight: spacing(2),
            },
            '& > *:nth-child(2)': {
                flex: 'auto',
            },
        },
        avatar: {},
        heading: {
            fontFamily: family,
            fontSize: 16,
            marginBottom: 0,
        },
        subheader: {
            fontFamily: family,
            fontSize: 14,
            color: palette.grey[600],
            letterSpacing: '1px',
            marginBottom: 4,
        },
        value: {
            marginLeft: 8,
            fontSize: 14,
            color: palette.grey[500],
        },
        scrollMenu: {
            overflow: 'auto',
            whiteSpace: 'nowrap',
            maxHeight: '100%',
            overflowY: 'hidden',
        },
        alertLight: {
            backgroundColor: '#e3eaef',
            color: '#69787d',
            display: 'flex',
            border: 'none',
            paddind: '15px 20px',
            position: 'relative',
            marginBottom: '1rem',
            borderRadius: '.25rem',
            boxSizing: 'border-box',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '1.5',
            textAlign: 'left'
        },
    };
});

const BillKanbanStyleGrid = () => {
    const styles = useStyles();
    const dispatch = useDispatch();

    // const [paymentBillCounter1, setPaymentBillCounter1] = React.useState(0);
    // const [paymentBillCounter2, setPaymentBillCounter2] = React.useState(0);
    // const [paymentBillCounter3, setPaymentBillCounter3] = React.useState(0);

    const purchaseBillList = useSelector(state => state.bill.purchaseBillList);
    const isLoading = useSelector(state => state.bill.loading);
    const isLoadingExRate = useSelector(state => state.bill.loadingExRates);
    const ExRateDataLoaded = useSelector(state => state.bill.ExRateDataLoaded);
    const exchangeRates = useSelector(state => state.bill.exchangeRatesData);

    const onFetchExchangeRates = useCallback(() => dispatch(actions.fetchExchangeRates()), [dispatch]);
    const onFetchPurchaseBillList = useCallback(() => dispatch(actions.fetchPurchaseBillList()), [dispatch]);

    useEffect(() => {
        onFetchPurchaseBillList();
        onFetchExchangeRates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Notifier />
            <Grid
                spacing={3}
                direction="column"
                className={styles.root}
                container
            >
                <Grid item xs={12}>
                <CurrencyValueCard exchangeRates={exchangeRates} loading={isLoadingExRate} ExRateDataLoaded={ExRateDataLoaded} />
                </Grid>
                {/* <Grid item xs={12}>
                    <div className={styles.alertLight}>
                        <div className={styles.alertTitle}>Test Title
                        </div>
                        " Test description to understand the padding a little bit better. "
                    </div>
                </Grid> */}
                <Grid item xs={12}>
                    <Card className={cx(styles.card)} elevation={0}>
                        <h2>Estados de Pagos de Cotizaciones Pendientes</h2>
                    </Card>
                </Grid>
                {isLoading === false && purchaseBillList !== []
                    ?
                    <Grid item xs={12} className={styles.scrollMenu}>
                        <Grid container spacing={8} className={styles.root} >
                            <Grid item xs={4} md={4}>
                                <Grid
                                    spacing={3}
                                    direction="column"
                                    className={styles.root}
                                    container
                                >
                                    <NiceHeaderCard title={"Por Pagar"} type={"Por Pagar"}/>
                                    {
                                        purchaseBillList.map(index => {
                                            if (index.payment_status.id === 1) {
                                                return <Grid item xs={12}><KanbanCardDemo key={index.id} data={index} /></Grid>
                                            }
                                        })
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Grid
                                    spacing={3}
                                    direction="column"
                                    className={styles.root}
                                    container
                                >
                                    <NiceHeaderCard title={"Pago Parcial"} type={"Pago Parcial"}/>
                                    {
                                        purchaseBillList.map(index => {
                                            if (index.payment_status.id === 2) {
                                                return <Grid item xs={12}><KanbanCardDemo key={index.id} data={index} /></Grid>
                                            }
                                        })
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Grid
                                    spacing={3}
                                    direction="column"
                                    className={styles.root}
                                    container
                                >
                                    <NiceHeaderCard title={"Pago Completo"} type={"Pago Completo"}/>
                                    {
                                        purchaseBillList.map(index => {
                                        if (index.payment_status.id === 3) {
                                            return <Grid item xs={12}><KanbanCardDemo key={index.id} data={index} /></Grid>
                                        }
                                        })
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    :
                    null
                }
            </Grid>
        </React.Fragment>
    );
};

export default BillKanbanStyleGrid;