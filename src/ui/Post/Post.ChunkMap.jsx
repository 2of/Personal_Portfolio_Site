import React from "react";
import { Post_Chunk_Highlight, Post_Chunk_Paragraph } from "./Chunks/Post.Chunks.Text";
import { Post_Chunk_Image } from "./Chunks/Post.Chunks.Image";
import { useContent } from "../../contexts/ContentContext";

/**
 * Chunk components TEMPORARY
 */
function TextChunk({ text, boost }) {
  return (
    <p style={{ fontWeight: boost ? "bold" : "normal" }}>
      {text}
    </p>
  );
}

function ListChunk({ name, items = [] }) {
  return (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{String(item)}</li>
        ))}
      </ul>
    </div>
  );
}
const imageMap = ({src,alt,articlename}) => { 
    const {getArticleImageUrl} = useContent();
     return (<Post_Chunk_Image src={getArticleImageUrl(articlename,src)} alt={alt}/>)
    return(<h2>test {getArticleImageUrl(articlename,src)}</h2>)
}




function UnknownChunk({ type }) {
  return (
    <p style={{ color: "red" }}>
      chunk not recognized: {type ?? "missing type"}
    </p>
  );
}

/**
 * Mapping of chunk types to components
 */
const Mapping = {
  paragraph: Post_Chunk_Paragraph,
  list: ListChunk,
  highlight: Post_Chunk_Highlight,
  image: imageMap,
};



/**
 * Render chunks as an array of JSX elements
 * @param {Array} chunksArray
 * @returns {JSX.Element[]}
 */
export function PostChunkAsArray(chunksArray = [], articlename) {
  if (!Array.isArray(chunksArray)) return null;




  return chunksArray.map((chunk, index) => {
    const Component = Mapping[chunk.type] ?? UnknownChunk;

    // Spread all chunk props, plus type for UnknownChunk
    return <Component key={chunk.id ?? index} {...chunk} articlename={articlename} type={chunk.type} />;
  });
}
