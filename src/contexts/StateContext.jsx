import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "../hooks/useCookies";

const StateContext = createContext(null);
export const useAppState = () => useContext(StateContext);

export const StateProvider = ({ children }) => {
  const { getAll, set, remove } = useCookies();
  const [state, setState] = useState({});

  // Read initial state from cookies
  useEffect(() => {
    setState(getAll());
  }, [getAll]);

  const setFlag = (key, value = true) => {
    set(key, value);
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getFlag = (key) => Boolean(state[key]);

  const clearFlag = (key) => {
    remove(key);
    setState((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const resetState = () => {
    Object.keys(state).forEach((key) => remove(key));
    setState({});
  };

  return (
    <StateContext.Provider
      value={{
        state,
        getFlag,
        setFlag,
        clearFlag,
        resetState,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
