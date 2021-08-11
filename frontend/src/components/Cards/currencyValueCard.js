import React, { useCallback, useSelector, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Typography,
    Grid,
    Avatar
} from '@material-ui/core';
import * as actions from '../../store/actions/index';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DollarSignMessageIcon from '../SVG-Components/DollarSignMessageIcon';

const useStyles = makeStyles(({ spacing, palette, theme }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            display: 'flex',
            borderRadius: '10px',
            border: 'none',
            position: 'relative',
            marginBottom: '30px',
            boxShadow: '0 0.46875rem 2.1875rem rgb(90 97 105 / 10%), 0 0.9375rem 1.40625rem rgb(90 97 105 / 10%), 0 0.25rem 0.53125rem rgb(90 97 105 / 12%), 0 0.125rem 0.1875rem rgb(90 97 105 / 10%)'
        },
        card: {
            display: 'flex',
            passing: spacing(2),
            border: '2px solid',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important',
            borderColor: '#FFF',
            boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
            color: '#fff'
        },
        cardIcon: {
            textAlign: 'center',
            lineHeight: '50px',
            marginLeft: '15px',
            color: '#000',
            position: 'absolute',
            right: '-5px',
            top: '20px',
            opacity: '0.1',
            fontSize: '110px',
            width: '110px',
            height: '50px',
            textShadow: '3px 7px rgb(0 0 0 / 30%)',
        }
        // avatar: {
        //     green: {
        //         color: '#fff',
        //         backgroundColor: 'green',
        //     },
        // },
        // icon: {
        //     alignSelf: 'center'
        // },
        // heading: {
        //     fontFamily: family,
        //     fonstSize: 16,
        //     marginBottom: 0,
        // },
        // subheader: {
        //     fontFamily: family,
        //     fontSize: 14,
        //     color: palette.grey[600],
        //     letterSpacing: '1px',
        //     marginBottom: 4,
        // },
        // value: {
        //     marginLeft: 8,
        //     fontSize: 14,
        //     color: palette.grey[500],
        // },
    }
});

const CurrencyValueCard = (props) => {
    const styles = useStyles();

    console.log(props);

    if (!props.loading && props.ExRateDataLoaded) {
        console.log('Data was loaded');
    } else {
        console.log('Data is loading');
    }

    return (
        <React.Fragment>
            <div >
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <DollarSignMessageIcon />
                    </div>
                    <div>
                        <h3>Dólar</h3>
                        {!props.loading && props.ExRateDataLoaded
                            ?
                            <div>
                                <p>Precio actual: {props.exchangeRates.USD.sicad1}</p>
                                <p>Precio anterior: {props.exchangeRates.USD.sicad2}</p>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
};

export default CurrencyValueCard;