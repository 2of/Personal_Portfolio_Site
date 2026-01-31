import React from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";

export const StandardPage = ({ children }) => {
  const screenSize = useScreenSize();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        overflowX: "hidden",
  
        // ...(screenSize==="sm" && { backgroundColor: "red"}),
      }}
    >
    {/* <h1>test test test test {screenSize}</h1> */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "1rem",
          flexDirection: "column",
          // backgroundColor: "red",
          // padding:"1rem",
            ...(screenSize=="sm" && {    padding: "1rem"}),
            ...(screenSize!=="sm" && {    padding: "1rem"}),
        }}
      >
        {children}
      </div>
    </div>
  );
};
