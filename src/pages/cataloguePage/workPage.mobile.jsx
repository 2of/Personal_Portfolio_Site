import React, { useEffect, useState, useMemo } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
// import { useNav } from "../../contexts/NavContext"; // Unused in snippet
// import { useNavigate } from "react-router-dom"; // Unused in snippet
// import { useNavigateTo } from "../../hooks/useNavigate"; // Unused in snippet
import { Card } from "../../ui/cards/Card";
import {
  ScrollableVerticalView,
  Section,
} from "../../ui/scroll/VerticalScrollWithStickyHeaders";
import { StandardHeader } from "../../ui/misc/Headers";
import StandardGrid from "../../ui/grid/StandardGrid";
import styles from "./workPage.Mobile.module.scss";
import { DropDown } from "../../ui/standardControls/DropDown";
import { DrawText, SVGText } from "../../ui/misc/TextPath";
import TinderView from "../../ui/containers/TinderCards";
import { useNavStack } from "../../contexts/NavigationButtonsStack";
import Divider from "../../ui/misc/Divider";
import { PagedScrollContainer } from "../../ui/scroll/TikTokMobileContainer";
import getIcon from "../../tools/iconRef";
import ScrollUpHintBg from "../../ui/bg/UpArrows";

export const WorkPageMobile = ({ allprojects, pageText,viewstate }) => {
  const screenSize = useScreenSize();
  const [viewType, setViewType] = useState(viewstate || "List");
  const { addComponent, removeComponent } = useNavStack();
  // console.log("!!!, allworkpagetext", allworkpagetext)
  const listOptions = [{
    value:"List", label:"View As List"
  }, {value:"Stack", label:"View as Tinder"
  },
    {value:"TikTok", label:"View as TikTok"
  }]
const navControlComponent = useMemo(
  () => (
    <DropDown
      key="work-view-selector"
      options={listOptions}
      
      placeholder="Select layout"
      onChange={setViewType}
      value={viewType}
      fsButtonlabel="View"
      // icon={getIcon("peace")}
    />
  ),
  [viewType, screenSize], // < screem soize her eso that mobile re renders recalc
);
  useEffect(() => {
    addComponent("work-page-control", navControlComponent);

    return () => {
      removeComponent("work-page-control");
    };
  }, [addComponent, removeComponent, navControlComponent]);

 const renderCard = (project, index, sectionVariant, percentVisible = null) => {
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
        percentvisible={percentVisible}
        useMobile={screenSize !== "sm"}
      />
    );
  };

  const MainHeader_desktop = ({ screenSize }) => {
    return (
      <div className={styles.introContent_d}>
        {screenSize === "lg" && (
          <DrawText stagger={7} strokeWidth={1.4} stroke="border" duration={12}>
            <SVGText text="isoHello" width={800} height={400} />
          </DrawText>
        )}

        {screenSize === "sm" && (
          <DrawText stagger={7} strokeWidth={1} duration={12} >
            <SVGText text="isoHello" width={300} height={200} />
          </DrawText>
        )}

        <p>I've made a bunch of things</p>
        <p>This page is a bit of a mishmash and isn't cohesive.</p>
      </div>
    );
  };

  const ScrollableView = ({ header, projects }) => {
    return (
      <ScrollableVerticalView>
        <Section key="intro" sticky>
          {header}
        </Section>
{/* <h4>TEST {viewType}</h4> */}
        {Object.entries(projects).map(
          ([sectionKey, sectionData], sectionIndex) => (
            <Section
              key={sectionKey}
              // sticky

                                    // Header = {() => (<h1>Collapsable Header</h1>)}

                                    
              Header={() => (
                <StandardHeader
                  textb1={sectionData.title}
                  texthighlight={sectionData.title_highlight}
                  variant="large"
                />
              )}
            >
              {sectionData.preamble && (
                <div className={styles.preamblecontainer}>
                  {sectionData.preamble}
                </div>
              )}

              <StandardGrid template={sectionData.variant}>
                {sectionData.projects.map((proj, projectIndex) => (
                  <StandardGrid.Item key={`${sectionKey}-${projectIndex}`}>
                    {renderCard(proj, projectIndex, sectionData.variant)}
                  </StandardGrid.Item>
                ))}
              </StandardGrid>
            </Section>
          ),
        )}
      </ScrollableVerticalView>
    );
  };

  const TinderyView = ({ header, projects }) => {
    const [dowiggle, setdowiggle] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
  function getSectionHeaderByCardIndex(cardIndex) {
      if (currentCardIndex == 0) {
        return null;
      }

      let count = 0;
      cardIndex -= 1

      for (const section of Object.values(projects)) {
        const len = section.projects?.length ?? 0;

        if (cardIndex >= count && cardIndex < count + len) {
          return {
            title: section.title,
            title_highlight: section.title_highlight,
          };
        }

        count += len;
      }

      return null;
    }
    const headerData = getSectionHeaderByCardIndex(currentCardIndex);

    useEffect(() => {
      const timer = setTimeout(() => {
        setdowiggle(true);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className={styles.tinderstackcontainer}>
     
        <span className={styles.tinderstackheader}>
             <h4>
     Swipe Left & Right  | </h4>

       <h4> {headerData?.title} </h4>
        <h4 className={"text_highlight"} style={{
          marginLeft: "0.25rem"
        }}>{headerData?.title_highlight}</h4>


        </span>

        <Divider variant="dotted" />
        <TinderView setwiggle={dowiggle} setCurrCardIndex={setCurrentCardIndex}>
          {header}

          {Object.values(projects).flatMap((section) =>
            section.projects.map((proj, i) => renderCard(proj, i, "dating")),
          )}
        </TinderView>
      </div>
    );
  };


  const TikTokView = ({ header, screenSize, projects }) => { 

  const flattenedProjectSlides = useMemo(() => {
    const slides = [];
    
    Object.entries(projects).forEach(([sectionKey, sectionData]) => {
      sectionData.projects.forEach((project, projectIndex) => {
        slides.push({
          project,
          projectIndex,
          variant: sectionData.variant,
          uniqueKey: `slide-${sectionKey}-${project.title || projectIndex}`
        });
      });
    });
    
    return slides;
  }, [projects]);

  return (
 <PagedScrollContainer>
        {/* Replace standard div targets with your scroll element wrapper if necessary */}
        <div sectionHeight="full" key="np-tiktok-cover-slide">
          
          {({ percentVisible }) => (
            <div className={styles.sectionContainer} style={{ opacity: percentVisible }}>

              <div className={styles.bgcontainerforSlideHintFS}>
              <ScrollUpHintBg/>

              </div>
              {header}

              
            </div>
          )}
        </div>

        {flattenedProjectSlides.map((slide) => {
          return (
            <div sectionHeight="full" key={slide.uniqueKey}>
              {({ percentVisible }) => (
                <div className={styles.sectionContainer} >
                  {renderCard(slide.project, slide.projectIndex, "tiktok", percentVisible)}
                </div>
              )}
            </div>
          );
        })}
      </PagedScrollContainer>
  );
};

  switch(viewType) { 
    case "Stack": 
      return (  <TinderyView
          header={<MainHeader_desktop screenSize={screenSize} />}
          projects={allprojects}
        /> )
    case "TikTok" : 
      return (<TikTokView
      
      header={<MainHeader_desktop screenSize={screenSize} />}
          projects={allprojects}
          
          />)
    default: 
     return (<ScrollableView
          header={<MainHeader_desktop screenSize={screenSize} />}
          projects={allprojects}
        />)

  }
 
};
