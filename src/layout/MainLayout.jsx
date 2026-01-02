import React, { useMemo } from "react";
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

const Mobile = React.memo(({scrollfixed}) => {
    const location = useLocation();
    console.log("HIYA", scrollfixed)
    return (
        <div className={s.MOBILE_MainLayout}>
            <MobileNavBar />

            <MobileNavMenu /> 
            

            <div className={scrollfixed ? s.MobileContent_fixed :s.MobileContent_free} >
              
                    <Outlet />
          
            </div>
        </div>
    );
});

export const MainLayout = () => {
    const location = useLocation();
    const { modalVisible } = useModal();
    const screenSize = useScreenSize();
    const {navDetails} = useNav();
    // console.log(navDetails.scrollOverride || "NONE")
    return (
        <>
            <BackgroundWrapper />
            {modalVisible && <ModalContainer />}
            {screenSize === "sm" ? <Mobile scrollfixed={navDetails.scrollOverride ?? false}  /> : <Desktop location={location} />}
        </>
    );
};
