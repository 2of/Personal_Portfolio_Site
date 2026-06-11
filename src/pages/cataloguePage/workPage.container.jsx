// aboutpage/AboutPage.container.jsx
import { useEffect, useState, useCallback, useMemo } from "react";
import { useContent } from "../../contexts/ContentContext";






export function useProjPageData() {
  const { get } = useContent();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [srcData, setSrcData] = useState({});
  const [projectsMeta, setProjectsMeta] = useState({});
  const [workPageText, setWorkPageText] = useState({});
  const [pageOrganization, setPageOrganization] = useState({});

  useEffect(() => {
    const load = async () => {
      const data = await get("work");

      const workPageText = await get("workText")
      const projectsMeta = await get("projectsMeta")
       const projOrganization = await get("pageOrganization")
      const meta = await get("articleMeta")

      console.log("meta", meta)
      setProjectsMeta(projectsMeta)
      setPageOrganization(projOrganization)
      setWorkPageText(workPageText)
      setSrcData(data);
      setHasLoaded(true);
      // console.log("confirming", workPageText)

    };
    load();
  }, [get]);


  const allprojects = useMemo(() => srcData ?? [], [srcData]);
  const allworkpagetext = useMemo(() => workPageText ?? [], [workPageText]);
  // const projectsMeta = useMemo(() ={}, [] )


  return {
    hasLoaded,
   allprojects,
   allworkpagetext,
   projectsMeta: projectsMeta,
   pageOrganization: pageOrganization
  };
}
