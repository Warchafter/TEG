import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core';
import * as actions from '../../../store/actions/index';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));


const ProductBuilder = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const onFetchBrands = useCallback(() => dispatch(actions.fetchBrands()), [dispatch]);
    // const onCreateProduct = useCallback((data) => dispatch(actions.createProduct(data)), [dispatch]);



    useEffect(() => {
        onFetchBrands();
    }, [onFetchBrands]);

    const brands = useSelector(state => state.product.brands);
    const [brandsChosen, setBrandsChosen] = useState('');

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setBrandsChosen(value);
    }

    return (
        <React.Fragment>
            <p>Hello</p>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="select-multiple-native">
                    Marcas
                </InputLabel>
                <Select
                    multiple
                    native
                    value={brandsChosen}
                    onChange={handleChangeMultiple}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
                >
                    {brands.map((index) => (
                        <option key={index.id} value={index.name}>
                            {index.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </React.Fragment>
    );
};

export default ProductBuilder;