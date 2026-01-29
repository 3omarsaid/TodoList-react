import { createContext, SyntheticEvent, useContext } from "react";
import { Updater } from "use-immer";
interface UiContextprops {
  filter: string;
  setFilter: Updater<string>;
  modal: { isOpen: boolean; todoID: number | null };
  modalActions: {
    handleClickOpen: (todoID: number) => void;
    handleClose: () => void;
  };
  toastIsOpen: boolean;
  toastActions: {
    showToast: () => void;
    closeToast: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  };
}
export let UiContext = createContext<UiContextprops | null>(null);

export let useUi = () => {
  let context = useContext(UiContext);
  if (!context) throw new Error("UiContext must be used within a provider");
  return context;
};
