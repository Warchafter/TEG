import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },
    productCard: {
        border: '2px solid',
        borderColor: '#E7EDF3',
        borderRadius: 16,
        transition: '0.4s',
        '&:hover': {
            borderColor: '#5B9FED',
        },
        textAlign: 'center',
        minHeight: '50px'
    }
}))

const BillDetailProductCard = (props) => {
    const styles = useStyles();

    return (
        <div className={styles.root}>
            <Card className={styles.productCard}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <p>{props.number + 1}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <h4>{props.data.product.product.title}</h4>
                    </Grid>
                    <Grid item xs={2}>
                        <h4>{props.data.product.supplier.name} - {props.data.product.supplier.rif}</h4>
                    </Grid>
                    <Grid item xs={2}>
                        <h4>Cantidad: {props.data.quantity}</h4>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default BillDetailProductCard;