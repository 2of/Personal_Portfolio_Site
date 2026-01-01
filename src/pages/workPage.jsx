import React from "react";
import projData from "../json/projects.json";
import styles from "./styles/WorkPage.module.scss";

import {
    ProjectCard_small,
    ProjectCard_regular,
    ProjectCard_singleline,
    ProjectCard_wide,
    ProjectCard_large,
    ProjectCard_hero
} from "../ui/cards/ProjectCards";

import {
    ScrollableVerticalView,
    Section
} from "../ui/scroll/VerticalScrollWithStickyHeaders";

import { StandardHeader } from "../ui/misc/Headers";
import { Card } from "../ui/cards/Card";
import StandardGrid from "../ui/grid/StandardGrid";

export const WorkPage = () => {
    const categories = projData[0];

    /**
     * Determines the grid container style based on the project variants present.
     */
    const getSectionGridClass = (projects) => {
        if (!projects.length) return styles.SmallGrid;

        const variants = projects.map(p => p.variant);

        if (variants.includes("hero")) return styles.HeroGrid;
        if (variants.includes("wide") || variants.includes("large")) return styles.WideGrid;
        if (variants.includes("singleline")) return styles.SingleLineGrid;

        return styles.SmallGrid;
    };

    const renderCard = (project, index) => {
        const variant = project.variant || "regular";

        return (
            <Card
                carddetails={project}
                variant={variant}
                title={project.title}
                description={project.description}
                date={project.date}
                tags={project.tags}
                links={project.links}
                link={project.link}
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
                            variant="regular"
                        />
                    )}
                >
                    <div className={styles.introContent}>
                        <p>I've made a bunch of things</p>
                        <p>Each project is categorized by sector and technical complexity.</p>
                    </div>
                </Section>

                {/* Categories */}
                {Object.entries(categories).map(([categoryName, projects]) => (
                    <Section
                        key={categoryName}
                        sticky
                        Header={() => (
                            <StandardHeader
                                textb1={categoryName}
                                variant="regular"
                            />
                        )}
                    >
                        {projects.length === 0 ? (
                            <div className="StandardBoxGhost">
                                <p className="text-muted">// No projects initialized in this sector.</p>
                            </div>
                        ) : (
                   <StandardGrid columns="4" gap="md" rowHeightVariant="" reflow animated>

                                {projects.map((project, index) => (
                                    <StandardGrid.Item
                                        key={`${categoryName}-${index}`}
                                        variant={project.variant}
                                    >
                                        {renderCard(project)}
                                    </StandardGrid.Item>
                                ))}

                            </StandardGrid>
                        )}
                    </Section>
                ))}

            </ScrollableVerticalView>
        </div>
    );
};
