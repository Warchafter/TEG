import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Grid,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';

import PurchaseBillAddNewProductCard from '../../../components/Bill/PurchaseBill/PurchaseBillAddNewProductCard';
import PurchaseBillProductCard from '../../../components/Bill/PurchaseBill/PurchaseBillProductCard';

import * as actions from '../../../store/actions/index';
import PurchaseBillNewProductCard from './PurchaseBillNewProductCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    tableCardSkeleton: {
        border: '2px solid',
        borderColor: '#6a7a85',
        borderRadius: 8,
    },
    gridProducts: {
        padding: '10px'
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        borderBottom: 0
    },
    tableHeaderRow: {
        backgroundColor: '#3c4b64',
    },
    tableHeaderCellPrice: {
        fontWeight: 'bold',
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        borderBottom: 0
    },
    priceCell: {
        textAlign: '-webkit-center',
    }
}));

const PurchaseBillProductTableSkeletonInspect = () => {
    const dispatch = useDispatch()
    const styles = useStyles();

    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);
    const billDetailListFiltered = useSelector(state => state.bill.billDetailListFiltered);
    const purchaseBillToInspect = useSelector(state => state.bill.purchaseBillToInspect);
    const purchaseBillAddingNewProduct = useSelector(state => state.bill.purchaseBillAddingNewProduct);

    const onFetchBillDetailListFiltered = useCallback((id) => dispatch(actions.fetchBillDetailListFiltered(id)), [dispatch]);

    useEffect(() => {
        if (purchaseBillToInspect) {
            onFetchBillDetailListFiltered(purchaseBillToInspect.id)
        }
    }, [purchaseBillToInspect,]);

    const canModifyPurchaseBill = () => {
        if (userProfileDetail.roles === 'user') {
            return null
        }
        return (
            <Grid item xs={12}>
                <PurchaseBillAddNewProductCard/>
            </Grid>
        );
    };

    return (
        <div className={styles.root}>
            <Card className={styles.tableCardSkeleton}>
                <Grid container spacing={1} className={styles.gridProducts}>
                    <Grid item xs={12}>
                        <TableContainer component={styles.tableContainer}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow  className={styles.tableHeaderRow}>
                                        <Grid container>
                                            <Grid item xs={1}>
                                                <TableCell className={styles.tableHeaderCell}>
                                                    <Typography>ID</Typography>
                                                </TableCell>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TableCell className={styles.tableHeaderCell}>
                                                    <Typography>Producto</Typography>
                                                </TableCell>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TableCell className={styles.tableHeaderCell}>
                                                    <Typography>Proveedor</Typography>
                                                </TableCell>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <TableCell className={styles.tableHeaderCell}>
                                                    <Typography>Cantidad</Typography>
                                                </TableCell>
                                            </Grid>
                                            <Grid item xs={3} className={styles.priceCell}>
                                                <TableCell className={styles.tableHeaderCellPrice}>
                                                    <Typography>Precio</Typography>
                                                </TableCell>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <TableCell className={styles.tableHeaderCell}></TableCell>
                                            </Grid>
                                        </Grid>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Grid>
                    {
                        billDetailListFiltered
                        ?
                        billDetailListFiltered.map((row, index) => (
                                <Grid item xs={12}>
                                    <PurchaseBillProductCard key={row.id} number={index} data={row}/>
                                </Grid>
                        ))
                        :
                        <h1>No ha sido creado todavía!</h1>
                    }
                    {
                        purchaseBillAddingNewProduct ?
                            <Grid item xs={12}>
                                <PurchaseBillNewProductCard />
                            </Grid>
                        : null
                    }
                    {canModifyPurchaseBill()}
                </Grid>
            </Card>
        </div>
    );
};

export default PurchaseBillProductTableSkeletonInspect;