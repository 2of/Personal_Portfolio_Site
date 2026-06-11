// aboutpage/AboutPage.desktop.jsx
import React , {useMemo,memo} from "react";
import {
  ScrollableVerticalView,
  Section,
} from "../../ui/scroll/VerticalScrollWithStickyHeaders";
import { StandardHeader } from "../../ui/misc/Headers";
import s from "./aboutPage.new.mobile.module.scss";
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
import { MdAddComment } from "react-icons/md";
import { HomePageItems } from "../homePage";
import { useContent } from "../../contexts/ContentContext";
import { Card } from "../../ui/cards/Card";
import image from "../../../public/content/images/res/default.jpg"
import { ImageContainer } from "../../ui/images/ImageContainer";
import { HandWrittenLabel } from "../../ui/misc/HandWrittenLabel";

export const AboutPageMobileNew = ({
  hasLoaded,
  srcData,
  expandAllCareerTiles,
  toggleExpandAll,
  careerItems,
  qualItems,
  skillItems,
  textItems,
}) => {
  const [scrollToNextMobileSection, setscrollToNextMobileSection] = useState(0);
  const [scrollToPrevMobileSection, setscrollToPrevMobileSection] = useState(0);
  const { addButton, removeButton } = useNavStack();
  const { screenSize } = useScreenSize();

  //   const {showModal} = useModal()
  const { addComponent, removeComponent } = useNavStack();
  const { showModal } = useModal();
  const triggerNext = () => {
    setscrollToNextMobileSection((prev) => prev + 1);
  };
  let dataEntries = [1, 23];

  const triggerPrev = () => {
    setscrollToPrevMobileSection((prev) => prev + 1);
  };






    const { getSingleArticleMetaData } = useContent();
    const [featproj, setFeatProj] = useState(getSingleArticleMetaData("geo"))





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
        // <div className={s.tabContainer}>
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
        // </div>
      );
    });



  useEffect(() => {
    addComponent(
      "work-page-control",

      <ModernButton
        variant="nav_IconOnly"
        callback={() => triggerNext()}
        icon={getIcon("down")}
      />,
    );
    addComponent(
      "work-page-control2",
      <ModernButton
        variant="nav_IconOnly"
        callback={() => triggerPrev()}
        icon={getIcon("up")}
      />,
    );
    return () => {
      removeComponent("work-page-control");
      removeComponent("work-page-control2");
    };
  }, [addComponent, removeComponent]);

  const AboutThisSitePopup = () => {
return (
      <div>

           <div className={"DATASTRIP_TopDivider"}/>
        {GetElTextEls({ elements: textItems.concisebout?.content ?? [] })}


      </div>
    );
  };

  const AboutMeMorePopup = () => {
    return (
      <div>

           <div className={"DATASTRIP_TopDivider"}/>
        {GetElTextEls({ elements: textItems.career_transition?.content ?? [] })}
                <div className={"DATASTRIP_Divider"}/>
        {GetElTextEls({ elements: textItems.programmingdata?.content ?? [] })}
        <div className={"DATASTRIP_Divider"}/>
        {GetElTextEls({ elements: textItems.experience?.content ?? [] })}

      </div>
    );
  };

  const FeatuProjPopUp = () => {
    return <a>test 123</a>;
  };

  const tabs = {
    Career: () => (
      <>
        {/* <h3>Career</h3> */}

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

    Quals: () => (
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

    //     "About Me": () => (
    // <>
    // <h3>hello</h3>
    // </>
    //     ),
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
              <br />
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

            <h4>There's a Guarantee I've forgotten something...</h4>
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
        <div className={s.centerContainer}>
          <HomePageItems />


          <h2>scroll down</h2>
        </div>
      </div>

      <div sectionHeight="half" key="standard-header-1">
        <div className={`${s.centerContainer}  `}>



          <div className={s.gradientoverlay} />
          {/* <HomePageItems/>
 <h3>scroll down</h3> */}



            <div className={s.horizontalcontent}>



                <ImageContainer src={image}/>
            {/* <div className="Airline_Image">
                <img src={image}/>
            </div> */}


      


          <div className={s.buttonStack}>

            <HandWrittenLabel text="That is me!" variant="straight" arrowBefore rotate={270} />
            {/* <div> */}
              <ModernButton
                label="About This Site"
                variant="Airline_TouchLarge"
                 callback={() =>
                  showModal({
                    title: "About",
                    // floatnav: true,
                    size: "medium",
                    content: <AboutThisSitePopup />,
                  })
                }

              />

              {/* <div className={s.spacer} /> */}
              <ModernButton
                ishighlight
                label="More on Me"
                callback={() =>
                  showModal({
                    title: "About",
                    // floatnav: true,
                    size: "medium",
                    content: <AboutMeMorePopup />,
                  })
                }
                variant="Airline_TouchLarge"
              />


                <HandWrittenLabel text="The Important Stuff" variant="straight" rotate={199} />


            {/* </div> */}

            {/* <h3>or just look below</h3> */}

            {/* <ModernButton label="Featured Post" variant="Airline_Secondary" /> */}
            {/* <div className={s.textDivider} /> */}
          </div>

          {/* <AboutCard
           title={srcData.title}
           subtitle={srcData.subtitle}
           description={srcData.description}
           longdesc={srcData.longDescription.content}
           areatitle={srcData.areatitle}
           ismobile={screenSize === "sm"}
         /> */}


            </div>

       
        </div>
      </div>

      <div sectionHeight="full" key="standard-header-1">
        <div className={`${s.FullH} ${s.fullopaque}`}>
          <StandardTab tabs={tabs} tabPosition="top" />
          {/* {careerItems.map((c,i) => { 
                        return ( <h1>test</h1>)
                        // <SmallCareerTileWithModal/>
                    })} */}
        </div>
      </div>

      {/* <div sectionHeight="full" key="standard-header-1">
        <div>test test</div>
      </div> */}




      <div sectionHeight="full" key="standard-header-1">
        <FeaturedTab project={featproj}/>
      </div>


      
    </PagedScrollContainer>
  );
};
