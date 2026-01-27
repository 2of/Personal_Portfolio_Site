import React from "react";
import { useMemo } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { WorkPageDesktop } from "./workPage.desktop";
import { WorkPageMobile } from "./workPage.mobile";
import { useProjPageData } from "./workPage.container";
export const CatPage = () => {
  const { hasLoaded, allprojects,allworkpagetext} = useProjPageData();
const screenSize = useScreenSize();
  console.log("CHECL" ,allprojects, allworkpagetext)


  if (!hasLoaded) {
    return <div>loading...</div>;
  } else { 


  if (screenSize === "sm") {
    return <WorkPageMobile allprojects={allprojects} pageText={allworkpagetext} />;
  }

  return <WorkPageDesktop allprojects={allprojects} pageText={allworkpagetext}  />;

  }

};


