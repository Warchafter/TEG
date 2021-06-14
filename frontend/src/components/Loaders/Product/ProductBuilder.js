import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    Chip
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(brand, name, theme) {
    return {
        fontWeight:
            name.indexOf(brand) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const ProductBuilder = () => {
    const classes = useStyles();
    const theme = useTheme();

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const onFetchBrands = useCallback(() => dispatch(actions.fetchBrands()), [dispatch]);
    // const onCreateProduct = useCallback((data) => dispatch(actions.createProduct(data)), [dispatch]);



    useEffect(() => {
        onFetchBrands();
    }, [onFetchBrands]);

    const brands = useSelector(state => state.product.brands);
    const [brandsChosen, setBrandsChosen] = useState('');

    const handleChange = (event) => {
        setBrandsChosen(event.target.value);
    };

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

    // const onSubmit = (data) => {
    //     onCreateProduct(data);
    // }

    // const BrandListItems = () => {
    //     return brands.map((brandId, name) => <li>{name}</li>)
    // }

    return (
        <React.Fragment>
            <p>Hello</p>
            {/* <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={brandsChosen}
                    onChange={handleChange}
                    input={<Input />}
                    MenuProps={MenuProps}
                >
                    {brands.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name.name, brandsChosen, theme)}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> */}
            {/* <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={brandsChosen}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {brands.map((index) => (
                        <MenuItem key={index.id} value={index.name} style={getStyles(index.name, brandsChosen, theme)}>
                            {index.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> */}
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Nombre del Producto"
                    name="title"
                    {...register('title')}
                />
                <input
                    type="text"
                    placeholder="Descripción del Producto"
                    name="description"
                />
                <input
                type=
            />
                <input type="submit" />
            </form> */}
            {/* <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={brandsChosen}
                    onChange={handleChange}
                >
                    {brands.map((index) => <MenuItem value={index.id}>{index.name}</MenuItem>)}
                </Select>
            </FormControl> */}
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