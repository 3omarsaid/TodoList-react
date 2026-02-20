import ToDoList from "./components/todos/TodoList";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5B117D] via-[#190C4E] to-[#3C2989] flex items-center justify-center p-4">
      <ToDoList />
    </div>
  );
}

export default App;
