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
import PurchaseBillList from '../../../components/Bill/PurchaseBill/PurchaseBillList';
import PurchaseBillProductTableSkeleton from '../../../components/Bill/PurchaseBill/PurchaseBillProductTableSkeletonInspect';
import BillPaymentDetailCreateForm from '../../../components/Bill/BillPaymentDetail/BillPaymentDetailCreateForm';
import PurchaseBillModifyData from '../../../components/Bill/PurchaseBill/PurchaseBillModifyData';
import PurchaseBillDetailProductCharacteristicsInspect from '../../../components/Bill/PurchaseBill/PurchaseBillDetailProductCharacteristicsInspect';


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
    const purchaseBillToInspect = useSelector(state => state.bill.purchaseBillToInspect);
    const purchaseBillToModifyPayment = useSelector(state => state.bill.purchaseBillToModifyPayment);
    const purchaseBillToModifyData = useSelector(state => state.bill.purchaseBillToModifyData);
    const billDetailToInspectProductCharacteristics = useSelector(state => state.bill.billDetailToInspectProductCharacteristics);


    const selectedOption = (selectionData) => {
        if (isBillClientSubmissionSelected) {
            return <BillClientSubmissionDescription selectedOption={selectionData} />
        } else {
            return <BillClientSubmissionDescriptionEmpty />
        }
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
                    {/* {isPurchaseBillCreated(purchaseBillCreated)} */}
                        {
                            billClientSubmissionSelected ?
                                <Grid item xs={12}>
                                    <PurchaseBillList />
                                </Grid>
                            : null
                        }
                        {
                            purchaseBillToInspect ?
                                <Grid item xs={7}>
                                    <PurchaseBillProductTableSkeleton />
                                </Grid>
                            : null
                        }
                        {
                            billDetailToInspectProductCharacteristics ?
                            <Grid item xs={5}>
                                <PurchaseBillDetailProductCharacteristicsInspect />
                            </Grid>
                            : null
                        }
                        {
                            purchaseBillToModifyData ?
                                <Grid item xs={5}>
                                    <PurchaseBillModifyData />
                                </Grid>
                            : null
                        }
                        {
                            purchaseBillToModifyPayment ?
                                <Grid item xs={5}>
                                    <BillPaymentDetailCreateForm />
                                </Grid>
                            : null
                        }
                    <Grid item xs={12}></Grid>
                </Grid>
        </div>
    );
};

export default BillClientSubmissionHistory;