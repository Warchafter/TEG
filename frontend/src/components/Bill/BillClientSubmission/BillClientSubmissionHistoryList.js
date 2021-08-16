import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Card,
    Grid,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    TablePagination,
    IconButton,
    Tooltip,
    Typography
} from '@material-ui/core';
import { Item } from '@mui-treasury/components/flex';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import PageviewIcon from '@material-ui/icons/Pageview';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

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
        flexGrow: 1,
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
}))


const BillClientSubmissionForm = () => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });

    const billClientSubmissionListCount = useSelector(state => state.bill.billClientSubmissionListCount);
    const billClientSubmissionList = useSelector(state => state.bill.billClientSubmissionList);
    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onFetchBillClientSubmissionList = useCallback(() => dispatch(actions.fetchBillClientSubmissionList()), [dispatch]);
    const onSetSelectedBillClientSubmission = useCallback((data) => dispatch(actions.setSelectedBillClientSubmission(data)), [dispatch]);

    useEffect(() => {
        onFetchBillClientSubmissionList();
    }, [])

    const canAddPuchaseBill = (row) => {
        if (userProfileDetail.roles === 'user') {
            return null;
        } else {
            return  (
                <Item position={'right'} mr={-0.5} onClick={() => onSetSelectedBillClientSubmission(row)} >
                    <StyledTooltip title={'Ver Detalle'}>
                        <IconButton classes={iconBtnStyles}>
                            <NoteAddIcon />
                        </IconButton>
                    </StyledTooltip>
                </Item>
            )
        }
    }

    // const addPurchaseBillHandler = (row) => {
    //     onSetSelectedBillClientSubmission(row);
    //     onSet
    // }

    return (
        <div className={styles.root}>
            {
                !billClientSubmissionList
                    ? <CSpinner color="primary" />
                    :
                    <Grid container>
                        <Card >
                            <Grid item xs={12}>
                                <TableContainer component={styles.tableContainer}>
                                <Table className={styles.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={styles.tableHeaderCell}>ID</TableCell>
                                            <TableCell className={styles.tableHeaderCell}>Detalle</TableCell>
                                            <TableCell className={styles.tableHeaderCell}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {billClientSubmissionList.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>
                                                    <Typography
                                                        className={styles.status}
                                                    ># {row.id}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography className={styles.name}>A nombre de:</Typography>
                                                    <Typography className={styles.subName}>{row.bill_name_receiver}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Item position={'right'} mr={-0.5} onClick={() => onSetSelectedBillClientSubmission(row)} >
                                                        <StyledTooltip title={'Ver Detalle'}>
                                                            <IconButton classes={iconBtnStyles}>
                                                                <PageviewIcon />
                                                            </IconButton>
                                                        </StyledTooltip>
                                                    </Item>
                                                    {canAddPuchaseBill(row)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <TableFooter>
                                    <TablePagination
                                        labelRowsPerPage='Registros por página'
                                        rowsPerPageOptions={[5, 10, 15]}
                                        component="div"
                                        count={billClientSubmissionListCount}
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

export default BillClientSubmissionForm;