import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const useStyles = makeStyles(theme => ({
    Content: {
        margin: 0
    }
}));

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsvisible] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const classes = useStyles();

    const sideDrawerCloseHandler = () => {
        setSideDrawerIsvisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsvisible(!sideDrawerIsVisible);
    }

    return (
        <React.Fragment>
            <Toolbar
                isAuth={isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={isAuthenticated}
                open={sideDrawerIsVisible}
                closed={sideDrawerCloseHandler} />
            <main className={classes.Content} >{props.children}</main>
        </React.Fragment>
    )
};



export default Layout;