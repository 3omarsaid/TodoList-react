import { useImmerReducer } from "use-immer";
import { DataContext } from "../contexts/DataContext";
import { useEffect, ReactNode } from "react";
import todosReducer from "../reducer/todosReducer";

interface DataProviderProps {
  children: ReactNode;
}

export default function DataProvider({ children }: DataProviderProps) {
  let [todos, dispatch] = useImmerReducer(todosReducer, null, () => {
    const todosString = localStorage.getItem("todos");
    const oldTodos = todosString ? JSON.parse(todosString) : null;
    return oldTodos ? oldTodos : [];
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <DataContext.Provider
      value={{
        todos,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
