import React, { useState } from "react";
import styles from "./styles/editor.module.scss";
import HeaderForm from "./HeaderForm";
import { Article } from "../../ui/article/Article/Article.jsx";
import { StandardCollapsableRow } from "../../ui/containers/CollapsableRow.jsx";
import { ModernButton } from "../../ui/standardControls/button/Button.jsx";
import getIcon from "../../tools/iconRef.jsx";
import { SectionEditor } from "./SectionsEditor";
import { useEffect } from "react";
// import WigglyLine from "../Misc/WigglyLine";
// import { Modal } from "../UI/StandardLib/Modal.jsx";
// import { useAlertMenu } from "../../contexts/AlertMenuContext";
import { useScreenSize } from "../../contexts/ScreenSizeContext.jsx";
import { useToast } from "../../contexts/ToastContext.jsx";
import { useModal } from "../../contexts/ModalContext.jsx";

export const EditorPage = () => {

  // const { alertState, showAlert, hideAlert, alertVisible } = useAlertMenu();
  const screenSize = useScreenSize();
  const [hasShownWarning, sethasShownWarning] = useState(false)
    const {showModal} = useModal();
    const { showToast } = useToast();

    const triggerAlert = () => {
      if (hasShownWarning) return;

       showToast({
                    open: true,
                    title: "A small FYI!",
      
                    text: "This page has no mobile view, but it's enabled for fun :)",
                    timeout: false
                })

    sethasShownWarning(1)
  };

  //
  // const showModal = () => {
  //
  //
  // }

useEffect(() => {
  const timer = setTimeout(() => {
    if (screenSize === "sm") {
      triggerAlert(

      );
    }
  }, 2000); // 2 seconds

  return () => clearTimeout(timer);
}, [screenSize]);
  const [article, setArticle] = useState({
    name: "sample-name",
    title: "Sample Project Title",
    subtitle: "Sample project subtitle description",
    heroImage: "/sample-path/hero.png",
    shortDesc: "Sample short description for SEO/social sharing",
    author: "Sample Author",
    date: "Month 20XX",
    tools: ["sample-tool-1", "sample-tool-2"],
    extratext: "Sample achievement text",
    heroLinks: [
      { text: "Sample link 1", url: "#", icon: "sample-icon" },
      { text: "Sample link 2", url: "#", icon: "sample-icon" },
    ],
    sections: [],
    link: { text: "Sample back link", url: "#" },
  });

  const handleHeaderChange = (updatedMetadata) => {
    setArticle((prev) => ({
      ...prev,
      ...updatedMetadata,
    }));
  };

   const [isModalOpen, setIsModalOpen] = useState(false);


 const handleShowRender = () => {
        setIsModalOpen(true);
 }


    const newOpenModal = () => {
     // alert("TEST")
        showModal({
            title: "ARTICLE PREVIEW ",
            size: "large",
            // floatnav: true,
            content: (
                <Article fixeddata={article}/>
            ),
        });
    };
  const handleCloseRender = () => {
    setIsModalOpen(false);

  };
  const handleSectionUpdate = (index, newData) => {
    const updated = [...article.sections];
    updated[index] = { ...updated[index], ...newData };
    setArticle((prev) => ({ ...prev, sections: updated }));
  };

  const handleAddSection = () => {
    const newSection = {
      id: crypto.randomUUID(),
      type: "plaintext",
      content: "",
    };
    setArticle((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const deleteSection = (idToDelete) => {
    setArticle((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== idToDelete),
    }));
  };

  const moveSectionUp = (index) => {
    if (index <= 0) return; // Already at top
    setArticle((prev) => {
      const updated = [...prev.sections];
      const temp = updated[index - 1];
      updated[index - 1] = updated[index];
      updated[index] = temp;
      return { ...prev, sections: updated };
    });
  };

  const moveSectionDown = (index) => {
    if (index >= article.sections.length - 1) return; // Already at bottom
    setArticle((prev) => {
      const updated = [...prev.sections];
      const temp = updated[index + 1];
      updated[index + 1] = updated[index];
      updated[index] = temp;
      return { ...prev, sections: updated };
    });
  };

  return (

    <>
    {isModalOpen && ( 
  <Modal
          component={<Article fixeddata={article}/>}
          onClose={handleCloseRender}
          size="large"
          title="test"
          isOpen={isModalOpen}
        />)}

    <div className={styles.pageWrapper}>
      <div className={styles.layoutGrid}>
        {/* Left Column - Content */}
        <div className={styles.contentColumn}>
          <h1>Post Editor </h1>
          <h4>For the custom JSON per: 
            
          </h4>

          <p className={styles.subtitle}>Exists purely because I am lazy, use this page to construct articles for my site </p>


          <p className={styles.subtitle}>


            Use to organize and create an article / post that can be viewed on this website. 
            You essentially copy / paste the json it makes
            and can put it into a writeup in public/content/articles
            then you have to point ot it in public/content/articles/meta.json and also probably reference it in projects.json to get it into a catalogue page
          </p>

          {/* Header Section */}
          <h2>Header and Metadata</h2>
          <StandardCollapsableRow title="header" useStandardStyle>
            <div className={styles.sidebysidecells}>
              <div className={styles.inputBox}>
      
                <HeaderForm
                  initialData={article}
                  onChange={handleHeaderChange}
                />
              </div>
         
            </div>
          </StandardCollapsableRow>

          <div className={styles.controlsRow}>

          
            <span> Currently  {article.sections.length} section </span>
              <ModernButton  fillContainer type="rounded_catalogue_card_end_with_label" variant="natural" label="Preview" callback={newOpenModal}/>
              <ModernButton  fillContainer type="rounded_catalogue_card_end_with_label" variant="natural" label = "+ Section" callback={handleAddSection}/>
          </div>
          {article.sections.map((section, i) => (
            <StandardCollapsableRow
              key={section.id}
              title={section.name || `Section ${i + 1}`}
              buttons={[
                {
                  label: "DELETE ",
                  callback: () => deleteSection(section.id),
                },
                {
                  label: "move up ",
                  callback: () => moveSectionUp(i),
                },
                {
                  label: "move down",
                  callback: () => moveSectionDown(i),
                },
              ]}
              useStandardStyle
            >
              <div className={styles.sidebysidecells}>
                {/* You can insert a section content form here later */}

                <SectionEditor
                  section={section}
                  onChange={(newData) => handleSectionUpdate(i, newData)}
                />
              </div>
            </StandardCollapsableRow>
          ))}
        </div>

        {/* Right Column - JSON */}
        <div className={styles.jsonColumn}>
          <div className={styles.jsonBox}>
            <h4>|| JSON Output || </h4>
              <p>Please just copy / paste</p>
            <pre className={styles.jsonOutput}>
              {JSON.stringify(article, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>

        </>
  );
};
