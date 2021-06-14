import React from 'react';
import Products from './components/Products/ProductsList/ProductsList';

// Layout Types
import Layout from './hoc/Layout/Layout';

// Route Views

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

const Logout = React.lazy(() => {
    return import('./containers/Auth/Logout/Logout')
});

const Loaders = React.lazy(() => {
    return import('./containers/Products/Loaders/Loaders')
});

let routes = [
    {
        path: '/',
        exact: true,
        layout: Layout,
        component: Home,
        isPrivate: false
    },
    {
        path: "/password/reset/confirm/:uid/:token",
        layout: Layout,
        component: ResetPasswordConfirm,
        isPrivate: false
    },
    {
        path: '/activate/:uid/:token',
        layout: Layout,
        component: Activate,
        isPrivate: false
    },
    {
        path: 'reset-password',
        layout: Layout,
        component: ResetPassword,
        isPrivate: false
    },
    {
        path: '/auth',
        layout: Layout,
        component: Auth,
        isPrivate: false
    },
    {
        path: '/logout',
        layout: Layout,
        component: Logout,
        isPrivate: false
    },
    {
        path: '/products',
        layout: Layout,
        component: Products,
        isPrivate: false
    },
    {
        path: '/loaders',
        layout: Layout,
        component: Loaders,
        isPrivate: false
    }
];

export default routes;