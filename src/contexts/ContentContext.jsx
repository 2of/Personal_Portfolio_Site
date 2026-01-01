import { createContext, useContext } from "react";
import AboutJSON from "../../public/content/texts/about.json";
import metaJSON from "../../public/content/articles/meta.json"

const ContentContext = createContext(null);


export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) console.warn("useContent must be used within a ContentProvider or something ");
  return ctx;
};


export const ContentProvider = ({ children }) => {
  const mapping = {
    about: AboutJSON,




  };

const get = (which) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mapping[which] ?? null);
    }, 500);
  });
};




async function getArticle(dirname) {
  console.log("WE ARE LOOKING FOR", dirname);
  
  const res = await fetch(`/content/articles/${dirname}/main.json`);
  if (!res.ok) {
    throw new Error(`Could not load article: ${dirname}`);
  }

  const data = await res.json();

  // Optional simulated delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return data;
}

function getArticleImageUrl(dirname, imageName) {
  return `/content/articles/${dirname}/images/${imageName}`;
}

  const value = { get, getArticle,getArticleImageUrl };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};
