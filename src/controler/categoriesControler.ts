import {
  doc,
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { Category } from "../types";

export const getCategoriesFromDB = async (
  uid: string,
): Promise<Category[] | []> => {
  try {
    if (!uid) {
      console.error("No user logged in");
      return [];
    }
    const q = query(collection(db, `users/${uid}/categories`));
    const categories = await getDocs(q);
    if (categories.empty) return [];

    return categories.docs.map(
      (doc): Category => ({
        id: doc.id,
        name: doc.data().name,
      }),
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const saveCategoryInDB = async (name: string, uid: string) => {
  if (!uid) {
    console.error("No user logged in");
    return;
  }
  try {
    const docRef = doc(collection(db, `users/${uid}/categories`));
    await setDoc(docRef, {
      name,
    });
    return { id: docRef.id };
  } catch (error) {
    console.log(error);
  }
};

export const updateCategoryInDB = async ({
  id,
  name,
  uid,
}: {
  id: string;
  name: string;
  uid: string;
}) => {
  if (!uid) return;
  try {
    const docRef = doc(db, `users/${uid}/categories`, id);
    await updateDoc(docRef, { name });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryInDB = async (id: string, uid: string) => {
  if (!uid) {
    console.error("No user logged in");
    return;
  }
  try {
    const docRef = doc(db, `users/${uid}/categories`, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
};
