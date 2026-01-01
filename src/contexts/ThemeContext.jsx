import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useDarkMode } from "./DarkMode";
import { lightTheme, darkTheme } from "../style/Theme";

// had to rename this becacuse it conflicted iwth the injector thingie
const AppThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {
  const { darkMode } = useDarkMode();

  const activeTheme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode],
  );

  const getColor = useCallback(
   
    (token) => {
      if (!token) return null;
//  console.log("GET COLOR", token, darkMode ? "DARK " : " NOT")
      const value = activeTheme[token];
      if (value) return value;

      console.warn(`[AppThemeContext] Token "${token}" not found in theme`);
      return null;
  },
    [activeTheme],
  );

  const contextValue = useMemo(
    () => ({
      theme: activeTheme,
      getColor,
      darkMode,
    }),
    [activeTheme, getColor, darkMode],
  );

  return (
    <AppThemeContext.Provider value={contextValue}>
      {children}
    </AppThemeContext.Provider>
  );
};

// Hook for consuming theme context
export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error(
      "ahhhh useAppTheme AppThemeContext  to be used within an AppThemeProvider",
    );
  }
  return context;
};
