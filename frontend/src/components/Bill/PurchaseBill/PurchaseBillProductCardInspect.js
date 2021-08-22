import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    Card,
    Fade,
    Grid,
    IconButton,
    Item,
    Modal,
    Tooltip
} from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ProductCharacteristicNewForm from '../ProductCharacteristic/ProductCharacteristicNewForm';


const StyledTooltip = withStyles({
    tooltip: {
        marginTop: '0.2rem',
        backgroundColor: 'rgba(0,0,0,0.72)',
        color: '#fff',
    },
})(Tooltip);


const useStyles = makeStyles(({ spacing, palette, theme }) => {
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
    }
});

const BillDetailProductCardInspect = (props) => {
    const styles = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(props.data)

    return (
        <div className={styles.root}>
            <Card className={styles.productCard}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <p>{props.number + 1}</p>
                    </Grid>
                    <Grid item xs={3}>
                        <p>{props.data.product.product.title}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p>{props.data.product.supplier.name} - {props.data.product.supplier.rif}</p>
                    </Grid>
                    <Grid item xs={3}>
                        {}
                    </Grid>
                    <Grid item xs={2}>
                        <p>Cantidad: {props.data.quantity}</p>
                    </Grid>
                    <Grid item xs={1}>
                        {/* <Item position={'right'} mr={-0.5} onClick={() => onSetPurchaseBillToModifyPayment(row)} >
                            <StyledTooltip title={'Ver Detalle'}>
                                <IconButton>
                                    <AccountTreeIcon fontSize="large" />
                                </IconButton>
                            </StyledTooltip>
                        </Item> */}
                        <button type="button" onClick={handleOpen}>
                            react-transition-group
                        </button>
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
                                    <ProductCharacteristicNewForm data={props.data}/>
                                </Card>
                            </Fade>
                        </Modal>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default BillDetailProductCardInspect;