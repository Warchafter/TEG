import React from 'react';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Card,
} from '@material-ui/core';

import MainOptions from '../../components/UserProfile/MainOptions.js';
import SecondaryOptions from '../../components/UserProfile/SecondaryOptions';
import MainContent from '../../components/UserProfile/MainContent';
import Notifier from '../../components/Notifier/Notifier';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
            '& > *': {
        margin: theme.spacing(1),
        },
    },
    card: {
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        padding: '10px'
    },
    mainOptions: {
        margin: theme.spacing(1),
    }
}));

const UserProfile = () => {
    const styles = useStyles();


    // A Interface store has to be created in order to keep track of whichever options we're choosing.
    // An action has to be dispatch, storing both the component that need to be rendered, and the title of said component
    // This could be done using the routes.js method that is currently being use to dinamically render based on url path
    // It could store the following data: [header, component]
    // in the options button group, there needs to be a conditional one belonging to rif activation

    return (
        <div className={styles.root}>
            <Notifier />
            <Grid container spacing={3} >
                <Grid item xs={3}>
                    <Grid container spacing={3} direction='column' >
                        <Grid item xs={12}>
                                <Card className={styles.card}>
                                    <MainOptions className={styles.mainOptions}/>
                                </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className={styles.card}>
                                <SecondaryOptions />
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Grid item xs={12}>
                        <Card className={styles.card}>
                            <MainContent />
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};

export default UserProfile;