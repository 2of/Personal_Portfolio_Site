import { createContext, useContext, useState } from "react";

const TooltipContext = createContext(null);

export function TooltipProvider({ children }) {
  const [tooltip, setTooltip] = useState(null);

  const clearTooltip = () => {
    setTooltip(null);
  };

  return (
    <TooltipContext.Provider
      value={{ tooltip, setTooltip, clearTooltip }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

export function useTooltip() {
  const ctx = useContext(TooltipContext);

  if (!ctx) {
    throw new Error("useTooltip must be used within TooltipProvider");
  }

  return ctx;
}