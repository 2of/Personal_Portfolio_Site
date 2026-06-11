import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { StackedDesktopNav } from "../ui/nav/StackedDesktopNav";
import s from "./MainLayout.module.scss";
import ModalContainer from "../ui/misc/Modal";
import { useModal } from "../contexts/ModalContext";
import { BackgroundWrapper } from "../ui/bg/BackgroundWrapper";
import { TextASCIIbg } from "../ui/bg/TextASCIIbg";
import { useScreenSize } from "../contexts/ScreenSizeContext";
import { MobileNavBar } from "../ui/nav/MobileNavBar";
import MobileNavMenu from "../ui/nav/MobileNavMenu";
import { useNav } from "../contexts/NavContext";
import { useToast } from "../contexts/ToastContext";
import { Toast } from "../ui/misc/Toast";
import { useCookies } from "../hooks/useCookies";
// import { FancyStateTransition } from "../ui/misc/DarkModeTransition.jsx/FancyStateTransition";
import { TransitionCover } from "./Transition";
import { usePageTransition } from "../contexts/PageTransition";
import AltTransition from "./AltTransition";
import CoolTransition from "./CoolTransition";
import GlassPushOverlay from "../ui/containers/GlassContainer";
import { HorizontalNav } from "../ui/nav/horizontalNav";
import { ToolTip } from "../ui/misc/Tooltip";
import { Hnav2 } from "../ui/nav/hnav2";
import { FancyStateTransition } from "../ui/misc/DarkModeTransition.jsx/FancyStateTransition";
import { MaterialNav } from "../ui/nav/MaterialNavs/MatNavDesktop";
import { NavObsNavgradBlurBG } from "../ui/bg/PageGradientBlurNavBg";



// do this coz fixes the flashes
// so React doesn't recreate the component function on every single frame.
const DesktopNavbar = React.memo(({ variant }) => {
  switch (variant) {
    case "material":
      return <MaterialNav />;
    case "floating":
      return <Hnav2 />;
    case "stacked":
      return <StackedDesktopNav />;
    default:
      return <MaterialNav />;
  }
});

export const Desktop = React.memo(({ navvariant, location, state, isModalOpen }) => {
  return (
    <div className={`${s.DESKTOP_MainLayout} ${isModalOpen ? s.ModalFadeDesktopBack : ""}`}>
     

     <DesktopNavbar variant={navvariant} />
      {/* <NavObsNavgradBlurBG/> */}
      <ToolTip />

      <div className={s.ContentWrapper}>

        <div className={`${s.DesktopFrame} ${s[`${navvariant}_desktopframestyle`] || ""}`}>
       
    {/* <h3>test {navvariant}</h3> */}
          <BackgroundWrapper />

          <TransitionCover state={state} />


          <div key={location.pathname} className={s.DesktopScrollArea}>
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
});
const Mobile = React.memo(({ state }) => {
  const { navDetails } = useNav();
  const scrollfixed = navDetails.scrollOverride ?? false;

  // console.log("HIYA", scrollfixed)
  return (
    <div className={s.MOBILE_MainLayout}>
      <MobileNavBar />

      <MobileNavMenu />

      <div
        className={scrollfixed ? s.MobileContent_fixed : s.MobileContent_free}
      >          <BackgroundWrapper />

               <TransitionCover state={state} />
               
        {/* <TransitionCover state={state} /> */}
        <Outlet />
      </div>
    </div>
  );
});

export const MainLayout = () => {
  const location = useLocation();
  const { modalVisible } = useModal();
  const { toastVisible } = useToast();
  const screenSize = useScreenSize();
  const { get, set } = useCookies();
  const { showToast } = useToast();

  // const [transitionState, setTransitionState] = useState("idle");

  const { transitionState } = usePageTransition();

  const endTransition = () => {
    alert("END transition");
  };

  const hasShownCookiesWarning = get("hasShownCookiesWarning");

  useEffect(() => {
    if (!hasShownCookiesWarning) {
      setTimeout(() => {
        showToast({
          open: true,
          title: "Cookies!",
          text: "Look I use cookies for dark mode, animation state and other things. Enable dev in the /more to access cookies manager. All cookies are just 5 hours max age... im not tracking anything, I just want to play my dumb animations :) ",
          timeout: false,
        });
      }, 5000);

      set("hasShownCookiesWarning", true);
    }
  }, []);

  const showCookiesToast = () => {};

  const { navigationVariantDesktop } = useNav();

  // console.log(navDetails.scrollOverride || "NONE")
  return (
    <>
      <FancyStateTransition />

      {/* <TransitionCover state={transitionState} /> */}
      {/* <TransitionCover state={transitionState} /> */}

      {modalVisible && <ModalContainer />}
      {toastVisible && <Toast />}
      {screenSize === "sm" ? (
        <Mobile state={transitionState} />
      ) : (
        <Desktop
          navvariant={navigationVariantDesktop}
          location={location}
          state={transitionState}
          isModalOpen = {modalVisible}
        />
      )}
    </>
  );
};
