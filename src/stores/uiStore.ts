import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
interface uiState {
  modal: { isOpen: boolean; todoID: number | null };
  toast: { isOpen: boolean; message: string };
  showToast: (message: string) => void;
  closeToast: () => void;
  handleClickOpen: (todoID?: number) => void;
  handleClose: () => void;
}

export const useUiStore = create<uiState>()(
  devtools(
    persist(
      immer((set) => ({
        modal: { isOpen: false, todoID: null },
        toast: { isOpen: false, message: "" },
        showToast: (message: string) => {
          set((state) => {
            state.toast = { isOpen: true, message };
          });
        },
        closeToast: (event?: React.SyntheticEvent | Event, reason?: string) => {
          if (reason === "clickaway") {
            return;
          }
          set((state) => {
            state.toast = { isOpen: false, message: "" };
          });
        },
        handleClickOpen: (todoID?: number) => {
          if (todoID) {
            set((state) => {
              state.modal.todoID = todoID;
              state.modal.isOpen = true;
            });
          } else {
            set((state) => {
              state.modal.todoID = null;
              state.modal.isOpen = true;
            });
          }
        },
        handleClose: () => {
          set((state) => {
            state.modal.todoID = null;
            state.modal.isOpen = false;
          });
        },
      })),
      { name: "uiStore" },
    ),
  ),
);
