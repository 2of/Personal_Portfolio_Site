// aboutpage/index.jsx
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useAboutPageData } from "./aboutPage.container.jsx"
import { AboutPageDesktop } from "./aboutPage.desktop.jsx"
import { AboutPageMobile } from "./aboutPage.mobile.jsx"

export default function AboutPage2() {
  const screenSize = useScreenSize();
  const data = useAboutPageData();
    console.log("RERENDERED ")
  return screenSize === "sm" ? (
    <AboutPageMobile {...data} />
  ) : (
    <AboutPageDesktop {...data} />
  );
}
