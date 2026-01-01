import React from "react";
import styles from "./ProjectCards.module.scss";
import defaultImg from "../../assets/default.jpeg";

/**
 * Helper to handle link navigation
 * Priority: uses first link in the 'links' array or the 'link' string
 */
const handleNavigation = (project) => {
    const target = project.links?.[0]?.to || project.link;
    if (target) {
        window.open(target.startsWith("http") || target.startsWith("/") ? target : `https://${target}`, "_blank");
    }
};

export const ProjectCard_small = ({ title, description, date, tags, links, link, inprogress }) => {
    return (
        <div
            className={`${styles.cardSmall} StandardBoxL1 StandardBoxClickable ${inprogress ? styles.inProgress : ""}`}
            onClick={() => handleNavigation({ links, link })}
        >
            <div className={styles.smallContent}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.meta}>
                    <span className={styles.date}>{inprogress ? "In Progress" : date}</span>
                    {tags && (
                        <div className={styles.tags}>
                            {tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ProjectCard_regular = ({ title, description, date, tags, links, link, inprogress, image }) => {
    return (
        <div
            className={`${styles.cardRegular} StandardBoxL1 StandardBoxClickable ${inprogress ? styles.inProgress : ""}`}
            onClick={() => handleNavigation({ links, link })}
        >
            <img
                src={image || defaultImg}
                alt={title}
                className={styles.regularThumbnail}
            />
            <div className={styles.regularContent}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.meta}>
                    <span className={styles.date}>{inprogress ? "In Progress" : date}</span>
                    {tags && (
                        <div className={styles.tags}>
                            {tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ProjectCard_singleline = ({ title, description, date, links, link }) => {
    const hasLink = links?.length > 0 || link;
    return (
        <div
            className={`${styles.cardSingleLine} StandardBoxUnderline StandardBoxClickable`}
            onClick={() => handleNavigation({ links, link })}
        >
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.aside}>
                <span className={styles.date}>{date}</span>
                {hasLink && <span className={styles.linkIndicator}>→</span>}
            </div>
        </div>
    );
};

export const ProjectCard_wide = ({ title, description, date, tags, links, link, image }) => {
    return (
        <div
            className={`${styles.cardWide} StandardBoxL2 StandardBoxClickable`}
            onClick={() => handleNavigation({ links, link })}
        >
            <div className={styles.wideImageContainer}>
                <img
                    src={image || defaultImg}
                    alt={title}
                    className={styles.wideImage}
                />
            </div>

            <div className={styles.wideContentWrapper}>
                <div className={styles.wideHeader}>
                    <h3 className={styles.wideTitle}>{title}</h3>
                    <span className={styles.date}>{date}</span>
                </div>
                <p className={styles.wideDescription}>{description}</p>
                <div className={styles.wideFooter}>
                    <div className={styles.tags}>
                        {tags?.map((tag, i) => (
                            <span key={i} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                    <div className={styles.linkGroup}>
                        {links?.map((l, i) => (
                            <span key={i} className={styles.wideLink}>{l.label} →</span>
                        ))}
                        {!links && link && <span className={styles.wideLink}>View →</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ProjectCard_large= ({ title, description, date, tags, links, link, image }) => {
    return (
        <div
            className={`${styles.cardWide} StandardBoxL2 StandardBoxClickable`}
            onClick={() => handleNavigation({ links, link })}
        >
            <div className={styles.wideImageContainer}>
                <img
                    src={image || defaultImg}
                    alt={title}
                    className={styles.wideImage}
                />
            </div>

            <div className={styles.wideContentWrapper}>
                <div className={styles.wideHeader}>
                    <h3 className={styles.wideTitle}>{title}</h3>
                    <span className={styles.date}>{date}</span>
                </div>
                <p className={styles.wideDescription}>{description}</p>
                <div className={styles.wideFooter}>
                    <div className={styles.tags}>
                        {tags?.map((tag, i) => (
                            <span key={i} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                    <div className={styles.linkGroup}>
                        {links?.map((l, i) => (
                            <span key={i} className={styles.wideLink}>{l.label} →</span>
                        ))}
                        {!links && link && <span className={styles.wideLink}>View →</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};


export const ProjectCard_hero = ({ title, description, date, tags, links, link, inprogress, image }) => {
    return (
        <div
            className={`${styles.cardHero} StandardBoxTopAccent StandardBoxClickable`}
            onClick={() => handleNavigation({ links, link })}
        >
            <div className={styles.heroBackground}>
                <img
                    src={image || defaultImg}
                    alt={title}
                    className={styles.heroImg}
                />
                <div className={styles.heroOverlay} />
            </div>

            <div className={styles.heroContent}>
                <div className={styles.heroHeader}>
                    <div className={styles.tags}>
                        {inprogress && <span className={styles.progressBadge}>Active</span>}
                        {tags?.map((tag, i) => (
                            <span key={i} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                    <span className={styles.date}>{date}</span>
                </div>
                <h2 className={styles.heroTitle}>{title}</h2>
                <p className={styles.heroDescription}>{description}</p>
                <div className={styles.heroLinkGroup}>
                    {links ? (
                        links.map((l, i) => (
                            <button key={i} className={styles.heroLinkBtn}>{l.label}</button>
                        ))
                    ) : (
                        link && <span className={styles.heroLink}>View Project →</span>
                    )}
                </div>
            </div>
        </div>
    );
};