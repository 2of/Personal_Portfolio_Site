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

  // 1. Compute currentRoute immediately during render.
  // We use useMemo so it only recalculates when the URL changes.
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

  // 2. Local state for manual overrides (e.g., changing transparency on scroll)
  const [isNavBgTransparent, setIsNavBgTransparent] = useState(
    Boolean(currentRoute?.nav_bg_transparent)
  );

  // 3. Sync the local state whenever the route changes
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