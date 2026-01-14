// aboutpage/AboutPage.container.jsx
import { useEffect, useState, useCallback, useMemo } from "react";
import { useContent } from "../../contexts/ContentContext";

export function useAboutPageData() {
  const { get } = useContent();

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

  const careerItems = useMemo(() => srcData?.career ?? [], [srcData]);
  const qualItems = useMemo(() => srcData?.qualifications ?? [], [srcData]);
  const skillItems = useMemo(() => srcData?.fullskills ?? [], [srcData]);
  const textItems = useMemo(() => srcData?.texts ?? {}, [srcData]);

  return {
    hasLoaded,
    srcData,
    expandAllCareerTiles,
    toggleExpandAll,
    careerItems,
    qualItems,
    skillItems,
    textItems,
  };
}
