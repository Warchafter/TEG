import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import Notifier from '../../components/Notifier/Notifier';

import UserProfileValidatedList from '../../components/UserProfile/UserProfileValidationList/UserProfileValidatedList';
import UserProfileValidatedRifMedia from '../../components/UserProfile/UserProfileValidationList/UserProfileValidatedRifMedia';


const useStyles = makeStyles(({ spacing, palette, theme }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            flex: 1,
        },
    }
});

const UserProfileValidatedUsers = (props) => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const rifValidatedUserToInspect = useSelector(state => state.userProfile.rifValidatedUserToInspect);

    const selectedUser = (rifValidatedUserToInspect) => {
        if (rifValidatedUserToInspect) {
            return <UserProfileValidatedRifMedia />
        } else {
            return null;
        }
    };

    return (
        <div className={styles.root}>
            <Notifier />
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <UserProfileValidatedList />
                    </Grid>
                    <Grid item xs={8}>
                        {selectedUser(rifValidatedUserToInspect)}
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
        </div>
    );
};

export default UserProfileValidatedUsers;