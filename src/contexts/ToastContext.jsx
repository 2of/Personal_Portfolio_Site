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
        console.log('toast test',options)
        setToastState({
            open: true,
            title: options.title || "",
            content: options.text || null,
         timeout: options.timeout !== false

        });
    };

    const hideToast = useCallback(() => {
        setToastState(prev => ({
            ...prev,
            open: false,
            title: "",
            content: null,
            timeout: true
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
