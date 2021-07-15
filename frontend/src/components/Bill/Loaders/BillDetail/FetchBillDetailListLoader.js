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

const FetchBillDetailListLoader = (props) => {
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

    const billDetailList = useSelector(state => state.bill.billDetailList);
    const billDetailListCount = useSelector(state => state.bill.billDetailListCount);
    console.log(billDetailList);

    const onFetchBillDetailList = useCallback(() => dispatch(actions.fetchBillDetailList()), [dispatch]);

    useEffect(() => {
        onFetchBillDetailList();
    }, [onFetchBillDetailList]);

    // "id": 1,
    // "purchase_bill": 70,
    // "product": 3,
    // "quantity": 50

    return (
        <div className={classes.root}>
            <TableContainer component={classes.tableContainer}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>ID</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Nº Factura</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Producto</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Cantidad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billDetailList.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Typography
                                        className={classes.status}
                                    >{row.id}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        className={classes.status}
                                    >{row.purchase_bill.id}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{row.product.product.title}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{row.quantity}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={billDetailListCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </TableContainer>
        </div>
    );
};

export default FetchBillDetailListLoader;