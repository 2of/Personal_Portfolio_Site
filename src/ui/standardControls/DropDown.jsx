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
  value = null,                 // selected value (primitive)
  onChange = () => {},
  placeholder = "Select an option",
  variant = "default",
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

  // Find selected option safely
  const selectedOption = options.find(
    (opt) => opt.value === value
  );

  // Position dropdown
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

  // Close on outside click
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
    onChange(option.value); // ✅ emit only value
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
            {selectedOption?.label ?? placeholder}
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

      {/* Menu */}
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className={`${styles.dropdownMenu} ${styles.dropdownMenuOpen}`}
            style={menuStyle}
            role="listbox"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                className={`${styles.dropdownItem} ${
                  value === option.value
                    ? styles.dropdownItemSelected
                    : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>,
          portalRoot
        )}
    </>
  );
};
