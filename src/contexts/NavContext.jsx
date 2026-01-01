import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { routes } from "../routes";

const NavContext = createContext(null);

export const useNav = () => {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
};

export const NavProvider = ({ children }) => {
  const location = useLocation();

  const [navDetails, setNavDetails] = useState(null);
  const [isNavBgTransparent, setIsNavBgTransparent] = useState(false);

  useEffect(() => {
    const currentRoute = routes.find(route =>
      matchPath({ path: route.path, end: true }, location.pathname)
    );

    setNavDetails(currentRoute || null);

    // optional: route-driven default
    setIsNavBgTransparent(Boolean(currentRoute?.nav_bg_transparent));
  }, [location.pathname]);

  return (
    <NavContext.Provider
      value={{
        navDetails,
        isNavBgTransparent,
        setNavBgTransparent: setIsNavBgTransparent,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};
