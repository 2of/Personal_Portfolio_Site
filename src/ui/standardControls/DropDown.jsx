import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import styles from "./styles/DropDown.module.scss";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { ModernButton } from "./button/Button";
import { useMatch } from "react-router-dom";
import { useModal } from "../../contexts/ModalContext";
import getIcon from "../../tools/iconRef";

export const DropDown = ({
  options = [],
  value = null,                 // selected value (primitive)
  onChange = () => {},
  placeholder = "Select an option",
  variant = "default",
  darkOverride = false,
  blurbTextForMobile = "",
  fsButtonlabel = "No prop?",
  icon = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const screenSize = useScreenSize();
  const {showModal, hideModal} = useModal();
    const isMobile = (screenSize === "sm")
  // Ensure portal root exists
  const portalRoot =
    document.getElementById("dropdown-root") ||
    (() => {
      const el = document.createElement("div");
      el.id = "dropdown-root";
      document.body.appendChild(el);
      return el;
    })();

  // Find selected option safely :__ 
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
    onChange(option.value); 
    setIsOpen(false);
    hideModal(); // oh look a bug to fix later... or i just neve rput a dropdown in a modal...
  };

  if (screenSize === "sm") { 



  return (
      <ModernButton
      label={fsButtonlabel}
      variant="AirLine_LargeFilll"
      icon = {icon || getIcon("dropdown")}
      callback={() => { 
        showModal({

title: "Select",
size: "small",
          content: (<>


          <div className={styles.ModalButtons}>
            {options.map((opt) => ( 
              <ModernButton 
                label={opt.value}
                variant="AirLine_LargeFilll"
                callback={() => handleSelect(opt)}
              
              
              
              />
            ))}
          </div>
          
           {/* <div
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
          </div>, */}
          
          </>)
        })
      }}
      
      
      />


  )  }
  return (
    <>
        {/* return ("HELLO") */}
        {isMobile && <h3>test</h3>}
      {/* Trigger */}
      {/* yeah idk how datatheme works here btu thanks stackofverlw */}
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
