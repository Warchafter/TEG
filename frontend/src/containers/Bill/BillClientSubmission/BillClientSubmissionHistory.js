import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
} from '@material-ui/core';

import Notifier from '../../../components/Notifier/Notifier';

import BillClientSubmissionHistoryList from '../../../components/Bill/BillClientSubmission/BillClientSubmissionHistoryList';
import BillClientSubmissionDescription from '../../../components/Bill/BillClientSubmission/BillClientSubmissionDescription';
import BillClientSubmissionDescriptionEmpty from '../../../components/Bill/BillClientSubmission/BillClientSubmissionDescriptionEmpty';
import PurchaseBillCreatedCard from '../../../components/Bill/PurchaseBill/PurchaseBillCreatedCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 'grow'
    },
}));

// Crear una pantalla de confirmación de creación de factura con un modal
// Crear una pantalla de creación de factura exitosa.

const BillClientSubmissionHistory = () => {
    const styles = useStyles();

    const isBillClientSubmissionSelected = useSelector(state => state.bill.isBillClientSubmissionSelected);
    const billClientSubmissionSelected = useSelector(state => state.bill.billClientSubmissionSelected);
    const purchaseBillCreated = useSelector(state => state.bill.purchaseBillCreated);

    

    const selectedOption = (selectionData) => {
        if (isBillClientSubmissionSelected) {
            return <BillClientSubmissionDescription selectedOption={selectionData} />
        } else {
            return <BillClientSubmissionDescriptionEmpty />
        }
    };

    const isPurchaseBillCreated = (purchaseBillCreated) => {
        if (purchaseBillCreated.length !== 0) {
            return (
                <Grid item xs={4}>
                    <PurchaseBillCreatedCard purchaseBillCreated={purchaseBillCreated}/>
                </Grid>
            );
        } else {
            return null
        };
    };

    return (
        <div className={styles.root}>
                <Notifier />
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <BillClientSubmissionHistoryList />
                    </Grid>
                    <Grid item xs={8}>
                        {selectedOption(billClientSubmissionSelected)}
                    </Grid>
                    {isPurchaseBillCreated(purchaseBillCreated)}
                </Grid>
        </div>
    );
};

export default BillClientSubmissionHistory;