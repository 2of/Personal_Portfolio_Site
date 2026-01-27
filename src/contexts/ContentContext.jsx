import { createContext, useContext, useCallback, useMemo } from "react";
import AboutJSON from "../../public/content/texts/about.json";
import metaJSON from "../../public/content/articles/meta.json"
import WorkPageJSON from "../../public/content/texts/catalogueText.json";
import ProjData from "../json/projects.json"
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
    workText: WorkPageJSON
  };

  // Memoize get to ensure stable identity
  const get = useCallback((which) => {
    return new Promise((resolve) => {
      console.log("this", mapping);
      setTimeout(() => {
        resolve(mapping[which] ?? null);
      }, 200);
    });
  }, []); // Empty dependency array as mapping is constant inside scope but we might want to move mapping to a ref or outside if it was dynamic. 
  // Actually, mapping is recreated every render here. Ideally mapping should be outside or memoized.
  // For now, let's keep it simple and just rely on the fact that mapping *content* doesn't change.
  // Wait, if mapping is defined inside the component, it's a new object every time.
  // So useCallback for 'get' will capture the 'mapping' from the first render if deps is [], which is fine if mapping is constant.

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
    () => ({ get, getArticle, getArticleImageUrl }),
    [get],
  );

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
