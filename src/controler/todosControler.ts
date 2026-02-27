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

export const getTodosFromDB = async (): Promise<Todo[] | []> => {
  try {
    const q = query(collection(db, "todos"), orderBy("order"));
    const todos = await getDocs(q);
    if (todos.empty) return [];
    return todos.docs.map(
      (doc): Todo => ({
        id: doc.id,
        title: doc.data().title,
        completed: doc.data().completed,
        createdAt: doc.data().createdAt,
        order: doc.data().order,
      }),
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const saveTodoInDB = async (title: string, order: number) => {
  try {
    const docRef = doc(collection(db, "todos"));
    await setDoc(docRef, {
      title,
      completed: false,
      createdAt: Date.now().toString(),
      order,
    });
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoInDB = async ({
  id,
  title,
  completed,
  order,
}: {
  id: string;
  title?: string;
  completed?: boolean;
  order?: number;
}) => {
  try {
    const docRef = doc(db, "todos", id.toString());
    await updateDoc(docRef, {
      ...(title && { title }),
      ...(completed !== undefined && { completed }),
      ...(order !== undefined && { order }),
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteTodoInDB = async (id: string) => {
  try {
    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
  }
};
