import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    list: {
        boxShadow: '0 8px 16px 0 #BDC9D7',
        width: '100%',
        maxWidth: 225,
        color: 'white',
        backgroundColor: 'gray',
        overflow: 'hidden',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    listHeader: {
        width: '100%',
        fontSize: '.75rem',
        maxWidth: 225,
        maxHeight: 100,
        color: 'white',
        backgroundColor: 'gray',
        overflow: 'hidden',

    },
    listSubheader: {
        width: '100%',
        fontSize: '.75rem',
        maxWidth: 225,
        maxHeight: 100,
        backgroundColor: 'gray',
        color: 'whitesmoke',
        overflow: 'hidden',
    },
    listItem: {
        color: 'gray',
        width: '100%',
        fontSize: 'small',
        // fontSize: '.55rem',
        maxWidth: 255,
        maxHeight: 100,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(4)
    },
    // listSubheader: {
    //     backgroundColor: 'gray',
    //     color: 'whitesmoke'
    // },
    nestedListItem: {
        color: 'gray',
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 255,
        maxHeight: 100,
        // paddingLeft: theme.spacing(4),
        // paddingTop: theme.spacing(4)
    },
}));

export default function NestedList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader className={classes.listHeader} component="div" id="nested-list-subheader">
                        Nested List Items
                    </ListSubheader>
                }
                className={classes.list}
            >
                <ListItem button className={classes.listItem}>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Verificaciones" />
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Facturas" />
                </ListItem>
                <ListItem button onClick={handleClick} className={classes.listItem}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Facturas" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nestedListItem}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
            {/* <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader className={classes.listSubheader} component="div" id="nested-list-subheader">
                        Nested List Items
                    </ListSubheader>
                }
                className={classes.root}
            ></List> */}
        </div>
    );
}