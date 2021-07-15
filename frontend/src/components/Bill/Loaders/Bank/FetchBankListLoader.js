import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../../../store/actions/index';

const FetchBankListLoader = (props) => {

    const dispatch = useDispatch();

    const bankList = useSelector(state => state.bill.bankList);

    const onFetchBankList = useCallback(() => dispatch(actions.fetchBankList()), [dispatch]);

    useEffect(() => {
        onFetchBankList();
    }, [onFetchBankList]);


    return (
        <React.Fragment>
            {bankList.map((index) => (
                <li key={index.id}>{index.name}</li>
            ))}
        </React.Fragment>
    );
};

export default FetchBankListLoader;