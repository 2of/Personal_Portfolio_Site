import React, { useCallback, useState, memo } from "react";

import {
  ScrollableVerticalView,
  Section,
} from "../../ui/scroll/VerticalScrollWithStickyHeaders";

import { StandardHeader } from "../../ui/misc/Headers";
import { Loader } from "../../ui/misc/Loader";
import StandardToggle from "../../ui/standardControls/Toggle";
import StandardGrid from "../../ui/grid/StandardGrid";

import ExpandableCareerTile from "../../ui/cards/ExpandOnHoverCardCareerTile";
import QualificationCard from "../../ui/cards/QualificationCard";
import { SkillCard } from "../../ui/cards/SkillCard";

import { TimeLineContainer } from "../../ui/containers/TimeLineContainer";
import { DarkModeTile } from "../../ui/wrappers/DarkModeFancyTile";

import {
  DrawText,
  SVGText,
  TextToSvgComponent_Welcome,
} from "../../ui/misc/TextPath";

import { GetElTextEls } from "../../tools/textUnpack";
import s from "./aboutPage.Desktop.module.scss";
import { AboutCard } from "../../ui/cards/discreteCards/aboutcard";
import GlassPushOverlay from "../../ui/containers/GlassContainer";


const ExpandAllToggle = memo(({ checked, onToggle }) => (
  <div className={s.row}>
    <h4>expand all</h4>
    <StandardToggle
      type="checkbox"
      checked={checked}
      callback={onToggle}
    />
  </div>
));

const CareerSection = memo(({ careerItems }) => {
  const [expandAll, setExpandAll] = useState(false);

  const toggle = useCallback(() => {
    setExpandAll(prev => !prev);
  }, []);

  return (
    <div className={s.careerSection}>
      <div className={s.sectionHeaderRow}>
        <h4>… career</h4>
        <ExpandAllToggle checked={expandAll} onToggle={toggle} />
      </div>

      <TimeLineContainer animated>
        {careerItems.map((c, i) => (
          <ExpandableCareerTile
            key={c.id ?? i}
            {...c}
            alwaysexpand={expandAll}
          />
        ))}
      </TimeLineContainer>
    </div>
  );
});

const QualificationsSection = memo(({ qualItems }) => (
  <div className={s.qualificationsSection}>

    <div className={s.sectionHeaderRow}>
      <h4>… major quals</h4>

    </div>

    <TimeLineContainer animated>
      {qualItems.map((q, i) => (
        <QualificationCard
          key={q.id ?? i}
          c={q}
          title={q.title}
          field={q.field}
          gpatag={q.gpatag}
          institution={q.where}
          year={q.year}
        />
      ))}
    </TimeLineContainer>
  </div>
));


const AboutHero = ({ textItems }) => (
  <div className={s.hero}>
    {/* <div className={s.heroBg}>
      <DarkModeTile />
    </div> */}

    <DrawText duration={3} strokeWidth={1}>
      <SVGText text="GrossHello" width={600} height={400} />
    </DrawText>
    {/* 
    <div className={`${s.preambleText} StandardBoxL3`}>
      {GetElTextEls({ elements: textItems.preamble?.content ?? [] })}
    </div> */}
  </div>
);





export function AboutPageDesktop({
  hasLoaded,
  srcData,
  careerItems,
  qualItems,
  skillItems,
  textItems,
}) {
  if (!hasLoaded) return <Loader fillparent />;

  return (

    <>
      <div className={` ${s.bgContainer} bg-dots-vellum`}>

        <div className={s.bgOverlay} />

        {/* <PegboardBackground/> */}
        {/* <AsciiArt art={asciiArtWindow}  direction="top-down" maxOpacity={0.4}/> */}
      </div>

      <ScrollableVerticalView animateIn staggerStart>
        {/* HERO */}
        <Section>

          <div className={s.editorialLayout}>
            <div className={s.editorialSidebar}>
              <AboutCard
                title={srcData.title}
                subtitle={srcData.subtitle}
                description={srcData.description}
                longdesc={srcData.longDescription.content}
                areatitle={srcData.areatitle}
              />
            </div>

            <div className={s.editorialContent}>
              <article className={`${s.article} ${s.dropCapArticle}`}>
                <h3>About ... in general</h3>

                  {GetElTextEls({ elements: textItems.preamble?.content ?? [] })}
      
              </article>

              <div className={s.editorialSeparator}>
                <span>✦</span>
              </div>

              <article className={s.article}>
                <h3>About [this] website</h3>
    
                  {GetElTextEls({ elements: textItems.concisebout?.content ?? [] })}
    
              </article>
            </div>
          </div>



          {/* <AboutHero textItems={textItems} /> */}
        </Section>

        {/* <Section> 

             <div className={s.splitSection}>
                <div className={s.splitColumn}>
                   <h4>About ... in general .. </h4>
           {GetElTextEls({ elements: textItems.preamble?.content ?? [] })}
          </div>
                <div className={s.splitColumn}>
                  <h4>About [this] website</h4>
           {GetElTextEls({ elements: textItems.concisebout?.content ?? [] })}
          </div>
             </div>
      </Section> */}
        <Section
          sticky
          Header={() => (
            <StandardHeader
              textb1="skills"
              texthighlight="+ expertise"
              variant="regular"
            />
          )}
        >


          <div className={s.skillsSection}>
            {/* 
              <div className={s.experienceText}>
          {GetElTextEls({ elements: textItems.experience?.content ?? [] })}
        </div> */}


            <StandardGrid columns={4} gap="md">
              {skillItems.map((skill, i) => (
                <StandardGrid.Item key={skill.id ?? i} variant="square">

                  <GlassPushOverlay scaleFactor={1} spiciness={2}>
                    <SkillCard chunk={skill} />

                  </GlassPushOverlay>

                </StandardGrid.Item>
              ))}
            </StandardGrid>
          </div>



        </Section>
        {/* CAREER + QUALS */}
        <Section sticky
          Header={() => (
            <StandardHeader
              textb1="skills"
              texthighlight="+ expertise"
              variant="regular"
            />
          )}
        >
          <div className={s.splitSection}>
            <div className={s.splitColumn}>
              <CareerSection careerItems={careerItems} />
            </div>

            <div className={s.splitColumn}>
              <QualificationsSection qualItems={qualItems} />
            </div>
          </div>
        </Section>

        {/* SKILLS  and other SJIALL*/}

      </ScrollableVerticalView>


    </>
  );
}
