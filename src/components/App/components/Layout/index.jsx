import React from 'react';
import AppLayoutHeader from "./Header";

const params = new URLSearchParams(window.location.search)
const live = params.get('live')

/**
 * @type {React.FC}
 */
const AppLayout = ({children}) => {
    return (
        <div style={{
            height: '100vh'
        }} className="d-flex flex-column">
            {!live && <AppLayoutHeader/>}
            {children}
        </div>
    );
};

export default AppLayout;