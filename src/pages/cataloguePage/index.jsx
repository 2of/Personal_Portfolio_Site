import React from "react";
import { useMemo } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { WorkPageDesktop } from "./workPage.desktop";
import { WorkPageMobile } from "./workPage.mobile";
import { useProjPageData } from "./workPage.container";
import { NewsPaperPage } from "../../layout/NewsPaper";
import{WorkPageDesktopWithSearch} from "./workPageSearch.desktop";
import { Loader } from "../../ui/misc/Loader";
import { StandardPage } from "../../ui/scroll/StandardPage";
export const CatPage = () => {
  const { hasLoaded, allprojects, allworkpagetext,projectsMeta,pageOrganization } = useProjPageData();
  const screenSize = useScreenSize();


  if (!hasLoaded) {
    return  <StandardPage>
      <Loader/>
    </StandardPage>;
  } else {


    if (screenSize === "sm") {
      return <WorkPageMobile allprojects={allprojects} pageText={allworkpagetext} />;
    }

    return <WorkPageDesktopWithSearch allprojects={allprojects} pageText={allworkpagetext} meta={projectsMeta} pageOrganization={pageOrganization}   />;

  }

};


