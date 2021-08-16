import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
// import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
// import DollarSignMessageIcon from '../SVG-Components/DollarSignMessageIcon';
import DollarIcon6 from '../SVG-Components/DollarIcon6.jsx';

const useStyles = makeStyles(({ spacing, palette, theme }) => {
    // const family =
    //     '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            display: 'flex',
            borderRadius: '10px',
            border: 'none',
            boxSizing: 'border-box',
            textDecoration: 'none',
            padding: 0,
            margin: 0,
            position: 'relative',
            marginBottom: '5px',
            marginTop: '5px',
            boxShadow: '0 0.46875rem 2.1875rem rgb(90 97 105 / 10%), 0 0.9375rem 1.40625rem rgb(90 97 105 / 10%), 0 0.25rem 0.53125rem rgb(90 97 105 / 12%), 0 0.125rem 0.1875rem rgb(90 97 105 / 10%)'
        },
        card: {
            display: 'flex',
            border: '2px solid',
            background: 'linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important',
            borderColor: '#FFF',
            boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
            color: '#fff',
            paddingLeft: 'inherit',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px',
            paddingBottom: '0.5em',
        },
        cardTitle: {
            marginBottom: '.55rem',
            fontSize: '1.5rem',
            lineHeight: 1.2,
            marginTop: 0,
            display: 'block',
            marginBlockStart: '.65em',
            // marginBlockEnd: '1.33em',
            marginInlineStart: '0px',
            // marginInlineEnd: '0px',
            paddingLeft: '1.5em',
        },
        cardContentText: {
            lineHeight: '28px',
            marginBlockStart: '.5em',
            marginBlockEnd: '.5em',
            marginInlineStart: '0px',
            marginInlineEnd: '0px',
            fontSize: 'large',
            paddingLeft: '3.5em',
        },
        cardIcon: {
            textAlign: 'center',
            lineHeight: 1,
            marginLeft: '15px',
            color: '#000',
            position: 'absolute',
            right: '-5px',
            top: '20px',
            opacity: '0.1895',
            fontSize: '110px',
            width: '110px',
            height: '50px',
            textShadow: '3px 7px rgb(0 0 0 / 30%)',
            WebkitBoxDirection: 'normal',
            wordWrap: 'break-word',
            display: 'block',
        }
    }
});

const CurrencyValueCard = (props) => {
    const styles = useStyles();

    return (
        <React.Fragment>
            <div >
                <div className={styles.card}>
                    <div className={styles.cardIcon}>
                        <DollarIcon6 />
                    </div>
                    <div >
                        {!props.loading && props.ExRateDataLoaded
                            ?
                            <div>
                            <h3 className={styles.cardTitle}>Tasa del Dólar</h3>
                                <p className={styles.cardContentText}>Transferencia: Bs. {Intl.NumberFormat('de-DE').format(props.exchangeRates.USD.transferencia)}</p>
                                <p className={styles.cardContentText}>Sicad: Bs. {Intl.NumberFormat('de-DE').format(props.exchangeRates.USD.sicad2)}</p>
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