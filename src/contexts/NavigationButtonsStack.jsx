import React, { createContext, useContext, useState, useCallback } from "react";
import { routes } from "../routes";
const NavStackContext = createContext();

export const useNavStack = () => useContext(NavStackContext);

export const NavStackProvider = ({ children }) => {
  const [navstack, setNavstack] = useState([]);

const [shouldHideNavBgDesktop, setShouldHideNavBgDesktop] = useState(false);
const [MobileNavOpen, setMobileNavOpen] = useState(false);
  const [extraButtons, setExtraButtons] = useState([]);


const shouldNavBgBeTransparent = () => {
  return shouldHideNavBgDesktop;
};

const setNavBgTransparent = (value) => {
  setShouldHideNavBgDesktop(value);
};


// const shouldScrollbefree = () => { 

// }


const OpenMobileNav = () => { 
    setMobileNavOpen(true)
}

const ExitMobileNav = () => { 
    setMobileNavOpen(false)
}


const ToggleMobileNav = () => { 
    console.log("TEST")
    setMobileNavOpen(prev => !prev)
}

const MobileNavIsOpen = MobileNavOpen;  // no need for a function


  const pushNav = useCallback((navObj) => {
    setNavstack((prev) => [...prev, navObj]);
  }, []);
  const clearStack = useCallback(() => { 
    setNavstack([])
  })
  const popNav = useCallback(() => {
    setNavstack((prev) => prev.slice(0, -1));
  }, []);

  const removeNav = useCallback(({ id }) => {
    setNavstack((prev) => prev.filter((nav) => nav.id !== id));
  }, []);


const addButton = useCallback(

  (buttonObj) => {
    setExtraButtons((prev) => {
      if (prev.some((btn) => btn.id === buttonObj.id)) {
          console.log("ADDED A BUTTON", buttonObj);

        return prev;
      }
      return [...prev, buttonObj];
    });
  },
  [] 
);

const extraButtonsContains = useCallback(
  (id) => extraButtons?.some((btn) => btn.id === id) ?? false,
  [extraButtons]
);
  const removeButton = useCallback(({ id }) => {
    setExtraButtons((prev) => prev.filter((btn) => btn.id !== id));
  }, []);

  const clearButtons = useCallback(() => {
    setExtraButtons([]);
  }, []);

const contextValue = React.useMemo(() => ({
    navstack,
    extraButtons,
    MobileNavIsOpen: MobileNavOpen,
    pushNav,
    popNav,
    clearStack,
    removeNav,
    addButton,
    removeButton,
    clearButtons,
    extraButtonsContains,
    shouldNavBgBeTransparent: () => shouldHideNavBgDesktop, // Simplified
    setNavBgTransparent: (val) => setShouldHideNavBgDesktop(val),
    OpenMobileNav: () => setMobileNavOpen(true),
    ExitMobileNav: () => setMobileNavOpen(false),
    ToggleMobileNav: () => setMobileNavOpen(prev => !prev)
  }), [
    navstack, 
    extraButtons, 
    MobileNavOpen, 
    shouldHideNavBgDesktop, 
    pushNav, 
    popNav, 
    clearStack, 
    removeNav, 
    addButton, 
    removeButton, 
    clearButtons, 
    extraButtonsContains
  ]);

  return (
    <NavStackContext.Provider value={contextValue}>
      {children}
    </NavStackContext.Provider>
  );
};