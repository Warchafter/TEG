import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
} from '@material-ui/core';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "#FFFFFFF",
        padding: "0 20px",
        height: '80%'
    },
    logo: {
        height: "80%",
        flexGrow: 1,
    },
    "@media (max-width: 499px)": {
        desktopOnly: {
            display: "none",
        }
    }
}));

const ToolbarCustom = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <DrawerToggle clicked={props.drawerToggleClicked} />
                    <div className={classes.logo} >
                        <Logo />
                    </div>
                    <nav className={classes.desktopOnly}>
                        <NavigationItems isAuthenticated={props.isAuth} />
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default ToolbarCustom;