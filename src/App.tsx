import ToDoList from "./components/todos/TodoList";
import "./App.css";

function App() {
  return (
    <div style={{ display: "flex", alignItems: "center", height: "96vh" }}>
      <ToDoList />
    </div>
  );
}

export default App;
