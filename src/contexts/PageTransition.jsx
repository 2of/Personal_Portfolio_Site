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

  let inTime = 200
  let outTime = inTime + 300
  const startTransition = (path = null, callback = null) => {

    // if (screenSize === "sm") {
    //   // Direct navigation on small screens lazy
    //   navigate(path);
    //   return;
    // }


    if (isRunningRef.current) return;
    console.log("PATH", path, callback)

    isRunningRef.current = true;
    setTargetPath(path);


    setTransitionState("covering");


    setTimeout(() => {
      // placeholder for navigate(path)
      // do not do if no path
     
      if (callback) { 
        callback()
      }

       if (!path) { 
        return
      }

      navigate(path);
    }, inTime);


    setTimeout(() => {
      setTransitionState("uncovering");
    }, outTime);

   
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
