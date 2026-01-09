import React from "react";
import { useNav } from "../../contexts/NavContext";
import TrackedDots from "./TrackedDots";
import GradientBG from "./GradientBG";
import { TextASCIIbg } from "./TextASCIIbg";
import { AsciiArt } from "../misc/TextAsciiScroll";
import asciiArtWindow from "../../../public/misc/asciiwindow";
import { DarkModeTile } from "../wrappers/DarkModeFancyTile";

export const BackgroundWrapper = () => {
    const { navDetails } = useNav();
    const bgVariant = navDetails?.bg || "main";

    // Reusable fixed background container
    const BGWrapper = ({ children, className }) => (
        <div
            className={className}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                // backgroundColor: "red",
                zIndex: -1,
            }}
        >
            {children}
        </div>
    );

    switch (bgVariant) {
        case "main":
            return <BGWrapper className="bg-dots-fade " />; // Empty background for 'main'
        case "ledger":
            return <BGWrapper className="bg-ledger" />; // Empty background for 'main'
      case "vellum":
            return <BGWrapper className="bg-dots-vellum" />; // Empty background for 'main'
        case "WTF":
   return <BGWrapper className="bg-grad-dots-dense" />;
        case "dots":

            return (
                <BGWrapper>
                    <TrackedDots />
                    {/* <h1>test</h1> */}
                </BGWrapper>
            );


               case "text":

            return (
                <BGWrapper>
                    <AsciiArt art={asciiArtWindow} />
                    {/* <h1>test</h1> */}
                </BGWrapper>
            );

        default:
            return <BGWrapper className="bg1" />;
    }
};
