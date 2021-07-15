import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Grid,
    Modal
} from '@material-ui/core';
import * as actions from '../../../../store/actions/index';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 240,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    icons: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    }
}))

const CreatePurchaseBillLoader = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const bankList = useSelector(state => state.bill.bankList);
    const currencyList = useSelector(state => state.bill.currencyList);
    const paymentStatusList = useSelector(state => state.bill.paymentStatusList);
    const purchaseStatusList = useSelector(state => state.bill.purchaseStatusList);
    const paymentMethodList = useSelector(state => state.bill.paymentMethodList);

    const onFetchBankList = useCallback(() => dispatch(actions.fetchBankList()), [dispatch]);
    const onFetchCurrencyList = useCallback(() => dispatch(actions.fetchCurrencyList()), [dispatch]);
    const onFetchPaymentStatusList = useCallback(() => dispatch(actions.fetchPaymentStatusList()), [dispatch]);
    const onFetchPurchaseStatusList = useCallback(() => dispatch(actions.fetchPurchaseStatusList()), [dispatch]);
    const onFetchPaymentMethodList = useCallback(() => dispatch(actions.fetchPaymentMethodList()), [dispatch]);


    useEffect(() => {
        onFetchBankList();
        onFetchCurrencyList();
        onFetchPaymentMethodList();
        onFetchPaymentStatusList();
        onFetchPurchaseStatusList();
    }, []);

    const [modalInsert, setModalInsert] = useState(false);

    const modalInsertOpenedHandler = () => {
        setModalInsert(!modalInsert);
    }

    const [purchaseBillSelected, setPurchaseBillSelected] = useState({
        purchase_order_date: "",
        purchase_payment_date: "",
        payment_method: "",
        currency: "",
        bank: "",
        purchase_status: "",
        payment_status: ""
    })

    const onCreatePurchaseBill = useCallback((purchaseBillSelected) => dispatch(actions.createPurchaseBill(purchaseBillSelected)), [dispatch]);

    const handleChange = e => {
        const { name, value } = e.target;
        setPurchaseBillSelected(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(purchaseBillSelected);
    }

    const bodyInsert = (
        <div className={classes.modal}>
            <h3>Agregar nueva factura</h3>
            <br /><br />
            <Button color="primary">Agregar</Button>
            <Button onClick={modalInsertOpenedHandler}>Cancelar</Button>
        </div>
    );

    // "purchase_order_date": "2021-06-15T13:26:44Z",
    // "purchase_payment_date": null,
    // "payment_method": null,
    // "currency": null,
    // "bank": null,
    // "purchase_status": 1,
    // "payment_status": 4

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="order-datetime-local"
                            name="purchase_order_date"
                            label="Fecha de Orden"
                            type="datetime-local"
                            onChange={handleChange}
                            value={purchaseBillSelected.purchase_order_date}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="payment-datetime-local"
                            name="purchase_payment_date"
                            label="Fecha de Pago"
                            type="datetime-local"
                            onChange={handleChange}
                            value={purchaseBillSelected.purchase_payment_date}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="bank-select-select-label">Banco</InputLabel>
                        <Select
                            labelId="bank-select-label"
                            name="bank"
                            id="bank-select"
                            value={purchaseBillSelected.bank}
                            onChange={handleChange}
                        >
                            {bankList.map((index) => (
                                <MenuItem value={index.id}>{index.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="currency-select-label">Moneda</InputLabel>
                        <Select
                            labelId="currency-select-label"
                            name="currency"
                            id="currency-select"
                            value={purchaseBillSelected.currency}
                            onChange={handleChange}
                        >
                            {currencyList.map((index) => (
                                <MenuItem value={index.id}>{index.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="payment-status-select-label">Status del Pago</InputLabel>
                        <Select
                            labelId="payment-status-select-label"
                            name="payment_status"
                            id="payment-status-select"
                            value={purchaseBillSelected.payment_status}
                            onChange={handleChange}
                        >
                            {paymentStatusList.map((index) => (
                                <MenuItem value={index.id}>{index.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="purchase-status-select-label">Status de la Compra</InputLabel>
                        <Select
                            labelId="purchase-status-select-label"
                            name="purchase_status"
                            id="purchase-status-select"
                            value={purchaseBillSelected.purchase_status}
                            onChange={handleChange}
                        >
                            {purchaseStatusList.map((index) => (
                                <MenuItem value={index.id}>{index.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="payment-method-select-label">Método de Pago</InputLabel>
                        <Select
                            labelId="payment-method-select-label"
                            name="payment_method"
                            id="payment-method-select"
                            value={purchaseBillSelected.payment_method}
                            onChange={handleChange}
                        >
                            {paymentMethodList.map((index) => (
                                <MenuItem value={index.id}>{index.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <Button variant="contained" color="primary" onClick={() => onCreatePurchaseBill(purchaseBillSelected)}>
                        Crear la Factura
                    </Button>
                </Grid>
            </Grid>
            <Modal
                open={modalInsert}
                onClose={modalInsertOpenedHandler}>
            </Modal>
        </div>
    );
};

export default CreatePurchaseBillLoader;