import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { routes } from "../routes";

const NavContext = createContext(null);

export const useNav = () => {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
};

export const NavProvider = ({ children }) => {
  const { pathname } = useLocation();


  const currentRoute = useMemo(() => {
    return (
      routes.find((route) =>
        matchPath(
          { path: route.path, end: route.path === "/" }, // 'end: true' only for Home
          pathname
        )
      ) || null
    );
  }, [pathname]);

  const [isNavBgTransparent, setIsNavBgTransparent] = useState(
    Boolean(currentRoute?.nav_bg_transparent)
  );

  useEffect(() => {
    setIsNavBgTransparent(Boolean(currentRoute?.nav_bg_transparent));
  }, [currentRoute]);

  return (
    <NavContext.Provider
      value={{
        navDetails: currentRoute,
        isNavBgTransparent,
        setNavBgTransparent: setIsNavBgTransparent,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};