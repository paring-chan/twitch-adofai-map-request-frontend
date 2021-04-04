import React from 'react';
import {Navbar} from "react-bootstrap";

const AppLayoutHeader = () => {
    return (
        <Navbar bg="primary">
            <Navbar.Brand className="text-white">
                얼불춤 맵추천
            </Navbar.Brand>
        </Navbar>
    );
};

export default AppLayoutHeader;