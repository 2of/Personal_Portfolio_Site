import React, { useCallback, useState, useEffect, memo, useMemo } from "react";
import { useNav } from "../../contexts/NavContext";
import { useContent } from "../../contexts/ContentContext";

import { GetElTextEls } from "../../tools/textUnpack";
import {
  ScrollableVerticalView,
  Section,
} from "../../ui/scroll/VerticalScrollWithStickyHeaders";
import { StandardTab } from "../../ui/scroll/StandardTabView";
import { AboutCard } from "../../ui/cards/discreteCards/aboutcard";
import { Loader } from "../../ui/misc/Loader";
import ExpandableCareerTile from "../../ui/cards/ExpandOnHoverCardCareerTile";
import QualificationCard from "../../ui/cards/QualificationCard";
import getIcon from "../../tools/iconRef";
import { StandardPage } from "../../ui/scroll/StandardPage";
import AnimatedRowView from "../../ui/grid/AnimatedRowView";
import StandardGrid from "../../ui/grid/StandardGrid";
import GlassPushOverlay from "../../ui/containers/GlassContainer";
import StandardToggle from "../../ui/standardControls/Toggle";

import image from "../../../public/content/images/res/default.jpg"
import s from "./aboutPageNew.module.scss";
import { Card } from "../../ui/cards/Card";
import { HandWrittenLabel } from "../../ui/misc/HandWrittenLabel";
import { ImageContainer } from "../../ui/images/ImageContainer";



const CareerTab = memo(({ careerItems }) => {
  const [expandAll, setExpandAll] = useState(false);
  const toggle = useCallback(() => setExpandAll((prev) => !prev), []);

  return (
    <div className={s.tabContainer}>
      <div className={s.row} style={{ justifyContent: "flex-end", marginBottom: "1rem" }}>
        <h4 style={{ margin: 0, opacity: 0.6 }}>expand all</h4>
        <StandardToggle type="checkbox" checked={expandAll} callback={toggle} />
      </div>


    <AnimatedRowView effect="tabSlideFromLeft" style={{  }}>
{careerItems.map((c, i) => (
          // <StandardGrid.Item key={c.id ?? i}>
            <ExpandableCareerTile
              {...c}
              alwaysexpand={expandAll}
            />
          // </StandardGrid.Item>
        ))}
      </AnimatedRowView>
      {/* <StandardGrid animated template="large">
        {careerItems.map((c, i) => (
          <StandardGrid.Item key={c.id ?? i}>
            <ExpandableCareerTile
              {...c}
              alwaysexpand={expandAll}
            />
          </StandardGrid.Item>
        ))}
      </StandardGrid> */}
    </div>
  );
});


const AboutSiteCard = memo(({ data }) => (
  <div className={s.tabContainer}>
    <div className={s.siteTabContainer}>
      <div className={s.siteTabHeader}>
        {getIcon("code")} About This Site
      </div>
      <div className={s.siteTabContent}>
        {GetElTextEls({ elements: data?.content ?? [] })}
      </div>
    </div>
  </div>
))

// memo to keep save
const QualificationsTab = memo(({ qualItems }) => (
  <div className={s.tabContainer}>
    <AnimatedRowView effect="tabSlideFromLeft" style={{ display: "grid", gap: "1.5rem" }}>
      {qualItems.map((c, i) => (
        <QualificationCard
          key={c.id ?? i}
          title={c.title}
          institution={c.where}
          year={c.year}
          field={c.field}
          gpatag={c.gpatag}
        />
      ))}
    </AnimatedRowView>
  </div>
));



