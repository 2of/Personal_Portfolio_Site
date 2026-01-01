import React from "react";
import StandardToggle from "../standardControls/Toggle";
import getIcon from "../../tools/iconRef";
import { useDarkMode } from "../../contexts/DarkMode";

export const DarkModeWrapper = ({type = "dev"}) => {

 const { darkMode, toggleDarkMode } = useDarkMode();

  return (

    <>
    
    
    {/* <div onClick={toggleTheme}>test </div> */}
    <StandardToggle
      type={type}
      checked={darkMode}
      callback={() => toggleDarkMode}
      firsticon={getIcon("moon")}
      secondicon={getIcon("sun")}
    />

    
</>
  );
};