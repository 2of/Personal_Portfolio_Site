import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => { },
});

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {



  const [fullscreentransition, setfullscreentransition] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (localStorage.getItem("darkMode") === null) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const toggleDarkMode = () => {
    console.log("TOGGLEDARKMODE")


    setDarkMode((prev) => !prev);
  }


  const StartFullScreenTransition = () => { 
    setfullscreentransition(true)
  }

   const ClearFullScreenTransition = () => { 
    setfullscreentransition(false)
  }
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode,ClearFullScreenTransition, StartFullScreenTransition,fullscreentransition}}>
      {children}
    </DarkModeContext.Provider>
  );
};