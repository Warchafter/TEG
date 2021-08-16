import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Card,
} from '@material-ui/core';

import * as actions from '../../store/actions/index';
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
    const dispatch = useDispatch();
    const styles = useStyles();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);

    // const onFetchUserProfileDetail = useCallback((user) => dispatch(actions.fetchUserProfileDetail(user)), [dispatch]);

    // const fetchUserProfileDetail = useCallback((isAuthenticated, user) => {
    //     if (true) {
    //         onFetchUserProfileDetail(user);
    //     } else {
    //         return null
    //     }
    // }, [onFetchUserProfileDetail]);

    // useEffect(() => {
    //     fetchUserProfileDetail(user.id);
    // }, [fetchUserProfileDetail, user.id])

    const showUserProfileData = () => {
        console.log(userProfileDetail);
    }

    // A Interface store has to be created in order to keep track of whichever options we're choosing.
    // An action has to be dispatch, storing both the component that need to be rendered, and the title of said component
    // This could be done using the routes.js method that is currently being use to dinamically render based on url path
    // It could store the following data: [header, component]
    // in the options button group, there needs to be a conditional one belonging to rif activation

    return (
        <div className={styles.root}>
            <Notifier />
            <Grid container spacing={3} >
                {/* <Box style={{background: 'darkgreen'}}>
                    <p>Big container</p>
                </Box> */}
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
            {/* <button onClick={showUserProfileData}>log user profile data</button> */}
        </div>
    )
};

export default UserProfile;