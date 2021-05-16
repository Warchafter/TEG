import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ihLogo from '../../assets/images/logo.png';


const useStyles = makeStyles(theme => ({
    Logo: {
        padding: "8px",
        height: "100%",
        boxSizing: "border-box",
        borderRadius: "5px",
        "& img": {
            height: "50px"
        }
    }
}));


const Logo = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.Logo} >
            <img src={ihLogo} alt="IH_Insumos_Hospitalarios" />
        </div>
    );
};

export default Logo;