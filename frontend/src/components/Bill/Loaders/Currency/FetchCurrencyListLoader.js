import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions/index';

const FetchCurrencyListLoader = (props) => {
    const dispatch = useDispatch();

    const currencyList = useSelector(state => state.bill.currencyList);

    const onFetchCurrencyList = useCallback(() => dispatch(actions.fetchCurrencyList()), [dispatch]);

    useEffect(() => {
        onFetchCurrencyList();
    }, [onFetchCurrencyList]);


    return (
        <React.Fragment>
            {currencyList.map((index) => (
                <li key={index.id}>{index.name}</li>
            ))}
        </React.Fragment>
    );
};

export default FetchCurrencyListLoader;