import React from "react";
import styles from "./styles/Card.Article.Large.module.scss";
// import styles from "./styles/Card.Article.Large.module.scss";
import { useNavigateTo } from "../../../hooks/useNavigate";
import getIcon from "../../../tools/iconRef";
import { ModernButton } from "../../standardControls/button/Button";

export const ArticleCardRegular = ({
  title,
  description,
  tags,
  links,
  image,
  inprogress,
  highlight = false,
}) => {
  const gotoURL = useNavigateTo();

  return (
    <article
      className={`
        DATASTRIP_Container
        ${styles.card}
        ${highlight ? "MaterialColoursGlow" : ""}
      `}
    >
      {/* Left hatch divider */}
      <div className="DATASTRIP_Divider" aria-hidden="true" />

      {/* Image panel */}
      {image && (
        <div className={`DATASTRIP_TerminalBody ${styles.imagePanel}`}>
          <img src={image} alt={title} className={styles.image} />
          {inprogress && (
            <div className={`DATASTRIP_Status ${styles.liveChip}`}>
              ● LIVE_SYSTEM
            </div>
          )}
        </div>
      )}

      {/* Main content */}
      <div className={`DATASTRIP_TerminalBody ${styles.contentColumn}`}>
        <div className="DATASTRIP_MetaHeader">ARTICLE_RECORD</div>

        <h2 className={styles.title}>{title}</h2>

        {tags?.length > 0 && (
          <div className={styles.tagsRow}>
            {tags.map((tag, i) => (
              <span key={i} className="DATASTRIP_Status">{tag}</span>
            ))}
          </div>
        )}

        <p className={styles.description}>{description}</p>

        {links?.length > 0 && (
          <footer className={`${styles.footerActions} ${styles.footer}`}>
            {links.map((l, i) => (
              <ModernButton
                key={i}
                variant="Magazine_Secondary"
                icon={getIcon(l.icon || "info")}
                label={l.label}
                callback={(e) => {
                  e.stopPropagation();
                  gotoURL(l.to);
                }}
              />
            ))}
          </footer>
        )}
      </div>

      {/* Right vertical info aside */}
      <div className={`DATASTRIP_VerticalInfo ${styles.aside}`}>
        <div>
          <span className="value">{tags?.length ?? 0}</span>
          <span className="label">TAGS</span>
        </div>
        <div>
          <span className="value">{links?.length ?? 0}</span>
          <span className="label">LINKS</span>
        </div>
        {inprogress && (
          <div className="DATASTRIP_Status">LIVE</div>
        )}
      </div>

      {/* Right hatch divider */}
      <div className="DATASTRIP_Divider" aria-hidden="true" />
    </article>
  );
};