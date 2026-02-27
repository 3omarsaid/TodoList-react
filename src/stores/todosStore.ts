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

interface todoState {
  todos: Todo[];
  filter: string;
  addTodo: (title: string) => void;
  editTodo: (id: string, title: string) => void;
  toggleComblete: (id: string) => void;
  removeTodo: (id: string) => void;
  getTodoTitle: (id: string) => string;
  reorder: (sourceID: string, destID: string) => void;
  setFilter: (newValue: string) => void;
  getFilteredTodos: () => Todo[];
  fetchTodos: () => Promise<void>;
}

export const useTodosStore = create<todoState>()(
  persist(
    immer((set, get) => ({
      todos: [],
      filter: "all",
      addTodo: async (title) => {
        try {
          const currentTodos = get().todos;
          const order = currentTodos.length;
          const id = await saveTodoInDB(title, order);
          if (!id) return;
          set((state) => {
            state.todos.push({
              id,
              title,
              completed: false,
              createdAt: Date.now().toString(),
              order,
            });
          });
        } catch (error) {
          console.log(error);
        }
      },
      editTodo: async (id, title) => {
        try {
          await updateTodoInDB({ id: id, title });
          set((state) => {
            let seletedTodo = state.todos.find((t) => t.id === id);
            if (seletedTodo) seletedTodo.title = title;
          });
        } catch (error) {
          console.log(error);
        }
      },
      toggleComblete: async (id) => {
        try {
          await updateTodoInDB({
            id: id,
            completed: !get().todos.find((t) => t.id === id)?.completed,
          });
          set((state) => {
            let seletedTodo = state.todos.find((t) => t.id === id);
            if (seletedTodo) seletedTodo.completed = !seletedTodo.completed;
          });
        } catch (error) {
          console.log(error);
        }
      },
      removeTodo: async (id) => {
        try {
          await deleteTodoInDB(id);
          set((state) => {
            let todoIDX = state.todos.findIndex((t) => t.id === id);
            state.todos.splice(todoIDX, 1);
          });
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
      reorder: (sourceID, destID) => {
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
            updateTodoInDB({ id: todo.id, order: index });
          });
        });
      },
      setFilter: (newValue) => {
        set((state) => {
          state.filter = newValue;
        });
      },
      getFilteredTodos: () => {
        const { todos, filter } = get();
        if (filter === "finished") return todos.filter((t) => t.completed);
        if (filter === "unfinished") return todos.filter((t) => !t.completed);
        return todos;
      },
      fetchTodos: async () => {
        try {
          const todos = await getTodosFromDB();
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
