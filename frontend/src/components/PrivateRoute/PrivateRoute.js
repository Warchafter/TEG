import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, props, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    // const userRoles = useSelector(state => state.auth.user.roles);

    return (
        <Route
            {...rest}
            render=
            {
                !isAuthenticated
                    ? (<Redirect to='/' />)
                    : (<Component {...props} />)
            }
        />
    );
};

export default PrivateRoute;