import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/Modal.module.scss"; // Ensure path is correct
import { ModernButton } from "../standardControls/button/Button.jsx";
import { useScreenSize } from "../../contexts/ScreenSizeContext.jsx";
import { useModal } from "../../contexts/ModalContext.jsx";
import getIcon from "../../tools/iconRef.jsx";

const ModalContainer = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { modalState, hideModal } = useModal();
  const screenSize = useScreenSize();
  const [animatingOut, setAnimatingOut] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (modalState.open) {
      setAnimatingOut(false);
      setIsFullScreen(false);
    }
  }, [modalState.open]);

  // Animate out then clean up
  useEffect(() => {
    let animationTimer;
    if (animatingOut) {
      animationTimer = setTimeout(() => {
        hideModal();
        setAnimatingOut(false); 
      }, 300);
    }
    return () => clearTimeout(animationTimer);
  }, [animatingOut, hideModal]);

  const handleCloseAnimation = () => setAnimatingOut(true);
  const handleClick = (e) => e.stopPropagation();

  if (!modalState.open && !animatingOut) return null;

  // Determine size class
  let sizeClass = styles.small; // Default
  if (modalState.size === "medium") sizeClass = styles.medium;
  if (modalState.size === "large") sizeClass = styles.large;

  // Add fullscreen class if toggled or if forcing fullscreen on small screens
  if (isFullScreen || (screenSize === "sm" && modalState.size === "large")) {
    sizeClass += ` ${styles.fullScreen}`;
  }

  // Determine Nav Class
  const navClass = modalState.floatnav ? styles.floatingnav : styles.fixednav;

  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${animatingOut ? styles.overlayAnimatingOut : ""}`}
      onClick={handleCloseAnimation}
    >
      <div 
        className={`${styles.modal} ${sizeClass} StandardBoxFloat`} 
        onClick={handleClick}
      >
        <div className={`${styles.topBar} ${navClass}`}>
          
          {/* Only show Title if NOT floating nav */}
          {!modalState.floatnav && <h2>{modalState.title || ""}</h2>}

          <div className={styles.spacer} />

          {/* Custom Buttons */}
          {modalState.buttons?.length > 0 && (
            <div className={styles.buttons}>
              {modalState.buttons.map((btn, i) => (
                <ModernButton
                  key={i}
                  label={btn.label}
                  type={btn.type || "default"}
                  onClick={btn.onClick || handleCloseAnimation}
                />
              ))}
            </div>
          )}

          {/* Fullscreen toggle (Large modals only) */}
          {modalState.size === "large" && screenSize !== "sm" && (
            <ModernButton
              label={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
              type="rounded"
              icon={getIcon(isFullScreen ? "reduce" : "expand")}
              callback={() => setIsFullScreen((prev) => !prev)}
            />
          )}

          {/* Close button */}
          <ModernButton
            variant="dev"
            icon={getIcon("close")}
            callback={handleCloseAnimation}
          />
        </div>

        <div className={styles.content}>
          {modalState.content || <p>No content provided.</p>}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalContainer;