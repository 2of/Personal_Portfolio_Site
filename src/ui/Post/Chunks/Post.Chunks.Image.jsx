import React from "react";
import ImageHandle from "../../images/ImageHandle";
import { useContent } from "../../../contexts/ContentContext";
import s from "./styles/PostChunkImage.module.scss"

export const Post_Chunk_Image = ({ src, alt, className, onError }) => {


  return (
    <div className={s.container}>
      <ImageHandle src={src} alt={alt} onError={onError} />

      {/* <h1>{artURL}</h1> */}
      {alt && <div className={s.imageCaption}>{alt}</div>}  
    </div>
  );
};