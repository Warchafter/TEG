import React, { useEffect, Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as actions from './store/actions/index';
import { withStyles } from '@material-ui/core/styles';
import routes from './routes';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import 'react-image-lightbox/style.css';
import './scss/style.scss'


const styles = {
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        },
        'body': {
            margin: 0,
            height: '100%',
            backgroundColor: 'rgb(0,0,0)',
            fontFamily: 'sans-serif',
            overflowX: 'hidden',
        },
        'h1, h2': {
            margin: 0
        },
        'ul': {
            padding: 0,
            listStyle: 'none'
        },
        'App': {
            display: 'flex',
            alignItems: 'center',
            height: '100vh',
            overflow: 'hidden',
            margin: 0,
            fontFamily: 'system-ui'
        }
    }
};

const App = props => {
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.auth.loading);

    const onTryAutoSignup = useCallback(() => dispatch(actions.authCheckState()), [dispatch])

    useEffect(() => {
        onTryAutoSignup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {isLoading
                ?
                null
                :
                <Suspense fallback={<p>Loading...</p>}>
                    <Router>
                        {routes.map((route, index) => {
                            if (route.isPrivate) {
                                return (
                                    <PrivateRoute
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={(props => {
                                            return (
                                                <route.layout {...props}>
                                                    <route.component {...props} />
                                                </route.layout>
                                            );
                                        })}
                                    />
                                )
                            } else {
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={(props => {
                                            return (
                                                <route.layout {...props}>
                                                    <route.component {...props} />
                                                </route.layout>
                                            )
                                        })}
                                    />
                                );
                            }
                        })}
                    </Router>
                </Suspense>
            }
        </div>
    );
};

export default withStyles(styles)(App);