import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../../../store/actions/index';


const FetchPaymentStatusListLoader = (props) => {

    const dispatch = useDispatch();

    const paymentStatusList = useSelector(state => state.bill.paymentStatusList);

    const onFetchPaymentStatusList = useCallback(() => dispatch(actions.fetchPaymentStatusList()), [dispatch]);

    useEffect(() => {
        onFetchPaymentStatusList();
    }, [onFetchPaymentStatusList]);


    return (
        <React.Fragment>
            {paymentStatusList.map((index) => (
                <li key={index.id}>{index.name}</li>
            ))}
        </React.Fragment>
    );
};

export default FetchPaymentStatusListLoader;