import React from 'react';
import { useSelector } from 'react-redux';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index';

const DefaultLayout = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <div>
            {!isAuthenticated ? null : <AppSidebar />}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                {!isAuthenticated ? null : <AppHeader />}
                <div className="body flex-grow-1 px-3">
                    <AppContent {...props} />
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default DefaultLayout;