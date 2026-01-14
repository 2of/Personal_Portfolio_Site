import React from "react";
import StandardToggle from "../standardControls/Toggle";
import getIcon from "../../tools/iconRef";
import { useDarkMode } from "../../contexts/DarkMode";
import { useToast } from "../../contexts/ToastContext";
import { ModernButton } from "../standardControls/button/Button";
import { useCookies } from "../../hooks/useCookies";
export const DarkModeWrapper = ({ type = "modern" }) => {

  const { darkMode, toggleDarkMode } = useDarkMode();

  return (

    <>


      {/* <div onClick={toggleTheme}>test </div> */}
      <StandardToggle
        type={type}
        checked={darkMode}
        callback={() => toggleDarkMode}
      // firsticon={getIcon("moon")}
      // secondicon={getIcon("sun")}
      />


    </>
  );
};


export const DarkModeAnimatedWithCoolDownToastButton = ({
  buttonvariantstr = "dev",
  icon = null,
  lightstr = "dark",
  darkstr = "light"
}) => {
  const {
    toggleDarkMode,
    ClearFullScreenTransition,
    StartFullScreenTransition,
    fullscreentransition,
    darkMode
  } = useDarkMode();

  const { showToast } = useToast();
  const { get, set } = useCookies();

  const simpleToggle = () => {
    console.log("CALL lame transition");
    toggleDarkMode();
  };

  const fancyToggle = () => {
    console.log("CALL FANCY transition");

    // DON'T call toggleDarkMode here!
    // The animation will handle it internally
    StartFullScreenTransition();
  };

  const handleClick = () => {
    const userPref = get("playTransitionAnimation");

    console.log("CURRENT COOKIE STATE:", userPref);

    // 1️⃣ First click ever → play once, then disable
    if (userPref === null) {
      fancyToggle();
      set("playTransitionAnimation", false);

      setTimeout(() => {
        showToast({
          open: true,
          title: "!!!",
          text: "That animation was a bit over the top, so it's toggled off. Go turn it on in /more if you want....... also I feel the need to clarify that the emojis on the toggle are just there for attention",
          timeout: false
        });
      }, 7500);
      return;
    }

    // 2️⃣ User explicitly wants animation
    if (userPref === true) {
      fancyToggle();
      return;
    }

    // 3️⃣ User disabled animation
    simpleToggle();
  };

  return (
    <ModernButton
      label={darkMode ? lightstr : darkstr}
      icon={icon ? getIcon("chess") : undefined}
      variant={buttonvariantstr}
      callback={() => handleClick()}
    />
  );
};