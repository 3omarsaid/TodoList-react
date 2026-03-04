import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  getDailyProgressFromDB,
  saveDailyProgressInDB,
  DailyProgress,
} from "../controler/progressControler";
import { useTodosStore } from "./todosStore";

interface progressState {
  dailyProgress: DailyProgress | null;
  fetchDailyProgress: (uid: string) => Promise<void>;
  updateDailyProgressLocally: (
    totalTasks: number,
    completedTasks: number,
  ) => void;
  syncDailyProgressToDB: (uid: string) => Promise<void>;
}

export const useProgressStore = create<progressState>()(
  persist(
    immer((set, get) => ({
      dailyProgress: null,
      fetchDailyProgress: async (uid: string) => {
        try {
          const progress = await getDailyProgressFromDB(uid);
          set((state) => {
            state.dailyProgress = progress;
          });
        } catch (error) {
          console.error("Failed to fetch daily progress:", error);
        }
      },
      updateDailyProgressLocally: (
        totalTasks: number,
        completedTasks: number,
      ) => {
        const percentage =
          totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        set((state) => {
          state.dailyProgress = {
            totalTasks,
            completedTasks,
            percentage,
            date: dateStr,
          };
        });
      },
      syncDailyProgressToDB: async (uid: string) => {
        const { dailyProgress } = get();
        if (dailyProgress) {
          await saveDailyProgressInDB(
            uid,
            dailyProgress.totalTasks,
            dailyProgress.completedTasks,
          );
        }
      },
    })),
    { name: "progress-storage" },
  ),
);
