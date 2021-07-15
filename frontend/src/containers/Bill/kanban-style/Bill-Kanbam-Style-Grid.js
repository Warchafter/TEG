import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import KanbanCardDemo from '../../../components/MUI-Components/payment-kanbam-card';

import cx from 'clsx';
import Card from '@material-ui/core/Card';

import * as actions from '../../../store/actions/index';


const useStyles = makeStyles(({ spacing, palette }) => {
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
    };
});

const BillKanbanStyleGrid = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    const purchaseBillList = useSelector(state => state.bill.purchaseBillList);
    const isLoading = useSelector(state => state.bill.loading);

    const onFetchPurchaseBillList = useCallback(() => dispatch(actions.fetchPurchaseBillList()), [dispatch]);

    useEffect(() => {
        onFetchPurchaseBillList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(purchaseBillList);

    return (
        <React.Fragment>
            <Grid
                spacing={3}
                direction="column"
                className={classes.root}
                container
            >
                <Grid item xs={12}>
                    <Card className={cx(classes.card)} elevation={0}>
                        <h2>This is a title that needs to be padded better</h2>
                    </Card>
                </Grid>
                {isLoading === false && purchaseBillList !== []
                    ?
                    <Grid item xs={12}>
                        <Grid container spacing={8} className={classes.root} >
                            <Grid item xs={4}>
                                <Grid
                                    spacing={3}
                                    direction="column"
                                    className={classes.root}
                                    container
                                >
                                    <Card className={cx(classes.card)} elevation={0}>
                                        <h4>Por Pagar</h4>
                                    </Card>
                                    {
                                        purchaseBillList.map(index => (
                                            index.payment_status.id !== 1
                                                ?
                                                null
                                                : <Grid item xs={12}><KanbanCardDemo key={index.id} {...index} /></Grid>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid
                                    spacing={3}
                                    direction="column"
                                    className={classes.root}
                                    container
                                >
                                    <Card className={cx(classes.card)} elevation={0}>
                                        <h4>Pago Parcial</h4>
                                    </Card>
                                    {
                                        purchaseBillList.map(index => (
                                            index.payment_status.id !== 2
                                                ?
                                                null
                                                : <Grid item xs={12}><KanbanCardDemo key={index.id} {...index} /></Grid>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid
                                    spacing={3}
                                    direction="column"
                                    className={classes.root}
                                    container
                                >
                                    <Card className={cx(classes.card)} elevation={0}>
                                        <h4>Pago Completo</h4>
                                    </Card>
                                    {
                                        purchaseBillList.map(index => (
                                            index.payment_status.id !== 3
                                                ?
                                                null
                                                : <Grid item xs={12}><KanbanCardDemo key={index.id} {...index} /></Grid>
                                        ))
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