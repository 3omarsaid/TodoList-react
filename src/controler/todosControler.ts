import {
  doc,
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { Todo } from "../types";
export const getTodosFromDB = async (uid: string): Promise<Todo[] | []> => {
  try {
    if (!uid) {
      console.error("No user logged in");
      return [];
    }
    const q = query(collection(db, `users/${uid}/todos`), orderBy("order"));
    const todos = await getDocs(q);
    if (todos.empty) return [];
    return todos.docs.map(
      (doc): Todo => ({
        id: doc.id,
        title: doc.data().title,
        completed: doc.data().completed,
        createdAt: doc.data().createdAt,
        order: doc.data().order,
        categoryId: doc.data().categoryId,
      }),
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const saveTodoInDB = async (
  title: string,
  order: number,
  uid: string,
  categoryId?: string,
) => {
  if (!uid) {
    console.error("No user logged in");
    return;
  }
  try {
    const docRef = doc(collection(db, `users/${uid}/todos`));
    const createdAt = Date.now().toString();
    setDoc(docRef, {
      title,
      completed: false,
      createdAt,
      order,
      ...(categoryId && { categoryId }),
    }).catch((err) => console.error("setDoc error:", err));
    return { id: docRef.id, createdAt };
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoInDB = async ({
  id,
  title,
  completed,
  order,
  uid,
  categoryId,
}: {
  id: string;
  title?: string;
  completed?: boolean;
  order?: number;
  uid: string;
  categoryId?: string | null;
}) => {
  if (!uid) return;
  try {
    const docRef = doc(db, `users/${uid}/todos`, id.toString());
    updateDoc(docRef, {
      ...(title && { title }),
      ...(completed !== undefined && { completed }),
      ...(order !== undefined && { order }),
      ...(categoryId !== undefined && {
        categoryId: categoryId === null ? "" : categoryId,
      }),
    }).catch((err) => console.error("updateDoc error:", err));
  } catch (error) {
    console.log(error);
  }
};
export const deleteTodoInDB = async (id: string, uid: string) => {
  if (!uid) {
    console.error("No user logged in");
    return;
  }
  try {
    const docRef = doc(db, `users/${uid}/todos`, id);
    deleteDoc(docRef).catch((err) => console.error("deleteDoc error:", err));
  } catch (error) {
    console.log(error);
  }
};
