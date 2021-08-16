import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, isLoaded, props, ...rest }) => {

    // const userRoles = useSelector(state => state.auth.user.roles);

    console.log("isLoaded:", isLoaded, " | isAuthenticated: ", isAuthenticated);

    return (
        !isLoaded
            ?
            null
            :
            <Route
                {...rest}
                render=
                {
                    props => !isAuthenticated
                        ? (<Redirect to='/Auth' />)
                        // ? null
                        : (<Component {...props} />)
                }
            />
    );
};


export default PrivateRoute;