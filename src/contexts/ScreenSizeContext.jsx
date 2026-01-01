import { createContext, useContext, useEffect, useState } from "react";

const ScreenSizeContext = createContext("lg");

const breakpoints = {
  sm: "(max-width: 767px)",
  md: "(min-width: 768px) and (max-width: 1023px)",
  lg: "(min-width: 1024px)",
};

const getScreenSize = () => {
  if (window.matchMedia(breakpoints.sm).matches) return "sm";
  if (window.matchMedia(breakpoints.md).matches) return "md";
  return "lg";
};

export const ScreenSizeProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(() =>
    typeof window === "undefined" ? "lg" : getScreenSize()
  );

  useEffect(() => {
    const mqls = Object.values(breakpoints).map(q => window.matchMedia(q));

    const handler = () => setScreenSize(getScreenSize());

    mqls.forEach(mql => mql.addEventListener("change", handler));
    return () => mqls.forEach(mql => mql.removeEventListener("change", handler));
  }, []);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = () => useContext(ScreenSizeContext);
