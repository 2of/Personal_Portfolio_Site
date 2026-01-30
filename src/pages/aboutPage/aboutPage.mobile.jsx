// aboutpage/AboutPage.desktop.jsx
import React from "react";
import {
  ScrollableVerticalView,
  Section,
} from "../../ui/scroll/VerticalScrollWithStickyHeaders";
import { StandardHeader } from "../../ui/misc/Headers";
import s from "./aboutPage.mobile.module.scss";
import { Loader } from "../../ui/misc/Loader";
import ExpandableCareerTile from "../../ui/cards/ExpandOnHoverCardCareerTile";
import StandardToggle from "../../ui/standardControls/Toggle";
import QualificationCard from "../../ui/cards/QualificationCard";
import StandardGrid from "../../ui/grid/StandardGrid";
import { SkillCard } from "../../ui/cards/SkillCard";
import { AboutCard } from "../../ui/cards/discreteCards/aboutcard";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { PagedScrollContainer } from "../../ui/scroll/TikTokMobileContainer";
import { useEffect, useState } from "react";
import { useNavStack } from "../../contexts/NavigationButtonsStack";
import { GetElTextEls } from "./support";
import { SmallCareerTileWithModal } from "../../ui/cards/SmallCareerCardWithModal";
import { StandardTab } from "../../ui/scroll/StandardTabView";
import { TimeLineContainer } from "../../ui/containers/TimeLineContainer";
import getIcon from "../../tools/iconRef";
import { ModernButton } from "../../ui/standardControls/button/Button";
import { useModal } from "../../contexts/ModalContext";
export function AboutPageMobile({
  hasLoaded,
  srcData,
  expandAllCareerTiles,
  toggleExpandAll,
  careerItems,
  qualItems,
  skillItems,
  textItems,
}) {
  const [scrollToNextMobileSection, setscrollToNextMobileSection] = useState(0);
  const [scrollToPrevMobileSection, setscrollToPrevMobileSection] = useState(0);
  const { addButton, removeButton } = useNavStack();
  const { screenSize } = useScreenSize();
const {showModal} = useModal();
  const triggerNext = () => {
    setscrollToNextMobileSection((prev) => prev + 1);

  };
  let dataEntries = [1, 23];

  const triggerPrev = () => {
    setscrollToPrevMobileSection((prev) => prev + 1);

  };

  console.log("SKILL ITEMS", skillItems);

  useEffect(() => {
    // console.log("ModernAbout useEffect triggered. screenSize:", screenSize);
    if (screenSize === "sm") {
      console.log("Adding ScrollyNav button");
      addButton({
        id: "upnav",
        callback: triggerPrev,
        label: "up",
        icon: getIcon("up"),
      });
    }

    return () => {
      removeButton({ id: "upnav" });
    };
  }, [screenSize, addButton, removeButton]);

  useEffect(() => {
    console.log("ModernAbout useEffect triggered. screenSize:", screenSize);
    if (screenSize === "sm") {
      console.log("Adding ScrollyNav button");
      addButton({
        id: "downnav",
        callback: triggerNext,
        label: "down",
        icon: getIcon("down"),
      });
    }

    return () => {
      removeButton({ id: "downnav" });
    };
  }, [screenSize, addButton, removeButton]);

  const tabs = {
    Career: () => (
      <>
        <h3>Career</h3>

        <TimeLineContainer>
          {careerItems.map((c, i) => {
            return (
              <SmallCareerTileWithModal
                position={c.position}
                company={c.company}
                duration={c.duration}
                location={c.location}
                doing={c.doing}
                techStack={c.techStack}
              />
            );
          })}
        </TimeLineContainer>
      </>
    ),

    Qualifications: () => (
      <>
        <div className={s.stack}>
          {qualItems.map((c, i) => {
            return (
              <>
                {/* <button onClick={() => console.log(c)}>
                                    test em
                                </button> */}
                <QualificationCard
                  title={c.title}
                  institution={c.where}
                  year={c.year}
                  field={c.field}
                  gpatag={c.gpatag}
                />
              </>
            );
          })}
        </div>
      </>
    ),

    Skills: () => (
      <>
        <div className={s.scrollerParentForVertView}>
          <ScrollableVerticalView>

            <Section
            key={1002}
            sticky
              Header={() => (
                    <span className={s.skillHeader}>
                      {getIcon("user")}
                            Things I can do
                 
                    </span>
                  )}
                  
                  
                  >
    
              <h4>I'm sure i've forgotten something....</h4>
              <br/>
                    <h4>scroll for more {getIcon("down")} </h4>
            </Section>
            {skillItems.map((skillChunk, i) => {
              return (
                <Section
                  key={i}
                  sticky
                  Header={() => (
                    <div className={s.skillBox}>
                      <span className={s.skillHeader}>
                        {" "}
                        {getIcon(skillChunk.icon)} {skillChunk.header}
                      </span>
                    
                 
                    </div>
                  )}
                >
                 <div className={s.skilltags}>
     {skillChunk.skills.map((skill, j) => (
                        <div key={j} className={s.skillItem}>
                          {skill}
                        </div>
                      ))}

                      </div>

                </Section>
              );
            })}

            <h4>
              There's a Guarantee I've forgotten something...
            </h4>
          </ScrollableVerticalView>
        </div>
      </>
    ),
  };

  if (!hasLoaded) return <Loader fillparent />;

  return (
    <PagedScrollContainer
      staggerStart
      borders
      totalSections={3 + dataEntries.length}
      conductnext={scrollToNextMobileSection}
      conductprev={scrollToPrevMobileSection}
    >
      <div sectionHeight="full" key="standard-header-1">
        {/* <StandardTab tabs={tabs} tabPosition="bottom" /> */}

        <AboutCard
          title={srcData.title}
          subtitle={srcData.subtitle}
          description={srcData.description}
          longdesc={srcData.longDescription.content}
          areatitle={srcData.areatitle}
          ismobile = {screenSize === "sm"}
        />
      </div>


<div sectionHeight="quarter" key="standard-header-1">
          {/* <ModernButton
          label="About this site"
          variant="natural"
        /> */}


<div className={s.buttoncluster}>
 <ModernButton
          label="About Me (some More)"
          variant="natural_large_touch"
          icon={getIcon("dunno")}
              callback={() => showModal({
                                title: "About This Website",
                                content: <>
                                 {GetElTextEls({ elements: textItems.preamble?.content ?? [] })}
                                 </>,
                                // floatnav: true,
                                size: "medium"
                            })}
        />
         <ModernButton
          label="About This Website"
          variant="natural_large_touch"
                    icon={getIcon("dunno")}
              callback={() => showModal({
                                title: "About This Website",
                                content: <>
                                 {GetElTextEls({ elements: textItems.concisebout?.content ?? [] })}
                                 </>,
                                // floatnav: true,
                                size: "medium"
                            })}
        />

</div>
       
      </div>
      {/* <div sectionHeight="half" key="standard-header-1">
        <div className={`${s.MobileFS} ${s.TextChunk} StandardBoxL3`}>
          {GetElTextEls({ elements: textItems.preamble?.content ?? [] })}
        </div>
      </div> */}

      <div sectionHeight="full" key="standard-header-1">
        <div className={s.MobileFS}>
          <StandardTab tabs={tabs} tabPosition="bottom" />
          {/* {careerItems.map((c,i) => { 
                        return ( <h1>test</h1>)
                        // <SmallCareerTileWithModal/>
                    })} */}
        </div>
      </div>

      {/* <div sectionHeight="full" key="standard-header-1">
        <div className={s.MobileFS}>
          {GetElTextEls({ elements: textItems.preamble?.content ?? [] })}
        </div>
      </div>

      <div sectionHeight="full" key="standard-header-1">
        <div className={s.MobileFS}>
          {GetElTextEls({ elements: textItems.aboutthewebsite?.content ?? [] })}
        </div>
      </div> */}
    </PagedScrollContainer>
  );
}
