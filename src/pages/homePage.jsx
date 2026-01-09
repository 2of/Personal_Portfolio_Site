import react from "react";

import styles from "./styles/homepage.module.scss";
import { useNavigate } from "react-router-dom";

import getIcon from "../tools/iconRef.jsx";
import { getLink } from "../helpers/GetLink.jsx";
import React from "react";
import { useModal } from "../contexts/ModalContext.jsx";

import { useScreenSize } from "../contexts/ScreenSizeContext.jsx";
import { ModernButton } from "../ui/standardControls/button/Button.jsx";
import { useDarkMode } from "../contexts/DarkMode.jsx";




export const HomePage = () => {
    const navigate = useNavigate();
    // const { getLink } = useGlobalContext();
    // const { darkMode, toggleDarkMode } = useDarkMode();
    const {darkMode,toggleDarkMode} = useDarkMode();
    // const { modalState, showModal, hideModal, modalVisible } = useModal();
    const screenSize = useScreenSize();
    const openModal = () => {
        showModal({
            // title: "blah blah",
            size: "large",

            title: "A quick wee about",
            size: "medium",
            floatnav: false,
            content: (
                <SiteInfoCard />
            ),
        });
    };
    const isMobile = (screenSize === "sm")
    const wrapperClass = isMobile ? styles.mobileinfobar : styles.infobar;
    const btnType = isMobile ? "icon_only" : "code_small";

    return (

        <>

         






            <div className={styles.CenteredContainer}> 


            <h1 className={styles.title}>
                <p>Hello</p> <p className={styles.highlight}>There</p>
            </h1>

            <p className={styles.blurb}>
                You've found my little portfolio site.... I'm Noah, I'm a         <span className={styles.highlight}>Master of Artificial Intelligence</span>{' '}grad looking for{' '}
                <span className={styles.highlight}>Data Science</span>,{' '}
                <span className={styles.highlight}>Machine Learning</span>,{' '}
                <span className={styles.highlight}>Development</span> or{' '}
                <span className={styles.highlight}>Software Engineering</span> roles....
            </p>


            <div className={styles.ButtonContainer}>


                <ModernButton label={".about"} variant={"code"} callback={() => navigate("/about")} />
                <ModernButton label={".projects"} variant={"code"} callback={() => navigate("/projects")} />

                <ModernButton label={".resume"} variant={"code"} external link={getLink("resume")} />
                <ModernButton label={".linkedin"} variant={"code"} external link={getLink("linkedin")} />
                                {/* <ModernButton label={".linkedin22"} variant={"code"} external to="/home" link={getLink("linkedin")} /> */}
                <ModernButton label={".github"} variant={"code"} external link={getLink("github")} />
                <ModernButton label={!darkMode ? ".dark" : ".light"} variant={"code"} callback={() => toggleDarkMode()} />
                {/* <StandardButton label={"meta"} type={"code"} /> */}
            </div>

                
            </div>
        </>
    )

}