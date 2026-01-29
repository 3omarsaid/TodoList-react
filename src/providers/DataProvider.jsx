import { useImmerReducer } from "use-immer";
import { DataContext } from "../contexts/DataContext";
import { useEffect } from "react";
import todosReducer from "../reducer/todosReducer";

export default function DataProvider({ children }) {
  let [todos, dispatch] = useImmerReducer(todosReducer, null, () => {
    const oldTodos = JSON.parse(localStorage.getItem("todos"));
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
