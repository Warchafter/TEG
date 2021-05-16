import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const ToolbarCustom = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <DrawerToggle clicked={props.drawerToggleClicked} />
                    <div className={classes.logo}>
                        <Logo />
                    </div>
                    <nav className={classes.desktopOnly}>
                        <NavigationItems isAuthenticated={props.isAuth} />
                    </nav>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ToolbarCustom;