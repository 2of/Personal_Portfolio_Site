import React, { useEffect, useState, useMemo } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { Card } from "../../ui/cards/Card";
import { ScrollableVerticalView, Section } from "../../ui/scroll/VerticalScrollWithStickyHeaders";
import { StandardHeader } from "../../ui/misc/Headers";
import styles from "./workPage.Desktop.module.scss";
import { DropDown } from "../../ui/standardControls/DropDown";
import { DrawText, SVGText } from "../../ui/misc/TextPath";
import TinderView from "../../ui/containers/TinderCards";
import { useNavStack } from "../../contexts/NavigationButtonsStack";
import StandardGrid from "../../ui/grid/StandardGrid";

export const WorkPageDesktop = ({ allprojects }) => {
  const screenSize = useScreenSize();
  const [viewType, setViewType] = useState("List");
  const { addComponent, removeComponent } = useNavStack();

  const listOptions = [
    { value: "List", label: "View As List" },
    { value: "Stack", label: "View as Stack" }
  ];

  const navControlComponent = useMemo(
    () => (
      <DropDown
        key="work-view-selector"
        options={listOptions}
        placeholder="Select layout"
        onChange={setViewType}
        value={viewType}
      />
    ),  
    [viewType]
  );

  useEffect(() => {
    addComponent("work-page-control", navControlComponent);
    return () => removeComponent("work-page-control");
  }, [addComponent, removeComponent, navControlComponent]);

  const MainHeader_desktop = ({ screenSize }) => (
    <div className={styles.introContent_d}>
      {screenSize === "lg" && (
        <DrawText stagger={7} strokeWidth={1} stroke="border" duration={122}>
          <SVGText text="isoHello" width={800} height={500} />
        </DrawText>
      )}
      {screenSize === "md" && (
        <DrawText stagger={7} strokeWidth={0.5} duration={12} stroke="border">
          <SVGText text="isoHello" width={500} height={400} />
        </DrawText>
      )}
    </div>
  );

  const renderCard = (project, index, sectionVariant, isHighlight = false) => (
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
      isHighlight={isHighlight}
    />
  );

  const ScrollableView = ({ header, projects }) => (
    <ScrollableVerticalView displayTracker trackScrollPercent staggerStart header={header}>
      <Section key="intro" sticky  header={<MainHeader_desktop screenSize={screenSize} />}>

      <div className={styles.splithorizontal5050container}>

    <a className={"ColorText1 "}>
projects

     </a>
{/* <h3>
  test
</h3> */}
{/* <a>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel sit, dolore aspernatur ut ratione non suscipit optio! Perferendis ad quisquam accusamus reprehenderit odio laboriosam architecto dolores incidunt accusantium veritatis sit mollitia illum corrupti ut nam, nostrum id. Voluptatibus cum maxime autem aspernatur, a dolorum sunt deserunt nobis sint atque vitae sit suscipit enim eum! Placeat delectus perspiciatis ut hic expedita iusto et vitae minima velit laboriosam, atque iste maiores eaque soluta molestiae corrupti sequi, quos beatae ex pariatur! Optio dolores quibusdam a vero ducimus culpa, officiis explicabo rerum saepe delectus natus doloremque quos hic blanditiis, cumque, eum incidunt. Rerum reprehenderit magni, deserunt dolorem quis veniam voluptate illum repellendus quae suscipit dolore quia maiores fugit maxime corrupti consequatur odit ipsa? Vero delectus magnam similique. Quis, beatae distinctio molestiae odio iure blanditiis repellat fugit vel adipisci veniam eveniet consequatur tempora dolore nam vero eos cumque error, ipsum et! Veniam animi illum debitis corporis a reiciendis ullam, dolores excepturi inventore autem, neque totam deserunt libero voluptatibus doloremque natus nihil sapiente pariatur numquam amet! Rerum quisquam minima nobis ratione perspiciatis nam, quibusdam aliquid illum, sint voluptates necessitatibus? Recusandae obcaecati illo molestias, vero, cum perspiciatis praesentium rem facere voluptas sunt nobis provident eaque voluptatum laudantium.</a> */}
     
      </div>
 

        </Section>
      {Object.entries(projects).map(([sectionKey, sectionData]) => (
        <Section
          key={sectionKey}
          sticky
          Header={() => (
            <StandardHeader
              textb1={sectionData.title}
              texthighlight={sectionData.title_highlight}
              variant="HeaderGlass"
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
                {renderCard(proj, projectIndex, sectionData.variant, proj.highlight ?? false)}
              </StandardGrid.Item>
            ))}
          </StandardGrid>
        </Section>
      ))}
    </ScrollableVerticalView>
  );

  const TinderyView = ({ header, projects }) => {
    const [dowiggle, setdowiggle] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => setdowiggle(true), 2000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className={styles.tinderstackcontainer}>
        <TinderView setwiggle={dowiggle}>
          {header}
          {Object.values(projects).flatMap((section) =>
            section.projects.map((proj, i) => renderCard(proj, i, "dating", proj.highlight ?? false))
          )}
        </TinderView>
      </div>
    );
  };

  const header = <MainHeader_desktop screenSize={screenSize} />;

  return (
    <div className={styles.WorkPage}>
      {viewType === "Stack" ? (
        <TinderyView header={header} projects={allprojects} />
      ) : (
        <ScrollableView header={header} projects={allprojects} />
      )}
    </div>
  );
};