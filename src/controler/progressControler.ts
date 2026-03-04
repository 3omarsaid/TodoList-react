import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

export interface DailyProgress {
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  date: string;
}

const getTodayDateString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};

export const getDailyProgressFromDB = async (
  uid: string,
  dateStr?: string,
): Promise<DailyProgress | null> => {
  if (!uid) return null;
  const targetDate = dateStr || getTodayDateString();
  try {
    const docRef = doc(db, `users/${uid}/progress`, targetDate);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as DailyProgress;
    }
    return null;
  } catch (error) {
    console.error("Error fetching daily progress:", error);
    return null;
  }
};

export const saveDailyProgressInDB = async (
  uid: string,
  totalTasks: number,
  completedTasks: number,
) => {
  if (!uid) return;
  const targetDate = getTodayDateString();
  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  try {
    const docRef = doc(db, `users/${uid}/progress`, targetDate);
    await setDoc(
      docRef,
      {
        totalTasks,
        completedTasks,
        percentage,
        date: targetDate,
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error saving daily progress:", error);
  }
};
