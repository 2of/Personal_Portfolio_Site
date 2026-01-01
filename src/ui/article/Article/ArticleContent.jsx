import React from "react";
import reg_styles from "./ArticleContentMultiCol.module.scss";
import {
  ParagraphSection,
  ImageSection,
  HighlightSection,
  PillsSection,
  LinkSection,
  CodeSection,
  TitleSection,
  DataSection,
  GridSection,
} from "./Sections";
import { useContent } from "../../../contexts/ContentContext";

// Render one item (paragraph, image, link, etc.)
export const renderItem = (item, index, styles, showTooltip, hideTooltip, key, articlename = "") => {
  const { getArticleImageUrl } = useContent();

  const finalKey = key || item.id || item.name || index;

  switch (item.type) {
    case "paragraph":
      return (
        <ParagraphSection
          key={finalKey}
          text={item.text}
          className={styles.paragraph}
        />
      );
    case "image":
      return (
        <ImageSection
          key={finalKey}
          src={getArticleImageUrl(articlename, item.src)}
          alt={item.alt}
          className={styles.imageContainer}
        />
      );
    case "grid":
      return <GridSection key={finalKey} rows={item.rows} styles={styles} />;
    case "data":
      return (
        <DataSection
          key={finalKey}
          title={item.title}
          datapoints={item.datapoints}
          className={styles.DataSection}
          styles={styles}
        />
      );
    case "highlight":
      return (
        <HighlightSection
          key={finalKey}
          text={item.text}
          className={styles.highlight}
        />
      );
    case "pills":
      return (
        <PillsSection
          key={finalKey}
          pills={item.pills}
          pillStyle={styles.pill}
          className={styles.pillsContainer}
        />
      );
    case "link":
      return (
        <LinkSection
          key={finalKey}
          truncatable={item.truncatable}
          to={item.to}
          label={item.label}
          className={styles.linkItem}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
        />
      );
    case "title":
      return (
        <TitleSection
          key={finalKey}
          text={item.text}
          className={styles.titleinline}
        />
      );
    case "code":
      return (
        <CodeSection
          key={finalKey}
          language={item.language}
          content={item.content}
          className={`${styles.codeBlock} ${item.truncatable && styles.truncate
            }`}
          styles={styles}
        />
      );
    default:
      return null;
  }
};

// Individual section renderer
const Section_ = React.memo(({ data, styles, showTooltip, hideTooltip, articlename = "" }) => {
  const getItemKey = (item, index) => item.id || item.name || `item-${index}`;

  return (
    <div className={data.boost ? styles.HighLightSection : ""}>
      {data.name && <h3 className={data.boost ? styles.sectionName : styles.sectionTitle}>{data.name}</h3>}
      {Array.isArray(data.items) && (
        <div className={data.boost ? styles.items : styles.sectionItems}>
          {data.items.map((item, index) =>
            renderItem(item, index, styles, showTooltip, hideTooltip, getItemKey(item, index), articlename)
          )}
        </div>
      )}
    </div>
  );
});

export const ArticleContent = ({ data, articlename = "" }) => {
  const styles = reg_styles;

  return (
    <div className={styles.ContentContainer}>
      {data?.sections?.map((section, sectionIndex) => (
        <div className={styles.sectionContainer} key={`section-${sectionIndex}`}>
          <Section_
            data={section}
            styles={styles}
            articlename={articlename}
          />
        </div>
      ))}
    </div>
  );
};