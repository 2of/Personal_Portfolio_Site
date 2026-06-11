import React, { createContext, useCallback, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalMenuProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    open: false,
    type: "default",       
    title: "",
    content: null,     
    size: "",    // can be JSX or string wahtever
    buttons: [],           // optional buttons get put in top bar
    extraData: null,      
    floatnav: false
  });

  const showModal = (options = {}) => {
    console.log("CALLED ME")
    setModalState({
      open: true,
      type: options.type || "default",
      title: options.title || "",
      content: options.content || null,
      size: options.size || "large",
      buttons: options.buttons || [],
      extraData: options.extraData || null,
      floatnav: options.floatnav || false
    });
  };

  const hideModal = useCallback(() => {
    console.log("hideModal called"); // will now always log
    setModalState(prev => ({
      ...prev,
      open: false,
      type: "default",
      title: "",
      size: "small",
      content: null,
      buttons: [],
      extraData: null,
       floatnav: false
    }));
  }, []);
  const modalVisible = modalState.open;

  return (
    <ModalContext.Provider
      value={{
        modalState,
        showModal,
        hideModal,
        modalVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};