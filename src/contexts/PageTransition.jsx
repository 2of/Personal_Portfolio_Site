import React, { createContext, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "./ScreenSizeContext";

const TransitionContext = createContext(null);

export const usePageTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
  const [transitionState, setTransitionState] = useState("idle");
  const [targetPath, setTargetPath] = useState(null);
  const navigate = useNavigate();
  // Prevent double-triggering
  const isRunningRef = useRef(false);
  const screenSize = useScreenSize();


  const startTransition = (path = null) => {

    if (screenSize === "sm") {
      // Direct navigation on small screens
      navigate(path);
      return;
    }


    if (isRunningRef.current) return;
    console.log("PATH", path)

    isRunningRef.current = true;
    setTargetPath(path);


    setTransitionState("covering");


    setTimeout(() => {
      // placeholder for navigate(path)
      navigate(path);
    }, 200);


    setTimeout(() => {
      setTransitionState("uncovering");
    }, 400);

   
    setTimeout(() => {
      setTransitionState("idle");
      setTargetPath(null);
      isRunningRef.current = false;
    }, 1000); // Extended to prevent animation cutoff again
  };

  return (
    <TransitionContext.Provider
      value={{
        transitionState,
        startTransition,
        targetPath,
        isTransitioning: transitionState !== "idle",
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};
