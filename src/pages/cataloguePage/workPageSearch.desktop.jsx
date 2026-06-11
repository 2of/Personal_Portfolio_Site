import React, { useState, useMemo, useCallback } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeContext";
import { DropDown } from "../../ui/standardControls/DropDown";
import { useNavStack } from "../../contexts/NavigationButtonsStack";
import {
  ScrollableVerticalView,
  Section,
} from "../../ui/scroll/VerticalScrollWithStickyHeaders";
import { StandardHeader } from "../../ui/misc/Headers";
import { TextInput } from "../../ui/standardControls/TextInput";
import { ModernButton } from "../../ui/standardControls/button/Button";
import { Card } from "../../ui/cards/Card";
import StandardGrid from "../../ui/grid/StandardGrid";
import { useModal } from "../../contexts/ModalContext";

import s from "./workPageSearch.module.scss";
import getIcon from "../../tools/iconRef";
import {
  DrawText,
  SVGText,
  TextToSvgComponent_Projects,
} from "../../ui/misc/TextPath";
import { useContent } from "../../contexts/ContentContext";
import { TagList } from "../../ui/standardControls/TagContainer";

const EmptyState = ({ query, onClear }) => (
  <div className={s.emptyState}>
    <div className={s.emptyIcon} aria-hidden="true">
      ◌
    </div>
    <p className={s.emptyTitle}>Nothing matched "{query}"</p>
    <p className={s.emptySubtitle}>
      Try a different tag, language, or keyword.
    </p>
    <ModernButton
      variant="nav_Primary"
      label="Clear search"
      callback={onClear}
    />
  </div>
);

const HowItWorksPage = () => {
  return (
    <div className={s.howItWorks}>
      <p>In case anyone was wondering...</p>
      <p>these queries are all client side</p>
      <p>Github pages is free afterall...</p>
    </div>
  );
};

const ResultsMeta = ({ query, count, total }) => (
  <div className={s.resultsMeta}>
    <span className={s.resultsCount}>{count}</span>
    <span className={s.resultsOf}>of {total} projects matched</span>
    <span className={s.resultsQuery}>"{query}"</span>
  </div>
);

