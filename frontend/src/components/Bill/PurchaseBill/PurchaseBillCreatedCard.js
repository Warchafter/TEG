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
    dottedLineWrapen: {
        padding: '10px',
        border: 'none',
        borderTop: '1px dotted black'
    },  
}));

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

const PurchaseBillCreatedCard = (props) => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const purchaseBillSelected = useSelector(state => state.bill.purchaseBillSelected);

    const onFetchPurchaseBill = useCallback((id) => dispatch(actions.fetchPurchaseBill(id)), [dispatch]);

    useEffect(() => {
        onFetchPurchaseBill(props.purchaseBillCreated.id)
    }, [props.purchaseBillCreated.id,])

    return (
        <div className={styles.root}>
            {
                purchaseBillSelected.length !== 0
                    ?
                        <Card>
                            <div className={styles.dottedLineWrapen}>
                                {/* <h1>{purchaseBillSelected.}</h1> */}
                            </div>
                        </Card>
                    :
                    {loading}
            }
        </div>
    );
};

export default PurchaseBillCreatedCard;