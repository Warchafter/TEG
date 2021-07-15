import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, props, ...rest }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isLoading = useSelector(state => state.auth.loading);

    // const userRoles = useSelector(state => state.auth.user.roles);

    return (
        isLoading
            ?
            null
            :
            <Route
                {...rest}
                render=
                {
                    props => !isAuthenticated
                        ? (<Redirect to='/Auth' />)
                        : (<Component {...props} />)
                }
            />
    );
};

export default PrivateRoute;