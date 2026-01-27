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

export const WorkPageMobile = ({ allprojects, pageText }) => {
  const screenSize = useScreenSize();
  const [viewType, setViewType] = useState("View As List");
  const { addComponent, removeComponent } = useNavStack();
  // console.log("!!!, allworkpagetext", allworkpagetext)

  const navControlComponent = useMemo(
    () => (
      <DropDown
        key="work-view-selector" // Key helps React diffing
        options={["View As List", "View As Stack"]}
        placeholder="Select layout"
        onChange={setViewType}
        value={viewType}
      />
    ),
    [viewType],
  ); // Dependencies: only recreate if viewType changes
  // thanks to our AI overlords for fixing that issue ...

  useEffect(() => {
    addComponent("work-page-control", navControlComponent);

    return () => {
      removeComponent("work-page-control");
    };
  }, [addComponent, removeComponent, navControlComponent]);

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
        useMobile={screenSize !== "sm"} // okay so cheaty cheaty i prefer not to override
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
          <DrawText stagger={7} strokeWidth={0.5} duration={12} stroke="border">
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

        {Object.entries(projects).map(
          ([sectionKey, sectionData], sectionIndex) => (
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

  // --- RENDER ---
  return (
    <div className={styles.WorkPage}>
      {/* <div className={` ${styles.bgContainer} bg-grid-blueprint `}>
        <div className={styles.bgOverlay} />
      </div> */}

      {viewType === "View As Stack" ? (
        <TinderyView
          header={<MainHeader_desktop screenSize={screenSize} />}
          projects={allprojects}
        />
      ) : (
        <ScrollableView
          header={<MainHeader_desktop screenSize={screenSize} />}
          projects={allprojects}
        />
      )}
    </div>
  );
};
