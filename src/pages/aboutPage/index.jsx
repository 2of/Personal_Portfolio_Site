// aboutpage/index.jsx
import { useMemo } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useAboutPageData } from "./aboutPage.container.jsx";
import { AboutPageDesktop } from "./aboutPage.desktop.jsx";
import { AboutPageMobile } from "./aboutPage.mobile.jsx";
import { AboutPageNewDesktop } from "./aboutPage.New.jsx";
import { AboutPageMobileNew } from "./aboutPage.new.mobile.jsx";

function AboutPage2() {
  const screenSize = useScreenSize();
  const data = useAboutPageData();

  const Page = useMemo(() => {
    return screenSize === "sm"
      ? <AboutPageMobileNew {...data} />
      : <AboutPageNewDesktop {...data} />;
  }, [screenSize, data]);

  return Page;
}

export default AboutPage2;