export const WorkPageDesktopWithSearch = ({
  allprojects,
  pageText,
  meta,
  pageOrganization,
}) => {
  const screenSize = useScreenSize();

  const { getSingleArticleMetaData } = useContent();
  const [featproj, setFeatProj] = useState(getSingleArticleMetaData("geo"));

  const [searchTerm, setSearchTerm] = useState("");
  const [keystrokeN, setKeystrokeN] = useState(0);
  const [resultsState, setResultsState] = useState("nosearch"); // nosearch | load | show | none
  const [resultsItems, setResultsItems] = useState([]);

  const pretags = ["Python", "Web", "Machine Learning"];

  const searchMeta = useCallback(
    (query) => {
      if (!query || !meta) return [];
      const q = query.toLowerCase();
      return Object.values(meta).filter(
        ({ title, description, tags }) =>
          title?.toLowerCase().includes(q) ||
          description?.toLowerCase().includes(q) ||
          (Array.isArray(tags) &&
            tags.some((t) => t.toLowerCase().includes(q))),
      );
    },
    [meta],
  );

  const runSearch = useCallback(
    async (term = searchTerm) => {
      const trimmed = term.trim();
      if (!trimmed || trimmed === "*") {
        setResultsState("nosearch");
        setResultsItems([]);
        return;
      }
      setResultsState("load");
      const results = await Promise.resolve(searchMeta(trimmed));
      setResultsItems(results);
      setResultsState(results.length ? "show" : "none");
    },
    [searchTerm, searchMeta],
  );

  const [showSearch, setShowSearch] = useState(false);

  const handleShowSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = useCallback(
    (val) => {
      setSearchTerm(val);
      setKeystrokeN((prev) => {
        const next = prev + 1;
        if (next % 3 === 0) {
          runSearch(val);
          return 0;
        }
        return next;
      });
    },
    [runSearch],
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setResultsItems([]);
    setResultsState("nosearch");
  }, []);

  const safeMetaArray = meta ? Object.values(meta) : [];
  const hasSearchTerm = searchTerm.trim().length > 0;

  const handleSetSearchTerm = (t) => {
    setSearchTerm(t);
    if (!showSearch) {
      setShowSearch(true);
    }
    runSearch(t);
  };

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
      useMobile={false}
      isHighlight={isHighlight}
      tagclickCallback={(t) => handleSetSearchTerm(t)}
    />
  );

  const { showModal } = useModal();
  return (
    <ScrollableVerticalView trackScrollPercent>
      <Section color="accent">
        <div className={s.Hero}>

          <div className={s.badgeContainer}>


            {/* <TagList variant="tag" tags = {pageText.Header.langs}/> */}
           
           
           
          </div>
          <div className={s.HeroSearch}>
            <h4>Search...</h4>
            <ModernButton
              icon={getIcon("search")}
              variant="nav_IconOnly"
              callback={() => handleShowSearchToggle()}
            />
          </div>

          <h1>Projects!</h1>
          <h3>So, things I've made...</h3>
          <h4>Or tried to make...</h4>

           <TagList  variant="tag"  tags = {pageText.Header.langs}/>


        </div>
      </Section>

      <Section color="accent">
        {showSearch && (
          <div className={s.searchSurface}>
            <div className={s.searchExtraButtonsContainer}>
              <h4>Quick Filters:</h4>
              {pretags.map((tag, i) => (
                <ModernButton
                  key={i}
                  variant={
                    searchTerm === tag ? "Airline_Secondary" : "Airline_Ghost"
                  }
                  label={tag}
                  callback={() => {
                    setSearchTerm(tag);
                    runSearch(tag);
                  }}
                />
              ))}

              <div className={s.gap} />

              <div className={s.resultsMeta}>
                {hasSearchTerm ? (
                  <>
                    <span className={s.resultsCount}>
                      {resultsItems.length}
                    </span>
                    <span className={s.resultsOf}>
                      found / {safeMetaArray.length} total
                    </span>
                  </>
                ) : (
                  <span className={s.resultsOf}>
                    {safeMetaArray.length} items available
                  </span>
                )}
              </div>

              <div className={s.gapSpacerVert} />
              <ModernButton
                variant="Airline_Ghost"
                label="about this search"
                icon={getIcon("info")}
                callback={() => {
                  showModal({
                    title: "About Search",
                    floatnav: false,
                    size: "medium",
                    content: (
                      <>
                        <div>
                          <a>
                            As i don't update this very frequently and because
                            github pages is free, this is all just parsed client
                            side from a dist/..//../xx.json file.
                          </a>
                          <a>It's lazy, it's cheap and it works alright</a>

                          <a>Anyway thanks for visiting</a>
                        </div>
                      </>
                    ),
                  });
                }}
              />
            </div>

            <div className={s.searchRow}>
              <TextInput
                name="search"
                value={searchTerm}
                variant="regular"
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                placeholder="Type 'Python' or 'Fun' or something else..."
                type="flat"
              />

              {hasSearchTerm && (
                <>
                  <ModernButton
                    variant="Airline_Ghost"
                    label="Search"
                    callback={runSearch}
                  />
                  <ModernButton
                    variant="Airline_Ghost"
                    label="Clear"
                    callback={clearSearch}
                  />
                </>
              )}
            </div>

            {resultsState === "load" && (
              <div className={s.searchFooter}>
                <span className={s.loadingPulse}>
                  Querying client-side index...
                </span>
              </div>
            )}
          </div>
        )}
      </Section>

      {resultsState === "show" && (
        <div className={s.animatedResults}>
          <Section>
            <h2>Results</h2>
            <StandardGrid template="rows" animated>
              {resultsItems.map((item, idx) => (
                <StandardGrid.Item key={`search-${idx}`}>
                  {renderCard(item, idx, "text", item.highlight ?? false)}
                </StandardGrid.Item>
              ))}
            </StandardGrid>
          </Section>
        </div>
      )}

      {resultsState === "none" && (
        <Section>
          <EmptyState query={searchTerm} onClear={clearSearch} />
        </Section>
      )}

      {resultsState === "nosearch" && (
        <div className={s.animatedDefault}>
          {pageOrganization.sections.map((section, i) => (
            <Section
              key={`section-${i}`}
              sticky
              Header={() => (
                <StandardHeader
                  textb1={section.sectionTitleA}
                  texthighlight={section.sectionTitleB}
                  variant="regular"
                />
              )}
            >
              <StandardGrid template={section.variant} animated>
                {section.sectionProjects.map((projKey, idx) => (
                  <StandardGrid.Item
                    key={`${section.sectionTitleA}-${projKey}-${idx}`}
                  >
                    {renderCard(meta[projKey], idx, section.variant, false)}
                  </StandardGrid.Item>
                ))}
              </StandardGrid>
            </Section>
          ))}
        </div>
      )}
    </ScrollableVerticalView>
  );
};