import React from "react";
import s from "./NewsPaper.module.scss";

// Render a classic newspaper block
const NewspaperItem = ({ title, description, color, gridClass, isBg, proj }) => {
    // Highly visible gap-fillers with dummy ad/filler text or explicit styling
    if (isBg) {
        return (
            <div className={`${gridClass}`} style={{ backgroundColor: color || '' }}></div>
        )
    }

    return (
        <div className={gridClass} style={{ backgroundColor: color }}>
            {proj?.image && (
                <div className={s.itemImageWrap}>
                    <img src={proj.image} alt={title} className={s.itemImage} />
                </div>
            )}

            <div className={s.itemTextContent}>
                {/* Journalistic Date / Issue Info */}
                {proj?.date && <div className={s.itemDate}>{proj.date}</div>}

                {title && (
                    <h3 className={s.itemHeader}>
                        {title}
                    </h3>
                )}

                {/* Small Editorial Tags */}
                {proj?.tags && proj.tags.length > 0 && (
                    <div className={s.itemTags}>
                        {proj.tags.map(t => <span key={t}>{t}</span>)}
                    </div>
                )}

                {description && (
                    <div className={s.itemDescription}>
                        <p>{description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export const NewsPaperPage = ({ allprojects, pageText }) => {
    // We drop the vibrant solid colors since we are going for an elegant monochrome journalistic style
    // inside a pristine 1px separated grid layout.

    const getGridClass = (index) => {
        const i = index % 7;
        if (i === 0) return `${s.itemWrap} ${s.large}`;
        if (i === 1 || i === 2) return `${s.itemWrap} ${s.small}`;
        if (i === 3) return `${s.itemWrap} ${s.medium}`;
        if (i === 4) return `${s.itemWrap} ${s.small}`;
        if (i === 5) return `${s.itemWrap} ${s.medium}`;
        if (i === 6) return `${s.itemWrap} ${s.small}`;
        return `${s.itemWrap} ${s.small}`;
    }

    let projectIndexCounter = 0;

    return (
        <div className={s.newspaperPageContainer}>
            {/* Background Gutters. We generate 50 rows of them to act as continuous wrapping ad/filler columns */}
            {Array.from({ length: 50 }).map((_, i) => (
                <React.Fragment key={`bg-${i}`}>
                    <NewspaperItem isBg gridClass={`${s.bg} ${s.bgLeft}`} />
                    <NewspaperItem isBg gridClass={`${s.bg} ${s.bgRight}`} />
                </React.Fragment>
            ))}

            {/* Editorial "About" Block */}
            {pageText?.preamble && (
                <NewspaperItem
                    title="About"
                    description="Editorial preamble text here..."
                    gridClass={`${s.itemWrap} ${s.large}`}
                />
            )}

            {/* Sections & Projects */}
            {allprojects && Object.entries(allprojects).map(([sectionKey, sectionData], secColIndex) => (
                <React.Fragment key={sectionKey}>

                    {/* Section Header */}
                    <NewspaperItem
                        title={`— ${sectionData.title} —`}
                        description={sectionData.preamble || "Section metadata..."}
                        gridClass={`${s.itemWrap} ${s.medium} ${s.sectionBlock}`}
                    />

                    {/* Section Projects */}
                    {sectionData.projects.map((proj, projIdx) => {
                        const layoutClasses = getGridClass(projectIndexCounter++);

                        return (
                            <NewspaperItem
                                key={`${proj.title}-${projIdx}`}
                                proj={proj}
                                title={proj.title}
                                description={proj.description}
                                gridClass={layoutClasses}
                            />
                        )
                    })}
                </React.Fragment>
            ))}
        </div>
    )
}

