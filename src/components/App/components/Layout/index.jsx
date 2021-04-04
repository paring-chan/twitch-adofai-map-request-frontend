import React from 'react';
import AppLayoutHeader from "./Header";

/**
 * @type {React.FC}
 */
const AppLayout = ({children}) => {
    return (
        <div style={{
            height: '100vh'
        }} className="d-flex flex-column">
            <AppLayoutHeader/>
            {children}
        </div>
    );
};

export default AppLayout;