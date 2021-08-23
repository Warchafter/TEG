import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import * as actions from '../../store/actions/index';
import Notifier from '../../components/Notifier/Notifier';

import UserProfileValidationList from '../../components/UserProfile/UserProfileValidationList/UserProfileValidationList';
import UserProfileValidationRifMedia from '../../components/UserProfile/UserProfileValidationList/UserProfileValidationRifMedia';


const useStyles = makeStyles(({ spacing, palette, theme }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        root: {
            flex: 1,
        },
    }
});

const UserProfileNonValidatedUsers = (props) => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const nonRifValidatedUserToInspect = useSelector(state => state.userProfile.nonRifValidatedUserToInspect);

    const selectedUser = (nonRifValidatedUserToInspect) => {
        if (nonRifValidatedUserToInspect) {
            return <UserProfileValidationRifMedia />
        } else {
            return null;
        }
    };

    return (
        <div className={styles.root}>
            <Notifier />
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <UserProfileValidationList />
                    </Grid>
                    <Grid item xs={8}>
                        {selectedUser(nonRifValidatedUserToInspect)}
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
        </div>
    );
};

export default UserProfileNonValidatedUsers;