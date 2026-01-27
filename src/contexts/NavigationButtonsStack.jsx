import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

const NavStackContext = createContext();

export const useNavStack = () => {
  const context = useContext(NavStackContext);
  if (!context) throw new Error("useNavStack must be used within a NavStackProvider");
  return context;
};

export const NavStackProvider = ({ children }) => {
  const [navstack, setNavstack] = useState([]);
  const [MobileNavOpen, setMobileNavOpen] = useState(false);
  const [extraButtons, setExtraButtons] = useState([]);
  const [customComponents, setCustomComponents] = useState({});

  // --- Nav Stack Actions ---
  const pushNav = useCallback((navObj) => setNavstack((prev) => [...prev, navObj]), []);
  const popNav = useCallback(() => setNavstack((prev) => prev.slice(0, -1)), []);
  const clearStack = useCallback(() => setNavstack([]), []);
  const removeNav = useCallback(({ id }) => {
    setNavstack((prev) => prev.filter((nav) => nav.id !== id));
  }, []);

  // --- Button Actions (Legacy/Specific) ---
  const addButton = useCallback((buttonObj) => {
    setExtraButtons((prev) => {
      if (prev.some((btn) => btn.id === buttonObj.id)) return prev;
      return [...prev, buttonObj];
    });
  }, []);

  const removeButton = useCallback(({ id }) => {
    setExtraButtons((prev) => prev.filter((btn) => btn.id !== id));
  }, []);

  // --- Component Actions (New) ---
  const addComponent = useCallback((id, component) => {
    setCustomComponents((prev) => ({ ...prev, [id]: component }));
  }, []);

  const removeComponent = useCallback((id) => {
    setCustomComponents((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  }, []);

  const clearComponents = useCallback(() => setCustomComponents({}), []);

  const contextValue = useMemo(() => ({
    navstack,
    extraButtons,
    MobileNavIsOpen: MobileNavOpen,
    
    // Components state
    customComponents, // The raw object
    allComponents: Object.values(customComponents), // Easy for mapping
    hasCustomComponents: Object.keys(customComponents).length > 0,

    // Methods
    pushNav,
    popNav,
    clearStack,
    removeNav,
    addButton,
    removeButton,
    addComponent,
    removeComponent,
    clearComponents,

    // Mobile Nav Methods
    OpenMobileNav: () => setMobileNavOpen(true),
    ExitMobileNav: () => setMobileNavOpen(false),
    ToggleMobileNav: () => setMobileNavOpen(prev => !prev)
  }), [
    navstack, 
    extraButtons, 
    MobileNavOpen, 
    customComponents, // <--- CRITICAL: Must be here
    pushNav, 
    popNav, 
    clearStack, 
    removeNav, 
    addButton, 
    removeButton,
    addComponent,
    removeComponent,
    clearComponents
  ]);

  return (
    <NavStackContext.Provider value={contextValue}>
      {children}
    </NavStackContext.Provider>
  );
};