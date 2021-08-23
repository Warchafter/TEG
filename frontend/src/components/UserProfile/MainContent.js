import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
} from '@material-ui/core';

import * as actions from '../../store/actions/index';
import UserProfileClient from './MainContent/UserProfileClient';
import UserProfileClientModify from './MainContent/UserProfileClientModify';
import UserProfileStaff from './MainContent/UserProfileStaff';
import UserProfileUploadRIF from './MainContent/UserProfileUploadRIF';

const useStyles = makeStyles(({ spacing, palette }) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        title: {
            color: '#4f5d73',
            fontFamily: family,
            paddingLeft: '10px',
        }
    }
});

const MainContent = (props) => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const isStaff = useSelector(state => state.userProfile.userProfileDetail.is_staff)
    const userProfileSelectedOption = useSelector(state => state.interface.userProfileSelectedOption);

    const onFetchUserProfileDetail = useCallback((user) => dispatch(actions.fetchUserProfileDetail(user)), [dispatch]);

    useEffect(() => {
            onFetchUserProfileDetail();
    }, []);

    const dynamicMainContent = (userProfileSelectedOption) => {
        switch (userProfileSelectedOption) {
            case "Perfil de Usuario":
                if (!isStaff) {
                    return (<UserProfileClient />)
                } else {
                    return (<UserProfileStaff />)
                }
            case "Modificar Perfil":
                    return(<UserProfileClientModify />)
            case "Subir RIF":
                // if(isStaff)
                return(<UserProfileUploadRIF />)
            default:
                if (!isStaff) {
                    return (<UserProfileClient />)
                } else {
                    return (<UserProfileStaff />)
                }
        };
    }

    return (
        <div>
            <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <h1 className={styles.title}>{userProfileSelectedOption}</h1>
                    </Grid>
                    <Grid item xs={12}>
                        {dynamicMainContent(userProfileSelectedOption)}
                        {/* <UserProfileClient /> */}
                    </Grid>
            </Grid>
        </div>
    );
};

export default MainContent;