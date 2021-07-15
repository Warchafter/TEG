import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions/index';


const FetchPurchaseStatusListLoader = (props) => {
    const dispatch = useDispatch();

    const purchaseStatusList = useSelector(state => state.bill.purchaseStatusList);

    const onFetchPurchaseStatusList = useCallback(() => dispatch(actions.fetchPurchaseStatusList()), [dispatch]);

    useEffect(() => {
        onFetchPurchaseStatusList();
    }, [onFetchPurchaseStatusList]);


    return (
        <React.Fragment>
            {purchaseStatusList.map((index) => (
                <li key={index.id}>{index.name}</li>
            ))}
        </React.Fragment>
    );
};

export default FetchPurchaseStatusListLoader;