import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Slider from '@material-ui/core/Slider';
import DescriptionIcon from '@material-ui/icons/Description';
import CallMade from '@material-ui/icons/CallMade';

import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';


import { Typography } from '@material-ui/core';

import { Item } from '@mui-treasury/components/flex';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { stringLongDateHandler } from '../../../shared/utility';

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
            display: 'flex'
        },
        card: {
            display: 'flex',
            padding: spacing(2),
            minWidth: 180,
            border: '2px solid',
            borderRadius: 12,
            borderColor: '#FFF',
            boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
            '& > *:nth-child(1)': {
                marginRight: spacing(2),
            },
            '& > *:nth-child(2)': {
                flex: 'auto',
            },
            transition: '0.4s',
            '&:hover': {
                borderColor: '#5B9FED',
            },
        },
        avatar: {},
        heading: {
            fontFamily: family,
            fontSize: 16,
            marginBottom: 0,
        },
        subheader: {
            fontFamily: family,
            fontSize: 14,
            color: palette.grey[600],
            letterSpacing: '1px',
            marginBottom: 4,
        },
        value: {
            marginLeft: 8,
            fontSize: 14,
            color: palette.grey[500],
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
        idTag: {
            textAlign: 'center',
        }
    };
});

const useSliderStyles = makeStyles((theme) => ({
    root: {
        height: 4,
    },
    rail: {
        borderRadius: 10,
        height: 4,
        backgroundColor: 'rgb(202,211,216)',
    },
    track: {
        borderRadius: 10,
        height: 4,
        backgroundColor: 'rgb(117,156,250)',
    },
    thumb: {
        display: 'none',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const KanbanCardDemo = (props) => {
    const dispatch = useDispatch();
    const styles = useStyles();
    const history = useHistory();
    const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20 });
    const sliderStyles = useSliderStyles();

    const onSetPurchaseBillToApprovePayment = useCallback((data) => dispatch(actions.setPurchaseBillToApprovePayment(data)), [dispatch]);

    const [sliderState, setSliderState] = useState(0);

    const SliderStateHandler = (value) => {
        switch (value) {
            case 1:
                setSliderState(30);
                break;
            case 2:
                setSliderState(60);
                break;
            case 3:
                setSliderState(100);
                break;
            default:
                break;
        };
    };

    useEffect(() => {
        SliderStateHandler(props.data.payment_status.id);
    }, [props.data,]);

    const SelectedDetailHandler = (url) => {
        onSetPurchaseBillToApprovePayment(props.data);
        history.push(url)
    }

    // const [open, setOpen] = useState(false);

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <Card className={cx(styles.card)} elevation={0}>
            <Box alignItems="center">
                <Grid
                    spacing={1}
                    direction="column"
                    className={styles.root}
                    container
                >
                    <Grid item={1}>
                        <Tooltip title="Abrir Detalle">
                            <IconButton aria-label="open">
                                <DescriptionIcon
                                    onClick={(props) => SelectedDetailHandler(props.data.id)}
                                    color="primary"
                                    style={{ fontSize: 30 }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item={1} className={styles.idTag}>
                        <Typography
                            className={styles.status}
                        >{props.data.id}</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <h3 className={styles.heading}>{props.data.employee_in_charge.name}</h3>
                <p className={styles.subheader}>{props.data.payment_method.name}</p>
                <p className={styles.subheader}>Fecha pago:{stringLongDateHandler(props.data.purchase_payment_date)}</p>
                <Box display={'flex'} alignItems={'center'}>
                    <Slider classes={sliderStyles} defaultValue={0} value={sliderState} />
                    <span className={styles.value}>{props.data.payment_status.id}/3</span>
                </Box>
            </Box>
            <Item position={'right'} mr={-0.5} onClick={() => SelectedDetailHandler('/bill-payment-detail-approval')} >
                <StyledTooltip title={'Ver Pago'}>
                    <IconButton classes={iconBtnStyles}>
                        <CallMade />
                    </IconButton>
                </StyledTooltip>
            </Item>
        </Card>
    );
};

export default KanbanCardDemo;