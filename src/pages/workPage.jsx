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

export const WorkPage = () => {

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
      />
    );
  };

  return (
    <div className={styles.WorkPage}>
      <ScrollableVerticalView staggerStart>
        {/* Intro Header */}
        <Section
          key="intro"
          sticky
          Header={() => (
            <StandardHeader
              textb1="portfolio"
              texthighlight="Works"
              variant="large"
            />
          )}
        >
          <div className={styles.introContent}>
            <p>I've made a bunch of things</p>
            <p>Each project is categorized by sector and technical complexity.</p>
          </div>
        </Section>

        {/* Loop through sections */}
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
