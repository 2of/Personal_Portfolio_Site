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
import asciiArtWindow from "../../public/content/misc/asciiwindow";
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
import HamburgerButtonWrapper from "../ui/misc/HamburgerMenuIconAnimated";
import { StandardPage } from "../ui/scroll/StandardPage";
import { DropDown } from "../ui/standardControls/DropDown";
import TinderView from "../ui/containers/TinderCards";
import { useNavStack } from "../contexts/NavigationButtonsStack";
import { HoverAndSoWeExpandToAnotherComponent } from "../ui/containers/HoverAndSoWeExpandToAnotherComponent";
import { Logo } from "../ui/misc/Logo";
import { useTooltip } from "../contexts/ToolTipContext";
import GradientBG from "../ui/bg/GradientBG";
import TextHoverFontChangePara from "../ui/misc/TextHoverParaFontChanger";
import { useCookies } from "../hooks/useCookies";
import { HandWrittenLabel } from "../ui/misc/HandWrittenLabel";
import { StandardRangeInput } from "../ui/standardControls/StandardRangeInput";
import { MaterialNav } from "../ui/nav/MaterialNavs/MatNavDesktop";
import { BouncyButtonRow } from "../ui/misc/BouncyButtonsRow";

// import { PipesBg } from "../ui/bg/PipesBg";


