import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => { },
});

export const useDarkMode = () => useContext(DarkModeContext);



// okay tried to augment this to my cookies, got a stacking issue in the prociders.
// easy to fix..EASIER to tod this 
const getCookie = (name) => {
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? match[2] === "true" : null;
};

const setCookie = (name, value, days = 365) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
};



export const DarkModeProvider = ({ children }) => {
  const [fullscreentransition, setfullscreentransition] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const cookieValue = getCookie("darkMode");
    if (cookieValue !== null) return cookieValue;
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) return stored === "true";
    return (
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches || false
    );
  });

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
    setCookie("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (
        localStorage.getItem("darkMode") === null &&
        getCookie("darkMode") === null
      ) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // This function triggers the fullscreen transition
  const StartFullScreenTransition = () => {
    setfullscreentransition(true);
    console.log("StartFullScreenTransition called");
  };

  const ClearFullScreenTransition = () => {
    setfullscreentransition(false);
  };

  const FullScreenTransitionEnabled = () => {
    return fullscreentransition;
  };

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        fullscreentransition,
        StartFullScreenTransition,
        ClearFullScreenTransition,
        FullScreenTransitionEnabled,
        FullScreenTransitionEnabled,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};