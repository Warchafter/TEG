import React, { useState, useCallback, useEffect } from 'react';
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
    CardActionArea,
    CardMedia,
    IconButton,
    Button,
    Modal,
    Grid,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as actions from '../../../../store/actions/index';
import Lightbox from 'react-image-lightbox';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
    };
}

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
    margin: {
        margin: theme.spacing(1),
    },
    modalPaper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const FetchBillPaymentDetailLoader = (props) => {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    const dispatch = useDispatch();

    const billPaymentDetailList = useSelector(state => state.bill.billPaymentDetailList);
    const billPaymentDetailListCount = useSelector(state => state.bill.billPaymentDetailListCount);

    const onFetchBillPaymentDetailList = useCallback(() => dispatch(actions.fetchBillPaymentDetailList()), [dispatch]);
    const onDeleteBillPaymentDetail = useCallback((billPaymentDetailSelected) => dispatch(actions.deleteBillPaymentDetail(billPaymentDetailSelected)), [dispatch]);
    const [imageList, setImageList] = useState([]);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const [modalOpen, setModalOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);

    const billPaymentDetailListImageHandler = () => {
        // eslint-disable-next-line array-callback-return
        billPaymentDetailList.map(index => {
            setImageList(prevArray => [...prevArray, index.payment_receipt_image]);
        });
    };

    const openHandler = () => {
        billPaymentDetailListImageHandler();
        setIsOpen(true);
    };

    const onDeleteHandler = (billPaymentDetailSelected) => {
        setItemSelected(billPaymentDetailSelected);
        handleModalOpen();
    };

    const onDeleteConfirmHandler = () => {
        onDeleteBillPaymentDetail(itemSelected);
        handleModalClose();
    }

    useEffect(() => {
        onFetchBillPaymentDetailList();
    }, [onFetchBillPaymentDetailList]);

    // "id": 1,
    // "purchase_bill": 70,
    // "payment_receipt_number": 13548.0,
    // "payment_receipt_image": "http://127.0.0.1:8000/media/uploads/bill/payment_evidence/d8b2191a-926b-4028-8882-ce8730521ec3.jpg"

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.modalPaper}>
            <h2 id="simple-modal-title">Confirmación</h2>
            <p id="simple-modal-description">
                ¿Estás seguro de querer eliminar la evidencia seleccionada?
            </p>
            <Button variant="contained" color="primary" onClick={onDeleteConfirmHandler}>
                Primary
            </Button>
            <Button variant="contained" color="secondary" onClick={handleModalClose}>
                Secondary
            </Button>
        </div>
    );

    return (
        <div className={classes.root}>
            <TableContainer component={classes.tableContainer}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>ID</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Nº Factura</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Nº Recibo de Pago</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Evidencia de Pago</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billPaymentDetailList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton aria-label="edit" className={classes.margin} size="small" >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" className={classes.margin} size="small" onClick={() => onDeleteHandler(row.id)} >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        className={classes.status}
                                    >{row.id}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className={classes.name}>{row.purchase_bill.id}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Grid container >
                                        <Grid item xs={3}>
                                            <Typography color="textSecondary" variant="body2">{row.payment_receipt_number}</Typography>
                                        </Grid>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={8}>
                                            <CardActionArea className={classes.cardMedia} onClick={openHandler}>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={row.payment_receipt_image}
                                                    title="Evidencia de Pago"
                                                />
                                            </CardActionArea>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={billPaymentDetailListCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </TableContainer>
            {isOpen && (
                <Lightbox
                    mainSrc={imageList[photoIndex]}
                    nextSrc={imageList[(photoIndex + 1) % imageList.length]}
                    prevSrc={imageList[(photoIndex + imageList.length - 1) % imageList.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + imageList.length - 1) % imageList.length,)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % imageList.length,)
                    }
                />
            )}
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
};

export default FetchBillPaymentDetailLoader;