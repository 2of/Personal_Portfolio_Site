import React from "react";
import ImageHandle from "../../images/ImageHandle";
import { useContent } from "../../../contexts/ContentContext";


export const Post_Chunk_Image = ({ src, alt, className, onError }) => {


  return (
    <div className={className}>
      <ImageHandle src={src} alt={alt} onError={onError} />

      {/* <h1>{artURL}</h1> */}
      {alt && <div className="imageCaption">{alt}</div>}
    </div>
  );
};