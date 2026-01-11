import React, { useEffect } from "react";
import s from "./styles/samplepage.module.scss"
import { useNav } from "../contexts/NavContext";
// import { ScrollableVerticalView } from "../ui/scroll/VerticalScrollWithStickyHeaders";
import ProgressBar from "../ui/standardControls/ProgressBar";
import { ScrollableVerticalView, Section } from "../ui/scroll/VerticalScrollWithStickyHeaders";
import { StandardHeader } from "../ui/misc/Headers";
import ExpandableCareerTile from "../ui/cards/ExpandOnHoverCardCareerTile";
import { Firefly } from "../ui/misc/Firefly";
import { useLinks } from "../contexts/LinksContext";
import { useNavigateTo } from "../hooks/useNavigate";
import { ModernButton } from "../ui/standardControls/button/Button";
import SampleImage from "../assets/default.jpeg";
import { Loader } from "../ui/misc/Loader";
import { useContent } from "../contexts/ContentContext";
import { ShareSheet } from "../ui/misc/ShareSheet";
import ImageHandle from "../ui/images/ImageHandle";
import OrbitPicture from "../ui/misc/ImageOrbitView";
import { StandardGrid } from "../ui/grid/StandardGrid";
import { Card } from "../ui/cards/Card";
import { BlackAndWhiteHoverReveal } from "../ui/images/BlackAndWhiteHoverReveal";
import { AsciiArt } from "../ui/misc/TextAsciiScroll";
import asciiArtWindow from "../../public/misc/asciiwindow";
import { AboutCard } from "../ui/cards/discreteCards/aboutcard";
import { AboutCardSmall } from "../ui/cards/AboutCard";
import RowView from "../ui/grid/RowView";
import { DarkModeTile } from "../ui/wrappers/DarkModeFancyTile";
import { RoadTransition } from "../ui/misc/DarkModeTransition.jsx/RoadTransition";
import { FancyStateTransition } from "../ui/misc/DarkModeTransition.jsx/FancyStateTransition";
import { useToast } from "../contexts/ToastContext";
import { useDarkMode } from "../contexts/DarkMode";


export const SamplePage = () => {
    const { navDetails } = useNav();
    const navigateTo = useNavigateTo();

    const { getArticle, getArticleImageUrl } = useContent();
  const { showToast } = useToast();
    const { darkMode, toggleDarkMode ,ClearFullScreenTransition, StartFullScreenTransition,fullscreentransition} = useDarkMode();
    const dohandlearticle = async () => {
        console.log("TEST");
        const article = await getArticle("geo");
        console.log(article);
    };



    const { getLink } = useLinks();

 const showOpenToast = ({ title = "That was ... a lot", text = "The 'Dark Mode transition' has been deactivated btw ... You can go to /more to turn it back on. I thought it was over the top yet kinda fun" } = {}) => {
  showToast({
    open: true,
    title,
    text: text,
  });
};

const openDarkModeThing = () => { 
    StartFullScreenTransition();
}

    return (

        <>

            there it is:

            {/* <DarkModeTile /> */}

            {/* <RoadTransition/> */}

            <FancyStateTransition/>

            <ModernButton
            label="TOAST SOMETHING"
            variant="dev"
            callback={() => showOpenToast()}/>


            <ModernButton
            label="SHOW FULL SCREEN TRANSITION"
            variant="dev"
            callback={() => openDarkModeThing()}/>


            {/* <h1>ROUTES:  {navDetails.path} </h1> */}
            {/* <AboutCardSmall/> */}
            {/* {navDetails.path} */}

            {/*         
            <ImageHandle src={SampleImage} /> */}

            {/* <OrbitPicture image={SampleImage} /> */}


            <ModernButton
                label="TEST FOR MODER NAVIGATE"
                variant="dev"
                callback={() => navigateTo("linkedin")}
            />

            <ModernButton
                label="TEST FOR MODER GEO GEO"
                variant="dev"
                callback={() => navigateTo("/proj/geo")}
            />

            <ModernButton
                label="fetch geo article"
                variant="dev"
                callback={() => dohandlearticle()}
            />

            {/* 
                <BlackAndWhiteHoverReveal img={SampleImage} filterType="shift"/>


                <BlackAndWhiteHoverReveal img={SampleImage} filterType="duotone" />
<BlackAndWhiteHoverReveal img={SampleImage}  filterType="softglow" />
<BlackAndWhiteHoverReveal img={SampleImage}  filterType="chromatic" />
<BlackAndWhiteHoverReveal img={SampleImage}  filterType="glitch" />
<BlackAndWhiteHoverReveal img={SampleImage}  /> 
 */}



            <section style={{ padding: '2rem 0' }}>
                <h2>Dense Grid (Col/Row Spans)</h2>
                <StandardGrid columns={4} gap="sm" dense>
                    <StandardGrid.Item colSpan={2} rowSpan={2} style={{ background: 'rgba(0,255,0,0.1)', padding: '1rem', border: '1px solid #333' }}>
                        Large Item (2x2)
                    </StandardGrid.Item>
                    <StandardGrid.Item style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', border: '1px solid #333' }}>
                        Item A
                    </StandardGrid.Item>
                    <StandardGrid.Item style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', border: '1px solid #333' }}>
                        Item B
                    </StandardGrid.Item>
                    <StandardGrid.Item colSpan={2} style={{ background: 'rgba(0,0,255,0.1)', padding: '1rem', border: '1px solid #333' }}>
                        Wide Item (2x1)
                    </StandardGrid.Item>
                    <StandardGrid.Item style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', border: '1px solid #333' }}>
                        Item C
                    </StandardGrid.Item>
                    <StandardGrid.Item style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', border: '1px solid #333' }}>
                        Item D
                    </StandardGrid.Item>
                </StandardGrid>
            </section>

            <h2>section now</h2><h2>section now</h2><h2>section now</h2><h2>section now</h2><h2>section now</h2><h2>section now</h2><h2>section now</h2><h2>section now</h2>

        </>
    )
}