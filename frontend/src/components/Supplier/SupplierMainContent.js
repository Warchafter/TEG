import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import {
    Grid,
} from '@material-ui/core';

import * as actions from '../../store/actions/index';
import UserProfileClient from './MainContent/UserProfileClient';

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

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userProfileSelectedOption = useSelector(state => state.interface.userProfileSelectedOption);
    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);

    const onFetchUserProfileDetail = useCallback((user) => dispatch(actions.fetchUserProfileDetail(user)), [dispatch]);

    useEffect(() => {
        if (isAuthenticated && userProfileDetail) {
            onFetchUserProfileDetail();
        };
    }, []);

    // const dynamicMainContent = (userProfileSelectedOption) => {
    //     switch (userProfileSelectedOption) {
    //         case "Perfil de Usuario":
    //             if (isStaff) {
    //                 return (<UserProfileClient />)
    //             } else {
    //                 return (<UserProfileStaff />)
    //             }
    //         case "Modificar Perfil":
    //             // if (isStaff)
    //             return(<UserProfileClientModify />)
    //         case "Subir RIF":
    //             // if(isStaff)
    //             return(<UserProfileUploadRIF />)
    //         case "Verificar RIF":
    //             // if (isStaff)
    //             return(<p>Something 2</p>)
    //         default: return <p>Something 3</p>
    //     };
    // }

    return (
        <div>
            <Grid container spacing={1} >
                <Grid item xs={12}>
                    <h1 className={styles.title}>{userProfileSelectedOption}</h1>
                </Grid>
                <Grid item xs={12}>
                    {/* {dynamicMainContent(userProfileSelectedOption)} */}
                </Grid>
            </Grid>
        </div>
    );
};

export default MainContent;