const SkillsTab = memo(({ skillItems }) => (
  <div className={s.tabContainer}>
    <div className={s.skillsContainer}>
      <div className={s.scrollerParentForVertView}>
        <div className={s.scrollableViewInset}>
          <ScrollableVerticalView>
            <Section
              key="header"
              sticky
              Header={() => (
                <div className={s.skillHeader}>
                  {getIcon("user")} Things I can do
                </div>
              )}
            >
              <div className={s.skillsIntro}>
                <p>Scroll down to view my full technical stack.</p>
                <small>{getIcon("down")}</small>
              </div>
            </Section>
            {skillItems.map((skillChunk, i) => (
              <Section
                key={i}
                sticky
                Header={() => (
                  <div className={s.skillBox}>
                    <div className={s.skillHeader}>
                      {getIcon(skillChunk.icon)} {skillChunk.header}
                    </div>
                  </div>
                )}
              >
                <div className={s.skilltags}>
                  <div className="tagContainer">
                    {skillChunk.skills.map((skill, j) => (
                      <span key={j} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Section>
            ))}
          </ScrollableVerticalView>
        </div>
      </div>
    </div>
  </div>
));




const FeaturedTab = memo(({ project }) => {
  // react loading eh
  if (!project) {
    return (
      <div className={s.tabContainer}>
        <div className={s.featContainer}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={s.tabContainer}>
      <div className={s.featContainer}>
        <Card
          variant="tiktok"
          key={`${project.title}-featured`}
          carddetails={project}
          title={project.title}
          description={project.description}
          date={project.date}
          tags={project.tags}
          links={project.links}
          inprogress={project.inprogress}
          image={project.image}
          ishighlight
          useMobile={false}
        />
        {/* <p style={{ marginTop: "1rem" }}>Highlighted projects will appear here soon.</p> */}
      </div>
    </div>
  );
});

export const AboutPageNewDesktop = ({
  hasLoaded,
  srcData,
  careerItems,
  qualItems,
  skillItems,
  textItems,
}) => {
  const { setNavStuckToTop } = useNav();



  const { getSingleArticleMetaData } = useContent();
  const [featproj, setFeatProj] = useState(getSingleArticleMetaData("geo"))



  useEffect(() => {
    setNavStuckToTop(true);
  }, [setNavStuckToTop]);

  const tabs = useMemo(
    () => ({
      Career: () => <CareerTab careerItems={careerItems} />,
      Qualifications: () => <QualificationsTab qualItems={qualItems} />,
      Skills: () => <SkillsTab skillItems={skillItems} />,
      "This Site": () => <AboutSiteCard data={textItems.aboutthewebsite} />,
      Featured: () => <FeaturedTab project={featproj} />,

    }),
    [careerItems, qualItems, skillItems]
  );

  if (!hasLoaded) {
    return <Loader />;
  }

  return (
    <StandardPage>
      <div className={s.page}>
        <div className={s.pageBg} />

        <div className={s.sidebyside}>

          {/* Left Column — The Blurb */}
          <div className={s.leftCol}>


 <ImageContainer src={image}/>
            <HandWrittenLabel text="That is me!" variant="straight" arrowBefore rotate={16} />
<HandWrittenLabel text="The Important Stuff" variant="straight" rotate={76} />



            <h1>Hello There</h1>
            <h3>You found my website!</h3>
{/* 

            <h3>test</h3>
            <h2>test</h2>
            <h1 className={s.greeting}>
              Hello <span className="text_highlight">there.</span>
            </h1> */}
            <p className={s.greetingSub}>
              {srcData?.subtitle ?? "Welcome to my portfolio."}
            </p>

            <HandWrittenLabel text="The nav is down there somewhere " variant="curveLeft" rotate={180} />


            {/* <GlassPushOverlay showShine={false}>
              <AboutCard
                title={srcData?.title ?? "About Me"}
                subtitle={""}
                description={srcData?.description}
                longdesc={srcData?.longDescription?.content ?? []}
                areatitle={srcData?.areatitle}
              />
            </GlassPushOverlay> */}
          </div>

          {/* Right Column — The Tabs */}
          <div className={s.rightCol}>
            <StandardTab tabs={tabs} tabPosition="top" variant="airline" />
          </div>

        </div>
      </div>
    </StandardPage>
  );
};
