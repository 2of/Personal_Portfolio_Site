import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../ui/misc/Loader";
import { useContent } from "../contexts/ContentContext";
import { Article } from "../ui/article/Article/Article";

export const ArticlePage = () => {
const { getArticle, getArticleImageUrl } = useContent();

  const { projectId } = useParams();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadArticle = async () => {
      try {
        const data = await getArticle(projectId);

        if (mounted) {
          setArticleData(data);
          setHasLoaded(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (projectId) {
      loadArticle();
    }

    return () => {
      mounted = false;
    };
  }, [projectId, getArticle]);

  if (!hasLoaded) {
    return <Loader fillparent text={projectId || "Loading…"} />;
  }

  return (
    <div>
      {/* <h1>{articleData.title ?? projectId}</h1> */}

    <div className="StandardBoxFloat"
    style={{
        position: 'absolute',
        zIndex: 100,
        padding: '0.25rem',
        left: '0.25rem',
        top: '0.25rem'
    }}>Article : // {projectId}</div>

      <Article fixeddata={articleData} name={projectId}/>



      {/* <p>{articleData.description}</p> */}
    </div>
  );
};
