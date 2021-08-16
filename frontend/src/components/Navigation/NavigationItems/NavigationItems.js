import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';
import { withStyles, makeStyles, alpha } from '@material-ui/core/styles';

import NavigationItem from './NavigationItem/NavigationItem';
// import * as actions from '../../../store/actions/index';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const useStyles = makeStyles(theme => ({
    NavigationItems: {
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        height: "100%"
    },
    title: {
        flexGrow: 1,
        alignItems: 'center',
        display: 'flex',
        textDecoration: 'none',
    },
    image: {
        marginRight: '10px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    "@media (min-width: 500px)": {
        NavigationItems: {
            flexFlow: "row"
        }
    },
}));

const NavigationItems = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();

    const isCorpo = useSelector(state => state.corpo.isCorpo);

    // const dispatch = useDispatch();

    // const onToggleCorpoView = useCallback(() => dispatch(actions.toggleCorpoView()), [dispatch,]);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (url) => {
        setAnchorEl(null);
        url && props.history.push(url);
    };

    // const handleViewChange = (event) => {
    //     onToggleCorpoView();
    // };

    return (
        <ul className={classes.NavigationItems}>
            {!isCorpo
                ?
                <React.Fragment>
                    <NavigationItem link="/" exact>Inicio</NavigationItem>
                    <NavigationItem link="/products" exact>Products</NavigationItem>
                    <NavigationItem link="/billtesting" exact>Bill Testing</NavigationItem>
                    {/* <Button onClick={handleViewChange}>
                        <NavigationItem link="/" exact>Corpo View</NavigationItem>
                    </Button> */}
                    <div className={classes.grow} />
                    {/* <div className={classes.button}>
                        <IconButton aria-label="Mostrar items del carrito" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div> */}
                </React.Fragment>
                :
                null
            }
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <StyledMenu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    keppMounted
                    open={open}
                    onClose={handleClose}
                >
                    {!props.isAuthenticated ?
                        <MenuItem onClick={() => handleClose("/auth")}>Iniciar Sesión</MenuItem> :
                        <MenuItem onClick={() => handleClose("/logout")} >Cerrar Sesión</MenuItem>}
                </StyledMenu>
            </div>
        </ul>
    );
};

export default withRouter(NavigationItems);