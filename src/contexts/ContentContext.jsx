import { createContext, useContext, useCallback, useMemo } from "react";
import AboutJSON from "../../public/content/texts/about.json";
import metaJSON from "../../public/content/articles/meta.json"
import WorkPageJSON from "../../public/content/texts/catalogueText.json";
import ProjData from "../json/projects.json"
import ProjWorkCatalogueStructure from "../json/projectPageOrg.json"
import projectsMeta from "../json/projectsmeta.json"
import projOrganization from "../json/projectPageOrg.json"
import AboutWebsiteContent from "../../public/content/texts/aboutSite.json"
const ContentContext = createContext(null);





export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) console.warn("useContent must be used within a ContentProvider or something ");
  return ctx;
};




export const ContentProvider = ({ children }) => {
  const mapping = {
    about: AboutJSON,
    work: ProjData,
    workText: WorkPageJSON,
    projectsMeta: projectsMeta,
    pageOrganization: projOrganization,
    aboutSite: AboutWebsiteContent
  };

  // Memoize get to ensure stable identity and stop this reloadded nonsens
  const get = useCallback((which) => {
    return new Promise((resolve) => {
      // console.log("this", mapping);
      setTimeout(() => {
        resolve(mapping[which] ?? null);
      }, 200);
    });
  }, []); 


  const getSingleArticleMetaData= ((which) => { 
    return (projectsMeta[which] || {} )
  })

  

  async function getArticle(dirname) {
    const res = await fetch(`/content/articles/${dirname}/main.json`);
    console.log(`/content/articles/${dirname}/main.json`);
    console.log("Fetch status:", res.status, res.ok);
    if (!res.ok) {
      throw new Error(
        `Could not load article ${dirname}, status: ${res.status}`,
      );
    }
    const data = await res.json();
    return data;
  }

  function getArticleImageUrl(dirname, imageName) {
    return `/content/articles/${dirname}/images/${imageName}`;
  }


  const value = useMemo(
    () => ({ get, getArticle, getArticleImageUrl,getSingleArticleMetaData }),
    [get],
  );

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
