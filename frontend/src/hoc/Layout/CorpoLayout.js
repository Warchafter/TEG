import React from "react";
import { Container, Row, Col } from "shards-react";

import MainNavbar from '../../components/Layout/MainNavBar/MainNavbar';
import MainSidebar from '../../components/Layout/MainSidebar/MainSidebar';
import MainFooter from "../../components/Layout/MainFooter";

const CorpoLayout = ({ children, noNavbar, noFooter }) => (
    <Container fluid>
        <Row>
            <MainSidebar />
            <Col
                className="main-content p-0"
                lg={{ size: 10, offset: 2 }}
                md={{ size: 9, offset: 3 }}
                sm="12"
                tag="main"
            >
                {!noNavbar && <MainNavbar />}
                {children}
                {!noFooter && <MainFooter />}
            </Col>
        </Row>
    </Container>
);

CorpoLayout.defaultProps = {
    noNavbar: false,
    noFooter: false
};

export default CorpoLayout;