// aboutpage/AboutPage.container.jsx
import { useEffect, useState, useCallback, useMemo } from "react";
import { useContent } from "../../contexts/ContentContext";

export function useProjPageData() {
  const { get } = useContent();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [srcData, setSrcData] = useState(null);
  const [workPageText, setWorkPageText] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await get("work");
      const workPageText = await get("workText")
      setWorkPageText(workPageText)
      setSrcData(data);
      setHasLoaded(true);
      // console.log("confirming", workPageText)

    };
    load();
  }, [get]);


  const allprojects = useMemo(() => srcData ?? [], [srcData]);
  const allworkpagetext = useMemo(() => workPageText ?? [], [workPageText]);



  return {
    hasLoaded,
   allprojects,
   allworkpagetext
  };
}
