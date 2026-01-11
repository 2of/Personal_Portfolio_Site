import React, { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastMenuProvider = ({ children }) => {
    const [toastState, setToastState] = useState({
        open: false,
        title: "",
        content: null,
    });

    const showToast = (options = {}) => {
        console.log('toast test')
        setToastState({
            open: true,
            title: options.title || "",
            content: options.text || null,
        });
    };

    const hideToast = useCallback(() => {
        setToastState(prev => ({
            ...prev,
            open: false,
            title: "",
            content: null,
        }));
    }, []);

    return (
        <ToastContext.Provider
            value={{
                toastState,
                showToast,
                hideToast,
                toastVisible: toastState.open,
            }}
        >
            {children}
        </ToastContext.Provider>
    );
};
