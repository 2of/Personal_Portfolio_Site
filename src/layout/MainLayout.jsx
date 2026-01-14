import React, { useEffect, useMemo } from "react";
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
import { FancyStateTransition } from "../ui/misc/DarkModeTransition.jsx/FancyStateTransition";

const Desktop = React.memo(({ location }) => {
    return (
        <div className={s.DESKTOP_MainLayout}>
            <StackedDesktopNav />

            <div key={location.pathname} className={`${s.Content} ${s.DesktopContent} StandardBoxL2 StandardBoxPad`}>
                <Outlet />
            </div>
        </div>
    );
});

const Mobile = React.memo(({ scrollfixed }) => {
    const location = useLocation();
    console.log("HIYA", scrollfixed)
    return (
        <div className={s.MOBILE_MainLayout}>
            <MobileNavBar />

            <MobileNavMenu />


            <div className={scrollfixed ? s.MobileContent_fixed : s.MobileContent_free} >

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
    const { navDetails } = useNav();
    const { get, set } = useCookies();
    const { showToast } = useToast();

    const hasShownCookiesWarning = get("hasShownCookiesWarning")



    useEffect(() => {
        if (!hasShownCookiesWarning) {

            setTimeout(() => { 
    showToast({
                open: true,
                title: "Cookies!",
                text: "Look I use cookies for dark mode, animation state and other things. Enable dev in the /more to access cookies manager. All cookies are just 5 hours max age... im not tracking anything, I just want to play my dumb animations :) ",
                timeout: false
            })
            },5000 )
        

            set("hasShownCookiesWarning", true)
        }


    },
        [])

    const showCookiesToast = () => {

    }



    // console.log(navDetails.scrollOverride || "NONE")
    return (
        <>
            <FancyStateTransition />
            <BackgroundWrapper />
            {modalVisible && <ModalContainer />}
            {toastVisible && <Toast />}
            {screenSize === "sm" ? <Mobile scrollfixed={navDetails.scrollOverride ?? false} /> : <Desktop location={location} />}
        </>
    );
};
