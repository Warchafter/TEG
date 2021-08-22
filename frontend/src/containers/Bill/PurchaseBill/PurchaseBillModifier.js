import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';
import PurchaseBillProductTableSkeleton from '../../../components/Bill/PurchaseBill/PurchaseBillProductTableSkeleton';
import PurchaseBillList from '../../../components/Bill/PurchaseBill/PurchaseBillList';


const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    title: {
        textAlign: 'center'
    },
    listCard: {
        padding: '10px',
    },
    headerCard: {
        width: '100%'
    }
}));

const PurchaseBillModifier = () => {
    const styles = useStyles();

    const purchaseBillToModify = useSelector(state => state.bill.purchaseBillToModify);

    return (
        <div className={styles.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PurchaseBillList />
                    </Grid>
                    {
                        purchaseBillToModify
                        ?
                        <>
                            <Grid item xs={12}>
                                <Card className={styles.headerCard} >
                                    <h1 className={styles.title}>Detalle de la Factura # {purchaseBillToModify.id}</h1>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                {/* <Card className={styles.listCard}> */}
                                    <PurchaseBillProductTableSkeleton />
                                {/* </Card> */}
                            </Grid>
                        </>
                        :
                        null
                    }
                </Grid>
        </div>
    );
}; 

export default PurchaseBillModifier;