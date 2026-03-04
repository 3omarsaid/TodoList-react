import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
interface uiState {
  modal: { isOpen: boolean; todoID: string | null };
  categoryModal: { isOpen: boolean; categoryId: string | null };
  toast: { isOpen: boolean; message: string };
  showToast: (message: string) => void;
  closeToast: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  handleClickOpen: (todoID?: string) => void;
  handleClose: () => void;
  handleCategoryClickOpen: (categoryId?: string) => void;
  handleCategoryClose: (newCategoryId?: string) => void;
  lastCreatedCategoryId: string | null;
}

export const useUiStore = create<uiState>()(
  devtools(
    persist(
      immer((set) => ({
        modal: { isOpen: false, todoID: null },
        categoryModal: { isOpen: false, categoryId: null },
        lastCreatedCategoryId: null,
        toast: { isOpen: false, message: "" },
        showToast: (message) => {
          set((state) => {
            state.toast = { isOpen: true, message };
          });
        },
        closeToast: (event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          set((state) => {
            state.toast = { isOpen: false, message: "" };
          });
        },
        handleClickOpen: (todoID) => {
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
        handleCategoryClickOpen: (categoryId) => {
          if (categoryId) {
            set((state) => {
              state.categoryModal.categoryId = categoryId;
              state.categoryModal.isOpen = true;
            });
          } else {
            set((state) => {
              state.categoryModal.categoryId = null;
              state.categoryModal.isOpen = true;
            });
          }
        },
        handleCategoryClose: (newCategoryId) => {
          set((state) => {
            state.categoryModal.categoryId = null;
            state.categoryModal.isOpen = false;
            if (newCategoryId) {
              state.lastCreatedCategoryId = newCategoryId;
            }
          });
        },
      })),
      { name: "uiStore" },
    ),
  ),
);
