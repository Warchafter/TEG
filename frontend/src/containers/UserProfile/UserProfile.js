import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions/index';

const UserProfile = () => {
    const dispatch = useDispatch();

    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const userProfileDetail = useSelector(state => state.userProfile.userProfileDetail);

    const onFetchUserProfileDetail = useCallback((user) => dispatch(actions.fetchUserProfileDetail(user)), [dispatch]);

    const fetchUserProfileDetail = useCallback((isAuthenticated, user) => {
        if (true) {
            onFetchUserProfileDetail(user);
        } else {
            return null
        }
    }, [onFetchUserProfileDetail]);

    useEffect(() => {
        fetchUserProfileDetail(user.id);
    }, [fetchUserProfileDetail, user.id])

    const showUserProfileData = () => {
        console.log(userProfileDetail);
    }

    return (
        <div>
            <button onClick={showUserProfileData}>log user profile data</button>
            {/* <p>{JSON.stringify()}</p> */}
        </div>
    )
};

export default UserProfile;