import React from "react";
import projData from "../json/projects.json";
import styles from "./styles/workPage.module.scss";

import {
  ProjectCard_small,
  ProjectCard_regular,
  ProjectCard_singleline,
  ProjectCard_wide,
  ProjectCard_large,
  ProjectCard_hero,
} from "../ui/cards/ProjectCards";

import { ScrollableVerticalView, Section } from "../ui/scroll/VerticalScrollWithStickyHeaders";
import StandardGrid from "../ui/grid/StandardGrid";
import { StandardHeader } from "../ui/misc/Headers";
import { PROJCARD_Large } from "../ui/cards/CatalogueCards/PROJ_LargeCard";
import { PROJCARD_Regular } from "../ui/cards/CatalogueCards/PROJ_RegularCard";
import { Card } from "../ui/cards/Card";
import { DrawText, SVGText, TextToSvgComponent_Projects, TextWPath_HOWDY } from "../ui/misc/TextPath";
import { useScreenSize } from "../contexts/ScreenSizeContext";
import { ModernButton } from "../ui/standardControls/button/Button";
import getIcon from "../tools/iconRef";
import Divider from "../ui/misc/Divider";
// import { navigateTo } from "../tools/navigator";
import { getLink } from "../helpers/GetLink";
import { useNavigateTo } from "../hooks/useNavigate";
import { AsciiArt } from "../ui/misc/TextAsciiScroll";
import asciiArtWindow from "../../public/content/misc/asciiwindow";
import PegboardBackground from "../ui/bg/PegBoard";
import { DropDown } from "../ui/standardControls/DropDown";

export const WorkPage = () => {

  const screenSize = useScreenSize();
  const navigateTo = useNavigateTo();



  // Map section variant to a card component
  //   const CARD_MAP = {
  //     small: PROJCARD_Large,
  //     regular: PROJCARD_Regular,
  //     large: PROJCARD_Large,
  //     hero: PROJCARD_Large,
  //     // singleline: PROJCARD_Large,
  //   };

  // Render a single project card


  const renderCard = (project, index, sectionVariant) => {
    return (
      <Card
        variant={sectionVariant}
        key={`${project.title}-${index}`}
        carddetails={project}
        title={project.title}
        description={project.description}
        date={project.date}
        tags={project.tags}
        links={project.links}
        inprogress={project.inprogress}
        image={project.image}
        useMobile={screenSize === "sm"}
      />
    );
  };

  return (
    <div className={styles.WorkPage}>


      <div className={styles.fixedcontrolpanel}>
          <DropDown
                              options={["View As List", "View As tinder Stack"]}
                              // value={viewtype}
                              // onChange={setViewType}
                              placeholder="Select layout"
                              // darkOverride
                          />
      </div>





      <ScrollableVerticalView  >
        {/* Intro Header */}


        {screenSize !== "sm" && (

          <Section
            key="intro"
            sticky
          // Header={MainHeader_desktop}
          >

            <MainHeader_desktop  screenSize={screenSize}/>


          </Section>
        )}

        {screenSize === "sm" && (
          <Section
            key="intro"
            sticky

          >



            <div className={styles.introContent_m}>


              <DrawText stagger={7} strokeWidth={1} stroke="border" duration={12}>
                {/* <TextToSvgComponent_Projects width={250} /> */}
                <SVGText text="isoHello"  width={300} height={180} />
              </DrawText>



              <p>I've made a few things</p>
              <p>Many of these are a bit rough, they're mostly excuses to learn new things</p>

{/* 
              <ModernButton
                label={"Chess Related Things"}
                icon={getIcon("chess")}
                variant="dev"
                callback={() => navigateTo("/chess")}
              />
              <ModernButton
                label={"Tools I made"}
                icon={getIcon("projects")}
                variant="dev"
              />

              <ModernButton
                label={"just go to github then?"}
                icon={getIcon("github")}
                variant="dev"
                callback={() => navigateTo("github")}
              />
 */}



            </div>







            <Divider />
            <p>I've made a bunch of things</p>
            <p>Each project is categorized by sector and technical complexity.</p>
            {/* </div> */}
          </Section>


        )}


        {Object.entries(projData).map(([sectionKey, sectionData], sectionIndex) => (
          <Section
            key={sectionKey}
            sticky
            Header={() => (
              <StandardHeader
                textb1={sectionData.title}
                texthighlight={sectionData.title_highlight}
                variant="regular"
              />
            )}
          >


            {sectionData.preamble && <div className={styles.preamblecontainer}>
              {sectionData.preamble}

            </div>}

            <StandardGrid template={sectionData.variant}>

              {/* <h2>test {sectionData.variant}</h2> */}
              {sectionData.projects.map((proj, projectIndex) => (
                <StandardGrid.Item key={`${sectionKey}-${projectIndex}`}>

                  {/* {proj.image} */}
                  {renderCard(proj, projectIndex, sectionData.variant)}
                </StandardGrid.Item>
              ))}
            </StandardGrid>
          </Section>
        ))}

      </ScrollableVerticalView>
    </div>
  );
};

const MainHeader_desktop = ({screenSize}) => {

  return (
    <div className={styles.introContent_d}>

      {screenSize === "lg" && 
          <DrawText stagger={7} strokeWidth={5}  stroke="border" duration={12}>
        {/* <TextToSvgComponent_Projects width={250} /> */}
        <SVGText text="isoHello" width={800} height={400} />
      </DrawText>
      
      }

        {screenSize === "md" && 
 <DrawText stagger={7} strokeWidth={0.5} duration={12} stroke="border">
  <SVGText
    text="re"
    width={500}
    height={400}
    // fill="#f20707"
    // colour="#000"
  />
</DrawText>
      
      }
  



      {/* <p>I've made a bunch of things</p>
      <p>This page is a bit of a mishmash and isn't cohesive.</p> */}

     
      


    </div>)
}
