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
import { DrawText, TextToSvgComponent_Welcome, TextWPath_HOWDY } from "../../ui/misc/TextPath";
import { TimeLineContainer } from "../../ui/containers/TimeLineContainer";
import { SmallCareerTileWithModal } from "../../ui/cards/SmallCareerCardWithModal";
import { DarkModeTile } from "../../ui/wrappers/DarkModeFancyTile";


const CareerSectionContent = React.memo(({ careerItems, expandAllCareerTiles }) => (
    <div className={s.careerSection}>

        <TimeLineContainer animated>
            {careerItems.map((c, i) => (
                <div key={c.id ?? i}>
                    <ExpandableCareerTile
                        position={c.position}
                        company={c.company}
                        duration={c.duration}
                        location={c.location}
                        doing={c.doing}
                        techStack={c.techStack}
                        alwaysexpand={expandAllCareerTiles}
                    />
                </div>
            ))}
        </TimeLineContainer>
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
const CareerSectionController = React.memo(({ careerItems }) => {
    const [expandAllCareerTiles, setExpandAllCareerTiles] = React.useState(false);

    const toggleExpandAll = useCallback(() => {
        setExpandAllCareerTiles(prev => !prev);
    }, []);

    return (
        <div className={s.careerSection}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3>... Career</h3>
                <ExpandAllToggle
                    checked={expandAllCareerTiles}
                    onToggle={toggleExpandAll}
                />
            </div>

            <CareerSectionContent
                careerItems={careerItems}
                expandAllCareerTiles={expandAllCareerTiles}
            />
        </div>
    );
});


export function AboutPageDesktop({
    hasLoaded,
    srcData,
    careerItems,
    qualItems,
    skillItems,
    textItems,
}) {


    const WelcomeCard = () => {

        return (
            <div className={s.WelcomeCard}>

                <div className={s.bgcontainer}>

                    <DarkModeTile />
                </div>
                <DrawText stagger={7}>
                    <TextToSvgComponent_Welcome width={250} />
                </DrawText>



                <p>This page is a bit of a rough CV</p>
                <p>See links below for a full Resume</p>
            </div>)


    }

    const MainHeader_desktop = () => {

        return (
            <div className={s.introContent_d}>

                <div className={s.bgcontainer}>

                    <DarkModeTile />
                </div>
                <DrawText stagger={7}>
                    <TextToSvgComponent_Welcome width={250} />
                </DrawText>



                <p>This page is a bit of a rough CV</p>
                <p>See links below for a full Resume</p>
            </div>)
    }
    const FancyHeader = () => {
        return (

            <div className={s.fancyheadercontainer}>
                <DrawText stagger={33} strokeWidth={1} >
                    <TextToSvgComponent_Welcome height={100} />
                </DrawText>

                <p> this page is just a quick resume and skills page</p>
            </div>
        )
    }






    if (!hasLoaded) return <Loader fillparent />;



    return (

        <ScrollableVerticalView animateIn staggerStart trackScrollPercent={false}>
            <Section
                sticky
            // Header={() => (
            //     <MainHeader_desktop />
            // )}
            >
                <div className={s.introSection}>

                    <div className={`StandardBoxL3`}>

                        <WelcomeCard />


                        {/* {GetElTextEls({ elements: textItems.preamble?.content ?? [] })} */}
                    </div>

                    <div className={`${s.preambleText} StandardBoxL3`}>
                        <AboutCard
                            title={srcData.title}
                            subtitle={srcData.subtitle}
                            description={srcData.description}
                            areatitle={srcData.areatitle}
                            ismobile={true}
                        />
                    </div>

                </div>
            </Section>

            <Section>
                <div className={`StandardBoxL3`}>

                    {/* <WelcomeCard/> */}


                    {GetElTextEls({ elements: textItems.preamble?.content ?? [] })}
                </div>

            </Section>

            <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="career"
                        texthighlight={"+ quals"}
                        variant="regular"
                    />
                )}
            >
                <div className={s.splitSection}>
                    <div className={s.splitColumn}>
                        <CareerSectionController careerItems={careerItems} />
                    </div>

                    <div className={s.splitColumn}>
                        <div className={s.qualificationsSection}>

                            <h3>... major quals</h3>
                            <TimeLineContainer animated>
                                {qualItems.map((qual, i) => (
                                    <div key={qual.id ?? i}>
                                        <QualificationCard
                                            c={qual}
                                            title={qual.title}
                                            field={qual.field}
                                            gpatag={qual.gpatag}
                                            institution={qual.where}
                                            year={qual.year}
                                        />
                                    </div>
                                ))}
                            </TimeLineContainer>
                        </div>
                    </div>
                </div>
            </Section>

            <Section
                sticky
                Header={() => (
                    <StandardHeader
                        textb1="skills"
                        texthighlight={"+ expertise"}
                        variant="regular"
                    />
                )}
            >
                <div className={s.experienceText}>
                    {GetElTextEls({ elements: textItems.experience?.content ?? [] })}
                </div>

                <div className={`${s.skillsSection} ${s.sectionDivider}`}>
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
