import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Card,
    IconButton,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
    TableFooter,
    Tooltip,
} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import EditIcon from '@material-ui/icons/Edit';
import PaymentIcon from '@material-ui/icons/Payment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Item } from '@mui-treasury/components/flex';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';

import { CSpinner } from '@coreui/react'

import * as actions from '../../../store/actions/index';

const StyledTooltip = withStyles({
    tooltip: {
        marginTop: '0.2rem',
        backgroundColor: 'rgba(0,0,0,0.72)',
        color: '#fff',
    },
})(Tooltip);

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },
    tableFullWrapper: {
        width: 'inherit'
    },
    table: {
        width: '100%'
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#3c4b64',
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    name: {
        fontWeight: 'bold',
        color: '#313c54'
    },
    subName: {
        color: '#666666'
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
    productCard: {
        border: '2px solid',
        borderColor: '#E7EDF3',
        borderRadius: 16,
        transition: '0.4s',
        '&:hover': {
            borderColor: '#5B9FED',
        },
        textAlign: 'center',
        minHeight: '50px'
    }
}));

const PurchaseBillList = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    // const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });

    // Bill Detail
    // Purchase Bill ID
    // Supplier Product ID
    // Quantity

    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);
    const purchaseBillList = useSelector(state => state.bill.purchaseBillList);
    const billClientSubmissionSelected = useSelector(state => state.bill.billClientSubmissionSelected);

    const onFetchPurchaseBillList = useCallback((data) => dispatch(actions.fetchPurchaseBillList(data)), [dispatch]);
    const onSetPurchaseBillToModify = useCallback((data) => dispatch(actions.setPurchaseBillToModify(data)), [dispatch]);
    const onSetPurchaseBillToModifyData = useCallback((data) => dispatch(actions.setPurchaseBillToModifyData(data)), [dispatch]);
    const onSetPurchaseBillToInspect = useCallback((data) => dispatch(actions.setPurchaseBillToInspect(data)), [dispatch]);
    const onSetPurchaseBillToModifyPayment = useCallback((data) => dispatch(actions.setPurchaseBillToModifyPayment(data)), [dispatch]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, purchaseBillList.length - page * rowsPerPage);

    useEffect(() => {
        if (userProfileDetail.roles === 'user') {
            if (billClientSubmissionSelected) {
                onFetchPurchaseBillList(billClientSubmissionSelected);
            }
        } else {
            if (billClientSubmissionSelected) {
                onFetchPurchaseBillList(billClientSubmissionSelected);
            } else {
                onFetchPurchaseBillList();
            }
        }
    }, [onFetchPurchaseBillList, billClientSubmissionSelected]);

    const canModifyPurchaseBillHandler = (row) => {
        if (userProfileDetail.roles === 'empleado') {
            console.log("ES EMPLEADO")
            return (
                <Item position={'right'} mr={-0.5} onClick={() => onSetPurchaseBillToModify(row)} >
                    <StyledTooltip title={'Ver Detalle'}>
                        <IconButton>
                            <EditIcon fontSize="large" />
                        </IconButton>
                    </StyledTooltip>
                </Item>
            );
        };
    };

    return (
        <div className={styles.root}>
            {
                !purchaseBillList
                    ? <CSpinner color="primary" />
                    :
                    <Grid container>
                        <Card  className={styles.tableFullWrapper}>
                            <Grid item xs={12}>
                                <TableContainer component={styles.tableContainer}>
                                    <Table className={styles.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={styles.tableHeaderCell}>ID</TableCell>
                                                <TableCell className={styles.tableHeaderCell}>Info Factura</TableCell>
                                                <TableCell className={styles.tableHeaderCell}>Info Fechas</TableCell>
                                                <TableCell className={styles.tableHeaderCell}>Status de la Compra</TableCell>
                                                <TableCell className={styles.tableHeaderCell}>Status del Pago</TableCell>
                                                <TableCell className={styles.tableHeaderCell}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {purchaseBillList
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <TableRow key={row.id}>
                                                        <TableCell>
                                                            <Typography
                                                                className={styles.status}
                                                            ># {row.id}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    <Typography className={styles.name}>Método de Pago:</Typography>
                                                                    <Typography className={styles.name}>Moneda:</Typography>
                                                                    <Typography className={styles.name}>Banco:</Typography>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography>{row.payment_method.name}</Typography>
                                                                    <Typography>{row.currency.name}</Typography>
                                                                    <Typography>{row.bank.name}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="body2">{
                                                                moment(row.purchase_order_date).format('L')
                                                            }</Typography>
                                                            <Typography color="textSecondary" variant="body2">{
                                                                row.purchase_payment_date ?
                                                                moment(row.purchase_payment_date).add(10, 'days').calendar()
                                                                : "N/A"
                                                            }</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography
                                                                className={styles.status}
                                                                style={{
                                                                    backgroundColor:
                                                                        ((row.purchase_status.name === 'Orden de Compra' && 'green') ||
                                                                            (row.purchase_status.name === 'Orden de Facturación' && 'blue'))
                                                                }}
                                                            >{row.purchase_status.name}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography
                                                                className={styles.status}
                                                                style={{
                                                                    backgroundColor:
                                                                        ((row.payment_status.name === 'Pago Completo' && 'green') ||
                                                                            (row.payment_status.name === 'Pago Parcial' && 'yellow') ||
                                                                            (row.payment_status.name === 'Por Pagar' && 'orange') ||
                                                                            (row.payment_status.name === 'N/A' && 'gray')
                                                                        ),
                                                                    color: ((row.payment_status.name === 'Pago Parcial' && 'black'))
                                                                }}
                                                            >{row.payment_status.name}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                canModifyPurchaseBillHandler(row)
                                                            }
                                                            <Item position={'right'} mr={-0.5} onClick={() => onSetPurchaseBillToModifyData(row)} >
                                                                <StyledTooltip title={'Modificar'}>
                                                                    <IconButton>
                                                                        <AddBoxIcon fontSize="large" />
                                                                    </IconButton>
                                                                </StyledTooltip>
                                                            </Item>
                                                            <Item position={'right'} mr={-0.5} onClick={() => onSetPurchaseBillToInspect(row)} >
                                                                <StyledTooltip title={'Ver Detalle'}>
                                                                    <IconButton>
                                                                        <PageviewIcon fontSize="large" />
                                                                    </IconButton>
                                                                </StyledTooltip>
                                                            </Item>
                                                            <Item position={'right'} mr={-0.5} onClick={() => onSetPurchaseBillToModifyPayment(row)} >
                                                                <StyledTooltip title={'Cargar Pago'}>
                                                                    <IconButton>
                                                                        <PaymentIcon fontSize="large" />
                                                                    </IconButton>
                                                                </StyledTooltip>
                                                            </Item>
                                                        </TableCell>
                                                    </TableRow>
                                            ))}
                                            {emptyRows > 0 && (
                                                        <TableRow style={{ height: 53 * emptyRows }}>
                                                        <TableCell colSpan={6} />
                                                        </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <TableFooter>
                                    <TablePagination
                                        rowsPerPageOptions={[5,]}
                                        component="div"
                                        count={purchaseBillList.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </TableFooter>
                            </Grid>
                        </Card>
                </Grid>
            }
        </div>
    );
};

export default PurchaseBillList;

