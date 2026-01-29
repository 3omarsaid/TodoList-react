import { useImmer } from "use-immer";
import { UiContext } from "../contexts/UiContext";
import { ReactNode, SyntheticEvent, useState } from "react";
interface UiProviderProps {
  children: ReactNode;
}
export default function UiProvider({ children }: UiProviderProps) {
  let [filter, setFilter] = useImmer("all");
  const [modal, setModal] = useState<{
    isOpen: boolean;
    todoID: null | number;
  }>({ isOpen: false, todoID: null });
  const [toastIsOpen, setToastIsOpen] = useState(false);

  const toastActions = {
    showToast: () => {
      setToastIsOpen(true);
    },
    closeToast: (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }
      setToastIsOpen(false);
    },
  };

  const modalActions = {
    handleClickOpen: (todoID: number) => {
      if (todoID) {
        setModal({ todoID: todoID, isOpen: true });
      }
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
