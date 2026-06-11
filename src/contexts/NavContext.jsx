import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { routes } from "../routes";
import { useCookies } from "../hooks/useCookies";

const NavContext = createContext(null);

export const useNav = () => {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
};

export const NavProvider = ({ children }) => {
  const { pathname, search } = useLocation(); // <-- 1. Pull 'search' (?foo=bar) from React Router

  const [navStuckToTop, setNavStuckToTop] = useState(true);
  const [navigationVariantDesktop, setNavigationVariantDesktop_] = useState("stacked");
// lazy rename not to refactor because it's everwhwere...
// but now cookies work ! 
  const setNavigationVariantDesktop = (e) => { 
    console.log("nav var is nbow", e)
    set("navvariant", e, {} )
    setNavigationVariantDesktop_(e)

  }
const {get, set} = useCookies()


  useEffect(() => {
    console.log("GOTTEM ",get("navvariant"))
setNavigationVariantDesktop_(get("navvariant") || "stacked")


  },[])













  const { currentRoute, URLParameters, queryParameters } = useMemo(() => {
    let matchedRoute = null;
    let params = {};

    // Match route configuration and path parameters (:id)
    for (const route of routes) {
      const match = matchPath(
        { path: route.path, end: route.path === "/" },
        pathname
      );

      if (match) {
        matchedRoute = route;
        params = match.params; 
        break;
      }
    }

    // 2. Parse Query Parameters (?search=text&category=items)
    const searchParams = new URLSearchParams(search);
    const queryParams = Object.fromEntries(searchParams.entries()); // Converts it to a clean JS object

    return {
      currentRoute: matchedRoute,
      URLParameters: params,
      queryParameters: queryParams, // <-- Parsed key-value query object
    };
  }, [pathname, search]); // <-- 3. Re-run whenever pathname OR search query changes

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
        URLParameters,     // Path parameters like /user/:id -> { id: "123" }
        queryParameters,   // Query strings like ?tab=profile -> { tab: "profile" }
        isNavBgTransparent,
        setNavBgTransparent: setIsNavBgTransparent,
        navStuckToTop,
        setNavStuckToTop,
        navigationVariantDesktop,
        setNavigationVariantDesktop
      }}
    >
      {children}
    </NavContext.Provider>
  );
};