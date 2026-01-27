import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import styles from "./styles/DropDown.module.scss";

export const DropDown = ({
  options = [],
  variant  = "default", // outlined, default, floating, 
  value = null,                 // ← controlled value
  onChange = () => {},           // ← controlled handler
  placeholder = "Select an option",
  darkOverride = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Ensure portal root exists
  const portalRoot =
    document.getElementById("dropdown-root") ||
    (() => {
      const el = document.createElement("div");
      el.id = "dropdown-root";
      document.body.appendChild(el);
      return el;
    })();

  // Position menu relative to trigger
  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setMenuStyle({
      position: "fixed",
      top: rect.bottom + 6,
      left: rect.left,
      width: rect.width,
    });
  }, [isOpen]);

  // Click outside (trigger + menu)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        triggerRef.current?.contains(e.target) ||
        menuRef.current?.contains(e.target)
      ) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option); // ← parent decides
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <div
        className={styles.dropdown}
        data-theme={darkOverride ? "dark" : "light"}
      >
        <button
          ref={triggerRef}
          type="button"
          className={`${styles.dropdownTrigger} ${
            isOpen ? styles.dropdownTriggerActive : ""
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          <span className={styles.dropdownValue}>
            {value ?? placeholder}
          </span>

          <svg
            className={`${styles.dropdownArrow} ${
              isOpen ? styles.dropdownArrowRotate : ""
            }`}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Portal Menu */}
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={`${styles.dropdownMenu} ${styles.dropdownMenuOpen}`}
            style={menuStyle}
            role="listbox"
          >
            {options.map((option, i) => (
              <button
                key={i}
                type="button"
                role="option"
                aria-selected={value === option}
                className={`${styles.dropdownItem} ${
                  value === option ? styles.dropdownItemSelected : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>,
          portalRoot
        )}
    </>
  );
};
