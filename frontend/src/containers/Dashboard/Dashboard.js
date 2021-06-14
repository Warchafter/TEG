import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Grid
} from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    }
}))

const Dashboard = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={12}>

                </Grid>

            </Grid>
        </div>
    );
};

export default Dashboard;