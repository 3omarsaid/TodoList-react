import { createContext, useContext } from "react";
import { Todo } from "../types";
import { TodosComponentProps } from "../reducer/todosReducer";

export let DataContext = createContext<TodosComponentProps | null>(null);

export let useData = () => {
  let context = useContext(DataContext);
  if (!context) throw new Error("DataContext must be used within a provider");
  return context;
};
