import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions/index';


const FetchPaymentMethodListLoader = (props) => {

    const dispatch = useDispatch();

    const paymentMethodList = useSelector(state => state.bill.paymentMethodList);

    const onFetchPaymentMethodList = useCallback(() => dispatch(actions.fetchPaymentMethodList()), [dispatch]);

    useEffect(() => {
        onFetchPaymentMethodList();
    }, [onFetchPaymentMethodList]);


    return (
        <React.Fragment>
            {paymentMethodList.map((index) => (
                <li key={index.id}>{index.name}</li>
            ))}
        </React.Fragment>
    );
};

export default FetchPaymentMethodListLoader;