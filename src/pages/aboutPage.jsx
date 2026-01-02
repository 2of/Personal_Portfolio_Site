import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ScrollableVerticalView, Section } from "../ui/scroll/VerticalScrollWithStickyHeaders";
import { StandardHeader } from "../ui/misc/Headers";
import s from "./styles/aboutPage.module.scss";
import { useContent } from "../contexts/ContentContext";
import { Loader } from "../ui/misc/Loader";
import ExpandableCareerTile from "../ui/cards/ExpandOnHoverCardCareerTile";
import StandardToggle from "../ui/standardControls/Toggle";
import QualificationCard from "../ui/cards/QualificationCard";
import StandardGrid from "../ui/grid/StandardGrid";
import { SkillCard } from "../ui/cards/SkillCard";
import { AboutCard } from "../ui/cards/discreteCards/aboutcard";




// dont think its possible to not rerender all... tried a bunch of things... hence the mess... 


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
CareerHeaderContent.displayName = 'CareerHeaderContent';

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
CareerSectionContent.displayName = 'CareerSectionContent';

export const AboutPage = () => {
    const { get, getArticle } = useContent();

    const [hasLoaded, setHasLoaded] = useState(false);
    const [srcData, setSrcData] = useState(null);
    const [expandAllCareerTiles, setExpandAllCareerTiles] = useState(false);


    useEffect(() => {
        const load = async () => {
            const data = await get("about");
            setSrcData(data);
            setHasLoaded(true);
        };
        load();
    }, [get]);

    const toggleExpandAll = useCallback(() => {
        setExpandAllCareerTiles(v => !v);
    }, []);

    const CareerHeader = useCallback(() => (
        <CareerHeaderContent
            expandAllCareerTiles={expandAllCareerTiles}
            toggleExpandAll={toggleExpandAll}
        />
    ), [expandAllCareerTiles, toggleExpandAll]);

    // 🔒 Stable list reference
    // safe defaulting
    const careerItems = useMemo(() => srcData?.career ?? [], [srcData]);
    const qualItems = useMemo(() => srcData?.qualifications ?? [], [srcData]);
    const skillItems = useMemo(() => srcData?.fullskills ?? [], [srcData]);
    const textItems = useMemo(() => srcData?.texts ?? {}, [srcData]);


const getElTextEls = ({ elements = [] }) => {
  return (
    <span className={s.textContainer}>
      {elements.map((item, index) => (
        <span
          key={index}
          className={item.highlight ? s.highlight : s.text}
        >
          {item.content}
        </span>
      ))}
    </span>
  );
};

if (!hasLoaded) return <Loader fillparent />;

return (
    <ScrollableVerticalView >
        <Section
            sticky
            Header={() => (
                <StandardHeader
                    textb1="howdy"
                    texthighlight={srcData.title}
                    variant="regular"
                />
            )}
        >

            <div className={s.introSection}>
                <AboutCard
                    title={srcData.title}
                    subtitle={srcData.subtitle}
                    description={srcData.description}
                    areatitle={srcData.areatitle} 
                />
                <div className={s.preambleText}>
                    {getElTextEls({ elements: textItems.preamble?.content ?? [] })}
                </div>
            </div>
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
                {getElTextEls({ elements: textItems.career_transition?.content ?? [] })}
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
                {getElTextEls({ elements: textItems.experience?.content ?? [] })}
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
);
};
