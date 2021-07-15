import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import * as actions from '../../../../store/actions/index';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
}))

const FetchBillPaymentDetailLoader = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const purchaseBillList = useSelector(state => state.bill.purchaseBillList);
    console.log(purchaseBillList);

    const onFetchPurchaseBillList = useCallback(() => dispatch(actions.fetchPurchaseBillList()), [dispatch]);

    useEffect(() => {
        onFetchPurchaseBillList();
    }, [onFetchPurchaseBillList]);

    // "id": 1,
    // "purchase_bill": 70,
    // "payment_receipt_number": 13548.0,
    // "payment_receipt_image": "http://127.0.0.1:8000/media/uploads/bill/payment_evidence/d8b2191a-926b-4028-8882-ce8730521ec3.jpg"

    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">Factura</TableCell>
                            <TableCell align="right">Nº Recibo Pago</TableCell>
                            <TableCell align="right">URL Evidencia Recibo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purchaseBillList.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.purchase_bill}</TableCell>
                                <TableCell align="right">{row.payment_receipt_number}</TableCell>
                                <TableCell align="right">{row.payment_receipt_image}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default FetchBillPaymentDetailLoader;