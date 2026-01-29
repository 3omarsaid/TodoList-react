import { useImmer } from "use-immer";
import { UiContext } from "../contexts/UiContext";
import { useState } from "react";
export default function UiProvider({ children }) {
  let [filter, setFilter] = useImmer("all");
  const [modal, setModal] = useState({ isOpen: false, todoID: null });
  const [toastIsOpen, setToastIsOpen] = useState(false);

  const toastActions = {
    showToast: () => {
      setToastIsOpen(true);
    },
    closeToast: (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setToastIsOpen(false);
    },
  };

  const modalActions = {
    handleClickOpen: (todoID) => {
      setModal({ isOpen: true, todoID });
    },
    handleClose: () => {
      setModal({ isOpen: false, todoID: null });
    },
  };
  return (
    <UiContext.Provider
      value={{
        filter,
        setFilter,
        modal,
        modalActions,
        toastIsOpen,
        toastActions,
      }}
    >
      {children}
    </UiContext.Provider>
  );
}
