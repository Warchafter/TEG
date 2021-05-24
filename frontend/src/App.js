import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import { withStyles } from '@material-ui/core/styles';

const Home = React.lazy(() => {
    return import('./containers/Home/Home');
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

const Activate = React.lazy(() => {
    return import('./containers/Auth/Activate/Activate');
});

const ResetPassword = React.lazy(() => {
    return import('./containers/Auth/ResetPassword/ResetPassword')
});

const ResetPasswordConfirm = React.lazy(() => {
    return import('./containers/Auth/ResetPasswordConfirm/ResetPasswordConfirm')
});

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
    const { onTryAutoSignup } = props;

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);

    let routes = (
        <Switch>
            <Route path='/password/reset/confirm/:uid/:token' render={(props) => <ResetPasswordConfirm {...props} />} />
            <Route path='/activate/:uid/:token' render={(props) => <Activate {...props} />} />
            <Route path='/reset-password' render={(props) => <ResetPassword {...props} />} />
            <Route path='/auth' render={(props) => <Auth {...props} />} />
            <Route path='/' component={Home} />
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path='/password/reset/confirm/:uid/:token' render={(props) => <ResetPasswordConfirm {...props} />} />
                <Route path='/activate/:uid/:token' render={(props) => <Activate {...props} />} />
                <Route path='/reset-password' render={(props) => <ResetPassword {...props} />} />
                <Route path='/logout' component={Logout} />
                <Route path='/auth' render={(props) => <Auth {...props} />} />
                <Route path='/' component={Home} />
            </Switch>
        );
    }

    return (
        <Layout>
            <Suspense fallback={<p>Cargando...</p>}>{routes}</Suspense>
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));