import React from "react";
import { useNav } from "../../contexts/NavContext";
import TrackedDots from "./TrackedDots";
import GradientBG from "./GradientBG";
import { TextASCIIbg } from "./TextASCIIbg";
import { AsciiArt } from "../misc/TextAsciiScroll";
// import asciiArtWindow from "../../../public/misc/asciiwindow";
import { DarkModeTile } from "../wrappers/DarkModeFancyTile";

import bg1 from "../../../public/content/images/catalogue/bg1.jpg"
import bg2 from "../../../public/content/images/catalogue/bg2.jpg"
import { TopoMap } from "./TopoBG";
import BgAirline from "./AirlineBg";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useDarkMode } from "../../contexts/DarkMode";

// Hoisted outside BackgroundWrapper so its referential identity is stable across
// renders — prevents React from unmounting/remounting children like BgAirline.
const BGWrapper = ({ children, className }) => (
    <div
        className={className}
        style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            pointerEvents: "none",
            overflow: "hidden",
            touchAction: "none"
        }}
    >
        {children}
    </div>
);

export const BackgroundWrapper = () => {
    const { navDetails } = useNav();
    const {darkMode} = useDarkMode();
    const bgVariant = navDetails?.bg || "main";
    const {screenSize} = useScreenSize();

    switch (bgVariant) {

        case "airline1":
            return <BGWrapper className="airline-manifest-vellum " />;
        case "airline2":
            return <BGWrapper className="airline-terminal-grid " />;
        case "airline3":
            return <BGWrapper className="airline-radar-fade " />;
        case "main":
            return <BGWrapper className="bg_tight_detail" />;
        case "ledger":
            return <BGWrapper className="bg-ledger" />;
        case "image1":
            return (
                <BGWrapper>
                    <img
                        src={bg1}
                        alt=""
                        aria-hidden="true"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                </BGWrapper>
            );

        case "image2":
            return (
                <BGWrapper>
                    <img
                        src={bg2}
                        alt=""
                        aria-hidden="true"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                </BGWrapper>
            );

        case "planes":
            return (
                <BGWrapper>
{/* <BgAirline  numPlanes={11} dark={false} />  */}
                    {darkMode &&                     <BgAirline  numPlanes={11} dark={true} /> }
      {!darkMode &&                     <BgAirline  numPlanes={11} dark={true} /> }

                </BGWrapper>
            );

        case "bg1":
            return <BGWrapper className="MaterialBg1" />;

        case "bg2":
            return <BGWrapper className="MaterialBg2" />;
        case "vellum":
            return <BGWrapper className="bg-dots-vellum" />;
        case "WTF":
            return <BGWrapper className="bg-grad-dots-dense" />;
        case "topo":
            return (
                <BGWrapper className="bg-grad-dots-dense">
                    <TopoMap />
                </BGWrapper>
            );

        case "dots":
            return (
                <BGWrapper>
                    <TrackedDots />
                </BGWrapper>
            );

        case "text":
            return (
                <BGWrapper>
                    <AsciiArt art={asciiArtWindow} />
                </BGWrapper>
            );

        default:
            return <BGWrapper className="bg1" />;
    }
};