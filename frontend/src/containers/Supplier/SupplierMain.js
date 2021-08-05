import React from 'react';
import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ShowcaseCardDemo from '../../components/Supplier/SupplierFirebaseCard';

import Notifier from '../../components/Notifier/Notifier';

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
    const classes = useStyles();

    return (
        <React.Fragment>
            <Notifier />
            <Grid container spacing={4}>
                <Grid item xs={4}><Paper className={classes.paper}><Typography>Proveedores</Typography></Paper></Grid>
                <Grid item xs={8}><ShowcaseCardDemo className={classes.FBCard}></ShowcaseCardDemo></Grid>
            </Grid>
        </React.Fragment>
    )

};

export default SupplierMain;