import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Category } from "../types";
import {
  getCategoriesFromDB,
  saveCategoryInDB,
  updateCategoryInDB,
  deleteCategoryInDB,
} from "../controler/categoriesControler";

interface categoriesState {
  categories: Category[];
  activeCategoryFilter: string;
  fetchCategories: (uid: string) => Promise<void>;
  addCategory: (name: string, uid: string) => Promise<string | undefined>;
  editCategory: (id: string, name: string, uid: string) => Promise<void>;
  removeCategory: (id: string, uid: string) => Promise<void>;
  setCategoryFilter: (categoryId: string) => void;
  getCategoryName: (id: string) => string;
}

export const useCategoriesStore = create<categoriesState>()(
  persist(
    immer((set, get) => ({
      categories: [],
      activeCategoryFilter: "all",
      fetchCategories: async (uid: string) => {
        try {
          const fetchedCategories = await getCategoriesFromDB(uid);
          set((state) => {
            state.categories = fetchedCategories;
          });
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      },
      addCategory: async (name: string, uid: string) => {
        try {
          const result = await saveCategoryInDB(name, uid);
          if (!result) return undefined;
          set((state) => {
            state.categories.push({ id: result.id, name });
          });
          return result.id;
        } catch (error) {
          console.log(error);
          return undefined;
        }
      },
      editCategory: async (id: string, name: string, uid: string) => {
        try {
          await updateCategoryInDB({ id, name, uid });
          set((state) => {
            const category = state.categories.find((c) => c.id === id);
            if (category) category.name = name;
          });
        } catch (error) {
          console.log(error);
        }
      },
      removeCategory: async (id: string, uid: string) => {
        try {
          await deleteCategoryInDB(id, uid);
          set((state) => {
            const index = state.categories.findIndex((c) => c.id === id);
            if (index !== -1) {
              state.categories.splice(index, 1);
            }
          });
        } catch (error) {
          console.log(error);
        }
      },
      setCategoryFilter: (categoryId: string) => {
        set((state) => {
          state.activeCategoryFilter = categoryId;
        });
      },
      getCategoryName: (id: string) => {
        const category = get().categories.find((c) => c.id === id);
        return category ? category.name : "";
      },
    })),
    { name: "categories-storage" },
  ),
);
