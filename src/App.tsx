import ToDoList from "./components/todos/TodoList";
import "./App.css";
import AddBar from "./components/todos/footer/AddBar";
import Toast from "./components/todos/Toast";
import { useEffect } from "react";
import { useTodosStore } from "./stores/todosStore";

function App() {
  const fetchTodos = useTodosStore((state) => state.fetchTodos);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5B117D] via-[#190C4E] to-[#3C2989] flex items-center justify-center">
      <ToDoList />
      <AddBar />
      <Toast />
    </div>
  );
}

export default App;
