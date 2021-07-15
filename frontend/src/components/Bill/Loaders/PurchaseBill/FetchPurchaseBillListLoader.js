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
    Typography,
    TablePagination,
    TableFooter,
} from '@material-ui/core';
import * as actions from '../../../../store/actions/index';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardMedia: {
        maxWidth: 345,
    },
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
    media: {
        height: 70,
        width: 90
    },
}));

const FetchPurchaseBillListLoader = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const purchaseBillList = useSelector(state => state.bill.purchaseBillList);
    const purchaseBillListCount = useSelector(state => state.bill.purchaseBillListCount);
    console.log(purchaseBillList);

    const onFetchPurchaseBillList = useCallback(() => dispatch(actions.fetchPurchaseBillList()), [dispatch]);

    useEffect(() => {
        onFetchPurchaseBillList();
    }, [onFetchPurchaseBillList]);


    // "id": 68,
    // "purchase_order_date": "2021-06-15T13:26:44Z",
    // "purchase_payment_date": null,
    // "payment_method": null,
    // "currency": null,
    // "bank": null,
    // "purchase_status": 1,
    // "payment_status": 4

    return (
        <TableContainer component={classes.tableContainer}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>ID</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Info Factura</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Info Fechas</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Status de la Compra</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Status del Pago</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {purchaseBillList.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                                <Typography
                                    className={classes.status}
                                >{row.id}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography className={classes.name} align="center">{row.payment_method.name}</Typography>
                                <Typography className={classes.name} align="center">{row.currency.name}</Typography>
                                <Typography className={classes.name} align="center">{row.bank.name}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="body2">{row.purchase_order_date}</Typography>
                                <Typography color="textSecondary" variant="body2">{row.purchase_payment_date}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    className={classes.status}
                                    style={{
                                        backgroundColor:
                                            ((row.purchase_status.name === 'Orden de Compra' && 'green') ||
                                                (row.purchase_status.name === 'Orden de Facturación' && 'blue'))
                                    }}
                                >{row.purchase_status.name}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    className={classes.status}
                                    style={{
                                        backgroundColor:
                                            ((row.payment_status.name === 'Pago Completo' && 'green') ||
                                                (row.payment_status.name === 'Pago Parcial' && 'yellow') ||
                                                (row.payment_status.name === 'Por Pagar' && 'orange') ||
                                                (row.payment_status.name === 'N/A' && 'gray')
                                            )
                                    }}
                                >{row.payment_status.name}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={purchaseBillListCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    );
};

export default FetchPurchaseBillListLoader;