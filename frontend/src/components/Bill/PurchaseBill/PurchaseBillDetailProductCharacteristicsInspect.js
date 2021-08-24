import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Grid,
    Chip,
    MenuItem,
    Select,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
} from '@material-ui/core';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    card: {
        maxHeight: 394,
    },
    content: {
        color: '#666666',
        whiteSpace: 'pre-wrap',
        paddingLeft: '20px'
    },
    scrollMenu: {
        overflow: 'auto',
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
        maxHeight: 577,
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
    formAlign: {
        textAlign: 'center'
    },
    selectItem: {
        minWidth: 250
    }
}));


const PurchaseBillDetailProductCharacteristicsInspect = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const bankList = useSelector(state => state.bill.bankList);
    const currencyList = useSelector(state => state.bill.currencyList);
    const paymentMethodList = useSelector(state => state.bill.paymentMethodList);
    const purchaseBillToModifyData = useSelector(state => state.bill.purchaseBillToModifyData);
    const billDetailToInspectProductCharacteristics = useSelector(state => state.bill.billDetailToInspectProductCharacteristics);
    const billProductCharacteristicListFiltered = useSelector(state => state.bill.billProductCharacteristicListFiltered);

    const onFetchBillProductCharacteristicListFiltered = useCallback((id) => dispatch(actions.fetchBillProductCharacteristicListFiltered(id)), [dispatch,]);

    useEffect(() => {
        if (billDetailToInspectProductCharacteristics) {
            onFetchBillProductCharacteristicListFiltered(billDetailToInspectProductCharacteristics.id);
        }
    }, [billDetailToInspectProductCharacteristics,])

    console.log("HAY: ", billProductCharacteristicListFiltered);

    return (
        <div className={styles.root}>
            {
                billDetailToInspectProductCharacteristics ?
                <Card >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TableContainer component={styles.tableContainer}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={styles.tableHeaderCell}>
                                                <Typography >
                                                     Características del Producto - {billDetailToInspectProductCharacteristics.product.product.title}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                (billProductCharacteristicListFiltered !== []) ?
                                billProductCharacteristicListFiltered.map(index => {
                                    index.characteristic_sel.map(index1 => {
                                        return <Chip key={index.id} variant="outlined" size="small" label={index.name + " - " + index.value} />
                                    }
                                    )
                                })
                                : null
                            }
                        </Grid>
                    </Grid>
                </Card>
                : null
            }
        </div>
    );
};

export default PurchaseBillDetailProductCharacteristicsInspect;