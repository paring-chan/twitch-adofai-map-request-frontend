import React from 'react';
import AppLayoutHeader from "./Header";

/**
 * @type {React.FC}
 */
const AppLayout = ({children}) => {
    return (
        <div>
            <AppLayoutHeader/>
            {children}
        </div>
    );
};

export default AppLayout;