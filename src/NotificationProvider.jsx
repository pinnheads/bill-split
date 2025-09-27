import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null); // { message, type }

    // Function to show a notification. useCallback ensures the function reference is stable.
    const showNotification = useCallback((message, type = 'info') => {
        setNotification({ message, type });
    }, []);

    // Function to hide the notification
    const hideNotification = useCallback(() => {
        setNotification(null);
    }, []);

    const value = {
        notification,
        showNotification,
        hideNotification,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

