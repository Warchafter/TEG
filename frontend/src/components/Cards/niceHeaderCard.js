import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

// import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
// import DollarSignMessageIcon from '../SVG-Components/DollarSignMessageIcon';
import NotPayedIcon from '../SVG-Components/NotPayedIcon';
import PartialPaymentIcon from '../SVG-Components/PartialPaymentIcon';
import FullPaymentIcon from '../SVG-Components/FullPaymentIcon';

const useStyles = makeStyles(({ spacing, palette, theme }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
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
            // background: 'linear-gradient(135deg, #9c2848 0%, #6e122b 100%) !important',
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
            fontFamily: family,
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
            textAlign: 'center',
            fontFamily: family,
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
            lineHeight: .01,
            marginLeft: '15px',
            color: '#000',
            position: 'absolute',
            right: '-5px',
            top: '10px',
            opacity: '0.1895',
            fontSize: '110px',
            width: '110px',
            height: '50px',
            textShadow: '3px 7px rgb(0 0 0 / 30%)',
            WebkitBoxDirection: 'normal',
            wordWrap: 'break-word',
            display: 'block',
        },
        cardTextTest: {
            // paddingTop: 100
        }
    }
});

const NiceHeaderCard = (props) => {
    const styles = useStyles();

    const [linColor1, setLinColor1] = React.useState("gray");
    const [linColor2, setLinColor2] = React.useState("white");
    const [icon, setIcon] = React.useState(null);

    const onColorHandler = (color1, color2, icon) => {
        setLinColor1(color1);
        setLinColor2(color2);
        setIcon(icon);
    };

    useEffect(() => {
        switch (props.type) {
            case "Por Pagar":
                onColorHandler("#6e122b", "#9c2848", <NotPayedIcon />)
                break;
            case "Pago Parcial":
                onColorHandler("#d1b775", "#f7f763", <PartialPaymentIcon />)
                break;
            case "Pago Completo":
                onColorHandler("#437d47", "#47b54e", <FullPaymentIcon />)
                break;
            default:
                return onColorHandler("gray", "white")
        };
    }, [props.type,])

    return (
        <React.Fragment>
            <div >
                <div className={styles.card}
                    style={{
                            background: `linear-gradient(135deg, ${linColor1} 0%, ${linColor2} 100%)`,
                        }}
                    >
                    <div className={styles.cardIcon}>
                        {icon}
                    </div>
                    <div >
                        <h4 className={styles.cardTitle}>{props.title}</h4>
                            <div>
                                <p className={styles.cardContentText}>Hay X facturas por pagar</p>
                            </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
};

export default NiceHeaderCard;