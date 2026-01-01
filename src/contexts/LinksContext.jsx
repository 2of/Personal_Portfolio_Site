import { createContext, useContext, useEffect, useState } from "react";
import links from "../json/links.json"
// import { Links } from "react-router-dom";


const LinksContext = createContext(null)


export const useLinks = () => { 
    const ctx = useContext(LinksContext)
    if (!ctx) console.log("broke")
    return ctx
}
export const LinksProvider = ({ children }) => {
  const getLink = (key) => {
    if (!key || typeof key !== "string") return null;
    return links[key] || null;
  };

  const value = {
    links,
    getLink,
  };

  return (
    <LinksContext.Provider value={value}>
      {children}
    </LinksContext.Provider>
  );
};
