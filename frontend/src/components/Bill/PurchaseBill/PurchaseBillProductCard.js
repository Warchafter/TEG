import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    Card,
    Fade,
    Grid,
    IconButton,
    Modal,
    Tooltip,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Typography,
} from '@material-ui/core';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { Item } from '@mui-treasury/components/flex';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddCommentIcon from '@material-ui/icons/AddComment';
import ProductCharacteristicNewForm from '../ProductCharacteristic/ProductCharacteristicNewForm';

import * as actions from '../../../store/actions/index';

const StyledTooltip = withStyles({
    tooltip: {
        marginTop: '0.2rem',
        backgroundColor: 'rgba(0,0,0,0.72)',
        color: '#fff',
    },
})(Tooltip);


const useStyles = makeStyles(({ spacing, palette }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            flex: 1,
        },
        productCard: {
            border: '2px solid',
            borderColor: '#E7EDF3',
            borderRadius: 16,
            transition: '0.4s',
            '&:hover': {
                borderColor: '#5B9FED',
            },
            fontFamily: family,
            textAlign: 'center',
            minHeight: '50px'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        centerItems: {
            alignSelf: 'center'
        },
        optionButtons: {
            textAlign: 'end'
        },
        tableContainer: {
            borderRadius: 15,
            margin: '10px 10px',
        },
        tableHeaderCell: {
            fontWeight: 'bold',
            backgroundColor: '#3c4b64',
            color: palette.getContrastText(palette.primary.dark)
        },
        formAlign: {
            textAlign: 'center'
        },
    }
});

const BillDetailProductCard = (props) => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const [open, setOpen] = React.useState(false);
    const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });

    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);

    const onSetBillDetailToInspectProductCharacteristics = useCallback((data) => dispatch(actions.setBillDetailToInspectProductCharacteristics(data)), [dispatch]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const canModifyBillDetail = () => {
        if (userProfileDetail.roles === 'user') {
            return null;
        } else {
            return (
                <Item position={'right'} mr={-0.5} onClick={handleOpen} >
                    <StyledTooltip title={'Agregar tipo de producto'}>
                        <IconButton classes={iconBtnStyles}>
                            <AddCommentIcon />
                        </IconButton>
                    </StyledTooltip>
                </Item>
            )
        }
    }

    return (
        <div className={styles.root}>
            <Card className={styles.productCard}>
                <Grid container spacing={2}>
                    <Grid item xs={1} className={styles.centerItems}>
                        <p>{props.number + 1}</p>
                    </Grid>
                    <Grid item xs={3} className={styles.centerItems}>
                        <p>{props.data.product.product.title}</p>
                    </Grid>
                    <Grid item xs={3} className={styles.centerItems}>
                        <p>{props.data.product.supplier.name} - {props.data.product.supplier.rif}</p>
                    </Grid>
                    <Grid item xs={1} className={styles.centerItems}>
                        <p>{props.data.quantity}</p>
                    </Grid>
                    <Grid item xs={3} className={styles.centerItems}>
                        <p>{props.data.price}</p>
                    </Grid>
                    <Grid item xs={1} className={styles.optionButtons}>
                        {/* <Item position={'right'} mr={-0.5} onClick={() => onSetBillDetailToInspectProductCharacteristics(props.data)} >
                            <StyledTooltip title={'Ver detalle del producto'}>
                                <IconButton classes={iconBtnStyles}>
                                    <AccountTreeIcon />
                                </IconButton>
                            </StyledTooltip>
                        </Item> */}
                        {canModifyBillDetail()}
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={styles.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                            timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <Card>
                                    <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TableContainer component={styles.tableContainer}>
                                            <Table size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className={styles.tableHeaderCell}>
                                                            <Typography >
                                                                Caracter??sticas del Producto
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ProductCharacteristicNewForm data={props.data}/>
                                    </Grid>
                                    </Grid>
                                </Card>
                            </Fade>
                        </Modal>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default BillDetailProductCard;