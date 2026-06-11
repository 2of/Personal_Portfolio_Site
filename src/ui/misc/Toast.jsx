import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useToast } from "../../contexts/ToastContext";
import styles from "./styles/Toast.module.scss";
import ProgressBar from "../standardControls/ProgressBar";
import { ModernButton } from "../standardControls/button/Button";

const AUTO_DISMISS_MS = 8000;

export const Toast = () => {
  const { toastState, hideToast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(
    AUTO_DISMISS_MS / 1000
  );

  // Entry 
  useEffect(() => {
    if (toastState.open) {
      setMounted(false);
      setRemainingSeconds(AUTO_DISMISS_MS / 1000);
      requestAnimationFrame(() => setMounted(true));
    }
  }, [toastState.open]);

  // Countdown and then do the  auto-dismiss
  useEffect(() => {
    console.log("TOAST CAME TO LIFE WITH ", toastState)
    if (!toastState.open) return;
  if (toastState.timeout === false) return; 
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(
        0,
        Math.ceil((AUTO_DISMISS_MS - elapsed) / 1000)
      );
      setRemainingSeconds(remaining);
    }, 250);

    const timeout = setTimeout(() => {
      setAnimatingOut(true);
    }, AUTO_DISMISS_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [toastState.open]);

  // Exis
  useEffect(() => {
    if (!animatingOut) return;

    const timer = setTimeout(() => {
      hideToast();
      setAnimatingOut(false);
      setMounted(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [animatingOut, hideToast]);

  const handleCloseAnimation = () => {
    setAnimatingOut(true);
  };

  if (!toastState.open && !animatingOut) return null;

  return ReactDOM.createPortal(
    <div
      className={`${styles.toast}
      StandardBoxL2
        ${mounted ? styles.toastIn : ""}
        ${animatingOut ? styles.toastOut : ""}`}
      // onClick={handleCloseAnimation}
      role="alert"
    >


      {toastState.title && (
        <h4 className={styles.title}>{toastState.title}</h4>
      )}

      {toastState.content && (
        <div className={styles.content}>{toastState.content}</div>
      )}

  {toastState.timeout !== false && (
  <div className={styles.countdown}>
    <ProgressBar
      val={Math.min(5, remainingSeconds)}
      lowerBound={1}
      upperBound={Math.min(5, AUTO_DISMISS_MS / 1000)}
    />
  </div>
)}


 {toastState.timeout === false && (
  <div className={styles.dismiss}>
    <ModernButton
    label = "confirm"
    variant="dev_chungus"
   callback={() => handleCloseAnimation()}
    />
  </div>
)}



    </div>,
    document.body
  );
};
