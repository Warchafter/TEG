import React, { useState } from 'react';
import { connect } from 'react-redux';


const Layout = props => {
    return (
        <React.Fragment>
            <main>{props.children}</main>
        </React.Fragment>
    )
}

export default Layout;