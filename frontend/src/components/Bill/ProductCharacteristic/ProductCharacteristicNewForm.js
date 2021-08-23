import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field } from "formik";


import { makeStyles } from '@material-ui/styles';
import {
    Card,
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
}));

const ProductCharacteristicNewForm = (props) => {
    // In props.data I have the Bill Detail corresponding to the row that is selected
    // in the Purchase Bill Product Table
    const dispatch = useDispatch();
    const styles = useStyles();

    const productCharacteristicListFiltered = useSelector(state => state.product.productCharacteristicListFiltered);

    const onFetchProductCharacteristicListFiltered = useCallback((productId) => dispatch(actions.fetchProductCharacteristicListFiltered(productId)), [dispatch]);
    const onCreateBillProductCharacteristic = useCallback((formData) => dispatch(actions.createBillProductCharacteristic(formData)), [dispatch]);

    useEffect(() => {
        onFetchProductCharacteristicListFiltered(props.data.product.product.id)
    }, [])

    return (
        <div className={styles.root}>
            <Card>
                <Formik
                    initialValues={{
                        bill_detail: props.data.id,
                        characteristic_sel: []
                    }}
                    onSubmit={(values, actions) => {
                        onCreateBillProductCharacteristic(values);
                    }}
                    render={(
                        // we need to use setFieldValue from Formik
                        { values, setFieldValue }
                    ) => (
                        <Form>
                            <Field
                                component="select"
                                name="characteristic_sel"
                                // You need to set the new field value
                                onChange={evt =>
                                setFieldValue(
                                    "characteristic_sel",
                                    [].slice
                                    .call(evt.target.selectedOptions)
                                    .map(option => {
                                        console.log(option)
                                        return parseInt(option.value)})
                                )
                                }
                                multiple={true}
                            >
                                {productCharacteristicListFiltered.map(s => (
                                <option key={s.name + s.value} value={s.id}>
                                    {s.name + " - " + s.value}
                                </option>
                                ))}
                            </Field>
                            {/* just printing out the values */}
                            <hr />
                            <strong>{JSON.stringify(values)}</strong>
                            <button type="submit" >submit</button>
                        </Form>
                    )}
                />
            </Card>
        </div>
    );
};

export default ProductCharacteristicNewForm;