// aboutpage/AboutPage.desktop.jsx
import React from "react";
import {
    ScrollableVerticalView,
    Section,
} from "../../ui/scroll/VerticalScrollWithStickyHeaders";
import { StandardHeader } from "../../ui/misc/Headers";
import s from "./aboutPage.module.scss";
import { Loader } from "../../ui/misc/Loader";
import ExpandableCareerTile from "../../ui/cards/ExpandOnHoverCardCareerTile";
import StandardToggle from "../../ui/standardControls/Toggle";
import QualificationCard from "../../ui/cards/QualificationCard";
import StandardGrid from "../../ui/grid/StandardGrid";
import { SkillCard } from "../../ui/cards/SkillCard";
import { AboutCard } from "../../ui/cards/discreteCards/aboutcard";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { useCallback } from "react";
import { GetElTextEls } from "./support"
import Divider from "../../ui/misc/Divider";


const CareerSectionContent = React.memo(({ careerItems, expandAllCareerTiles }) => (
    <div className={s.careerSection}>
        <StandardGrid template="hero">
            {careerItems.map((c, i) => (
                <StandardGrid.Item key={c.id ?? i}>
                    <ExpandableCareerTile
                        c={c}
                        position={c.position}
                        company={c.company}
                        duration={c.duration}
                        location={c.location}
                        doing={c.doing}
                        techStack={c.coreskills}
                        alwaysexpand={expandAllCareerTiles}
                    />
                </StandardGrid.Item>
            ))}
        </StandardGrid>
    </div>
));

const ExpandAllToggle = React.memo(({ checked, onToggle }) => (
    <div className={s.row}>
        <h4>Expand All</h4>
        <StandardToggle
            type="checkbox"
            checked={checked}
            callback={onToggle}
        />
    </div>
));
ExpandAllToggle.displayName = 'ExpandAllToggle';
const CareerHeaderContent = React.memo(({ expandAllCareerTiles, toggleExpandAll }) => (
    <StandardHeader
        textb1="career"
        variant="regular"
        rightChildren={
            
            <ExpandAllToggle
                checked={expandAllCareerTiles}
                onToggle={toggleExpandAll}
            />
        }
    />
));

export function AboutPageDesktop({
    hasLoaded,
    srcData,
    expandAllCareerTiles,
    toggleExpandAll,
    careerItems,
    qualItems,
    skillItems,
    textItems,
}) {



    const CareerHeader = useCallback(() => (
        <CareerHeaderContent
            expandAllCareerTiles={expandAllCareerTiles}
            toggleExpandAll={toggleExpandAll}
        />
    ), [expandAllCareerTiles, toggleExpandAll]);



    if (!hasLoaded) return <Loader fillparent />;
    return (

        <ScrollableVerticalView animateIn  staggerStart trackScrollPercent={false}>
            <Section
                sticky
                // Header={() => (
                //     <StandardHeader
                //         textb1="howdy"
                //         texthighlight={srcData.title}
                //         variant="regular"
                //     />
                // )}
            >

                <div className={s.introSection}>
                    <AboutCard
                        title={srcData.title}
                        subtitle={srcData.subtitle}
                        description={srcData.description}
                        areatitle={srcData.areatitle}
                        ismobile={false}
                    />


                    <div className={s.preambleText}>
                        {GetElTextEls({ elements: textItems.preamble?.content ?? [] })}
                    </div>
                </div>

                <Divider/>
            </Section>

            <Section Header={CareerHeader} sticky>

        
                    <CareerSectionContent
                        careerItems={careerItems}
                        expandAllCareerTiles={expandAllCareerTiles}
                    />
            </Section>
            <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="sooo"
                        texthighlight={"I can do    "}
                        variant="regular"
                    />
                )}
            >
                <div className={s.transitionText}>
                    {GetElTextEls({ elements: textItems.career_transition?.content ?? [] })}
                </div>
            </Section>

            <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="big"
                        texthighlight={"quals"}
                        variant="regular"
                    />
                )}
            >

         
                    <div className={s.qualificationsSection}>
                        <StandardGrid animated template="hero">
                            {qualItems.map((qual, i) => (
                                <StandardGrid.Item key={qual.id ?? i}>
                                    <QualificationCard
                                        c={qual}
                                        title={qual.title}
                                        field={qual.field}
                                        gpatag={qual.gpatag}
                                        institution={qual.where}
                                        year={qual.year}
                                    />
                                </StandardGrid.Item>
                            ))}
                        </StandardGrid>
                    </div>

                
            </Section>

            <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="I can do a bit in the"
                        texthighlight={"IT"}
                        textb2={"world"}
                        variant="regular"
                    />
                )}
            >
                <div className={s.experienceText}>
                    {GetElTextEls({ elements: textItems.experience?.content ?? [] })}
                </div>
            </Section>
            <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="things"
                        texthighlight={"I can do    "}
                        variant="regular"
                    />
                )}
            >
                <div className={s.skillsSection}>
                    {/* 

                 {skillItems.map((s, i) => (
                        // <StandardGrid.Item key={s.id ?? i} variant="square">
                            <SkillCard chunk={s} />
                        // </StandardGrid.Item>
                    ))} */}


                    <StandardGrid columns={4} gap="md">
                        {skillItems.map((s, i) => (
                            <StandardGrid.Item key={s.id ?? i} variant="square">
                                <SkillCard chunk={s} />
                            </StandardGrid.Item>
                        ))}
                    </StandardGrid>
                </div>
            </Section>




        </ScrollableVerticalView>

    )
}
