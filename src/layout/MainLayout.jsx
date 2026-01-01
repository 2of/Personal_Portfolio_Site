import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { StackedDesktopNav } from "../ui/nav/StackedDesktopNav";
import s from "./MainLayout.module.scss"
import ModalContainer from "../ui/misc/Modal";
import { useModal } from "../contexts/ModalContext";
import { BackgroundWrapper } from "../ui/bg/BackgroundWrapper";
import { TextASCIIbg } from "../ui/bg/TextASCIIbg";
export const MainLayout = () => {
    const location = useLocation();
    const { modalVisible } = useModal();

    return (

        <>
<BackgroundWrapper/>

            {modalVisible && <ModalContainer />}
            <div className={s.MainLayout}>
                {/* {modalVisible ? <h2>test</h2> : <h2>testas</h2>} */}

                <StackedDesktopNav />
                <div className={`${s.Content} `}>

                    {/* <TextASCIIbg/> */}
                    <div key={location.pathname} className={`${s.PageContainer} StandardBoxL2`}>
                        <Outlet />
                    </div>
                </div>
            </div>


        </>
    )
}