export const SamplePage = () => {
    const { navDetails } = useNav();
    const navigateTo = useNavigateTo();
    const {get, set} = useCookies()
    
    // const {darkMode} = useDarkMode();
    const [email, setEmail] = useState("");
    const { setFlag, getFlag, getState, clearFlag } = useAppState();
    const { getArticle, getArticleImageUrl } = useContent();
    const { showToast } = useToast();
  const [rotatey, setrotatey] = useState(0);
const { startTransition, transitionState } = usePageTransition();
    const { darkMode, toggleDarkMode, ClearFullScreenTransition, StartFullScreenTransition, fullscreentransition } = useDarkMode();
    const dohandlearticle = async () => {
        console.log("TEST");
        const article = await getArticle("geo");
        console.log(article);
    };

    const { setTooltip } = useTooltip();
  const { ToggleMobileNav, MobileNavIsOpen,navstack,allComponents, addComponent, hasCustomComponents } = useNavStack();

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

// Use a string to match your tab identifiers
const [activeTab, setActiveTab] = useState("one");

const bouncytabs = [
  { label: "one",   id: "one" },
  { label: "two",   id: "two" },
  { label: "three", id: "three" },
  { label: "four",  id: "four" }
];


  const [KP, setKP] = useState(0.22);
  const [KS, setKS] = useState(0.28);
  const [DP, setDP] = useState(0.55);
  const [DS, setDS] = useState(0.50);
  


// Map your buttons so the component receives a simple boolean
const buttonsWithState = bouncytabs.map((btn) => ({
  ...btn,
  isActive: activeTab === btn.id,
  callback: () => setActiveTab(btn.id)
}));
const setTab = (tab) => { 
    setCurrentBoucnyTabActive(tab)
}

// const [bouncy]


const { tooltip } = useTooltip();

const fakeroutes = [ {
        path: "/about",
        title: "About",
        icon: "user",
        nav: "fixed",
        expose_desktop_nav: true,
        expose_mobile_nav: true,
        // element: <AboutPage2 />,
        bg: "planes",
        scrollOverride: "true"

    },

]

    return (
        <StandardPage>



                <ModernButton

                label="add nav variant cookie with value 'stacked' "
                callback={()=>{

                    set("navvariant","stacked", {})
                    
                }}

                />



                            <HandWrittenLabel text="OOOOSDFDSFDS"
                            rotate={rotatey}/>



<HandWrittenLabel text="REF_MANIFEST" variant="curveLeft" rotate={rotatey} />

<HandWrittenLabel text="CARGO_LOAD_SEC" variant="curveRight" rotate={rotatey} />

<HandWrittenLabel text="TRACK_ROUTE" variant="straight" rotate={rotatey} />

        <StandardRangeInput
          lowerbound={0}
          upperbound={360}
          value={rotatey}
          showPreview
          title={"rotatey"}
          updatefunc={setrotatey}
          naponEvery={1}
          variant="airline"
        />

<h3>Bouncy Button {activeTab} </h3>

<div className="physics-tuner-grid">
  <h4>Position Stiffness (KP)</h4>
  <StandardRangeInput 
    showPreview 
    variant="airline" 
    upperbound={1.0} 
    lower={0.01} 
        snaponEvery={0.01}
    value={KP} 
    updatefunc={setKP} 
  />

  <h4>Scale Stiffness (KS)</h4>
  <StandardRangeInput 
    showPreview 
    variant="airline" 
    upperbound={1.0} 
    lower={0.001} 
    value={KS} 
    snaponEvery={0.01}
    updatefunc={setKS} 
  />

  <h4>Position Damping (DP)</h4>
  <StandardRangeInput 
    showPreview 
    variant="airline" 
    upperbound={0.99} 
    lower={0.1} 
    value={DP} 
        snaponEvery={0.01}
    updatefunc={setDP} 
  />

  <h4>Scale Damping (DS)</h4>
  <StandardRangeInput 
    showPreview 
    variant="airline" 
    upperbound={0.99} 
        snaponEvery={0.01}
    lower={0.1} 
    value={DS} 
    updatefunc={setDS} 
  />
</div>
<BouncyButtonRow
  variant="tab"
  physics = {{
    KP: KP
  }}
  ks={0.55}
  ds={0.72}
  scaleImpulse={0.8}
  speedFactor={0.4}
  neighbour1={0.55}
  neighbour2={0.20}
  buttons={buttonsWithState}
/>
<h3>Material Nav changes</h3>

<MaterialNav overrideposition dontactuallynav/>
<h3>Bouncybuttons</h3>
<BouncyButtonRow buttons={[
    {callback: () => (console.log("asdfds")),
        label : "test"
    }, {callback: () => (console.log("asdfds")),
        label: "test"
    }, {callback: () => (console.log("asdfds")),
        label : "test"
    },
]}/>


<div style={{height:"100px", width:"100px"}} className="MaterialColoursGlow"/>

<div style={{height:"100px", width:"100px"}} className="MaterialInset"/>

<div style={{height:"100px", width:"100px"}} className="MaterialOverlay"/>

<div style={{height:"100px", width:"100px"}} className="MaterialSunken"/>
<div style={{height:"100px", width:"100px"}} className="MaterialColoursGlow"/>
      <ModernButton
                        variant={"Magazine_Primary"}
                        label="hello everyone"/>      <ModernButton
                        variant={"Magazine_Primary"}
                        label="hello everyone"/>
                    <article className="DATASTRIP_Container">
    <div style={{ flex: 1, padding: '16px' }}>
        <header className="DATASTRIP_MetaHeader">System_Manifest // 001</header>
        <h3>Project Title</h3>
        <p>Technical description text here...</p>
        <span className="DATASTRIP_Status">Active</span>
    </div>
    
    <div className="DATASTRIP_Divider" />
    
    <div className="DATASTRIP_VerticalInfo">
        <div>
            <div className="label">Index</div>
            <div className="value">A7</div>
        </div>
        <div>
            <div className="label">Year</div>
            <div className="value">2026</div>
        </div>
    </div>
</article>

         <HandWrittenLabel rotate={120}>
                   <a>test</a>
                      </HandWrittenLabel>



<article className="DATASTRIP_Container">
    <div style={{ flex: 1, padding: '16px' }}>
        <header className="DATASTRIP_MetaHeader">System_Manifest // 001</header>
        <h3>Project Title</h3>
        <p>Technical description text here...</p>
        <span className="DATASTRIP_Status">Active</span>
    </div>
    
    <div className="DATASTRIP_Divider" />
    
    <div className="DATASTRIP_VerticalInfo">
        <div>
            <div className="label">Index</div>
            <div className="value">A7</div>
        </div>
        <div>
            <div className="label">Year</div>
            <div className="value">2026</div>
        </div>
    </div>
</article>

{/* <GradientBG/> */}

                    <div class="MaterialL1 BorderSubtle">
                        test
  <div className="MaterialL2 BorderFull">


<TextHoverFontChangePara  fontSize={12} text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, nam fuga amet id praesentium blanditiis labore libero obcaecati, animi magni, sequi quasi pariatur. Vel, praesentium id! Dicta eum consequuntur voluptates repudiandae blanditiis? Ut dolor beatae sunt, pariatur, quis maxime itaque minima temporibus deleniti aspernatur animi vel? Ratione repellat ut molestiae consectetur assumenda unde quis deserunt, dolorum cupiditate, ea sequi nulla iusto iste eaque pariatur, expedita quas perferendis architecto maxime saepe distinctio atque? Facere assumenda ad ea amet! Saepe iusto porro, doloribus eligendi deleniti aperiam autem qui quos sed cum hic tempora alias dolor rerum, minima exercitationem natus. Aut, pariatur iure?"/>



    test
    <div className="MaterialL3 BorderFullInset">chip</div>
  </div>
</div>

<div style={{ position: "relative", height: "400px" }}>

</div>


<h3>ToolTips</h3>

<h3> it's currently just {tooltip} </h3>
<ModernButton
                label="Show me a tooltip"
                variant="dev"
                callback={() => setTooltip("Apples ")}
/>

<ModernButton
                label="Show me a tooltip"
                variant="dev"
                callback={() => setTooltip("Bananas ")}
/>

{/* <MaterialNav/> */}

<StandardRangeInput
upperbound={2}
lowerbound={-1}


></StandardRangeInput>

<h3>Material Nav Above</h3>
<DarkModeTile/>



<h3>DARK MODE STUFF</h3>

<ModernButton
variant="Airline_Primary"
label="Print dakr mode stuff"
callback={() => console.log(darkMode)}/>

<h4>HERE IS THE XPANDOS</h4>
<HoverAndSoWeExpandToAnotherComponent idle={<h1>test</h1>} expanded={<Logo/>}/>
                

                {hasCustomComponents ? "has them" : "doesnt"}
                <ModernButton
                label="find em out"
                variant="dev"
                callback={() => console.log(allComponents, "AC's")}/>

     <ModernButton
                label="add  em out"
                variant="dev"
            callback={() => addComponent("test-id", <h1 key="test-key">test</h1>)} />
     <ModernButton
                label="add  em out"
                variant="dev"
            callback={() => addComponent("test-i2d", 
                       <DropDown options={["hello","weary","luncbox"]}/>
            )} />
                {/* <PipesBg/> */}
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



        <Divider/>
{/* 
        <TinderView>
            <h1> test</h1>
                  <h1> test</h1>

                        <h1> test</h1>
        </TinderView> */}
        <DropDown options={["hello","weary","luncbox"]}/>


<DrawText duration={12}>
    <SVGText text="LONG"/>
</DrawText>

        </StandardPage>
    )
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



<HamburgerButtonWrapper



/>
<h3>HAMBURGLAR</h3>

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



{/* <Post/> */}


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