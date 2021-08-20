import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },
    card: {

    },
    dotterLineWrapper: {
        padding: '10px',
        border: 'none',
        borderTop: '1px dotted black'
    },
}));

const PurchaseBillCreatedCard = (props) => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const purchaseBillSelected = useSelector(state => state.bill.purchaseBillSelected);

    const onFetchPurchaseBill = useCallback((id) => dispatch(actions.fetchPurchaseBill(id)), [dispatch]);

    useEffect(() => {
        onFetchPurchaseBill(props.purchaseBillCreated.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.purchaseBillCreated.id,])

    console.log(purchaseBillSelected);

    return (
        <div className={styles.root}>
            {
                purchaseBillSelected ?
                    <Card>
                        <div className={styles.dotterLineWrapper}>
                            <h1>{purchaseBillSelected.id}</h1>
                        </div>
                    </Card>
                :
                null
            }
        </div>
    );
};

export default PurchaseBillCreatedCard;