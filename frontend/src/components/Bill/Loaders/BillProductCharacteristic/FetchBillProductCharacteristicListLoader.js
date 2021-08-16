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
    TablePagination,
    TableFooter,
    Typography,
    Chip,
    Grid,
    CardMedia,
    CardActionArea,
} from '@material-ui/core';
import * as actions from '../../../../store/actions/index';
import Lightbox from 'react-image-lightbox';


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
}))

const FetchBillProductCharacteristicListLoader = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const billProductCharacteristicList = useSelector(state => state.bill.billProductCharacteristicList);
    const billProductCharacteristicListCount = useSelector(state => state.bill.billProductCharacteristicListCount);

    const onFetchBillProductCharacteristicList = useCallback(() => dispatch(actions.fetchBillProductCharacteristicList()), [dispatch]);

    useEffect(() => {
        onFetchBillProductCharacteristicList();
    }, [onFetchBillProductCharacteristicList]);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [imageList, setImageList] = React.useState([]);
    const [photoIndex, setPhotoIndex] = React.useState(0);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const billPaymentDetailListImageHandler = () => {
        // eslint-disable-next-line array-callback-return
        billProductCharacteristicList.map(index => {
            setImageList(prevArray => [...prevArray, index.product_image]);
        });
    };

    const openHandler = () => {
        billPaymentDetailListImageHandler();
        setIsOpen(true);
    };


    return (
        <div>

            <TableContainer component={classes.tableContainer}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>ID</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Nº Detalle</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Nº Factura</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Info Producto</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Cantidad del Producto</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Info Proveedor</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Info Producto Proveedor</TableCell>
                            <TableCell className={classes.tableHeaderCell}>Características del Producto</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billProductCharacteristicList.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Typography className={classes.status}>
                                        {row.id}
                                    </Typography>
                                </TableCell>
                                <TableCell >{row.bill_detail.id}</TableCell>
                                <TableCell >{row.bill_detail.purchase_bill.id}</TableCell>
                                <TableCell >
                                    <Grid container>
                                        <Grid item xs={7}>
                                            <Typography className={classes.name}>{row.bill_detail.product.product.title}</Typography>
                                            <Typography color="textSecondary" variant="body2">{row.bill_detail.product.product.description}</Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <CardActionArea className={classes.cardMedia} onClick={openHandler}>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={row.bill_detail.product.product.product_image}
                                                    title="Evidencia de Pago"
                                                />
                                            </CardActionArea>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {row.bill_detail.quantity}
                                    </Typography>
                                </TableCell>
                                <TableCell >
                                    <Typography className={classes.name}>{row.bill_detail.product.supplier.name}</Typography>
                                    <Typography color="textSecondary" variant="body2">{row.bill_detail.product.supplier.rif}</Typography>
                                    <Typography color="textSecondary" variant="body2">{row.bill_detail.product.supplier.address}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {row.bill_detail.product.price}
                                    </Typography>
                                    <Typography>
                                        {row.bill_detail.product.stock}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {row.characteristic_sel.map((char) => (
                                        <Chip size="small" label={char.name} color="primary" />
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={billProductCharacteristicListCount}
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
        </div>
    );
};

export default FetchBillProductCharacteristicListLoader;