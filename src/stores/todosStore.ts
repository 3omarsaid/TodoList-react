import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  deleteTodoInDB,
  getTodosFromDB,
  saveTodoInDB,
  updateTodoInDB,
} from "../controler/todosControler";
import { Todo } from "../types";
import { useProgressStore } from "./progressStore";

const updateProgress = (todos: Todo[], uid: string) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((t) => t.completed).length;
  useProgressStore
    .getState()
    .updateDailyProgressLocally(totalTasks, completedTasks);
  useProgressStore.getState().syncDailyProgressToDB(uid);
};

interface todoState {
  todos: Todo[];
  filter: string;
  addTodo: (title: string, uid: string, categoryId?: string) => void;
  editTodo: (
    id: string,
    title: string,
    uid: string,
    categoryId?: string,
  ) => void;
  toggleComblete: (id: string, uid: string) => void;
  removeTodo: (id: string, uid: string) => void;
  getTodoTitle: (id: string) => string;
  reorder: (sourceID: string, destID: string, uid: string) => void;
  setFilter: (newValue: string) => void;
  getFilteredTodos: (activeCategoryFilter?: string) => Todo[];
  fetchTodos: (uid: string) => Promise<void>;
}

export const useTodosStore = create<todoState>()(
  persist(
    immer((set, get) => ({
      todos: [],
      filter: "all",
      addTodo: async (title, uid, categoryId) => {
        try {
          const currentTodos = get().todos;
          const order = currentTodos.length;
          const result = await saveTodoInDB(title, order, uid, categoryId);
          if (!result) return;
          set((state) => {
            state.todos.push({
              id: result.id,
              title,
              completed: false,
              createdAt: result.createdAt,
              order,
              categoryId,
            });
          });
          updateProgress(get().todos, uid);
        } catch (error) {
          console.log(error);
        }
      },
      editTodo: async (id, title, uid, categoryId) => {
        try {
          await updateTodoInDB({ id: id, title, uid, categoryId });
          set((state) => {
            let seletedTodo = state.todos.find((t) => t.id === id);
            if (seletedTodo) {
              seletedTodo.title = title;
              if (categoryId !== undefined) {
                seletedTodo.categoryId = categoryId;
              }
            }
          });
          updateProgress(get().todos, uid);
        } catch (error) {
          console.log(error);
        }
      },
      toggleComblete: async (id, uid) => {
        try {
          await updateTodoInDB({
            id: id,
            completed: !get().todos.find((t) => t.id === id)?.completed,
            uid,
          });
          set((state) => {
            let seletedTodo = state.todos.find((t) => t.id === id);
            if (seletedTodo) seletedTodo.completed = !seletedTodo.completed;
          });
          updateProgress(get().todos, uid);
        } catch (error) {
          console.log(error);
        }
      },
      removeTodo: async (id, uid) => {
        try {
          await deleteTodoInDB(id, uid);
          set((state) => {
            let todoIDX = state.todos.findIndex((t) => t.id === id);
            state.todos.splice(todoIDX, 1);
          });
          updateProgress(get().todos, uid);
        } catch (error) {
          console.log(error);
        }
      },
      getTodoTitle: (id) => {
        const todoState = get().todos;
        let todoTitle = todoState.find((t) => t.id === id)?.title;
        if (!todoTitle) {
          console.log("title not found");
          return "";
        }
        return todoTitle;
      },
      reorder: (sourceID, destID, uid) => {
        set((state) => {
          let sourceIDX = state.todos.findIndex((t) => t.id === sourceID);
          let destIDX = state.todos.findIndex((t) => t.id === destID);
          if (sourceIDX == -1 || destIDX == -1 || sourceIDX == destIDX) return;
          let [removed] = state.todos.splice(sourceIDX, 1);
          if (removed) {
            state.todos.splice(destIDX, 0, removed);
          }
          // Update order in state and DB
          state.todos.forEach((todo, index) => {
            todo.order = index;
            updateTodoInDB({ id: todo.id, order: index, uid });
          });
        });
      },
      setFilter: (newValue) => {
        set((state) => {
          state.filter = newValue;
        });
      },
      getFilteredTodos: (activeCategoryFilter) => {
        const { todos, filter } = get();

        let filteredTodos = todos;

        // Filter by category
        if (activeCategoryFilter && activeCategoryFilter !== "all") {
          filteredTodos = filteredTodos.filter(
            (t) => t.categoryId === activeCategoryFilter,
          );
        }

        // Filter by completion status
        if (filter === "finished")
          return filteredTodos.filter((t) => t.completed);
        if (filter === "unfinished")
          return filteredTodos.filter((t) => !t.completed);

        return filteredTodos;
      },
      fetchTodos: async (uid: string) => {
        try {
          const todos = await getTodosFromDB(uid);
          set((state) => {
            state.todos = todos;
          });
        } catch (error) {
          console.error("Failed to fetch todos:", error);
        }
      },
    })),
    { name: "todos-storage" },
  ),
);
