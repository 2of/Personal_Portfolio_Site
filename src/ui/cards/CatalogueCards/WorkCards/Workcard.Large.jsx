import React from "react";
import s from "./styles/Workcard.large.module.scss";
import { ModernButton } from "../../../standardControls/button/Button";
import { useNavigateTo } from "../../../../hooks/useNavigate";
import getIcon from "../../../../tools/iconRef";
import { useDarkMode } from "../../../../contexts/DarkMode";

export const WorkCardLarge = ({
  title,
  description,
  date,
  tags,
  links,
  image,
  inprogress,
  tagclickCallback
}) => {
  const truncatedTags = tags?.slice(0, 6) ?? [];
  const gotoURL = useNavigateTo();
  const { darkMode } = useDarkMode();

  const handleTagClick = (t) => { 
    if (!tagclickCallback) return;
    tagclickCallback(t);
  };

  return (
    <div className={s.ContainerLarge}>
      
      {image && (
        <div className={s.imgContainer}>
          {inprogress && (
            <span className={s.progresstag}>In Progress</span>
          )}
          <img src={image} alt={title} className={s.image} />
        </div>
      )}

      <div className={s.textContainer}>
        <div className={s.metaHeader}>
         

        <h4 className={s.title}>{title}</h4>   
         <div className={s.tagContainer}>
            {truncatedTags.map((t, i) => (
              <span 
                key={i} 
                style={{ cursor: "pointer" }}
                onClick={() => handleTagClick(t)}
                className={!darkMode ? "tag" : "tag_outlined"}
              >
                {getIcon(t || "default")}
                {t}
              </span>
            ))}
          </div>
        </div>  

        
        {/* Date wrapped in the tracked, uppercase title-small class */}
        {date && <span className={`${s.date} title-small`}>{date}</span>}
        
        {/* Description updated with body-large for that human-centric reading scale */}
        <p className={`${s.description} body-large`}>{description}</p>

        {links?.length > 0 && (
          <div className={s.footer}>
            <div className={s.links}>
              {links.map((link, i) => (
                <ModernButton
                  key={i}
                  variant="Airline_Ghost"
                  label={link.label}
                  icon={getIcon(link.label)}
                  callback={() => gotoURL(link.to)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};