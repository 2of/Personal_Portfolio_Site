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
import { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { useDarkMode } from "../contexts/DarkMode";
import { DarkModeAnimatedWithCoolDownToastButton } from "../ui/wrappers/DarkModeWrapper";
import { useAppState } from "../contexts/StateContext";
import { SmallCareerTileWithModal } from "../ui/cards/SmallCareerCardWithModal";
import  { DrawText,SVGText,TextWPath_HOWDY} from "../ui/misc/TextPath";
import { StandardTab } from "../ui/scroll/StandardTabView";
import Divider from "../ui/misc/Divider";
import { TextInput } from "../ui/standardControls/TextInput";
import getIcon from "../tools/iconRef";
import StandardToggle from "../ui/standardControls/Toggle";
import { usePageTransition } from "../contexts/PageTransition";
import { Post } from "../ui/Post/Post";
import { VerticalScrollWithTracking } from "../ui/scroll/VerticalScrollingWithTracking";


export const SamplePage = () => {
    const { navDetails } = useNav();
    const navigateTo = useNavigateTo();
    const [email, setEmail] = useState("");
    const { setFlag, getFlag, getState, clearFlag } = useAppState();
    const { getArticle, getArticleImageUrl } = useContent();
    const { showToast } = useToast();

const { startTransition, transitionState } = usePageTransition();
    const { darkMode, toggleDarkMode, ClearFullScreenTransition, StartFullScreenTransition, fullscreentransition } = useDarkMode();
    const dohandlearticle = async () => {
        console.log("TEST");
        const article = await getArticle("geo");
        console.log(article);
    };



    const { getLink } = useLinks();
    const tabs = {
        Qualifications: () => (
            <h2>QUALSI</h2> ),
                    Career: () => (<h2>test</h2>)}
    const showOpenToast = ({ title = "That was ... a lot", text = "The 'Dark Mode transition' has been deactivated btw ... You can go to /more to turn it back on. I thought it was over the top yet kinda fun" } = {}) => {
        showToast({
            open: true,
            title,
            text: text,
        });
    };
    const showOpenToastThatdoesntdisappear = ({ title = "That was ... a lot", text = "The 'Dark Mode transition' has been deactivated btw ... You can go to /more to turn it back on. I thought it was over the top yet kinda fun" } = {}) => {
        showToast({
            open: true,
            title,
            text: text,
            timeout: false
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


 <>
    <p>STATE: {transitionState}</p>

    <button onClick={() => startTransition("/about")}>
      Start
    </button>
  </>   





            <DarkModeAnimatedWithCoolDownToastButton />
<SmallCareerTileWithModal/> <h2>before</h2>
            <ModernButton
                label="TOAST SOMETHING"
                variant="dev"
                callback={() => showOpenToast()} />

            <ModernButton
                label="TOAST SOMETHING amnnd confirm"
                variant="dev"
                callback={() => showOpenToastThatdoesntdisappear()} />


            <ModernButton
                label="SHOW FULL SCREEN TRANSITION"
                variant="dev"
                callback={() => openDarkModeThing()} />


            {/* <h1>ROUTES:  {navDetails.path} </h1> */}
            {/* <AboutCardSmall/> */}
            {/* {navDetails.path} */}

            {/*         
            <ImageHandle src={SampleImage} /> */}

            {/* <OrbitPicture image={SampleImage} /> */}
HERE:
<DrawText>
<SVGText
  text="Sporty_Welcome"
  width={300}
  height={300}

/>
</DrawText>
<StandardToggle type="modern"/>
<ModernButton variant="natural" label="test"/>
<br/>

<VerticalScrollWithTracking>
<ModernButton variant="natural_icon_only"  icon={getIcon("chess")}/>
<ModernButton variant="natural_large_touch"  icon={getIcon("chess")}/>
<ModernButton variant="natural_large_touch" label="test" icon={getIcon("chess")}/>
<ModernButton variant="natural_nav" label="test" icon={getIcon("chess")}/>
<ModernButton variant="natural_squared" label="test" icon={getIcon("chess")}/>
<ModernButton variant="natural_wipe" label="test" icon={getIcon("chess")}/>
<TextInput
        title="Subscribe to the waitlist"
        variant="regular"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail} // Trivial: state updates on every keystroke
      />

<DrawText stagger={0.5}>
<SVGText
  text="Unsure_hello"
  width={300}
  height={300}

/><SVGText
  text="Unsure_hello"
  width={300}
  height={300}

/>  <SVGText
  text="Unsure_hello"
  width={300}
  height={300}

/><SVGText
  text="Unsure_hello"
  width={300}
  height={300}

/><SVGText
  text="Unsure_hello"
  width={300}
  height={300}

/>
</DrawText>



<Post/>
</VerticalScrollWithTracking>
 <DrawText duration={121.8} stagger={0.07}>
      <TextWPath_HOWDY width={250} />
    </DrawText>
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

            <br />
            Hello: currently dev is set to getFlag("Dev") --- {getFlag("dev") ? "ON" : "off"}


            <ModernButton
                label="set on"
                variant="dev"
                callback={() => setFlag("dev")}
            />
            <ModernButton
                label="set off"
                variant="dev"
                callback={() => setFlag("dev", false)}
            />

 <StandardTab tabs={tabs} variant="default" tabPosition="bottom" />
      <StandardTab tabs={tabs} variant="outline" tabPosition="bottom" />
      <StandardTab tabs={tabs}  tabPosition="bottom" />
      <StandardTab tabs={tabs} variant="mobile" tabPosition="bottom" />            {/* 
                <BlackAndWhiteHoverReveal img={SampleImage} filterType="shift"/>


                <BlackAndWhiteHoverReveal img={SampleImage} filterType="duotone" />
<BlackAndWhiteHoverReveal img={SampleImage}  filterType="softglow" />
<BlackAndWhiteHoverReveal img={SampleImage}  filterType="chromatic" />
<BlackAndWhiteHoverReveal img={SampleImage}  filterType="glitch" />
<BlackAndWhiteHoverReveal img={SampleImage}  /> 
 */}

<Divider variant="solid" spacing="md" />
<Divider variant="dashed" spacing="lg" />
<Divider variant="dots" spacing="sm" />
<Divider variant="fade" spacing="xl" />
<Divider variant="wave" spacing="xl" />

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