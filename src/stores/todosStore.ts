import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface todoState {
  todos: Todo[];
  filter: string;
  addTodo: (title: string) => void;
  editTodo: (id: number, title: string) => void;
  toggleComblete: (id: number) => void;
  removeTodo: (id: number) => void;
  getTodoTitle: (id: number) => string;
  reorder: (sourceID: number, destID: number) => void;
  setFilter: (newValue: string) => void;
  getFilteredTodos: () => Todo[];
}

export const useTodosStore = create<todoState>()(
  persist(
    immer((set, get) => ({
      todos: [],
      filter: "all",
      addTodo: (title) => {
        set((state) => {
          state.todos.push({
            id: Date.now(),
            title: title,
            completed: false,
          });
        });
      },
      editTodo: (id, title) => {
        set((state) => {
          let seletedTodo = state.todos.find((t) => t.id === id);
          if (seletedTodo) seletedTodo.title = title;
        });
      },
      toggleComblete: (id) => {
        set((state) => {
          let seletedTodo = state.todos.find((t) => t.id === id);
          if (seletedTodo) seletedTodo.completed = !seletedTodo.completed;
        });
      },
      removeTodo: (id) => {
        set((state) => {
          let todoIDX = state.todos.findIndex((t) => t.id === id);
          state.todos.splice(todoIDX, 1);
        });
      },
      getTodoTitle: (id: number) => {
        const todoState = get();
        let todoTitle = todoState.todos.find((t) => t.id === id)?.title;
        return todoTitle!;
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
    })),
    { name: "todos-storage" },
  ),
);
