import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, isAuth, isLoad, props, ...rest }) => {

    // const userRoles = useSelector(state => state.auth.user.roles);

    return (
        isLoad
            ?
            null
            :
            <Route
                {...rest}
                render=
                {
                    props => !isAuth
                        ? (<Redirect to='/Auth' />)
                        // ? null
                        : (<Component {...props} />)
                }
            />
    );
};

export default PrivateRoute;