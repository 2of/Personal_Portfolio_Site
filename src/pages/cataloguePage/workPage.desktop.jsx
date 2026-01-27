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
import styles from "./workPage.Desktop.module.scss";
import { DropDown } from "../../ui/standardControls/DropDown";
import { DrawText, SVGText } from "../../ui/misc/TextPath";
import TinderView from "../../ui/containers/TinderCards";
import { useNavStack } from "../../contexts/NavigationButtonsStack";
import { GetElTextEls } from "../aboutPage/support";
import Divider from "../../ui/misc/Divider";

export const WorkPageDesktop = ({ allprojects, pageText }) => {
  const screenSize = useScreenSize();
  const [viewType, setViewType] = useState("View As List");
  const { addComponent, removeComponent } = useNavStack();
  console.log("SDFSDF", pageText.preamble);

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

  const MainHeader_desktop = ({ screenSize }) => {
    return (
      <div className={styles.introContent_d}>
        {screenSize === "lg" && (
          <DrawText stagger={7} strokeWidth={0.5} stroke="border" duration={12}>
            <SVGText text="isoHello" width={800} height={200} />
          </DrawText>
        )}

        {screenSize === "md" && (
          <DrawText stagger={7} strokeWidth={0.5} duration={12} stroke="border">
            <SVGText text="isoHello" width={500} height={400} />
          </DrawText>
        )}
      </div>
    );
  };

  const ScrollableView = ({ header, projects, pageText, renderCard }) => {
    return (
      <ScrollableVerticalView staggerStart>
        <Section key="intro" sticky>
          {header}
          <Divider variant="dotted" />
          <div className={styles.editorialLayout}>
            <div className={styles.editorialSidebar}>
              <h3>Projects here...</h3>
              {GetElTextEls({
                elements: pageText.introsection?.content ?? [],
              })}
            </div>

            <div className={styles.editorialaSidebar}>
              <article className={`${styles.article} ${styles.dropCapArticle}`}>
                <h3>About</h3>
                <div className={styles.articleBody}>
                  {GetElTextEls({
                    elements: pageText.preamble?.content ?? [],
                  })}
                </div>
              </article>
            </div>
          </div>
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

  const TinderyView = ({ header, projects, renderCard }) => {
    const [dowiggle, setdowiggle] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => {
        setdowiggle(true);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className={styles.tinderstackcontainer}>
        <TinderView setwiggle={dowiggle}>
          {header}

          {Object.values(projects).flatMap((section) =>
            section.projects.map((proj, i) => renderCard(proj, i, "dating")),
          )}
        </TinderView>
      </div>
    );
  };

  const renderCard = (project, index, sectionVariant, screenSize) => {
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

  // --- RENDER ---
  return (
    <div className={styles.WorkPage}>
      <div className={` ${styles.bgContainer} bg-grid-blueprint `}>
        <div className={styles.bgOverlay} />
      </div>

      {viewType === "View As Stack" ? (
        <TinderyView
          header={<MainHeader_desktop screenSize={screenSize} />}
          projects={allprojects}
          renderCard={(p, i, v) => renderCard(p, i, v, screenSize)}
        />
      ) : (
        <ScrollableView
          header={<MainHeader_desktop screenSize={screenSize} />}
          projects={allprojects}
          pageText={pageText}
          renderCard={(p, i, v) => renderCard(p, i, v, screenSize)}
        />
      )}
    </div>
  );
};
