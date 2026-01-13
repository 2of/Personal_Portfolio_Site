import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

// ---- cookie helpers ----
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
    // 1️⃣ cookie
    const cookieValue = getCookie("darkMode");
    if (cookieValue !== null) return cookieValue;

    // 2️⃣ localStorage
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) return stored === "true";

    // 3️⃣ OS preference
    return (
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches || false
    );
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
    setCookie("darkMode", darkMode);
  }, [darkMode]);

  // OS sync ONLY if user never chose
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


  const [transitionTrigger, setTransitionTrigger] = useState(0);

const startTransition = () => {
  setTransitionTrigger((prev) => prev + 1);
};

const StartFullScreenTransition = () => {

    setfullscreentransition(true);
startTransition();

  console.log("StartFullScreenTransition called also the current thing is set to" ,fullscreentransition ? "Y" : "N" );

};
  const ClearFullScreenTransition = () => {
    setfullscreentransition(false);
  };

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        fullscreentransition,
        StartFullScreenTransition,
        ClearFullScreenTransition,transitionTrigger
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
